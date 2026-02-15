import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Copy, Check, MessageCircle } from 'lucide-react';
import { SiYoutube, SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import { toast } from 'sonner';

export default function ContactPage() {
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactInfo = {
    whatsapp: '9889144312',
    phone: '9838784245',
    email: 'contact@keepgoingclasses.com',
    address: '123 Education Street, Learning City, State - 123456',
  };

  const socialLinks = [
    { name: 'YouTube', icon: SiYoutube, url: 'https://youtube.com/@keepgoingclasses', color: 'text-red-500' },
    { name: 'Facebook', icon: SiFacebook, url: 'https://facebook.com/keepgoingclasses', color: 'text-blue-600' },
    { name: 'Instagram', icon: SiInstagram, url: 'https://instagram.com/keepgoingclasses', color: 'text-pink-500' },
    { name: 'X (Twitter)', icon: SiX, url: 'https://x.com/keepgoingclass', color: 'text-foreground' },
  ];

  const copyToClipboard = (text: string, type: 'whatsapp' | 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'whatsapp') {
      setCopiedWhatsApp(true);
      setTimeout(() => setCopiedWhatsApp(false), 2000);
      toast.success('WhatsApp number copied to clipboard!');
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      toast.success('Phone number copied to clipboard!');
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      toast.success('Email copied to clipboard!');
    }
  };

  return (
    <div className="container py-12 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Get in touch with us for any queries or support. We're here to help!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* WhatsApp */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">WhatsApp</CardTitle>
                <CardDescription>Message us on WhatsApp</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <a 
              href={`https://wa.me/91${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium hover:text-primary transition-colors block"
            >
              {contactInfo.whatsapp}
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(contactInfo.whatsapp, 'whatsapp')}
              className="gap-2"
            >
              {copiedWhatsApp ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedWhatsApp ? 'Copied!' : 'Copy'}
            </Button>
          </CardContent>
        </Card>

        {/* Phone */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Phone</CardTitle>
                <CardDescription>Call us during business hours</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href={`tel:+91${contactInfo.phone}`} className="text-lg font-medium hover:text-primary transition-colors block">
              {contactInfo.phone}
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
              className="gap-2"
            >
              {copiedPhone ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedPhone ? 'Copied!' : 'Copy'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Email */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Email</CardTitle>
                <CardDescription>Send us an email anytime</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href={`mailto:${contactInfo.email}`} className="text-lg font-medium hover:text-primary transition-colors block break-all">
              {contactInfo.email}
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(contactInfo.email, 'email')}
              className="gap-2"
            >
              {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedEmail ? 'Copied!' : 'Copy'}
            </Button>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Address</CardTitle>
                <CardDescription>Visit us at our location</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{contactInfo.address}</p>
          </CardContent>
        </Card>
      </div>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Connect With Us</CardTitle>
          <CardDescription>Follow us on social media for updates and educational content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all group"
              >
                <social.icon className={`h-8 w-8 ${social.color} group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium">{social.name}</span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
