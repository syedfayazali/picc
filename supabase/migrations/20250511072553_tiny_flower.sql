/*
  # Add photo_url column to profiles table

  1. Changes
    - Add photo_url column to profiles table with text data type
    - Set default value to placeholder image URL
    - Make column nullable

  2. Security
    - No changes to RLS policies needed as existing policies cover the new column
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'photo_url'
  ) THEN
    ALTER TABLE profiles 
    ADD COLUMN photo_url text DEFAULT 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300';
  END IF;
END $$;