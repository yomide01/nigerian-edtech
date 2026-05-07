import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const freeFeatures = [
  "Access to school materials",
  "Upload up to 10 materials/month",
  "5 AI tutor chats/day",
  "3 mock tests/month",
  "Basic study tools",
  "Community access",
];

const premiumFeatures = [
  "Unlimited material access",
  "Unlimited uploads",
  "Unlimited AI tutor chats",
  "Unlimited mock tests",
  "Advanced exam predictions",
  "Lecturer pattern analysis",
  "Smart study planner",
  "Priority support",
  "Ad-free experience",
  "Offline downloads",
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl text-gray-900">EduNaija</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free and upgrade when you're ready for advanced features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Free</h2>
              <p className="text-gray-600 mt-2">Perfect for getting started</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">₦0</span>
                <span className="text-gray-600">/forever</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {freeFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/signup">
              <Button variant="outline" className="w-full">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-green-500 p-8 relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              RECOMMENDED
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Premium</h2>
              <p className="text-gray-600 mt-2">For serious students</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">₦1,500</span>
                <span className="text-gray-600">/semester</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">≈ $1 USD per month</p>
            </div>

            <ul className="space-y-4 mb-8">
              {premiumFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/signup">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Upgrade to Premium
              </Button>
            </Link>
            <p className="text-xs text-gray-500 text-center mt-4">
              Cancel anytime. No hidden fees.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I switch plans later?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade to Premium anytime, or downgrade back to Free at the end of your billing period.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is payment secure?
              </h3>
              <p className="text-gray-600">
                Absolutely. We use Paystack and Flutterwave for secure payments in Nigerian Naira.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                What payment methods are accepted?
              </h3>
              <p className="text-gray-600">
                We accept bank transfers, USSD, debit cards, and mobile money through our Nigerian payment partners.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
