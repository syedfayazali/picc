/*
  # Fresh Profile Schema Setup

  1. Changes
    - Drop and recreate profiles table with proper schema
    - Add RLS policies for secure access
    - Set up proper column types and defaults

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Drop existing profiles table if it exists
DROP TABLE IF EXISTS profiles;

-- Create fresh profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  designation text DEFAULT 'AFC Technician',
  mhi_id text,
  pic_id text,
  validity text,
  mobile text,
  photo_url text DEFAULT 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create storage bucket for profile photos if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('profile-photos', 'profile-photos')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on the storage bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create storage policy for authenticated users
CREATE POLICY "Authenticated users can upload profile photos"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);