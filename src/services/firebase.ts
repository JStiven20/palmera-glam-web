// Firebase configuration and initialization
// This file prepares the app for Firebase integration

import { Client, Visit } from '../contexts/DatabaseContext';

// Firebase configuration - replace with your config
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Firebase services interfaces for future implementation
export interface FirebaseService {
  // Auth methods
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  
  // Firestore methods
  addClient: (client: Omit<Client, 'id' | 'visits' | 'createdAt'>) => Promise<string>;
  updateClient: (id: string, client: Partial<Client>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  getClient: (id: string) => Promise<Client | undefined>;
  getClients: () => Promise<Client[]>;
  
  // Visit methods
  addVisit: (clientId: string, visit: Omit<Visit, 'id'>) => Promise<string>;
  getVisitHistory: (clientId: string) => Promise<Visit[]>;
  
  // Statistics
  getStatistics: () => Promise<{
    totalClients: number;
    totalVisits: number;
    averageVisitsPerClient: number;
    popularServices: { service: string; count: number }[];
  }>;
}

// Local storage fallback service
export class LocalStorageService implements FirebaseService {
  async signInWithEmailAndPassword(email: string, password: string) {
    // Mock authentication for admin panel
    if (email === 'admin@palmera.com' && password === 'admin123') {
      localStorage.setItem('palmera-auth', 'authenticated');
      return { user: { email } };
    }
    throw new Error('Invalid credentials');
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    // For demo purposes
    localStorage.setItem('palmera-auth', 'authenticated');
    return { user: { email } };
  }

  async signOut() {
    localStorage.removeItem('palmera-auth');
  }

  async addClient(client: Omit<Client, 'id' | 'visits' | 'createdAt'>): Promise<string> {
    const clients = this.getClientsFromStorage();
    const newClient: Client = {
      ...client,
      id: `client-${Date.now()}`,
      visits: [],
      createdAt: new Date().toISOString(),
    };
    
    clients.push(newClient);
    this.saveClientsToStorage(clients);
    return newClient.id;
  }

  async updateClient(id: string, updates: Partial<Client>): Promise<void> {
    const clients = this.getClientsFromStorage();
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
      clients[index] = { ...clients[index], ...updates };
      this.saveClientsToStorage(clients);
    }
  }

  async deleteClient(id: string): Promise<void> {
    const clients = this.getClientsFromStorage();
    const filtered = clients.filter(c => c.id !== id);
    this.saveClientsToStorage(filtered);
  }

  async getClient(id: string): Promise<Client | undefined> {
    const clients = this.getClientsFromStorage();
    return clients.find(c => c.id === id);
  }

  async getClients(): Promise<Client[]> {
    return this.getClientsFromStorage();
  }

  async addVisit(clientId: string, visit: Omit<Visit, 'id'>): Promise<string> {
    const clients = this.getClientsFromStorage();
    const clientIndex = clients.findIndex(c => c.id === clientId);
    
    if (clientIndex !== -1) {
      const newVisit: Visit = {
        ...visit,
        id: `visit-${Date.now()}`,
      };
      
      clients[clientIndex].visits.push(newVisit);
      this.saveClientsToStorage(clients);
      return newVisit.id;
    }
    
    throw new Error('Client not found');
  }

  async getVisitHistory(clientId: string): Promise<Visit[]> {
    const client = await this.getClient(clientId);
    if (client) {
      return [...client.visits].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    return [];
  }

  async getStatistics() {
    const clients = this.getClientsFromStorage();
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
      .slice(0, 5);
    
    return {
      totalClients,
      totalVisits,
      averageVisitsPerClient,
      popularServices,
    };
  }

  private getClientsFromStorage(): Client[] {
    const stored = localStorage.getItem('palmera-clients');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse clients from localStorage', error);
      }
    }
    return [];
  }

  private saveClientsToStorage(clients: Client[]): void {
    localStorage.setItem('palmera-clients', JSON.stringify(clients));
  }
}

// Export service instance
export const dbService = new LocalStorageService();

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('palmera-auth') === 'authenticated';
};

// Authentication wrapper for admin panel
export const requireAuth = (): boolean => {
  if (!isAuthenticated()) {
    const email = prompt('Email:');
    const password = prompt('Password:');
    
    if (email && password) {
      try {
        // This would be replaced with actual Firebase auth
        if (email === 'admin@palmera.com' && password === 'admin123') {
          localStorage.setItem('palmera-auth', 'authenticated');
          return true;
        }
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    }
    
    alert('Access denied. Please contact administrator.');
    return false;
  }
  
  return true;
};

/*
FIREBASE INTEGRATION GUIDE:

1. Install Firebase:
   npm install firebase

2. Replace firebaseConfig with your actual config

3. Initialize Firebase:
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';
   import { getAuth } from 'firebase/auth';

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   export const auth = getAuth(app);

4. Replace LocalStorageService methods with Firebase calls:
   - Use Firebase Auth for authentication
   - Use Firestore for data storage
   - Implement real-time listeners for data updates

5. Update DatabaseContext to use Firebase service instead of localStorage

Example Firebase implementation:
```typescript
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy 
} from 'firebase/firestore';

export class FirebaseService implements FirebaseService {
  async addClient(client: Omit<Client, 'id' | 'visits' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'clients'), {
      ...client,
      visits: [],
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  }
  
  // ... implement other methods
}
```
*/