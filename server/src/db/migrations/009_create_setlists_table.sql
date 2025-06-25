CREATE TABLE setlists (
  id UUID PRIMARY KEY,
  rehearsal_id UUID REFERENCES rehearsals(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_setlists_rehearsal_id ON setlists(rehearsal_id);
