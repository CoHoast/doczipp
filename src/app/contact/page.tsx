import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Mail, MessageSquare } from 'lucide-react';
import { Header } from '@/components/layout/Header';

export const metadata = {
  title: 'Contact Us | QuickBill',
  description: 'Get in touch with the QuickBill team',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
            <p className="text-lg text-slate-600">
              Have a question or feedback? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Email</h3>
                    <p className="text-slate-600">support@quickbill.com</p>
                    <p className="text-sm text-slate-500">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Live Chat</h3>
                    <p className="text-slate-600">Available for Pro users</p>
                    <p className="text-sm text-slate-500">Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <h3 className="font-medium text-slate-900 mb-2">Looking for help?</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Check out our documentation and FAQs for quick answers to common questions.
                </p>
                <Link href="/pricing#faq">
                  <Button variant="outline" size="sm">
                    View FAQs
                  </Button>
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Send us a message</h2>
              
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="John" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-1" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your question or feedback..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 md:py-12 border-t bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">QuickBill</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} QuickBill. A BLUPRYNT product.
          </div>
          <div className="flex gap-6 text-sm text-slate-600">
            <Link href="/privacy" className="hover:text-slate-900">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900">Terms</Link>
            <Link href="/contact" className="text-blue-600 font-medium">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
