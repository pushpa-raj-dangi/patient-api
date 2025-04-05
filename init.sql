-- Create Caregivers Table
CREATE TABLE IF NOT EXISTS caregivers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Create Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  patient_id INT NOT NULL,
  caregiver_id INT NOT NULL REFERENCES caregivers(id),
  time TIMESTAMP NOT NULL
);

-- 🔍 Add Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_caregiver_id ON appointments(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_appointments_time ON appointments(time);

-- Seed 3 caregivers
INSERT INTO caregivers (name) VALUES
  ('Dr. Alice'),
  ('Dr. Bob'),
  ('Dr. Charlie');

-- Seed 10 appointments for patient ID = 1
INSERT INTO appointments (patient_id, caregiver_id, time) VALUES
  (1, 1, NOW() + INTERVAL '1 day'),
  (1, 2, NOW() + INTERVAL '2 days'),
  (1, 3, NOW() + INTERVAL '3 days'),
  (1, 1, NOW() + INTERVAL '4 days'),
  (1, 2, NOW() + INTERVAL '5 days'),
  (1, 3, NOW() + INTERVAL '6 days'),
  (1, 1, NOW() + INTERVAL '7 days'),
  (1, 2, NOW() + INTERVAL '8 days'),
  (1, 3, NOW() + INTERVAL '9 days'),
  (1, 1, NOW() + INTERVAL '10 days');
