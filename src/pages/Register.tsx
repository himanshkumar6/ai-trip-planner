import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/layouts/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { PlaneTakeoff, Loader2 } from 'lucide-react';
import { registerUser } from '@/services/authService';
import { useAuthStore } from '@/store';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';

export function Register() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitialized } = useAuthStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isInitialized, isAuthenticated, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await registerUser(email, password, firstName, lastName);
    } catch (err: any) {
      console.error('Register Error:', err);
      setError(err.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-primary">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <PageWrapper className="flex items-center justify-center min-h-[calc(100vh-140px)] bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl border border-border">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <PlaneTakeoff className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Create an account
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Join TripMate to start planning your next adventure
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleRegister}>
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-foreground">First name</label>
                <Input
                  placeholder="John"
                  required
                  value={firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-foreground">Last name</label>
                <Input
                  placeholder="Doe"
                  required
                  value={lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-foreground">Email address</label>
              <Input
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-foreground">Password</label>
              <Input
                type="password"
                placeholder="Create a password"
                required
                minLength={8}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Must be at least 8 characters long</p>
            </div>
            <Button className="w-full h-11 text-base mt-2" type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create account'}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground font-medium">Or continue with</span>
              </div>
            </div>

            <GoogleLoginButton
              className="w-full h-11"
              onError={setError}
            />
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="font-semibold text-primary hover:text-primary-hover transition-colors">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
