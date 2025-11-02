HealthLine Booking system

## Database Design

The project uses a relational database for managing users, doctors, patients, appointments, and lab results.

- **ER Diagram:** [View ERD](database/healthline_erd.jpeg)
- **Database Schema:** [View Schema](database/HealthLineV2.sql)
- **Entity Relationship Documentation:** [View Documentation](database/Entity_Relationship_Documentation.pdf)


# **Entities Overview**

- **User:** Stores authentication details and manages user roles

- **Patient:** Represents an individual receiving healthcare services. Each patient is linked to a user account and can have multiple appointments, medical records, and check-ins.  

- **Healthcare Provider:** Represents doctors or medical staff working in a healthcare facility. Each provider is associated with one facility and can manage multiple appointments.  

- **Healthcare Facility:**  Represents hospitals or clinics registered in the system. Each facility can have multiple healthcare providers and appointments.  

- **Appointment:** Links patients, healthcare providers, and facilities. Each appointment contains scheduling details, status, and notes.  

- **Queue:** Tracks patient waiting order for appointments, including position and estimated time. Each appointment has one queue entry.  

- **Check-In:** Records when and how a patient checks in for an appointment. Linked to both the patient and the appointment.  

- **Notification:** Logs system alerts or messages sent to users (e.g., SMS or email). Each notification is tied to a user.  

- **Medical Record:** Stores patient visit details such as diagnosis, prescriptions, and notes. Each record is associated with a single patient.  


