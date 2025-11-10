import { useState } from 'react';
import { useApp } from '../../App';
import { t } from '../../translations';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { LogOut, User, Clock, FileText, CheckCircle, XCircle, UserX } from 'lucide-react';

export default function DoctorDashboard() {
  const { language, setCurrentScreen, setUserRole } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [notes, setNotes] = useState('');

  const appointments = [
    {
      id: 1,
      time: '08:00 AM',
      patientName: 'John Doe',
      patientId: 'P001',
      age: 35,
      gender: 'Male',
      reason: 'General checkup',
      status: 'pending',
      phone: '+250 788 123 456',
    },
    {
      id: 2,
      time: '09:00 AM',
      patientName: 'Jane Uwase',
      patientId: 'P002',
      age: 28,
      gender: 'Female',
      reason: 'Follow-up consultation',
      status: 'checked-in',
      phone: '+250 788 234 567',
    },
    {
      id: 3,
      time: '10:00 AM',
      patientName: 'Pierre Nkurunziza',
      patientId: 'P003',
      age: 45,
      gender: 'Male',
      reason: 'Blood pressure monitoring',
      status: 'pending',
      phone: '+250 788 345 678',
    },
    {
      id: 4,
      time: '11:00 AM',
      patientName: 'Marie Mukamana',
      patientId: 'P004',
      age: 52,
      gender: 'Female',
      reason: 'Diabetes management',
      status: 'completed',
      phone: '+250 788 456 789',
    },
  ];

  const handleLogout = () => {
    setUserRole(null);
    setCurrentScreen('welcome');
  };

  const handleStatusChange = (appointmentId: number, newStatus: string) => {
    // In a real app, this would update the database
    console.log(`Appointment ${appointmentId} status changed to ${newStatus}`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
        label: language === 'en' ? 'Pending' : 'Birategereza',
      },
      'checked-in': {
        bg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
        label: language === 'en' ? 'Checked In' : 'Yemejwe',
      },
      completed: {
        bg: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
        label: language === 'en' ? 'Completed' : 'Byarangiye',
      },
      'no-show': {
        bg: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
        label: language === 'en' ? 'No Show' : 'Ntiyaje',
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
          {language === 'en' ? 'Welcome, Dr. Uwase!' : 'Murakaza neza, Dr. Uwase!'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('todaySchedule', language)}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-4 text-center border-gray-200 dark:border-gray-700">
          <div className="text-2xl text-teal-600 dark:text-teal-400 mb-1">12</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'Total' : 'Yose'}
          </div>
        </Card>
        <Card className="p-4 text-center border-gray-200 dark:border-gray-700">
          <div className="text-2xl text-blue-600 dark:text-blue-400 mb-1">8</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'Completed' : 'Byarangiye'}
          </div>
        </Card>
        <Card className="p-4 text-center border-gray-200 dark:border-gray-700">
          <div className="text-2xl text-yellow-600 dark:text-yellow-400 mb-1">4</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'Pending' : 'Bisigaye'}
          </div>
        </Card>
      </div>

      {/* Date Selector */}
      <div className="mb-6">
        <Select value={selectedDate} onValueChange={setSelectedDate}>
          <SelectTrigger className="h-12 rounded-xl border-gray-300 dark:border-gray-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={new Date().toISOString().split('T')[0]}>
              {language === 'en' ? 'Today' : 'Uyu munsi'}
            </SelectItem>
            <SelectItem value={new Date(Date.now() + 86400000).toISOString().split('T')[0]}>
              {language === 'en' ? 'Tomorrow' : 'Ejo'}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        <h3 className="text-gray-900 dark:text-gray-100">
          {language === 'en' ? 'Appointments' : 'Gahunda'}
        </h3>

        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-5 border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-gray-100 mb-1">
                    {appointment.patientName}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {appointment.age}y, {appointment.gender} • {appointment.patientId}
                  </p>
                </div>
              </div>
              {getStatusBadge(appointment.status)}
            </div>

            <div className="space-y-2 mb-4 pl-13">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FileText className="w-4 h-4" />
                <span>{appointment.reason}</span>
              </div>
            </div>

            <div className="flex gap-2 pl-13">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedPatient(appointment)}
                className="flex-1 h-9 rounded-lg border-gray-300 dark:border-gray-600"
              >
                {language === 'en' ? 'View Details' : 'Reba'}
              </Button>
              
              {appointment.status === 'pending' && (
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(appointment.id, 'checked-in')}
                  className="h-9 rounded-lg bg-teal-600 hover:bg-teal-700"
                >
                  <CheckCircle className="w-4 h-4" />
                </Button>
              )}
              
              {appointment.status === 'checked-in' && (
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(appointment.id, 'completed')}
                  className="h-9 rounded-lg bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full h-12 rounded-xl border-gray-300 dark:border-gray-600 mt-6"
      >
        <LogOut className="w-4 h-4 mr-2" />
        {t('logout', language)}
      </Button>

      {/* Patient Details Dialog */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('patientDetails', language)}</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t('patientName', language)}
                </p>
                <p className="text-gray-900 dark:text-gray-100">{selectedPatient.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t('reason', language)}
                </p>
                <p className="text-gray-900 dark:text-gray-100">{selectedPatient.reason}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t('notes', language)}
                </p>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={language === 'en' ? 'Add notes...' : 'Ongera ibisobanuro...'}
                  className="min-h-24"
                />
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                {language === 'en' ? 'Save Notes' : 'Bika ibisobanuro'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
