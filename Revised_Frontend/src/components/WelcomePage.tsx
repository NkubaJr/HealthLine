import { useApp } from '../App';
import { t } from '../translations';
import { Button } from './ui/button';
import { Heart, Phone } from 'lucide-react';
import logo from 'figma:asset/100dce362bf835f2ed3772c30c27487801b52863.png';

export default function WelcomePage() {
  const { language, setCurrentScreen } = useApp();

  return (
    <div className="min-h-[calc(100vh-96px)] flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="HealthLine Rwanda" className="w-32 h-32" />
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-teal-700 dark:text-teal-400">
            {t('welcome', language)}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('tagline', language)}
          </p>
        </div>

        {/* Icon */}
        <div className="flex justify-center py-4">
          <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-full">
            <Heart className="w-12 h-12 text-teal-600 dark:text-teal-400" fill="currentColor" />
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4 pt-4">
          <Button
            onClick={() => setCurrentScreen('login')}
            className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
          >
            {t('login', language)}
          </Button>
          
          <Button
            onClick={() => setCurrentScreen('signup')}
            variant="outline"
            className="w-full h-12 border-2 border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-xl"
          >
            {t('signup', language)}
          </Button>
          
          <Button
            onClick={() => setCurrentScreen('ussd-flow')}
            variant="outline"
            className="w-full h-12 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
          >
            <Phone className="w-4 h-4 mr-2" />
            {language === 'en' ? 'USSD for Feature Phones' : language === 'rw' ? 'USSD kuri telefoni' : 'USSD pour téléphones'}
          </Button>
        </div>

        {/* Footer */}
        <div className="pt-8">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Powered by Rwanda Ministry of Health
          </p>
        </div>
      </div>
    </div>
  );
}