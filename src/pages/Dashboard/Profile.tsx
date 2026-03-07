import { useState } from 'react';
import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function Profile() {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.displayName || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  // Extract initials for placeholder avatar
  const initials = user?.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'U';

  const handleUpdateProfile = async () => {
    if (!auth.currentUser) return;
    setIsUpdating(true);
    setSuccess(false);

    try {
      await updateProfile(auth.currentUser, {
        displayName: name
      });
      // Force reload auth state manually or just show success
      // The auth listener will pick it up on next nav or reload
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <PageWrapper className="bg-background py-8 min-h-screen">
      <Container className="max-w-3xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground mt-2 text-lg">Manage your account details and preferences.</p>
        </div>

        <Card className="shadow-smooth border-border overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border pb-6">
            <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="flex items-center gap-8">
              <div className="h-24 w-24 rounded-full bg-primary/10 border-2 border-primary/20 shadow-inner flex items-center justify-center text-primary text-3xl font-extrabold relative overflow-hidden group">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover transition-transform group-hover:scale-110" />
                ) : initials}
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="rounded-full px-6 font-semibold border-primary/20 text-primary hover:bg-primary/5">Change Avatar</Button>
                <p className="text-xs text-muted-foreground">Click to upload a new profile picture.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">Display Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="font-medium"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-bold text-foreground">Email Address</label>
                <Input value={user?.email || ''} disabled className="opacity-70 bg-muted cursor-not-allowed font-medium" />
                <p className="text-xs text-muted-foreground italic">Email cannot be changed directly.</p>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-bold text-foreground">Account Role</label>
                <Input value={user?.role || 'user'} disabled className="opacity-70 bg-muted cursor-not-allowed uppercase text-xs font-black tracking-widest text-primary" />
              </div>
            </div>

            <div className="pt-8 border-t border-border flex items-center gap-6">
              <Button onClick={handleUpdateProfile} disabled={isUpdating} className="rounded-full px-10 font-bold h-12 shadow-lift shadow-primary/20">
                {isUpdating && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Save Profile Changes
              </Button>
              {success && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm font-bold text-green-500 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20"
                >
                  Success! Profile updated.
                </motion.span>
              )}
            </div>
          </CardContent>
        </Card>
      </Container>
    </PageWrapper>
  );
}
