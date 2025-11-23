import { useState } from 'react';
import { useApp } from '../../App';
import { t } from '../../translations';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, Droplet, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function UpdateProfile() {
  const { language, setCurrentScreen } = useApp();
  const [fullName, setFullName] = useState('Tifare Kaseke');
  const [phone, setPhone] = useState('+250 788 123 456');
  const [email, setEmail] = useState('t.kaseke@alustudent.com.com');
  const [address, setAddress] = useState('Kigali, Gasabo, Remera');
  const [nationalId, setNationalId] = useState('1199080012345678');
  const [dateOfBirth, setDateOfBirth] = useState('2004-07-25');
  const [gender, setGender] = useState('female');
  const [bloodType, setBloodType] = useState('O+');

  // Password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(language === 'en' ? 'Profile updated successfully!' : 'Umwirondoro wavuguruwe neza!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error(language === 'en' ? 'Passwords do not match' : 'Amagambo y\'ibanga ntabwo ahuje');
      return;
    }
    toast.success(language === 'en' ? 'Password changed successfully!' : 'Ijambo ry\'ibanga ryahinduwe neza!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div className="px-6 pb-8 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => setCurrentScreen('patient-dashboard')}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('back', language)}
        </Button>
        
        <h2 className="text-gray-900 dark:text-gray-100 mb-2">
          {t('updateProfile', language)}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en' 
            ? 'Update your personal information' 
            : 'Kuvugurura amakuru yawe bwite'}
        </p>
      </div>

      {/* Personal Information Form */}
      <Card className="p-5 mb-6 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-gray-100 mb-4">
          {t('personalInfo', language)}
        </h3>
        
        <form onSubmit={handleSaveProfile} className="space-y-4">
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
                className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
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
                className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">
              {t('email', language)}
            </Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address" className="text-gray-900 dark:text-gray-100">
              {t('address', language)}
            </Label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="nationalId" className="text-gray-900 dark:text-gray-100">
              {t('nationalId', language)}
            </Label>
            <Input
              id="nationalId"
              type="text"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="mt-2 h-12 rounded-xl border-gray-300 dark:border-gray-600"
              maxLength={16}
            />
          </div>

          <div>
            <Label htmlFor="dateOfBirth" className="text-gray-900 dark:text-gray-100">
              {t('dateOfBirth', language)}
            </Label>
            <div className="relative mt-2">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="gender" className="text-gray-900 dark:text-gray-100">
              {t('gender', language)}
            </Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="mt-2 h-12 rounded-xl border-gray-300 dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t('male', language)}</SelectItem>
                <SelectItem value="female">{t('female', language)}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="bloodType" className="text-gray-900 dark:text-gray-100">
              {t('bloodType', language)}
            </Label>
            <div className="relative mt-2">
              <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Select value={bloodType} onValueChange={setBloodType}>
                <SelectTrigger className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
          >
            <Save className="w-4 h-4 mr-2" />
            {t('saveChanges', language)}
          </Button>
        </form>
      </Card>

      {/* Change Password */}
      <Card className="p-5 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-gray-100 mb-4">
          {t('changePassword', language)}
        </h3>
        
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword" className="text-gray-900 dark:text-gray-100">
              {t('currentPassword', language)}
            </Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-2 h-12 rounded-xl border-gray-300 dark:border-gray-600"
              placeholder="••••••••"
            />
          </div>

          <div>
            <Label htmlFor="newPassword" className="text-gray-900 dark:text-gray-100">
              {t('newPassword', language)}
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-2 h-12 rounded-xl border-gray-300 dark:border-gray-600"
              placeholder="••••••••"
            />
          </div>

          <div>
            <Label htmlFor="confirmNewPassword" className="text-gray-900 dark:text-gray-100">
              {t('confirmPassword', language)}
            </Label>
            <Input
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="mt-2 h-12 rounded-xl border-gray-300 dark:border-gray-600"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            variant="outline"
            className="w-full h-12 rounded-xl border-gray-300 dark:border-gray-600"
          >
            {t('changePassword', language)}
          </Button>
        </form>
      </Card>
    </div>
  );
}
