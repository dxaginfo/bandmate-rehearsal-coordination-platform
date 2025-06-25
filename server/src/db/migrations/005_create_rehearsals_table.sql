CREATE TABLE rehearsals (
  id UUID PRIMARY KEY,
  band_id UUID REFERENCES bands(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES venues(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled',
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_rehearsals_band_id ON rehearsals(band_id);
CREATE INDEX idx_rehearsals_start_time ON rehearsals(start_time);
