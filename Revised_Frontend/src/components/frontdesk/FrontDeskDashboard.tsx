import { useState } from 'react';
import { useApp } from '../../App';
import { t } from '../../translations';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  LogOut,
  Search,
  UserPlus,
  Users,
  Clock,
  CheckCircle,
  User,
  Phone,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

export default function FrontDeskDashboard() {
  const { language, setCurrentScreen, setUserRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showWalkInDialog, setShowWalkInDialog] = useState(false);
  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
  const [walkInProvider, setWalkInProvider] = useState('');
  const [queue, setQueue] = useState([
    {
      id: 1,
      patientName: 'Tifare Kaseke',
      phone: '+250 788 123 456',
      appointmentTime: '08:00 AM',
      provider: 'Dr. Uwase Marie',
      status: 'waiting',
      queuePosition: 1,
      estimatedTime: '5 min',
    },
    {
      id: 2,
      patientName: 'Jane Uwase',
      phone: '+250 788 234 567',
      appointmentTime: '09:00 AM',
      provider: 'Dr. Uwase Marie',
      status: 'checked-in',
      queuePosition: 2,
      estimatedTime: '15 min',
    },
    {
      id: 3,
      patientName: 'Pierre Nkurunziza',
      phone: '+250 788 345 678',
      appointmentTime: '10:00 AM',
      provider: 'Dr. Nkurunziza Jean',
      status: 'waiting',
      queuePosition: 3,
      estimatedTime: '25 min',
    },
  ]);

  const todayAppointments = [
    {
      id: 1,
      time: '08:00 AM',
      patientName: 'Tifare Kaseke',
      provider: 'Dr. Uwase Marie',
      status: 'waiting',
    },
    {
      id: 2,
      time: '09:00 AM',
      patientName: 'Jane Uwase',
      provider: 'Dr. Uwase Marie',
      status: 'checked-in',
    },
    {
      id: 3,
      time: '10:00 AM',
      patientName: 'Pierre Nkurunziza',
      provider: 'Dr. Nkurunziza Jean',
      status: 'waiting',
    },
    {
      id: 4,
      time: '11:00 AM',
      patientName: 'Marie Mukamana',
      provider: 'Dr. Mukamana Grace',
      status: 'completed',
    },
  ];

  const providers = [
    { id: 1, name: 'Dr. Uwase Marie' },
    { id: 2, name: 'Dr. Nkurunziza Jean' },
    { id: 3, name: 'Dr. Mukamana Grace' },
  ];

  const handleCheckIn = (patientId: number) => {
    toast.success(language === 'en' ? 'Patient checked in successfully!' : 'Umurwayi yemejwe neza!');
  };

  const handleWalkInRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInName || !walkInPhone || !walkInProvider) {
      toast.error(language === 'en' ? 'Please fill all fields' : 'Uzuza ibisabwa byose');
      return;
    }
    toast.success(language === 'en' ? 'Walk-in appointment created!' : 'Gahunda yashyizweho neza!');
    setShowWalkInDialog(false);
    setWalkInName('');
    setWalkInPhone('');
    setWalkInProvider('');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentScreen('welcome');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      waiting: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
        label: language === 'en' ? 'Waiting' : 'Birategereza',
      },
      'checked-in': {
        bg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
        label: language === 'en' ? 'Checked In' : 'Yemejwe',
      },
      completed: {
        bg: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
        label: language === 'en' ? 'Completed' : 'Byarangiye',
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.bg} border-0`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="px-6 pb-8 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-gray-900 dark:text-gray-100 mb-1">
          {language === 'en' ? 'Front Desk Dashboard' : 'Ikibanza cy\'akabiri'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('checkInQueue', language)}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-4 text-center border-gray-200 dark:border-gray-700">
          <div className="text-2xl text-teal-600 dark:text-teal-400 mb-1">
            {todayAppointments.length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'Today' : 'Uyu munsi'}
          </div>
        </Card>
        <Card className="p-4 text-center border-gray-200 dark:border-gray-700">
          <div className="text-2xl text-blue-600 dark:text-blue-400 mb-1">
            {queue.filter(q => q.status === 'checked-in').length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'In Queue' : 'Mu murongo'}
          </div>
        </Card>
        <Card className="p-4 text-center border-gray-200 dark:border-gray-700">
          <div className="text-2xl text-yellow-600 dark:text-yellow-400 mb-1">
            {queue.filter(q => q.status === 'waiting').length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'Waiting' : 'Bategereza'}
          </div>
        </Card>
      </div>

      {/* Walk-In Registration Button */}
      <Button
        onClick={() => setShowWalkInDialog(true)}
        className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl mb-6"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        {t('walkInRegistration', language)}
      </Button>

      {/* Tabs */}
      <Tabs defaultValue="queue" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 h-12 rounded-xl">
          <TabsTrigger value="queue" className="rounded-lg">
            <Users className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Queue' : 'Umurongo'}
          </TabsTrigger>
          <TabsTrigger value="appointments" className="rounded-lg">
            <Calendar className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Appointments' : 'Gahunda'}
          </TabsTrigger>
        </TabsList>

        {/* Queue Tab */}
        <TabsContent value="queue">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPatient', language)}
              className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Queue List */}
          <div className="space-y-4">
            {queue.map((patient) => (
              <Card key={patient.id} className="p-5 border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-gray-100 mb-1">
                        {patient.patientName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {patient.phone}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(patient.status)}
                </div>

                <div className="space-y-2 mb-4 pl-13">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{patient.appointmentTime} • {patient.provider}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {t('queuePosition', language)}:
                    </span>
                    <Badge variant="secondary" className="border-0">
                      #{patient.queuePosition}
                    </Badge>
                    <span className="text-gray-500 dark:text-gray-400">
                      {t('estimatedTime', language)}: {patient.estimatedTime}
                    </span>
                  </div>
                </div>

                {patient.status === 'waiting' && (
                  <Button
                    onClick={() => handleCheckIn(patient.id)}
                    className="w-full h-10 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {t('checkIn', language)}
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments">
          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-4 border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-sm text-teal-600 dark:text-teal-400">
                        {appointment.time.split(' ')[0]}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {appointment.time.split(' ')[1]}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-gray-100 mb-0.5">
                        {appointment.patientName}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {appointment.provider}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(appointment.status)}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full h-12 rounded-xl border-gray-300 dark:border-gray-600 mt-6"
      >
        <LogOut className="w-4 h-4 mr-2" />
        {t('logout', language)}
      </Button>

      {/* Walk-In Registration Dialog */}
      <Dialog open={showWalkInDialog} onOpenChange={setShowWalkInDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('walkInRegistration', language)}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleWalkInRegistration} className="space-y-4">
            <div>
              <Label htmlFor="walkInName" className="text-gray-900 dark:text-gray-100">
                {t('patientName', language)}
              </Label>
              <Input
                id="walkInName"
                type="text"
                value={walkInName}
                onChange={(e) => setWalkInName(e.target.value)}
                placeholder={language === 'en' ? 'Enter patient name' : 'Injiza izina ry\'umurwayi'}
                className="mt-2 h-12 rounded-xl border-gray-300 dark:border-gray-600"
              />
            </div>

            <div>
              <Label htmlFor="walkInPhone" className="text-gray-900 dark:text-gray-100">
                {t('patientPhone', language)}
              </Label>
              <Input
                id="walkInPhone"
                type="tel"
                value={walkInPhone}
                onChange={(e) => setWalkInPhone(e.target.value)}
                placeholder="+250 7XX XXX XXX"
                className="mt-2 h-12 rounded-xl border-gray-300 dark:border-gray-600"
              />
            </div>

            <div>
              <Label className="text-gray-900 dark:text-gray-100 mb-2 block">
                {t('selectDoctor', language)}
              </Label>
              <Select value={walkInProvider} onValueChange={setWalkInProvider}>
                <SelectTrigger className="h-12 rounded-xl border-gray-300 dark:border-gray-600">
                  <SelectValue placeholder={language === 'en' ? 'Choose provider' : 'Hitamo umuganga'} />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider.id} value={provider.name}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
            >
              {t('createAppointment', language)}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}