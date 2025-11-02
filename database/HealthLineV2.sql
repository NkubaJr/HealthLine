PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;
CREATE TABLE User (
    user_id TEXT PRIMARY KEY, -- UUID recommended
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT UNIQUE,
    role TEXT NOT NULL CHECK(role IN ('Patient', 'Provider', 'Admin', 'FrontDesk', 'Kiosk')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Patient (
    patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender TEXT CHECK(gender IN ('Male','Female','Other')),
    address TEXT,
    national_id TEXT UNIQUE,
    blood_type TEXT CHECK(blood_type IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
CREATE TABLE Healthcare_Facility (
    facility_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT UNIQUE,
    latitude REAL,
    longitude REAL,
    operating_hours TEXT
);
CREATE TABLE Healthcare_Provider (
    provider_id INTEGER PRIMARY KEY AUTOINCREMENT,
    facility_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    licence_number TEXT UNIQUE NOT NULL,
    is_available INTEGER DEFAULT 1 CHECK(is_available IN (0,1)),
    FOREIGN KEY (facility_id) REFERENCES Healthcare_Facility(facility_id)
);
CREATE TABLE Appointment (
    appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    provider_id INTEGER NOT NULL,
    facility_id INTEGER NOT NULL,
    appointment_date TIMESTAMP NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Scheduled','Completed','Cancelled')),
    type TEXT NOT NULL,
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (provider_id) REFERENCES Healthcare_Provider(provider_id),
    FOREIGN KEY (facility_id) REFERENCES Healthcare_Facility(facility_id)
);
CREATE TABLE Queue (
    queue_id INTEGER PRIMARY KEY AUTOINCREMENT,
    appointment_id INTEGER NOT NULL UNIQUE,
    position INTEGER NOT NULL CHECK(position > 0),
    status TEXT NOT NULL CHECK(status IN ('Waiting','InProgress','Completed','Cancelled')),
    join_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estimated_time TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id)
);
CREATE TABLE Check_In (
    checkin_id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    appointment_id INTEGER NOT NULL,
    checkin_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    method TEXT CHECK(method IN ('Kiosk','FrontDesk','Online')),
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id)
);
CREATE TABLE Notification (
    notification_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read INTEGER DEFAULT 0 CHECK(is_read IN (0,1)),
    channel TEXT CHECK(channel IN ('Email','SMS','App')),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
CREATE TABLE Medical_Record (
    record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    diagnosis TEXT NOT NULL,
    prescription TEXT,
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
);
DELETE FROM sqlite_sequence;
COMMIT;
