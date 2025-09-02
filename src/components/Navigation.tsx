import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { cardVariants } from '@/components/ui/card-variants';
import { Link, useLocation } from 'react-router-dom';
import { User, Home, PlusCircle } from 'lucide-react';

const Navigation = () => {
  const { firstName, lastName } = useAppSelector((state) => state.profile);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <Card className={cn(cardVariants({ variant: "glass", padding: "sm" }), "border-0 rounded-none")}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                ProfileApp
              </Link>
              
              <div className="flex items-center space-x-4">
                <Link to="/">
                  <Button 
                    variant={isActive('/') ? 'premium' : 'ghost'} 
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Button>
                </Link>
                
                <Link to="/profile-form">
                  <Button 
                    variant={isActive('/profile-form') ? 'premium' : 'ghost'} 
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create Profile</span>
                  </Button>
                </Link>
                
                <Link to="/profile">
                  <Button 
                    variant={isActive('/profile') ? 'premium' : 'ghost'} 
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>View Profile</span>
                  </Button>
                </Link>
              </div>
            </div>
            
            {firstName && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                  {firstName[0]}{lastName ? lastName[0] : ''}
                </div>
                <span className="text-sm font-medium">
                  {firstName} {lastName}
                </span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </nav>
  );
};

export default Navigation;