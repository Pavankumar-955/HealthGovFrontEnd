export default function About() {
  return (
    <main className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen w-full">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 mb-6">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">About HealthGov</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Transforming Healthcare Access in India</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            HealthGov is India's unified digital health platform, designed to empower citizens with seamless access to government health programs, services, and information.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To provide universal access to government health programs, digital health services, and healthcare information through a single integrated platform that prioritizes citizen convenience and health outcomes.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="text-4xl mb-4">🌟</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                A healthy India where every citizen has equitable access to quality healthcare, preventive care services, and health information, empowered through digital innovation and government support.
              </p>
            </div>

            {/* Values */}
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="text-4xl mb-4">💎</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Values</h2>
              <ul className="text-slate-600 space-y-2">
                <li>✓ <strong>Accessibility:</strong> Health for all citizens</li>
                <li>✓ <strong>Transparency:</strong> Clear information sharing</li>
                <li>✓ <strong>Quality:</strong> Excellence in service</li>
                <li>✓ <strong>Innovation:</strong> Digital transformation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">What We Do</h2>
          <p className="text-xl text-slate-600 text-center max-w-3xl mx-auto mb-12">
            HealthGov consolidates multiple government health initiatives into a single, user-friendly platform.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Program Management */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-cyan-50 p-8">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Program Management</h3>
              <p className="text-slate-700 mb-4">
                Centralized access to all government health schemes including:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• Ayushman Bharat Health Scheme</li>
                <li>• National Health Mission</li>
                <li>• Reproductive & Child Health Programs</li>
                <li>• Mental Health Initiative</li>
                <li>• Disease Surveillance & Prevention</li>
              </ul>
            </div>

            {/* Digital Health Services */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Digital Health Services</h3>
              <p className="text-slate-700 mb-4">
                Modern healthcare delivery through:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• Digital Health ID (ABHA)</li>
                <li>• Telemedicine Consultations</li>
                <li>• Online Appointment Booking</li>
                <li>• Health Records Management</li>
                <li>• Prescription Management</li>
              </ul>
            </div>

            {/* Eligibility & Benefits */}
            <div className="rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 p-8">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Eligibility & Benefits</h3>
              <p className="text-slate-700 mb-4">
                Easy verification and access to:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• Check Scheme Eligibility</li>
                <li>• View Available Benefits</li>
                <li>• Apply for Schemes</li>
                <li>• Track Application Status</li>
                <li>• Get Real-time Updates</li>
              </ul>
            </div>

            {/* Information & Education */}
            <div className="rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 p-8">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Health Information & Education</h3>
              <p className="text-slate-700 mb-4">
                Empowering citizens with knowledge:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• Health Tips & Guidance</li>
                <li>• Disease Prevention Information</li>
                <li>• Wellness Campaigns</li>
                <li>• Healthcare FAQs</li>
                <li>• Expert Consultations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Impact & Reach</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200 text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-2">1500+</div>
              <p className="text-slate-600 font-semibold">Government Health Facilities</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200 text-center">
              <div className="text-5xl font-bold text-cyan-600 mb-2">25M+</div>
              <p className="text-slate-600 font-semibold">Citizens Benefited</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200 text-center">
              <div className="text-5xl font-bold text-indigo-600 mb-2">75+</div>
              <p className="text-slate-600 font-semibold">Health Schemes Available</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200 text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">28</div>
              <p className="text-slate-600 font-semibold">States & Union Territories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Platform Features</h2>
          <p className="text-xl text-slate-600 text-center max-w-3xl mx-auto mb-12">
            HealthGov combines convenience, security, and accessibility
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">🔐</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Data Security & Privacy</h3>
                <p className="text-slate-600">Encrypted health data storage with strict privacy compliance and HIPAA standards.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">⚡</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Fast & Responsive</h3>
                <p className="text-slate-600">Optimized for all devices with quick loading and seamless performance.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">🌐</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Multilingual Support</h3>
                <p className="text-slate-600">Available in Hindi, English, and regional languages for better accessibility.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">♿</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Accessibility First</h3>
                <p className="text-slate-600">Designed for everyone with screen reader support and keyboard navigation.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">🤝</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">24/7 Support</h3>
                <p className="text-slate-600">Round-the-clock customer support through multiple channels including chatbot.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">📊</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Real-time Analytics</h3>
                <p className="text-slate-600">Track your health journey with comprehensive health dashboards and reports.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Governance & Administration</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Ministry Leadership</h3>
              <p className="text-slate-600 mb-4">
                Overseen by the Ministry of Health and Family Welfare, Government of India
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Policy Framework</li>
                <li>• Strategic Direction</li>
                <li>• National Coordination</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Technical Team</h3>
              <p className="text-slate-600 mb-4">
                Dedicated professionals managing platform operations and development
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• System Architecture</li>
                <li>• Infrastructure Management</li>
                <li>• Continuous Improvement</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Partnerships</h3>
              <p className="text-slate-600 mb-4">
                Collaborating with state governments and healthcare institutions
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• State Integration</li>
                <li>• Hospital Networks</li>
                <li>• Research Institutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Join the HealthGov Community</h2>
          <p className="text-lg mb-8 text-emerald-50">
            Be part of India's healthcare revolution. Access services today and take control of your health journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="rounded-full bg-white px-8 py-3 font-semibold text-emerald-600 transition hover:bg-emerald-50">
              Get Started Now
            </button>
            <button className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-emerald-700">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Get In Touch</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-bold text-slate-900 mb-2">Email</h3>
              <p className="text-slate-600">
                <a href="mailto:info@healthgov.in" className="text-emerald-600 hover:underline">info@healthgov.in</a>
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-bold text-slate-900 mb-2">Toll Free</h3>
              <p className="text-slate-600">1800-HEALTH-GOV (24/7 Support)</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="font-bold text-slate-900 mb-2">Address</h3>
              <p className="text-slate-600">New Delhi, India</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
