import { useState } from 'react';
import { useApp } from '../../App';
import { t } from '../../translations';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LogOut, Upload, FileText, CheckCircle, AlertCircle, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function LabTechDashboard() {
  const { language, setCurrentScreen, setUserRole } = useApp();
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [resultFlag, setResultFlag] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const pendingTests = [
    {
      id: 1,
      appointmentId: 'A001',
      patientName: 'John Doe',
      testType: 'Complete Blood Count',
      requestDate: '2025-11-09',
      doctor: 'Dr. Uwase Marie',
    },
    {
      id: 2,
      appointmentId: 'A002',
      testType: 'Blood Sugar Test',
      patientName: 'Jane Uwase',
      requestDate: '2025-11-09',
      doctor: 'Dr. Nkurunziza Jean',
    },
    {
      id: 3,
      appointmentId: 'A003',
      testType: 'Liver Function Test',
      patientName: 'Pierre Nkurunziza',
      requestDate: '2025-11-08',
      doctor: 'Dr. Mukamana Grace',
    },
  ];

  const uploadedResults = [
    {
      id: 1,
      appointmentId: 'A005',
      patientName: 'Marie Mukamana',
      testType: 'Complete Blood Count',
      uploadDate: '2025-11-08',
      status: 'normal',
    },
    {
      id: 2,
      appointmentId: 'A006',
      patientName: 'Claude Habimana',
      testType: 'Blood Sugar Test',
      uploadDate: '2025-11-07',
      status: 'abnormal',
    },
  ];

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointment || !resultFlag) {
      toast.error(language === 'en' ? 'Please fill all fields' : 'Uzuza ibisabwa byose');
      return;
    }
    toast.success(language === 'en' ? 'Results uploaded successfully!' : 'Ibisubizo byohererejwe neza!');
    setSelectedAppointment('');
    setResultFlag('');
    setFile(null);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentScreen('welcome');
  };

  return (
    <div className="px-6 pb-8 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-gray-900 dark:text-gray-100 mb-1">
          {language === 'en' ? 'Laboratory Dashboard' : 'Ikibanza cya Laboratwari'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en' ? 'Manage lab test results' : 'Kuyobora ibisubizo by\'ibizamini'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 border-gray-200 dark:border-gray-700">
          <div className="text-2xl text-yellow-600 dark:text-yellow-400 mb-1">
            {pendingTests.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'Pending Tests' : 'Ibizamini bitegereza'}
          </div>
        </Card>
        <Card className="p-4 border-gray-200 dark:border-gray-700">
          <div className="text-2xl text-green-600 dark:text-green-400 mb-1">
            {uploadedResults.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'Completed Today' : 'Byarangiye uyu munsi'}
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 h-12 rounded-xl">
          <TabsTrigger value="upload" className="rounded-lg">
            <Upload className="w-4 h-4 mr-2" />
            {t('uploadResults', language)}
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg">
            <FileText className="w-4 h-4 mr-2" />
            {t('resultsHistory', language)}
          </TabsTrigger>
        </TabsList>

        {/* Upload Results Tab */}
        <TabsContent value="upload">
          <form onSubmit={handleUpload} className="space-y-5">
            {/* Select Appointment */}
            <div>
              <Label className="text-gray-900 dark:text-gray-100 mb-2 block">
                {t('selectAppointment', language)}
              </Label>
              <Select value={selectedAppointment} onValueChange={setSelectedAppointment}>
                <SelectTrigger className="h-12 rounded-xl border-gray-300 dark:border-gray-600">
                  <SelectValue placeholder={language === 'en' ? 'Choose appointment' : 'Hitamo gahunda'} />
                </SelectTrigger>
                <SelectContent>
                  {pendingTests.map((test) => (
                    <SelectItem key={test.id} value={test.appointmentId}>
                      <div>
                        <div>{test.patientName} - {test.testType}</div>
                        <div className="text-xs text-gray-500">{test.appointmentId}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Result Flag */}
            <div>
              <Label className="text-gray-900 dark:text-gray-100 mb-2 block">
                {t('resultFlag', language)}
              </Label>
              <Select value={resultFlag} onValueChange={setResultFlag}>
                <SelectTrigger className="h-12 rounded-xl border-gray-300 dark:border-gray-600">
                  <SelectValue placeholder={language === 'en' ? 'Select result status' : 'Hitamo uko bimeze'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{t('normal', language)}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="abnormal">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span>{t('abnormal', language)}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* File Upload */}
            <div>
              <Label htmlFor="file" className="text-gray-900 dark:text-gray-100 mb-2 block">
                {t('attachFile', language)}
              </Label>
              <div className="relative">
                <Input
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="h-12 rounded-xl border-gray-300 dark:border-gray-600"
                />
              </div>
              {file && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {file.name}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
            >
              <Upload className="w-4 h-4 mr-2" />
              {t('upload', language)}
            </Button>
          </form>

          {/* Pending Tests List */}
          <div className="mt-6">
            <h3 className="text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Pending Tests' : 'Ibizamini bitegereza'}
            </h3>
            <div className="space-y-3">
              {pendingTests.map((test) => (
                <Card key={test.id} className="p-4 border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-gray-900 dark:text-gray-100 mb-1">
                        {test.patientName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {test.testType}
                      </p>
                    </div>
                    <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-0">
                      {language === 'en' ? 'Pending' : 'Birategereza'}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {test.appointmentId} • {test.requestDate}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? 'Search by patient name' : 'Shakisha izina ry\'umurwayi'}
              className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Uploaded Results */}
          <div className="space-y-4">
            {uploadedResults.map((result) => (
              <Card key={result.id} className="p-4 border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-gray-900 dark:text-gray-100 mb-1">
                      {result.patientName}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {result.testType}
                    </p>
                  </div>
                  <Badge
                    className={
                      result.status === 'normal'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-0'
                    }
                  >
                    {result.status === 'normal' ? t('normal', language) : t('abnormal', language)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{result.appointmentId}</span>
                  <span>{result.uploadDate}</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full h-12 rounded-xl border-gray-300 dark:border-gray-600 mt-6"
      >
        <LogOut className="w-4 h-4 mr-2" />
        {t('logout', language)}
      </Button>
    </div>
  );
}
