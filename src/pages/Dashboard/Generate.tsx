import { useState } from 'react';
import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { generateAIItinerary, saveUserTrip } from '@/services/aiService';
import { useAuthStore } from '@/store';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function GenerateTrip() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    days: 3,
    budget: 'standard' as 'economy' | 'standard' | 'luxury',
    style: 'adventure' as 'adventure' | 'relaxation' | 'culture' | 'family'
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsGenerating(true);
    try {
      const itinerary = await generateAIItinerary(
        formData.destination,
        formData.days,
        formData.budget,
        formData.style
      );

      await saveUserTrip(user.uid, {
        destination: formData.destination,
        days: formData.days,
        budget: formData.budget,
        style: formData.style,
        itinerary
      });

      navigate('/dashboard/trips');
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageWrapper className="py-8 bg-background min-h-screen">
      <Container className="max-w-4xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
              <Sparkles className="text-primary h-10 w-10 drop-shadow-sm" />
              AI Trip Generator
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">Tell us your preferences and let our AI craft the perfect itinerary.</p>
          </div>
        </div>

        <Card className="shadow-smooth border border-border overflow-hidden">
          <div className="bg-primary-gradient h-1.5 w-full" />
          <CardHeader className="bg-muted/30 border-b border-border pb-6">
            <CardTitle className="text-xl font-bold">Plan Your Next Adventure</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2.5">
                <label className="text-sm font-bold text-foreground">Destination</label>
                <Input
                  placeholder="e.g. Paris, France"
                  required
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-bold text-foreground">Number of Days</label>
                <Input
                  type="number"
                  min={1}
                  max={14}
                  required
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-bold text-foreground">Budget Type</label>
                <Select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value as any })}
                  className="h-12"
                >
                  <option value="economy">Economy</option>
                  <option value="standard">Standard</option>
                  <option value="luxury">Luxury</option>
                </Select>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-bold text-foreground">Travel Style</label>
                <Select
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value as any })}
                  className="h-12"
                >
                  <option value="adventure">Adventure</option>
                  <option value="relaxation">Relaxation</option>
                  <option value="culture">Culture</option>
                  <option value="family">Family</option>
                </Select>
              </div>

              <div className="md:col-span-2 pt-6">
                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-bold shadow-lift shadow-primary/20 rounded-full"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      Crafting your dream itinerary...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-6 w-6" />
                      Generate Instant Itinerary
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </PageWrapper>
  );
}
