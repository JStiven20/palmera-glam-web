import React, { useState } from 'react';
import { useDatabase, Client, Visit } from '../contexts/DatabaseContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Calendar, Users, TrendingUp, Star, Plus, Edit, Trash2 } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { language } = useLanguage();
  const { 
    clients, 
    addClient, 
    updateClient, 
    deleteClient, 
    addVisit, 
    getVisitHistory, 
    getStatistics 
  } = useDatabase();

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [isAddingVisit, setIsAddingVisit] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    birthday: ''
  });

  const [newVisit, setNewVisit] = useState({
    date: '',
    service: '',
    price: 0,
    notes: ''
  });

  const stats = getStatistics();

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email || !newClient.phone) {
      toast({
        title: language === 'es' ? 'Error' : 'Error',
        description: language === 'es' ? 'Completa todos los campos requeridos' : 'Complete all required fields',
        variant: 'destructive',
      });
      return;
    }

    addClient({
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      birthday: newClient.birthday || undefined,
    });

    setNewClient({ name: '', email: '', phone: '', birthday: '' });
    setIsAddingClient(false);
    
    toast({
      title: language === 'es' ? 'Cliente agregado' : 'Client added',
      description: language === 'es' ? 'El cliente ha sido agregado exitosamente' : 'Client has been added successfully',
    });
  };

  const handleUpdateClient = () => {
    if (!editingClient) return;

    updateClient(editingClient.id, {
      name: editingClient.name,
      email: editingClient.email,
      phone: editingClient.phone,
      birthday: editingClient.birthday,
    });

    setEditingClient(null);
    
    toast({
      title: language === 'es' ? 'Cliente actualizado' : 'Client updated',
      description: language === 'es' ? 'Los datos han sido actualizados' : 'Data has been updated',
    });
  };

  const handleAddVisit = () => {
    if (!selectedClient || !newVisit.date || !newVisit.service) {
      toast({
        title: language === 'es' ? 'Error' : 'Error',
        description: language === 'es' ? 'Completa todos los campos requeridos' : 'Complete all required fields',
        variant: 'destructive',
      });
      return;
    }

    addVisit(selectedClient.id, {
      date: newVisit.date,
      service: newVisit.service,
      price: newVisit.price,
      notes: newVisit.notes || undefined,
    });

    setNewVisit({ date: '', service: '', price: 0, notes: '' });
    setIsAddingVisit(false);
    
    toast({
      title: language === 'es' ? 'Visita agregada' : 'Visit added',
      description: language === 'es' ? 'La visita ha sido registrada' : 'Visit has been recorded',
    });
  };

  const handleDeleteClient = (clientId: string) => {
    if (window.confirm(language === 'es' ? '¿Eliminar este cliente?' : 'Delete this client?')) {
      deleteClient(clientId);
      setSelectedClient(null);
      
      toast({
        title: language === 'es' ? 'Cliente eliminado' : 'Client deleted',
        description: language === 'es' ? 'El cliente ha sido eliminado' : 'Client has been deleted',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-palmera-beige/20 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-playfair text-palmera-olive mb-2">
            {language === 'es' ? 'Panel de Administración' : 'Admin Panel'}
          </h1>
          <p className="text-gray-600">
            {language === 'es' ? 'Gestiona clientes y citas' : 'Manage clients and appointments'}
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'es' ? 'Total Clientes' : 'Total Clients'}
              </CardTitle>
              <Users className="h-4 w-4 text-palmera-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-palmera-olive">{stats.totalClients}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'es' ? 'Total Visitas' : 'Total Visits'}
              </CardTitle>
              <Calendar className="h-4 w-4 text-palmera-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-palmera-olive">{stats.totalVisits}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'es' ? 'Promedio Visitas' : 'Avg Visits'}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-palmera-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-palmera-olive">{stats.averageVisitsPerClient}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'es' ? 'Servicio Popular' : 'Popular Service'}
              </CardTitle>
              <Star className="h-4 w-4 text-palmera-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-palmera-olive">
                {stats.popularServices[0]?.service || 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="clients">
              {language === 'es' ? 'Clientes' : 'Clients'}
            </TabsTrigger>
            <TabsTrigger value="appointments">
              {language === 'es' ? 'Citas' : 'Appointments'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-playfair text-palmera-olive">
                {language === 'es' ? 'Lista de Clientes' : 'Client List'}
              </h2>
              
              <Dialog open={isAddingClient} onOpenChange={setIsAddingClient}>
                <DialogTrigger asChild>
                  <Button className="bg-palmera-olive hover:bg-palmera-olive/90">
                    <Plus className="w-4 h-4 mr-2" />
                    {language === 'es' ? 'Agregar Cliente' : 'Add Client'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {language === 'es' ? 'Agregar Nuevo Cliente' : 'Add New Client'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">{language === 'es' ? 'Nombre' : 'Name'}</Label>
                      <Input
                        id="name"
                        value={newClient.name}
                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newClient.email}
                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{language === 'es' ? 'Teléfono' : 'Phone'}</Label>
                      <Input
                        id="phone"
                        value={newClient.phone}
                        onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="birthday">{language === 'es' ? 'Cumpleaños' : 'Birthday'}</Label>
                      <Input
                        id="birthday"
                        type="date"
                        value={newClient.birthday}
                        onChange={(e) => setNewClient({ ...newClient, birthday: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleAddClient} className="w-full bg-palmera-olive hover:bg-palmera-olive/90">
                      {language === 'es' ? 'Agregar Cliente' : 'Add Client'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => (
                <Card key={client.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <p className="text-sm text-gray-600">{client.email}</p>
                        <p className="text-sm text-gray-600">{client.phone}</p>
                        {client.birthday && (
                          <p className="text-sm text-gray-500">
                            {language === 'es' ? 'Cumpleaños: ' : 'Birthday: '}
                            {new Date(client.birthday).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingClient(client)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteClient(client.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {client.visits.length} {language === 'es' ? 'visitas' : 'visits'}
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => setSelectedClient(client)}
                        className="bg-palmera-olive hover:bg-palmera-olive/90"
                      >
                        {language === 'es' ? 'Ver Detalles' : 'View Details'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            {selectedClient ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-playfair text-palmera-olive">
                      {language === 'es' ? 'Citas de ' : 'Appointments for '}{selectedClient.name}
                    </h2>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedClient(null)}
                      className="mt-2"
                    >
                      {language === 'es' ? 'Volver a la lista' : 'Back to list'}
                    </Button>
                  </div>
                  
                  <Dialog open={isAddingVisit} onOpenChange={setIsAddingVisit}>
                    <DialogTrigger asChild>
                      <Button className="bg-palmera-olive hover:bg-palmera-olive/90">
                        <Plus className="w-4 h-4 mr-2" />
                        {language === 'es' ? 'Agregar Cita' : 'Add Appointment'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {language === 'es' ? 'Nueva Cita' : 'New Appointment'}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="date">{language === 'es' ? 'Fecha y Hora' : 'Date & Time'}</Label>
                          <Input
                            id="date"
                            type="datetime-local"
                            value={newVisit.date}
                            onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="service">{language === 'es' ? 'Servicio' : 'Service'}</Label>
                          <Select onValueChange={(value) => setNewVisit({ ...newVisit, service: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder={language === 'es' ? 'Seleccionar servicio' : 'Select service'} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manicure">Manicure</SelectItem>
                              <SelectItem value="pedicure">Pedicure</SelectItem>
                              <SelectItem value="gel">Gel Polish</SelectItem>
                              <SelectItem value="nailArt">Nail Art</SelectItem>
                              <SelectItem value="handSpa">Hand Spa</SelectItem>
                              <SelectItem value="footSpa">Foot Spa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="price">{language === 'es' ? 'Precio' : 'Price'}</Label>
                          <Input
                            id="price"
                            type="number"
                            value={newVisit.price}
                            onChange={(e) => setNewVisit({ ...newVisit, price: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="notes">{language === 'es' ? 'Notas' : 'Notes'}</Label>
                          <Textarea
                            id="notes"
                            value={newVisit.notes}
                            onChange={(e) => setNewVisit({ ...newVisit, notes: e.target.value })}
                          />
                        </div>
                        <Button onClick={handleAddVisit} className="w-full bg-palmera-olive hover:bg-palmera-olive/90">
                          {language === 'es' ? 'Agregar Cita' : 'Add Appointment'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getVisitHistory(selectedClient.id).map((visit) => (
                    <Card key={visit.id}>
                      <CardContent className="p-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Badge className="bg-palmera-olive text-white">
                              {visit.service}
                            </Badge>
                            <span className="font-semibold text-palmera-olive">
                              €{visit.price}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {new Date(visit.date).toLocaleString()}
                          </p>
                          {visit.notes && (
                            <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                              {visit.notes}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'es' ? 'Selecciona un cliente' : 'Select a client'}
                </h3>
                <p className="text-gray-500">
                  {language === 'es' 
                    ? 'Selecciona un cliente de la lista para ver sus citas' 
                    : 'Select a client from the list to view their appointments'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Edit Client Dialog */}
        {editingClient && (
          <Dialog open={!!editingClient} onOpenChange={() => setEditingClient(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {language === 'es' ? 'Editar Cliente' : 'Edit Client'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">{language === 'es' ? 'Nombre' : 'Name'}</Label>
                  <Input
                    id="edit-name"
                    value={editingClient.name}
                    onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingClient.email}
                    onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone">{language === 'es' ? 'Teléfono' : 'Phone'}</Label>
                  <Input
                    id="edit-phone"
                    value={editingClient.phone}
                    onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-birthday">{language === 'es' ? 'Cumpleaños' : 'Birthday'}</Label>
                  <Input
                    id="edit-birthday"
                    type="date"
                    value={editingClient.birthday || ''}
                    onChange={(e) => setEditingClient({ ...editingClient, birthday: e.target.value })}
                  />
                </div>
                <Button onClick={handleUpdateClient} className="w-full bg-palmera-olive hover:bg-palmera-olive/90">
                  {language === 'es' ? 'Actualizar' : 'Update'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;