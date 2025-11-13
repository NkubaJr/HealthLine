import { useState, createContext, useContext } from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip';
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
import UssdFlowVisualization from './components/UssdFlow';
import logo from 'figma:asset/100dce362bf835f2ed3772c30c27487801b52863.png';

type Language = 'en' | 'rw' | 'fr';
type UserRole = 'patient' | 'doctor' | 'lab_tech' | 'front_desk' | null;

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  bookingData: any;
  setBookingData: (data: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [bookingData, setBookingData] = useState<any>({});

  const value = {
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    userRole,
    setUserRole,
    currentScreen,
    setCurrentScreen,
    bookingData,
    setBookingData,
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomePage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      
      // Patient screens
      case 'patient-dashboard':
        return <PatientDashboard />;
      case 'facility-finder':
        return <FacilityFinder />;
      case 'appointment-booking':
        return <AppointmentBooking />;
      case 'appointment-confirmation':
        return <AppointmentConfirmation />;
      case 'lab-results':
        return <LabResults />;
      case 'update-profile':
        return <UpdateProfile />;
      
      // Doctor screens
      case 'doctor-dashboard':
        return <DoctorDashboard />;
      
      // Lab tech screens
      case 'lab-tech-dashboard':
        return <LabTechDashboard />;
      
      // Front desk screens
      case 'front-desk-dashboard':
        return <FrontDeskDashboard />;
      
      // USSD Flow Visualization
      case 'ussd-flow':
        return <UssdFlowVisualization />;
      
      default:
        return <WelcomePage />;
    }
  };

  return (
    <AppContext.Provider value={value}>
      <TooltipProvider>
        <div className={darkMode ? 'dark' : ''}>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            {/* Header with logo and controls */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="HealthLine Rwanda" className="w-10 h-10" />
                  <div>
                    <h1 className="text-teal-700 dark:text-teal-400">HealthLine</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Rwanda</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Language Switcher with Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="inline-flex items-center justify-center gap-2 rounded-full h-9 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm transition-colors"
                        title="Change Language 🌐"
                      >
                        <Globe className="w-4 h-4" />
                        {language === 'en' ? 'EN' : language === 'rw' ? 'RW' : 'FR'}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => setLanguage('en')} className="cursor-pointer">
                        <span className="mr-2">🇬🇧</span>
                        <span>English</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLanguage('rw')} className="cursor-pointer">
                        <span className="mr-2">🇷🇼</span>
                        <span>Kinyarwanda</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLanguage('fr')} className="cursor-pointer">
                        <span className="mr-2">🇫🇷</span>
                        <span>Français</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  {/* Dark Mode Toggle */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDarkMode(!darkMode)}
                    className="rounded-full"
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </header>

            {/* Main content */}
            <main className="pt-20 pb-6">
              {renderScreen()}
            </main>
            
            {/* Toast Notifications */}
            <Toaster />
          </div>
        </div>
      </TooltipProvider>
    </AppContext.Provider>
  );
}