import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProfile, deleteProfile, clearError } from '@/store/slices/profileSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { cardVariants } from '@/components/ui/card-variants';
import { buttonVariants } from '@/components/ui/button-variants';
import { Loader2, User, Mail, Calendar, Edit3, Trash2, UserX } from 'lucide-react';

const ProfileDisplay = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profile, loading, error } = useAppSelector((state) => state.profile);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Check localStorage first, then API
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      // Profile exists in localStorage, but we still try to fetch fresh data
      dispatch(fetchProfile());
    } else {
      dispatch(fetchProfile());
    }
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleEdit = () => {
    navigate('/profile-form?edit=true');
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteProfile()).unwrap();
      toast({
        title: 'Success!',
        description: 'Profile deleted successfully',
      });
      navigate('/');
    } catch (error) {
      // Error is handled by the reducer and toast
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
        <Card className={cn(cardVariants({ variant: "elevated", padding: "lg" }), "w-full max-w-md")}>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading your profile...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
        <Card className={cn(cardVariants({ variant: "elevated", padding: "lg" }), "w-full max-w-md")}>
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <UserX className="w-8 h-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">No Profile Found</CardTitle>
            <CardDescription>
              You haven't created a profile yet. Create one to get started!
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Button 
              onClick={() => navigate('/profile-form')}
              className={cn(buttonVariants({ variant: "hero", size: "lg" }), "w-full")}
            >
              Create Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <Card className={cn(cardVariants({ variant: "elevated", padding: "lg" }), "w-full max-w-md")}>
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <span className="text-2xl font-bold text-white">
              {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Your Profile
          </CardTitle>
          <CardDescription>
            Here are your profile details
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="font-semibold">{profile.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="font-semibold">{profile.email}</p>
              </div>
            </div>

            {profile.age && (
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Age</p>
                  <p className="font-semibold">{profile.age} years old</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={handleEdit}
              className={cn(buttonVariants({ variant: "premium", size: "default" }), "flex-1")}
            >
              <Edit3 className="mr-2 h-4 w-4" />
              Edit
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  size="default"
                  className="flex-1"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your profile
                    and remove all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete Profile
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDisplay;