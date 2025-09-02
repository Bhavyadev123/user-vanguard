import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { saveProfile, clearError, Profile } from '@/store/slices/profileSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { cardVariants } from '@/components/ui/card-variants';
import { buttonVariants } from '@/components/ui/button-variants';
import { Loader2, User, Mail, Calendar } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Please enter a valid email address'),
  age: z.number().min(1, 'Age must be a positive number').max(150, 'Age must be realistic').optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  editMode?: boolean;
}

const ProfileForm = ({ editMode = false }: ProfileFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, profile } = useAppSelector((state) => state.profile);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      age: '',
    },
  });

  useEffect(() => {
    if (editMode && profile) {
      form.setValue('name', profile.name);
      form.setValue('email', profile.email);
      form.setValue('age', profile.age || '');
    }
  }, [editMode, profile, form]);

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

  const onSubmit = async (data: ProfileFormData) => {
    const profileData: Profile = {
      name: data.name,
      email: data.email,
      age: data.age === '' ? undefined : Number(data.age),
    };

    if (editMode && profile) {
      profileData.id = profile.id;
    }

    try {
      await dispatch(saveProfile(profileData)).unwrap();
      toast({
        title: 'Success!',
        description: `Profile ${editMode ? 'updated' : 'created'} successfully`,
      });
      navigate('/profile');
    } catch (error) {
      // Error is handled by the reducer and toast
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <Card className={cn(cardVariants({ variant: "elevated", padding: "lg" }), "w-full max-w-md")}>
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            {editMode ? 'Edit Profile' : 'Create Your Profile'}
          </CardTitle>
          <CardDescription>
            {editMode ? 'Update your profile information' : 'Fill in your details to get started'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Full Name</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        className="transition-all duration-300 focus:shadow-elegant"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Your first and last name (minimum 3 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email Address</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="your.email@example.com" 
                        className="transition-all duration-300 focus:shadow-elegant"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      We'll use this to contact you
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Age (Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="Enter your age" 
                        className="transition-all duration-300 focus:shadow-elegant"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Your age (optional field)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={loading}
                className={cn(buttonVariants({ variant: "hero", size: "lg" }), "w-full")}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {editMode ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  editMode ? 'Update Profile' : 'Create Profile'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;