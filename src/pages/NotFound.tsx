import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/components/ui/card-variants";
import { buttonVariants } from "@/components/ui/button-variants";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className={cn(cardVariants({ variant: "elevated", padding: "lg" }), "text-center")}>
          <CardHeader>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
              <span className="text-3xl font-bold text-destructive">404</span>
            </div>
            <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
            <CardDescription>
              Oops! The page you're looking for doesn't exist.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Link to="/">
              <Button className={cn(buttonVariants({ variant: "hero", size: "lg" }), "w-full")}>
                Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
