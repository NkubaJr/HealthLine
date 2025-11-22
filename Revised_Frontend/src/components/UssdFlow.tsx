import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, Phone, Calendar, MapPin, CheckCircle } from 'lucide-react';

export default function UssdFlowVisualization() {
  const steps = [
    {
      step: 1,
      icon: <Phone className="w-6 h-6" />,
      title: 'Dial USSD Code',
      description: 'Dial *123# on your phone',
      action: '*123#',
      color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
    },
    {
      step: 2,
      icon: <Calendar className="w-6 h-6" />,
      title: 'Select Service',
      description: 'Choose 1) Book Appointment',
      action: 'Press 1',
      color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    },
    {
      step: 3,
      icon: <MapPin className="w-6 h-6" />,
      title: 'Choose Facility',
      description: 'Select healthcare facility',
      action: 'Select from list',
      color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    },
    {
      step: 4,
      icon: <Calendar className="w-6 h-6" />,
      title: 'Pick Date & Time',
      description: 'Select appointment date',
      action: 'Choose slot',
      color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    },
    {
      step: 5,
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Confirm',
      description: 'Receive SMS confirmation',
      action: 'Confirmed!',
      color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    },
  ];

  return (
    <div className="px-6 pb-8 max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-gray-900 dark:text-gray-100 mb-2">
          USSD Flow for Feature Phones
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Access HealthLine Rwanda services via USSD *123# without a smartphone
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.step} className="relative">
            <Card className="p-6 border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0">
                      Step {step.step}
                    </Badge>
                    <h3 className="text-gray-900 dark:text-gray-100">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {step.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {step.action}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
            
            {index < steps.length - 1 && (
              <div className="flex justify-center my-2">
                <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-600 rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>

      <Card className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="text-blue-900 dark:text-blue-100 mb-3">
          Available USSD Services
        </h3>
        <div className="space-y-2 text-sm text-blue-900 dark:text-blue-100">
          <div className="flex items-start gap-2">
            <span className="w-6">1.</span>
            <span>Book Appointment</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-6">2.</span>
            <span>View Upcoming Appointments</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-6">3.</span>
            <span>Find Nearest Health Facility</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-6">4.</span>
            <span>Check Lab Results Status</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
