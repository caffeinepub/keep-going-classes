import { useState } from 'react';
import { useSubmitAdmission } from '../../hooks/admissions/useSubmitAdmission';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { GraduationCap, CheckCircle2 } from 'lucide-react';

export default function AdmissionsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [program, setProgram] = useState('');
  const [motivation, setMotivation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitAdmission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !program || !motivation.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await submitMutation.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        program,
        motivation: motivation.trim(),
      });
      toast.success('Application submitted successfully!');
      setSubmitted(true);
      setName('');
      setEmail('');
      setProgram('');
      setMotivation('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit application');
    }
  };

  if (submitted) {
    return (
      <div className="container py-12 max-w-2xl">
        <Card className="text-center">
          <CardContent className="py-12">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest in Keep Going Classes. We will review your application and get back to you soon.
            </p>
            <Button onClick={() => setSubmitted(false)}>Submit Another Application</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-2xl">
      <div className="mb-8 text-center">
        <GraduationCap className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Apply for Admission</h1>
        <p className="text-lg text-muted-foreground">
          Join Keep Going Classes and start your journey to academic excellence.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admission Application</CardTitle>
          <CardDescription>
            Fill out the form below to apply for admission. We'll get back to you within 2-3 business days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="program">Program of Interest *</Label>
              <Select value={program} onValueChange={setProgram} required>
                <SelectTrigger id="program">
                  <SelectValue placeholder="Select a program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 9th">Class 9th</SelectItem>
                  <SelectItem value="Class 10th">Class 10th</SelectItem>
                  <SelectItem value="Class 11th">Class 11th</SelectItem>
                  <SelectItem value="Class 12th">Class 12th</SelectItem>
                  <SelectItem value="NDA">NDA (National Defence Academy)</SelectItem>
                  <SelectItem value="CDSE">CDSE (Combined Defence Services Examination)</SelectItem>
                  <SelectItem value="AFCAT">AFCAT (Air Force Common Admission Test)</SelectItem>
                  <SelectItem value="Airforce Exam">Airforce Exam</SelectItem>
                  <SelectItem value="Navy Exam">Navy Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to join? *</Label>
              <Textarea
                id="motivation"
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Tell us about your goals and why you want to join Keep Going Classes..."
                rows={5}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={submitMutation.isPending}>
              {submitMutation.isPending ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
