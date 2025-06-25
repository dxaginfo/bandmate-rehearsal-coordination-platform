CREATE TABLE availability (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rehearsal_id UUID REFERENCES rehearsals(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL,
  response_time TIMESTAMP NOT NULL,
  notes TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  UNIQUE(user_id, rehearsal_id)
);

CREATE INDEX idx_availability_user_id ON availability(user_id);
CREATE INDEX idx_availability_rehearsal_id ON availability(rehearsal_id);
