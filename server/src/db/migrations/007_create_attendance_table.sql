CREATE TABLE attendance (
  id UUID PRIMARY KEY,
  rehearsal_id UUID REFERENCES rehearsals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL,
  check_in_time TIMESTAMP,
  check_out_time TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  UNIQUE(rehearsal_id, user_id)
);

CREATE INDEX idx_attendance_rehearsal_id ON attendance(rehearsal_id);
CREATE INDEX idx_attendance_user_id ON attendance(user_id);
