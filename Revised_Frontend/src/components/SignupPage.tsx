import { useState } from 'react';
import { useApp } from '../App';
import { t } from '../translations';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, User, Phone, Mail, Lock } from 'lucide-react';

export default function SignupPage() {
  const { language, setCurrentScreen } = useApp();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would register the user
    setCurrentScreen('login');
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
            {t('signup', language)}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'en' 
              ? 'Create an account to get started' 
              : 'Kora konti kugira ngo utangire'}
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <Label htmlFor="fullName" className="text-gray-900 dark:text-gray-100">
              {t('fullName', language)}
            </Label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={language === 'en' ? 'John Doe' : 'Izina ryawe'}
                className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-gray-900 dark:text-gray-100">
              {t('phone', language)}
            </Label>
            <div className="relative mt-2">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+250 7XX XXX XXX"
                className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">
              {t('email', language)} ({language === 'en' ? 'Optional' : 'Ntabwo ari ngombwa'})
            </Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
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
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-gray-900 dark:text-gray-100">
              {t('confirmPassword', language)}
            </Label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl mt-6"
          >
            {t('signup', language)}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {t('haveAccount', language)}{' '}
            <Button
              variant="link"
              onClick={() => setCurrentScreen('login')}
              className="text-teal-600 dark:text-teal-400 p-0 h-auto"
            >
              {t('login', language)}
            </Button>
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'en'
              ? 'By signing up, you agree to our Terms of Service and Privacy Policy. Your health data is protected and secure.'
              : 'Mu kwiyandikisha, wemera amategeko yacu n\'amabanga yawe. Amakuru yawe y\'ubuzima aracungwa kandi afite umutekano.'}
          </p>
        </div>
      </div>
    </div>
  );
}
