import { useApp } from '../../App';
import { t } from '../../translations';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { ArrowLeft, FileText, Download, Search, CheckCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LabResults() {
  const { language, setCurrentScreen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<any>(null);

  const results = [
    {
      id: 1,
      testName: 'Complete Blood Count (CBC)',
      testDate: '2025-11-05',
      status: 'normal',
      facility: 'Kigali University Teaching Hospital',
      doctor: 'Dr. Uwase Marie',
      hasPDF: true,
    },
    {
      id: 2,
      testName: 'Blood Sugar Test',
      testDate: '2025-11-01',
      status: 'abnormal',
      facility: 'King Faisal Hospital',
      doctor: 'Dr. Nkurunziza Jean',
      hasPDF: true,
      notes: 'Follow-up recommended',
    },
    {
      id: 3,
      testName: 'Liver Function Test',
      testDate: '2025-10-28',
      status: 'normal',
      facility: 'Kibagabaga District Hospital',
      doctor: 'Dr. Mukamana Grace',
      hasPDF: true,
    },
    {
      id: 4,
      testName: 'Urinalysis',
      testDate: '2025-10-20',
      status: 'pending',
      facility: 'Kigali University Teaching Hospital',
      doctor: 'Dr. Uwase Marie',
      hasPDF: false,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'abnormal':
        return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      normal: {
        bg: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
        label: t('normal', language),
      },
      abnormal: {
        bg: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
        label: t('abnormal', language),
      },
      pending: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
        label: t('pending', language),
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.bg} border-0`}>
        {config.label}
      </Badge>
    );
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
          {t('labResults', language)}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en' 
            ? 'View and download your lab test results' 
            : 'Reba kandi upakurure ibisubizo by\'ibizamini'}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === 'en' ? 'Search by test name' : 'Shakisha izina ry\'ikizamini'}
          className="pl-11 h-12 rounded-xl border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.map((result) => (
          <Card key={result.id} className="p-5 border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-gray-900 dark:text-gray-100">
                    {result.testName}
                  </h3>
                  {getStatusIcon(result.status)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {new Date(result.testDate).toLocaleDateString(language === 'en' ? 'en-US' : 'rw-RW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {getStatusBadge(result.status)}
              </div>
            </div>

            <div className="space-y-2 mb-4 pl-16">
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {t('facility', language)}:{' '}
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {result.facility}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {t('provider', language)}:{' '}
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {result.doctor}
                </span>
              </div>
              {result.notes && (
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {t('notes', language)}:{' '}
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {result.notes}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pl-16">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 rounded-lg border-gray-300 dark:border-gray-600"
                disabled={!result.hasPDF}
                onClick={() => setSelectedResult(result)}
              >
                {t('viewResult', language)}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-gray-300 dark:border-gray-600"
                disabled={!result.hasPDF}
                onClick={() => toast.success('Download started')}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          {language === 'en'
            ? 'Lab results are typically available within 24-48 hours. You will receive an SMS notification when new results are ready.'
            : 'Ibisubizo by\'ibizamini bisanzwe biraboneka mu masaha 24-48. Uzabona ubutumwa bwa SMS iyo ibisubizo bishya biteguwe.'}
        </p>
      </Card>

      {/* View Result Dialog */}
      <Dialog open={selectedResult !== null} onOpenChange={() => setSelectedResult(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedResult ? selectedResult.testName : 'Lab Result'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-gray-900 dark:text-gray-100">
                    {selectedResult ? selectedResult.testName : 'Test Name'}
                  </h3>
                  {selectedResult ? getStatusIcon(selectedResult.status) : null}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {selectedResult ? new Date(selectedResult.testDate).toLocaleDateString(language === 'en' ? 'en-US' : 'rw-RW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }) : 'Test Date'}
                </p>
                {selectedResult ? getStatusBadge(selectedResult.status) : null}
              </div>
            </div>

            <div className="space-y-2 mb-4 pl-16">
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {t('facility', language)}:{' '}
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {selectedResult ? selectedResult.facility : 'Facility'}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {t('provider', language)}:{' '}
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {selectedResult ? selectedResult.doctor : 'Provider'}
                </span>
              </div>
              {selectedResult && selectedResult.notes && (
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {t('notes', language)}:{' '}
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {selectedResult.notes}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pl-16">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 rounded-lg border-gray-300 dark:border-gray-600"
                disabled={!selectedResult?.hasPDF}
                onClick={() => toast.success('Download started')}
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-gray-300 dark:border-gray-600"
                disabled={!selectedResult?.hasPDF}
                onClick={() => toast.success('Download started')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}