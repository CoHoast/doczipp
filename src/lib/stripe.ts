import Stripe from 'stripe';

export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export const PLANS = {
  free: {
    name: 'Free',
    description: 'Perfect for trying out DOCZipp',
    price: 0,
    documentsPerMonth: 3,
    features: [
      '3 documents per month',
      'All 5 document types',
      'Basic templates',
      'PDF download',
      'DOCZipp watermark',
    ],
  },
  pro: {
    name: 'Pro',
    description: 'For freelancers and solopreneurs',
    priceMonthly: 900, // $9 in cents
    priceYearly: 7900, // $79 in cents
    stripePriceIdMonthly: process.env.STRIPE_PRICE_ID_MONTHLY,
    stripePriceIdYearly: process.env.STRIPE_PRICE_ID_YEARLY,
    features: [
      'Unlimited documents',
      'All 5 document types',
      'All premium templates',
      'Custom branding (no watermark)',
      'Logo upload',
      'AI-powered suggestions',
      'Save & manage documents',
      'Email support',
    ],
  },
} as const;
