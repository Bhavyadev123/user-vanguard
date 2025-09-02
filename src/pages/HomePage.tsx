import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadFromLocalStorage } from '@/store/slices/profileSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { cardVariants } from '@/components/ui/card-variants';
import { buttonVariants } from '@/components/ui/button-variants';
import { Link } from 'react-router-dom';
import { User, PlusCircle, Eye, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-8">
          {/* Hero Section */}
          <Card className={cn(cardVariants({ variant: "premium", padding: "xl" }), "text-center")}>
            <CardHeader>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-4xl font-bold text-white mb-4">
                Welcome to ProfileApp
              </CardTitle>
              <CardDescription className="text-white/80 text-lg max-w-2xl mx-auto">
                Manage your profile with style. Create, update, and showcase your information 
                with our beautiful and intuitive interface.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className={cn(cardVariants({ variant: "elevated", padding: "lg" }))}>
              <CardHeader>
                <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <PlusCircle className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">
                  {profile ? 'Update Profile' : 'Create Profile'}
                </CardTitle>
                <CardDescription>
                  {profile 
                    ? 'Edit your existing profile information and keep it up to date.'
                    : 'Get started by creating your profile with all your important details.'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={profile ? '/profile-form?edit=true' : '/profile-form'}>
                  <Button className={cn(buttonVariants({ variant: "hero", size: "lg" }), "w-full")}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {profile ? 'Edit Profile' : 'Create Profile'}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className={cn(cardVariants({ variant: "elevated", padding: "lg" }))}>
              <CardHeader>
                <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-primary flex items-center justify-center">
                  {profile ? <User className="w-6 h-6 text-white" /> : <Eye className="w-6 h-6 text-white" />}
                </div>
                <CardTitle className="text-xl font-bold">
                  {profile ? 'View Profile' : 'Profile Display'}
                </CardTitle>
                <CardDescription>
                  {profile 
                    ? 'View your complete profile information and manage your account.'
                    : 'Once you create a profile, you can view and manage it here.'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/profile">
                  <Button 
                    className={cn(buttonVariants({ 
                      variant: profile ? "premium" : "outline", 
                      size: "lg" 
                    }), "w-full")}
                    disabled={!profile}
                  >
                    {profile ? <User className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                    {profile ? 'View Profile' : 'No Profile Yet'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Status Card */}
          {profile && (
            <Card className={cn(cardVariants({ variant: "gradient", padding: "lg" }), "text-center")}>
              <CardContent className="py-6">
                <p className="text-sm text-muted-foreground mb-2">Welcome back,</p>
                <p className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  {profile.name}
                </p>
                <p className="text-muted-foreground mt-2">
                  Your profile is ready and looking great!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;