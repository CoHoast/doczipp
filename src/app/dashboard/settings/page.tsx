import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const metadata = {
  title: 'Account Settings | DOCzipp',
  description: 'Manage your account settings',
};

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-600">Manage your account and business information</p>
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Profile</h2>
          <div className="grid gap-6 max-w-xl">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
            </div>
            <Button className="w-fit bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </section>

        {/* Business Information */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Business Information</h2>
          <p className="text-slate-600 text-sm mb-6">This information will be auto-filled when creating new documents.</p>
          <div className="grid gap-6 max-w-xl">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" placeholder="Your Company Name" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input id="businessEmail" type="email" placeholder="billing@company.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="businessAddress">Address</Label>
              <Input id="businessAddress" placeholder="123 Main Street" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessCity">City</Label>
                <Input id="businessCity" placeholder="New York" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="businessState">State</Label>
                <Input id="businessState" placeholder="NY" className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessZip">ZIP Code</Label>
                <Input id="businessZip" placeholder="10001" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="businessPhone">Phone</Label>
                <Input id="businessPhone" placeholder="+1 (555) 000-0000" className="mt-1" />
              </div>
            </div>
            <Button className="w-fit bg-blue-600 hover:bg-blue-700">
              Save Business Info
            </Button>
          </div>
        </section>

        {/* Password */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Change Password</h2>
          <div className="grid gap-6 max-w-xl">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" className="mt-1" />
            </div>
            <Button className="w-fit bg-blue-600 hover:bg-blue-700">
              Update Password
            </Button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-white rounded-xl border border-red-200 p-6">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-slate-600 text-sm mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
            Delete Account
          </Button>
        </section>
      </div>
    </div>
  );
}
