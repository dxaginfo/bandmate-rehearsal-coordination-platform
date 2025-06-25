CREATE TABLE songs (
  id UUID PRIMARY KEY,
  band_id UUID REFERENCES bands(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255),
  duration INTEGER,
  key VARCHAR(10),
  tempo INTEGER,
  notes TEXT,
  resources_url JSONB,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_songs_band_id ON songs(band_id);
CREATE INDEX idx_songs_title ON songs(title);
