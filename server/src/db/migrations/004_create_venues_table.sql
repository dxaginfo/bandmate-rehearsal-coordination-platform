CREATE TABLE venues (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  capacity INTEGER,
  amenities JSONB,
  contact_info JSONB,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_venues_name ON venues(name);
