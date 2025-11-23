import { useApp } from '../../App';
import { t } from '../../translations';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  Calendar,
  FileText,
  User,
  MapPin,
  Clock,
  LogOut,
  ChevronRight,
  CalendarCheck,
} from 'lucide-react';

export default function PatientDashboard() {
  const { language, setCurrentScreen, setUserRole } = useApp();

  const handleLogout = () => {
    setUserRole(null);
    setCurrentScreen('welcome');
  };

  const menuItems = [
    {
      icon: Calendar,
      label: t('bookAppointment', language),
      screen: 'facility-finder',
      color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
    },
    {
      icon: FileText,
      label: t('viewLabResults', language),
      screen: 'lab-results',
      color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    },
    {
      icon: MapPin,
      label: t('findFacility', language),
      screen: 'facility-finder',
      color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    },
    {
      icon: User,
      label: t('updateProfile', language),
      screen: 'update-profile',
      color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <div className="px-6 pb-8 max-w-md mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-gray-900 dark:text-gray-100 mb-1">
          {language === 'en' ? 'Welcome back, Tifare!' : 'Murakaza neza, Tifare!'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en' ? 'How can we help you today?' : 'Twakugirira iki uyu munsi?'}
        </p>
      </div>

      {/* Next Appointment Card */}
      <Card className="p-5 mb-8 bg-gradient-to-br from-teal-500 to-teal-600 border-0 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-teal-100 text-sm mb-1">
              {t('nextAppointment', language)}
            </p>
            <h3 className="text-white">
              {language === 'en' ? 'Dr. Uwase Marie' : 'Dr. Uwase Marie'}
            </h3>
          </div>
          <CalendarCheck className="w-6 h-6 text-white opacity-80" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-teal-50">
            <Calendar className="w-4 h-4" />
            <span>{language === 'en' ? 'November 15, 2025' : '15 Ugushyingo 2025'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-teal-50">
            <Clock className="w-4 h-4" />
            <span>10:00 AM</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-teal-50">
            <MapPin className="w-4 h-4" />
            <span>Kigali University Teaching Hospital</span>
          </div>
        </div>

        <Button
          variant="secondary"
          className="w-full mt-4 bg-white text-teal-600 hover:bg-teal-50 rounded-lg h-10"
        >
          {language === 'en' ? 'View Details' : 'Reba ibisobanuro'}
        </Button>
      </Card>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-gray-900 dark:text-gray-100 mb-4">
          {language === 'en' ? 'Quick Actions' : 'Ibikorwa byihuse'}
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700"
              onClick={() => setCurrentScreen(item.screen)}
            >
              <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-3`}>
                <item.icon className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-900 dark:text-gray-100">
                {item.label}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-6">
        <h3 className="text-gray-900 dark:text-gray-100 mb-4">
          {language === 'en' ? 'Recent Activity' : 'Ibikorwa bya vuba'}
        </h3>
        
        <div className="space-y-3">
          {[
            {
              title: language === 'en' ? 'Blood Test Results' : 'Ibisubizo by\'ikizamini cy\'amaraso',
              date: language === 'en' ? 'November 5, 2025' : '5 Ugushyingo 2025',
              icon: FileText,
            },
            {
              title: language === 'en' ? 'Appointment with Dr. Mutoni' : 'Gahunda na Dr. Mutoni',
              date: language === 'en' ? 'November 1, 2025' : '1 Ugushyingo 2025',
              icon: CalendarCheck,
            },
          ].map((activity, index) => (
            <Card key={index} className="p-4 flex items-center gap-4 border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <activity.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-gray-100 truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.date}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Card>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full h-12 rounded-xl border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
      >
        <LogOut className="w-4 h-4 mr-2" />
        {t('logout', language)}
      </Button>
    </div>
  );
}
