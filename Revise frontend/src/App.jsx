import { useState, createContext, useContext } from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PatientDashboard from './components/patient/PatientDashboard';
import FacilityFinder from './components/patient/FacilityFinder';
import AppointmentBooking from './components/patient/AppointmentBooking';
import AppointmentConfirmation from './components/patient/AppointmentConfirmation';
import LabResults from './components/patient/LabResults';
import UpdateProfile from './components/patient/UpdateProfile';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import LabTechDashboard from './components/lab/LabTechDashboard';
import FrontDeskDashboard from './components/frontdesk/FrontDeskDashboard';
import logo from './assets/logo.png';

const AppContext = createContext(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export default function App() {
  const [language, setLanguage] = useState('en');        // 'en' | 'rw'
  const [darkMode, setDarkMode] = useState(false);
  const [userRole, setUserRole] = useState(null);       // 'patient' | 'doctor' | 'lab_tech' | 'front_desk' | null
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [bookingData, setBookingData] = useState({});

  const value = {
    language, setLanguage,
    darkMode, setDarkMode,
    userRole, setUserRole,
    currentScreen, setCurrentScreen,
    bookingData, setBookingData,
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome': return <WelcomePage />;
      case 'login': return <LoginPage />;
      case 'signup': return <SignupPage />;

      // Patient
      case 'patient-dashboard': return <PatientDashboard />;
      case 'facility-finder': return <FacilityFinder />;
      case 'appointment-booking': return <AppointmentBooking />;
      case 'appointment-confirmation': return <AppointmentConfirmation />;
      case 'lab-results': return <LabResults />;
      case 'update-profile': return <UpdateProfile />;

      // Doctor / Lab / Front desk
      case 'doctor-dashboard': return <DoctorDashboard />;
      case 'lab-tech-dashboard': return <LabTechDashboard />;
      case 'front-desk-dashboard': return <FrontDeskDashboard />;

      default: return <WelcomePage />;
    }
  };

  return (
    <AppContext.Provider value={value}>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={logo} alt="HealthLine Rwanda" className="w-10 h-10" />
                <div>
                  <h1 className="text-teal-700 dark:text-teal-400">HealthLine</h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Rwanda</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')}
                  className="rounded-full"
                >
                  <Globe className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="rounded-full"
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </header>

          {/* Main */}
          <main className="pt-20 pb-6">
            {renderScreen()}
          </main>

          <Toaster />
        </div>
      </div>
    </AppContext.Provider>
  );
}
