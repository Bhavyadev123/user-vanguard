import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { loadFromLocalStorage } from '@/store/slices/profileSlice';
import ProfileForm from '@/components/ProfileForm';
import Navigation from '@/components/Navigation';

const ProfileFormPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ProfileForm editMode={isEditMode} />
    </div>
  );
};

export default ProfileFormPage;