import { useState } from 'react';
import { useApp } from '../../App';
import { t } from '../../translations';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ArrowLeft, Calendar as CalendarIcon, Clock, User } from 'lucide-react';
import { Calendar } from '../ui/calendar';

export default function AppointmentBooking() {
  const { language, setCurrentScreen, bookingData, setBookingData } = useApp();
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');

  const providers = [
    { id: 1, name: 'Dr. Uwase Marie', specialization: 'General Medicine' },
    { id: 2, name: 'Dr. Nkurunziza Jean', specialization: 'Cardiology' },
    { id: 3, name: 'Dr. Mukamana Grace', specialization: 'Pediatrics' },
  ];

  const timeSlots = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM',
  ];

  const handleConfirm = () => {
    const selectedProviderData = providers.find(p => p.id.toString() === selectedProvider);
    setBookingData({
      ...bookingData,
      provider: selectedProviderData,
      date: selectedDate,
      time: selectedTime,
      reason,
    });
    setCurrentScreen('appointment-confirmation');
  };

  return (
    <div className="px-6 pb-8 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => setCurrentScreen('facility-finder')}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('back', language)}
        </Button>
        
        <h2 className="text-gray-900 dark:text-gray-100 mb-2">
          {t('bookAppointment', language)}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {bookingData?.facility?.name || ''}
        </p>
      </div>

      {/* Booking Form */}
      <div className="space-y-6">
        {/* Select Provider */}
        <div>
          <Label className="text-gray-900 dark:text-gray-100 mb-2 block">
            {t('selectDoctor', language)}
          </Label>
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger className="h-12 rounded-xl border-gray-300 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder={language === 'en' ? 'Choose a provider' : 'Hitamo umuganga'} />
              </div>
            </SelectTrigger>
            <SelectContent>
              {providers.map((provider) => (
                <SelectItem key={provider.id} value={provider.id.toString()}>
                  <div>
                    <div>{provider.name}</div>
                    <div className="text-xs text-gray-500">{provider.specialization}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Select Date */}
        <div>
          <Label className="text-gray-900 dark:text-gray-100 mb-2 block">
            {t('selectDate', language)}
          </Label>
          <Card className="p-4 border-gray-300 dark:border-gray-600">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              className="rounded-lg"
            />
          </Card>
        </div>

        {/* Select Time Slot */}
        {selectedDate && (
          <div>
            <Label className="text-gray-900 dark:text-gray-100 mb-3 block">
              {t('selectTime', language)}
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={selectedTime === slot ? 'default' : 'outline'}
                  onClick={() => setSelectedTime(slot)}
                  className={`h-11 rounded-lg ${
                    selectedTime === slot
                      ? 'bg-teal-600 text-white hover:bg-teal-700'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Reason for Visit */}
        <div>
          <Label htmlFor="reason" className="text-gray-900 dark:text-gray-100 mb-2 block">
            {t('reasonForVisit', language)}
          </Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={language === 'en' ? 'Briefly describe your reason for visit' : 'Sobanura muri make impamvu yo gusura'}
            className="min-h-24 rounded-xl border-gray-300 dark:border-gray-600 resize-none"
          />
        </div>

        {/* Summary Card */}
        {selectedProvider && selectedDate && selectedTime && (
          <Card className="p-5 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800">
            <h3 className="text-teal-900 dark:text-teal-100 mb-3">
              {t('appointmentDetails', language)}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-teal-800 dark:text-teal-200">
                <User className="w-4 h-4" />
                <span>{providers.find(p => p.id.toString() === selectedProvider)?.name}</span>
              </div>
              <div className="flex items-center gap-2 text-teal-800 dark:text-teal-200">
                <CalendarIcon className="w-4 h-4" />
                <span>{selectedDate.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-teal-800 dark:text-teal-200">
                <Clock className="w-4 h-4" />
                <span>{selectedTime}</span>
              </div>
            </div>
          </Card>
        )}

        {/* Confirm Button */}
        <Button
          onClick={handleConfirm}
          disabled={!selectedProvider || !selectedDate || !selectedTime}
          className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl disabled:opacity-50"
        >
          {t('confirmBooking', language)}
        </Button>
      </div>
    </div>
  );
}
