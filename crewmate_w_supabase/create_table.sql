-- Run this in Supabase SQL Editor to create the required table

CREATE TABLE IF NOT EXISTS crewmates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  speed INTEGER DEFAULT 1,
  color TEXT DEFAULT 'red',
  role TEXT DEFAULT 'crew',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
); 