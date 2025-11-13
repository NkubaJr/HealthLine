import { useState } from 'react';
import { useApp } from '../../App';
import { t } from '../../translations';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  ArrowLeft,
  Search,
  MapPin,
  Clock,
  Phone,
  Navigation,
  CheckCircle,
} from 'lucide-react';

export default function FacilityFinder() {
  const { language, setCurrentScreen, setBookingData } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [district, setDistrict] = useState('');
  const [sector, setSector] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [openNow, setOpenNow] = useState(false);

  const facilities = [
    {
      id: 1,
      name: 'Kigali University Teaching Hospital',
      district: 'Nyarugenge',
      sector: 'Nyarugenge',
      phone: '+250 788 123 456',
      hours: '24/7',
      distance: '2.5 km',
      services: ['General Medicine', 'Surgery', 'Laboratory', 'Emergency'],
      isOpen: true,
      latitude: -1.9536,
      longitude: 30.0606,
    },
    {
      id: 2,
      name: 'King Faisal Hospital',
      district: 'Gasabo',
      sector: 'Kacyiru',
      phone: '+250 788 234 567',
      hours: '24/7',
      distance: '3.8 km',
      services: ['Cardiology', 'Pediatrics', 'Laboratory', 'Radiology'],
      isOpen: true,
      latitude: -1.9442,
      longitude: 30.0946,
    },
    {
      id: 3,
      name: 'Kibagabaga District Hospital',
      district: 'Gasabo',
      sector: 'Remera',
      phone: '+250 788 345 678',
      hours: 'Mon-Fri: 7AM-5PM',
      distance: '5.2 km',
      services: ['General Medicine', 'Maternity', 'Laboratory'],
      isOpen: false,
      latitude: -1.9381,
      longitude: 30.1078,
    },
  ];

  const handleSelectFacility = (facility: typeof facilities[0]) => {
    setBookingData({ facility });
    setCurrentScreen('appointment-booking');
  };

  const openInMaps = (facility: typeof facilities[0]) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${facility.latitude},${facility.longitude}`;
    window.open(url, '_blank');
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
          {t('searchFacilities', language)}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en' 
            ? 'Find healthcare facilities near you' 
            : 'Shakisha ibigo by\'ubuzima hafi yawe'}
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'en' ? 'Search by name or location' : 'Shakisha izina cyangwa ahantu'}
            className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-2 gap-3">
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="h-11 rounded-xl border-gray-300 dark:border-gray-600">
              <SelectValue placeholder={t('district', language)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nyarugenge">Nyarugenge</SelectItem>
              <SelectItem value="gasabo">Gasabo</SelectItem>
              <SelectItem value="kicukiro">Kicukiro</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger className="h-11 rounded-xl border-gray-300 dark:border-gray-600">
              <SelectValue placeholder={t('sector', language)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nyarugenge">Nyarugenge</SelectItem>
              <SelectItem value="kacyiru">Kacyiru</SelectItem>
              <SelectItem value="remera">Remera</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Select value={serviceType} onValueChange={setServiceType}>
          <SelectTrigger className="h-11 rounded-xl border-gray-300 dark:border-gray-600">
            <SelectValue placeholder={t('serviceType', language)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">{language === 'en' ? 'General Medicine' : 'Ubuvuzi rusange'}</SelectItem>
            <SelectItem value="surgery">{language === 'en' ? 'Surgery' : 'Kubaga'}</SelectItem>
            <SelectItem value="pediatrics">{language === 'en' ? 'Pediatrics' : 'Abana'}</SelectItem>
            <SelectItem value="lab">{language === 'en' ? 'Laboratory' : 'Laboratwari'}</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant={openNow ? 'default' : 'outline'}
          onClick={() => setOpenNow(!openNow)}
          className="w-full h-11 rounded-xl"
        >
          <CheckCircle className={`w-4 h-4 mr-2 ${openNow ? 'fill-current' : ''}`} />
          {t('openNow', language)}
        </Button>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {language === 'en' ? `${facilities.length} facilities found` : `Ibigo ${facilities.length} byaboneka`}
        </p>

        {facilities.map((facility) => (
          <Card key={facility.id} className="p-5 border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-gray-100 mb-1">
                  {facility.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{facility.sector}, {facility.district}</span>
                </div>
              </div>
              {facility.isOpen && (
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0">
                  {language === 'en' ? 'Open' : 'Birafunguye'}
                </Badge>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span>{facility.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{facility.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Navigation className="w-4 h-4" />
                <span>{facility.distance} {language === 'en' ? 'away' : 'kure'}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {facility.services.slice(0, 3).map((service, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400 border-0"
                >
                  {service}
                </Badge>
              ))}
              {facility.services.length > 3 && (
                <Badge variant="secondary" className="border-0">
                  +{facility.services.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => handleSelectFacility(facility)}
                className="flex-1 h-10 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
              >
                {language === 'en' ? 'Book Appointment' : 'Shiraho gahunda'}
              </Button>
              <Button
                variant="outline"
                onClick={() => openInMaps(facility)}
                className="h-10 px-3 rounded-lg border-gray-300 dark:border-gray-600"
              >
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}