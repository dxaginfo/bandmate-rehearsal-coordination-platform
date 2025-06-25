CREATE TABLE setlist_songs (
  id UUID PRIMARY KEY,
  setlist_id UUID REFERENCES setlists(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  UNIQUE(setlist_id, song_id)
);

CREATE INDEX idx_setlist_songs_setlist_id ON setlist_songs(setlist_id);
