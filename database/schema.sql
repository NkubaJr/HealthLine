CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,       -- patient, doctor, lab_tech, front_desk, admin
    phone VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    wants_email BOOLEAN DEFAULT TRUE,
    wants_sms BOOLEAN DEFAULT TRUE
);

CREATE TABLE facilities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    district VARCHAR(100),
    address VARCHAR(255),
    latitude VARCHAR(50),
    longitude VARCHAR(50)
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    facility_id INTEGER REFERENCES facilities(id) ON DELETE SET NULL,
    specialization VARCHAR(100)
);

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES doctors(id) ON DELETE SET NULL,
    facility_id INTEGER REFERENCES facilities(id) ON DELETE SET NULL,
    datetime TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'booked',  -- booked, checked_in, completed, cancelled
    reason TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE lab_results (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER REFERENCES appointments(id) ON DELETE CASCADE,
    report TEXT NOT NULL,
    file_url TEXT,
    access_token VARCHAR(64),         -- one-time link token
    token_expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE otp_codes (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(50) NOT NULL,
    code VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE
);
