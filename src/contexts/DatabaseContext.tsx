
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { dbService } from '../services/firebase';

// Client type definition
export interface Visit {
  id: string;
  date: string;
  service: string;
  price: number;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday?: string;
  visits: Visit[];
  createdAt: string;
}

interface DatabaseContextType {
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'visits' | 'createdAt'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClient: (id: string) => Client | undefined;
  addVisit: (clientId: string, visit: Omit<Visit, 'id'>) => void;
  getVisitHistory: (clientId: string) => Visit[];
  getClientsByBirthday: (month: number, day: number) => Client[];
  getStatistics: () => {
    totalClients: number;
    totalVisits: number;
    averageVisitsPerClient: number;
    popularServices: { service: string; count: number }[];
  };
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);

  // Load clients from localStorage on mount
  useEffect(() => {
    const storedClients = localStorage.getItem('palmera-clients');
    if (storedClients) {
      try {
        setClients(JSON.parse(storedClients));
      } catch (error) {
        console.error('Failed to parse clients from localStorage', error);
      }
    }
  }, []);

  // Save clients to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('palmera-clients', JSON.stringify(clients));
  }, [clients]);

  // Add a new client
  const addClient = async (client: Omit<Client, 'id' | 'visits' | 'createdAt'>) => {
    try {
      // Use Firebase service (currently localStorage fallback)
      const clientId = await dbService.addClient(client);
      
      // Update local state
      const newClient: Client = {
        ...client,
        id: clientId,
        visits: [],
        createdAt: new Date().toISOString(),
      };
      setClients([...clients, newClient]);
      return newClient;
    } catch (error) {
      console.error('Failed to add client:', error);
      throw error;
    }
  };

  // Update client information
  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(
      clients.map((client) =>
        client.id === id ? { ...client, ...updates } : client
      )
    );
  };

  // Delete a client
  const deleteClient = (id: string) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  // Get a specific client
  const getClient = (id: string) => {
    return clients.find((client) => client.id === id);
  };

  // Add a visit to a client's history
  const addVisit = (clientId: string, visit: Omit<Visit, 'id'>) => {
    setClients(
      clients.map((client) => {
        if (client.id === clientId) {
          return {
            ...client,
            visits: [
              ...client.visits,
              {
                ...visit,
                id: `visit-${Date.now()}`,
              },
            ],
          };
        }
        return client;
      })
    );
  };

  // Get a client's visit history
  const getVisitHistory = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    return client ? [...client.visits].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ) : [];
  };

  // Get clients with birthdays on a specific date (month and day)
  const getClientsByBirthday = (month: number, day: number) => {
    return clients.filter((client) => {
      if (!client.birthday) return false;
      const birthDate = new Date(client.birthday);
      return birthDate.getMonth() === month && birthDate.getDate() === day;
    });
  };

  // Generate statistics about clients and visits
  const getStatistics = () => {
    const totalClients = clients.length;
    const totalVisits = clients.reduce((sum, client) => sum + client.visits.length, 0);
    
    const averageVisitsPerClient = totalClients === 0 ? 
      0 : Number((totalVisits / totalClients).toFixed(2));
    
    // Count services
    const serviceCounts: Record<string, number> = {};
    clients.forEach((client) => {
      client.visits.forEach((visit) => {
        if (serviceCounts[visit.service]) {
          serviceCounts[visit.service]++;
        } else {
          serviceCounts[visit.service] = 1;
        }
      });
    });
    
    // Convert to array and sort
    const popularServices = Object.entries(serviceCounts)
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 services
    
    return {
      totalClients,
      totalVisits,
      averageVisitsPerClient,
      popularServices,
    };
  };

  return (
    <DatabaseContext.Provider
      value={{
        clients,
        addClient,
        updateClient,
        deleteClient,
        getClient,
        addVisit,
        getVisitHistory,
        getClientsByBirthday,
        getStatistics,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = (): DatabaseContextType => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
