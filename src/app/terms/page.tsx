import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl text-gray-900">EduNaija</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">Last updated: May 7, 2026</p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using EduNaija ("the Platform"), you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you do not have permission to access the platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. User Obligations</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              As a user of EduNaija, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Upload only materials you have the right to share</li>
              <li>Not engage in copyright infringement</li>
              <li>Not use the platform for any illegal or unauthorized purpose</li>
              <li>Respect the intellectual property rights of lecturers and institutions</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              The platform respects intellectual property rights. Users must only upload materials they own or have permission to share. 
              EduNaija claims no ownership over materials uploaded by users. However, by uploading content, 
              you grant EduNaija a non-exclusive license to host and display such materials on the platform.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              If you believe your copyright has been infringed, please contact us at support@edunaija.com with details of the infringement.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Academic Integrity</h2>
            <p className="text-gray-700 leading-relaxed">
              EduNaija is designed to support learning, not cheating. Users agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Use the platform to cheat on assignments or exams</li>
              <li>Share or sell exam questions in violation of university policies</li>
              <li>Impersonate another user or institution</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              EduNaija is provided "as is" without warranties of any kind. We do not guarantee that the platform will be error-free or uninterrupted. 
              In no event shall EduNaija be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these Terms 
              or is harmful to other users, the platform, or third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these Terms from time to time. We will notify users of any material changes by posting the new Terms on this page. 
              Your continued use of the platform after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms, please contact us at:
              <br />
              <strong>Email:</strong> support@edunaija.com
              <br />
              <strong>Address:</strong> Nigeria
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/pricing">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Back to Pricing
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
