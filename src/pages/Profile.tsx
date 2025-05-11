import React, { useState, useEffect, useRef } from 'react';
import { UserCircle, Camera, Calendar, Phone, Badge, Building2, Save, Edit2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import InfoCard from '../components/InfoCard';

interface ProfileData {
  id?: string;
  name: string;
  designation: string;
  mhi_id: string;
  pic_id: string;
  validity: string;
  mobile: string;
  photo_url: string;
}

const defaultProfile: ProfileData = {
  name: '',
  designation: 'AFC Technician',
  mhi_id: '',
  pic_id: '',
  validity: '',
  mobile: '',
  photo_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'
};

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to view your profile');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        if (error.message === 'JSON object requested, multiple (or no) rows returned') {
          // Create new profile if none exists
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{ 
              id: user.id,
              ...defaultProfile
            }]);

          if (insertError) throw insertError;
          setProfile(defaultProfile);
          toast.success('New profile created');
        } else {
          throw error;
        }
      } else if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const handlePhotoClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(filePath);

      setProfile({ ...profile, photo_url: publicUrl });
      toast.success('Profile photo updated');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date()
        });

      if (error) throw error;

      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ProfileData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <InfoCard 
        title="Profile" 
        icon={<UserCircle className="h-5 w-5" />}
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={loading}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg p-6 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <img
                src={profile.photo_url}
                alt={profile.name || 'Profile Photo'}
                className={`w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg ${isEditing ? 'cursor-pointer hover:opacity-80' : ''}`}
                onClick={handlePhotoClick}
              />
              {isEditing && (
                <>
                  <button 
                    className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
                    onClick={handlePhotoClick}
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-blue-200">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={handleChange('name')}
                      className="mt-1 block w-full px-3 py-2 bg-blue-700 border border-blue-600 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <p className="text-xl font-semibold">{profile.name || 'Not set'}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-blue-200">
                      <Building2 className="h-4 w-4 inline mr-1" />
                      Designation
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.designation}
                        onChange={handleChange('designation')}
                        className="mt-1 block w-full px-3 py-2 bg-blue-700 border border-blue-600 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter designation"
                      />
                    ) : (
                      <p className="font-medium">{profile.designation || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-blue-200">
                      <Badge className="h-4 w-4 inline mr-1" />
                      MHI ID
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.mhi_id}
                        onChange={handleChange('mhi_id')}
                        className="mt-1 block w-full px-3 py-2 bg-blue-700 border border-blue-600 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter MHI ID"
                      />
                    ) : (
                      <p className="font-medium">{profile.mhi_id || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-blue-200">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Validity
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.validity}
                        onChange={handleChange('validity')}
                        className="mt-1 block w-full px-3 py-2 bg-blue-700 border border-blue-600 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 26 MAR 2026"
                      />
                    ) : (
                      <p className="font-medium">{profile.validity || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-blue-200">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Mobile
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profile.mobile}
                        onChange={handleChange('mobile')}
                        className="mt-1 block w-full px-3 py-2 bg-blue-700 border border-blue-600 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter mobile number"
                      />
                    ) : (
                      <p className="font-medium">{profile.mobile || 'Not set'}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-700">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <label className="block text-sm text-blue-200">PIC ID</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.pic_id}
                        onChange={handleChange('pic_id')}
                        className="mt-1 block w-full px-3 py-2 bg-blue-700 border border-blue-600 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter PIC ID"
                      />
                    ) : (
                      <p className="font-medium">{profile.pic_id || 'Not set'}</p>
                    )}
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-xs text-blue-300">MITSUBISHI HEAVY INDUSTRIES</p>
                    <p className="text-xs text-blue-300 mt-1">This is a digital identity card</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InfoCard>
    </div>
  );
};

export default Profile;