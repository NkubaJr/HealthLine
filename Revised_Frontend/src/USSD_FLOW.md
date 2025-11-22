# HealthLine Rwanda - USSD Flow Documentation

## Overview
This document outlines the USSD flow for HealthLine Rwanda, designed for patients who do not have smartphones. The USSD service allows basic appointment booking and information retrieval using feature phones.

## USSD Code
**Access Code:** `*123#`

---

## Main Menu Flow

### Level 1: Main Menu
```
*123#

Welcome to HealthLine Rwanda / Murakaza neza kuri HealthLine Rwanda

1. Book Appointment / Shiraho gahunda
2. My Appointments / Gahunda zanjye
3. Lab Results / Ibisubizo by'ibizamini
4. Help / Ubufasha
```

---

## 1. Book Appointment Flow

### Step 1: Select District
```
Book Appointment

Select District / Hitamo akarere:
1. Nyarugenge
2. Gasabo
3. Kicukiro
4. Back / Subira inyuma
```

### Step 2: Select Healthcare Facility
```
Select Healthcare Facility / Hitamo ikigo cy'ubuzima:

District: Gasabo

1. King Faisal Hospital
2. Kibagabaga Hospital
3. Kacyiru Health Center
4. Back / Subira inyuma
```

### Step 3: Select Provider
```
Select Healthcare Provider / Hitamo umuganga:

Facility: King Faisal Hospital

1. Dr. Uwase Marie - General Medicine
2. Dr. Nkurunziza Jean - Cardiology
3. Dr. Mukamana Grace - Pediatrics
4. Back / Subira inyuma
```

### Step 4: Select Date
```
Select Appointment Date / Hitamo itariki:

1. Today - Nov 9, 2025
2. Tomorrow - Nov 10, 2025
3. Nov 11, 2025
4. Nov 12, 2025
5. Back / Subira inyuma
```

### Step 5: Select Time
```
Select Time / Hitamo igihe:

Date: Nov 10, 2025

1. 08:00 AM
2. 09:00 AM
3. 10:00 AM
4. 11:00 AM
5. 02:00 PM
6. 03:00 PM
7. Back / Subira inyuma
```

### Step 6: Confirm Booking
```
Confirm Appointment / Emeza gahunda:

Facility: King Faisal Hospital
Provider: Dr. Uwase Marie
Date: Nov 10, 2025
Time: 10:00 AM

1. Confirm / Emeza
2. Cancel / Hagarika
```

### Step 7: Confirmation
```
SUCCESS!

Your appointment has been booked.
Gahunda yawe yemejwe.

Reference: APT-12345

You will receive an SMS confirmation.
Uzabona ubutumwa bwa SMS.

SMS reminder will be sent 24 hours before your appointment.
Ibutsa rizohererezwa amasaha 24 mbere y'uko ubonana n'umuganga.

Thank you!
Murakoze!
```

---

## 2. My Appointments Flow

### Step 1: Authentication
```
My Appointments / Gahunda zanjye

Enter your phone number:
Injiza nimero ya telefoni:

(User enters phone number)
```

### Step 2: View Appointments
```
Your Appointments:

1. Nov 10, 2025 - 10:00 AM
   Dr. Uwase Marie
   King Faisal Hospital
   
2. Nov 15, 2025 - 02:00 PM
   Dr. Mukamana Grace
   Kibagabaga Hospital

0. Back / Subira inyuma
```

### Step 3: Appointment Details
```
Appointment Details:

Date: Nov 10, 2025
Time: 10:00 AM
Provider: Dr. Uwase Marie
Facility: King Faisal Hospital
Reference: APT-12345

1. Cancel Appointment / Hagarika gahunda
2. Back / Subira inyuma
```

---

## 3. Lab Results Flow

### Step 1: Authentication
```
Lab Results / Ibisubizo by'ibizamini

Enter your phone number:
Injiza nimero ya telefoni:

(User enters phone number)
```

### Step 2: View Results List
```
Your Lab Results:

1. Nov 5, 2025 - Blood Test
   Status: Normal / Bisanzwe
   
2. Nov 1, 2025 - Sugar Test
   Status: Abnormal / Ntabwo bisanzwe

0. Back / Subira inyuma
```

### Step 3: Result Details
```
Lab Result Details:

Test: Complete Blood Count
Date: Nov 5, 2025
Status: Normal / Bisanzwe
Facility: King Faisal Hospital

A detailed report will be sent to your phone via SMS.
Raporo irambuye izohererezwa kuri telefoni yawe hakoreshejwe SMS.

0. Back / Subira inyuma
```

---

## 4. Help Flow

```
Help / Ubufasha

For assistance, please contact:

Call Center: 114
WhatsApp: +250 788 000 000
Email: support@healthline.rw

Operating Hours / Amasaha:
Mon-Fri: 7AM - 5PM
Sat: 8AM - 12PM
Sun: Closed / Yarafunze

0. Back / Subira inyuma
```

---

## Technical Implementation Notes

### Session Management
- Each USSD session is tracked with a unique session ID
- Session timeout: 60 seconds
- User can navigate back using "0" or specific back options

### Data Storage
- User selections are temporarily stored during the session
- Final booking data is saved to the database upon confirmation
- User phone number is used as the primary identifier

### SMS Integration
- Confirmation SMS sent immediately after booking
- Reminder SMS sent 24 hours before appointment
- Lab results summary sent via SMS when available

### Language Support
- Default language: English
- Alternative: Kinyarwanda
- Language can be selected at the start of each session or defaulted based on previous preference

### Error Handling
```
Error Messages:

1. Invalid Input:
   "Invalid selection. Please try again."
   "Ihitamo ritemewe. Ongera ugerageze."

2. No Available Slots:
   "No slots available for selected date. Please choose another date."
   "Nta bihe bihari kuri iyi tariki. Hitamo indi tariki."

3. Network Error:
   "Service temporarily unavailable. Please try again later."
   "Serivisi idahari ubungubu. Ongera nyuma."

4. Session Timeout:
   "Session expired. Please dial *123# again."
   "Igihe cyarangiye. Onger ukanda *123#."
```

### Security Considerations
- Phone number verification required for viewing appointments and lab results
- Optional PIN/OTP for sensitive operations
- Session data cleared after completion or timeout
- Encrypted data transmission

---

## Integration Points

### Database Tables Used
- **User**: Authenticate by phone number
- **Healthcare Facility**: List available facilities
- **Healthcare Provider**: List available providers
- **Appointment**: Create and retrieve appointments
- **Medical Record**: Retrieve lab results
- **Notification**: Send SMS confirmations

### External Services
- **SMS Gateway**: For sending confirmations and reminders
- **USSD Gateway**: For handling USSD requests and responses
- **Database**: For storing and retrieving data

---

## Future Enhancements

1. **Payment Integration**: Allow users to pay for services via mobile money
2. **Prescription Refills**: Request prescription refills via USSD
3. **Telemedicine**: Schedule virtual consultations
4. **Emergency Services**: Quick access to emergency contacts
5. **Health Tips**: Daily health tips and reminders
6. **Multilingual Support**: Add French and other local languages

---

## Testing Scenarios

### Test Case 1: Successful Appointment Booking
1. Dial *123#
2. Select "1" (Book Appointment)
3. Select district
4. Select facility
5. Select provider
6. Select date
7. Select time
8. Confirm
9. Verify SMS received

### Test Case 2: View Existing Appointments
1. Dial *123#
2. Select "2" (My Appointments)
3. Enter phone number
4. View list of appointments
5. Select appointment
6. View details

### Test Case 3: Cancel Appointment
1. Follow Test Case 2 steps 1-6
2. Select "1" (Cancel Appointment)
3. Confirm cancellation
4. Verify cancellation SMS

### Test Case 4: View Lab Results
1. Dial *123#
2. Select "3" (Lab Results)
3. Enter phone number
4. View results list
5. Select result
6. View details

---

## Contact & Support

For technical support or questions about the USSD service:
- **Developer Support**: dev@healthline.rw
- **Business Inquiries**: info@healthline.rw
- **Emergency Support**: +250 788 000 000

---

**Document Version:** 1.0  
**Last Updated:** November 9, 2025  
**Maintained By:** HealthLine Rwanda Development Team
