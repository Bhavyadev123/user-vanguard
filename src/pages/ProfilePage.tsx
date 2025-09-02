import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { loadFromLocalStorage } from '@/store/slices/profileSlice';
import ProfileDisplay from '@/components/ProfileDisplay';
import Navigation from '@/components/Navigation';

const ProfilePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ProfileDisplay />
    </div>
  );
};

export default ProfilePage;