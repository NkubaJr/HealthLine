# HealthLine Rwanda

A comprehensive healthcare appointment booking system for Rwanda, featuring mobile-first design, multilingual support (English/Kinyarwanda), and role-based interfaces for patients, doctors, lab technicians, and front desk staff.

## Features

### Multi-Role Support
- **Patient Interface**: Book appointments, find healthcare facilities, view lab results, manage profile
- **Doctor Dashboard**: View daily schedule, manage appointments, check-in patients, add notes
- **Lab Technician Dashboard**: Upload lab results, manage pending tests, view history
- **Front Desk Dashboard**: Check-in patients, manage queue, create walk-in appointments

### Core Functionality
- ✅ **Appointment Booking**: Search facilities, select providers, choose time slots
- ✅ **Facility Finder**: Filter by district, sector, service type, and availability
- ✅ **Lab Results**: View and download test results with status indicators
- ✅ **SMS Notifications**: Automated reminders and confirmations
- ✅ **Queue Management**: Real-time patient check-in and queue tracking
- ✅ **Profile Management**: Update personal information and medical details

### User Experience
- 🌓 **Dark Mode**: Full dark mode support throughout the application
- 🌍 **Bilingual**: Seamless switching between English and Kinyarwanda
- 📱 **Mobile-First**: Optimized for mobile devices with responsive design
- 🎨 **Healthcare Theme**: Clean design with green/teal accent colors
- ♿ **Accessible**: Built with accessibility in mind

### Additional Features
- **USSD Support**: Feature phone access for patients without smartphones (see USSD_FLOW.md)
- **Walk-in Registration**: Front desk can register patients without prior appointments
- **Real-time Status Updates**: Track appointment and test result statuses
- **Multi-language Support**: English and Kinyarwanda throughout

## Technology Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **Date Handling**: React Day Picker (Calendar component)

## Project Structure

```
/
├── App.tsx                          # Main app with routing and context
├── translations.ts                  # English/Kinyarwanda translations
├── USSD_FLOW.md                    # USSD feature phone documentation
├── README.md                        # Project documentation
├── components/
│   ├── WelcomePage.tsx             # Landing page
│   ├── LoginPage.tsx               # Login with role selection
│   ├── SignupPage.tsx              # Patient registration
│   ├── patient/
│   │   ├── PatientDashboard.tsx    # Patient home screen
│   │   ├── FacilityFinder.tsx      # Search healthcare facilities
│   │   ├── AppointmentBooking.tsx  # Book appointments
│   │   ├── AppointmentConfirmation.tsx
│   │   ├── LabResults.tsx          # View test results
│   │   └── UpdateProfile.tsx       # Edit profile information
│   ├── doctor/
│   │   └── DoctorDashboard.tsx     # Doctor schedule and patients
│   ├── lab/
│   │   └── LabTechDashboard.tsx    # Lab result management
│   ├── frontdesk/
│   │   └── FrontDeskDashboard.tsx  # Check-in and queue
│   └── ui/                          # Shadcn UI components
└── styles/
    └── globals.css                  # Global styles and theme
```

## Getting Started

### Prerequisites
This is a React application built for Figma Make environment.

### Usage

1. **Welcome Screen**: Start at the landing page with options to login or signup
2. **Login**: Select your role (Patient, Doctor, Lab Tech, or Front Desk) and enter credentials
3. **Role-Based Access**: Navigate through role-specific features

### Demo Credentials

For testing purposes, you can login with any role:
- Select your desired role from the dropdown
- Enter any email/phone and password
- The system will route you to the appropriate dashboard

## User Roles & Workflows

### Patient Workflow
1. **Sign up** or **Log in**
2. **Dashboard**: View upcoming appointments and quick actions
3. **Find Facility**: Search by location and services
4. **Book Appointment**: Select provider, date, and time
5. **View Lab Results**: Check test results and status
6. **Update Profile**: Manage personal information

### Doctor Workflow
1. **Log in** as doctor
2. **View Schedule**: See today's appointments
3. **Check In Patients**: Mark patients as checked-in
4. **View Patient Details**: Add notes and complete consultations
5. **Mark Completed**: Update appointment status

### Lab Technician Workflow
1. **Log in** as lab technician
2. **Upload Results**: Select appointment, attach PDF, set status (normal/abnormal)
3. **View History**: Track uploaded results
4. **Manage Pending Tests**: See pending lab requests

### Front Desk Workflow
1. **Log in** as front desk staff
2. **View Queue**: Monitor patient check-in status
3. **Check In Patients**: Process patient arrivals
4. **Walk-In Registration**: Create appointments for walk-in patients
5. **View Today's Schedule**: Track all appointments

## Language Support

The application supports bilingual operation:

- **English**: Default language
- **Kinyarwanda**: Local language support

Toggle between languages using the globe icon in the header.

### Sample Translations

| English | Kinyarwanda |
|---------|-------------|
| Welcome to HealthLine Rwanda | Murakaza neza kuri HealthLine Rwanda |
| Book Appointment | Shiraho gahunda |
| Lab Results | Ibisubizo by'ibizamini |
| Healthcare Provider | Umuganga |
| Appointment Confirmed | Gahunda yemejwe |

## Dark Mode

Toggle dark mode using the moon/sun icon in the header. Dark mode is fully supported across all screens and components with proper contrast and accessibility.

## SMS Integration

The system includes SMS notification points for:
- ✉️ Appointment confirmation
- ⏰ 24-hour appointment reminders
- 📋 Lab results availability
- ❌ Appointment cancellations

## Database Schema

Based on the provided ERD, the system uses the following entities:
- **User**: Authentication and base user data
- **Patient**: Patient-specific information
- **Healthcare Facility**: Clinics and hospitals
- **Healthcare Provider**: Doctors and specialists
- **Appointment**: Booking records
- **Medical Record**: Health history
- **Notification**: SMS/email alerts
- **Queue**: Check-in management
- **Check-in**: Patient arrival tracking

## USSD Support

For patients without smartphones, a USSD interface (*123#) provides:
- Appointment booking
- View appointments
- Check lab results
- Help and support

See `USSD_FLOW.md` for complete USSD flow documentation.

## Future Enhancements

- [ ] Supabase backend integration for data persistence
- [ ] Real SMS gateway integration (Twilio, Africa's Talking)
- [ ] Payment integration (Mobile Money)
- [ ] Telemedicine video consultations
- [ ] Prescription management
- [ ] Health records history
- [ ] Analytics dashboard for administrators
- [ ] Multi-facility support for healthcare networks
- [ ] Emergency services integration

## Backend Integration Notes

To make this production-ready, integrate with Supabase for:

### Required Tables
- `users` - Authentication
- `patients` - Patient profiles
- `facilities` - Healthcare facilities
- `providers` - Healthcare providers (doctors)
- `appointments` - Appointment bookings
- `lab_results` - Test results
- `notifications` - SMS/email queue
- `queue` - Check-in queue management

### Required APIs
- SMS Gateway (e.g., Twilio, Africa's Talking)
- Payment Gateway (Mobile Money integration)
- USSD Gateway
- File Storage (for PDF lab results)

## Security Considerations

- Phone number verification for sensitive data access
- Role-based access control (RBAC)
- Secure authentication with password hashing
- Data encryption in transit and at rest
- HIPAA/GDPR compliance considerations
- Audit logging for all medical data access

## Support & Contact

- **Technical Support**: dev@healthline.rw
- **Patient Support**: Call 114
- **Business Inquiries**: info@healthline.rw

## License

© 2025 HealthLine Rwanda. All rights reserved.

---

**Built with ❤️ for Rwanda's healthcare system**
