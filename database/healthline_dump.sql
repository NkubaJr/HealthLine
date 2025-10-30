PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "User" (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('Admin', 'Doctor', 'Patient')),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "Patient" (
    patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    age INTEGER CHECK(age >= 0 AND age < 120),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_of_birth DATE,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
CREATE TABLE IF NOT EXISTS "Doctor" (
    doctor_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    age INTEGER CHECK(age >= 21 AND age < 100),
    specialisation TEXT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
CREATE TABLE IF NOT EXISTS "Appointment" (
    appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    appointment_date TIMESTAMP NOT NULL,
    appointment_time TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Scheduled', 'Completed', 'Cancelled')),
    reason_for_visit TEXT NOT NULL,
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);
CREATE TABLE IF NOT EXISTS "LabResults" (
    results_id INTEGER PRIMARY KEY AUTOINCREMENT,
    appointment_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    lab_test TEXT NOT NULL,
    report TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('User',0);
INSERT INTO sqlite_sequence VALUES('Patient',0);
INSERT INTO sqlite_sequence VALUES('Doctor',0);
INSERT INTO sqlite_sequence VALUES('Appointment',0);
INSERT INTO sqlite_sequence VALUES('LabResults',0);
COMMIT;
