import { useState } from 'react';
import { useApp } from '../App';
import { t } from '../translations';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Mail, Phone, Lock, Smartphone } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function LoginPage() {
  const { language, setCurrentScreen, setUserRole } = useApp();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Navigate based on role
    switch (selectedRole) {
      case 'patient':
        setUserRole('patient');
        setCurrentScreen('patient-dashboard');
        break;
      case 'doctor':
        setUserRole('doctor');
        setCurrentScreen('doctor-dashboard');
        break;
      case 'lab_tech':
        setUserRole('lab_tech');
        setCurrentScreen('lab-tech-dashboard');
        break;
      case 'front_desk':
        setUserRole('front_desk');
        setCurrentScreen('front-desk-dashboard');
        break;
      default:
        setUserRole('patient');
        setCurrentScreen('patient-dashboard');
    }
  };

  const handleSendOTP = () => {
    setOtpSent(true);
  };

  return (
    <div className="min-h-[calc(100vh-96px)] px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setCurrentScreen('welcome')}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('back', language)}
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-gray-900 dark:text-gray-100 mb-2">
            {t('login', language)}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'en' 
              ? 'Enter your credentials to access your account' 
              : 'Injiza ibyangombwa byawe kugira ngo ubone konti yawe'}
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <Label htmlFor="role" className="text-gray-900 dark:text-gray-100">
            {language === 'en' ? 'Login as' : 'Injira nka'}
          </Label>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full mt-2 h-12 rounded-xl border-gray-300 dark:border-gray-600">
              <SelectValue placeholder={language === 'en' ? 'Select role' : 'Hitamo uruhare'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="patient">{language === 'en' ? 'Patient' : 'Umurwayi'}</SelectItem>
              <SelectItem value="doctor">{language === 'en' ? 'Doctor' : 'Umuganga'}</SelectItem>
              <SelectItem value="lab_tech">{language === 'en' ? 'Lab Technician' : 'Umukozi wa laboratwari'}</SelectItem>
              <SelectItem value="front_desk">{language === 'en' ? 'Front Desk Staff' : 'Umukozi ku kibanza'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Login Tabs */}
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-12 rounded-xl">
            <TabsTrigger value="email" className="rounded-lg">
              <Mail className="w-4 h-4 mr-2" />
              {t('email', language)}
            </TabsTrigger>
            <TabsTrigger value="otp" className="rounded-lg">
              <Smartphone className="w-4 h-4 mr-2" />
              OTP
            </TabsTrigger>
          </TabsList>

          {/* Email/Phone Login */}
          <TabsContent value="email">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">
                  {t('email', language)} / {t('phone', language)}
                </Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === 'en' ? 'Enter email or phone' : 'Injiza imeri cyangwa telefoni'}
                    className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-900 dark:text-gray-100">
                  {t('password', language)}
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="link"
                className="text-teal-600 dark:text-teal-400 p-0 h-auto"
              >
                {t('forgotPassword', language)}
              </Button>

              <Button
                type="submit"
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
                disabled={!selectedRole}
              >
                {t('login', language)}
              </Button>
            </form>
          </TabsContent>

          {/* OTP Login */}
          <TabsContent value="otp">
            <div className="space-y-5">
              <div>
                <Label htmlFor="phone-otp" className="text-gray-900 dark:text-gray-100">
                  {t('phone', language)}
                </Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="phone-otp"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+250 7XX XXX XXX"
                    className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              {!otpSent ? (
                <Button
                  onClick={handleSendOTP}
                  className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
                >
                  {t('sendOTP', language)}
                </Button>
              ) : (
                <>
                  <div>
                    <Label htmlFor="otp" className="text-gray-900 dark:text-gray-100">
                      {t('enterOTP', language)}
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="mt-2 h-12 rounded-xl border-gray-300 dark:border-gray-600 text-center tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  <Button
                    onClick={handleLogin}
                    className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
                    disabled={!selectedRole}
                  >
                    {t('login', language)}
                  </Button>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {t('noAccount', language)}{' '}
            <Button
              variant="link"
              onClick={() => setCurrentScreen('signup')}
              className="text-teal-600 dark:text-teal-400 p-0 h-auto"
            >
              {t('signup', language)}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
