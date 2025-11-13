import { useApp } from '../../App';
import { t } from '../../translations';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { CheckCircle, Calendar, Clock, User, MapPin, MessageSquare } from 'lucide-react';

export default function AppointmentConfirmation() {
  const { language, setCurrentScreen, bookingData } = useApp();

  return (
    <div className="px-6 pb-8 max-w-md mx-auto">
      {/* Success Icon */}
      <div className="flex flex-col items-center text-center mb-8 pt-8">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        
        <h2 className="text-gray-900 dark:text-gray-100 mb-2">
          {t('bookingConfirmed', language)}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('confirmationMessage', language)}
        </p>
      </div>

      {/* Appointment Details Card */}
      <Card className="p-6 mb-6 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-gray-100 mb-4">
          {t('appointmentDetails', language)}
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {t('facility', language)}
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                {bookingData?.facility?.name || 'Kigali University Teaching Hospital'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {t('provider', language)}
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                {bookingData?.provider?.name || 'Dr. Uwase Marie'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {bookingData?.provider?.specialization || 'General Medicine'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {t('date', language)}
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                {bookingData?.date?.toLocaleDateString() || 'November 15, 2025'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {t('time', language)}
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                {bookingData?.time || '10:00 AM'}
              </p>
            </div>
          </div>

          {bookingData?.reason && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t('reason', language)}
                </p>
                <p className="text-gray-900 dark:text-gray-100">
                  {bookingData.reason}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* SMS Reminder Notice */}
      <Card className="p-4 mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex gap-3">
          <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900 dark:text-blue-100">
              {language === 'en' 
                ? 'SMS confirmation sent to your phone. You will receive a reminder 24 hours before your appointment.'
                : 'Ubutumwa bwa SMS bwoherejwe kuri telefoni yawe. Uzabona ibutsa amasaha 24 mbere y\'uko ubonana n\'umuganga.'}
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => setCurrentScreen('patient-dashboard')}
          className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
        >
          {t('backToDashboard', language)}
        </Button>
        
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl border-gray-300 dark:border-gray-600"
        >
          {language === 'en' ? 'Add to Calendar' : 'Ongera kuri kalendari'}
        </Button>
      </div>
    </div>
  );
}
