import { useState } from 'react'

const contactChannels = [
  {
    id: 1,
    title: 'Email Support',
    icon: '📧',
    description: 'Send us your queries and feedback',
    contact: 'support@healthgov.in',
    responseTime: 'Response within 24 hours',
    type: 'email',
  },
  {
    id: 2,
    title: 'Toll-Free Helpline',
    icon: '📞',
    description: 'Call our 24/7 support team',
    contact: '1800-HEALTH-GOV (1800-432-5846)',
    responseTime: 'Available 24/7',
    type: 'phone',
  },
  {
    id: 3,
    title: 'Live Chat',
    icon: '💬',
    description: 'Chat with our support team instantly',
    contact: 'Available on website',
    responseTime: '9 AM - 6 PM (IST)',
    type: 'chat',
  },
  {
    id: 4,
    title: 'Social Media',
    icon: '📱',
    description: 'Follow us on social platforms',
    contact: '@HealthGovIndia',
    responseTime: 'Response within 2-4 hours',
    type: 'social',
  },
]

const departmentContacts = [
  {
    name: 'General Inquiries',
    email: 'info@healthgov.in',
    phone: '011-2023-1234',
    hours: 'Monday - Friday, 9 AM - 5:30 PM (IST)',
  },
  {
    name: 'Technical Support',
    email: 'tech-support@healthgov.in',
    phone: '011-2023-5678',
    hours: '24/7 Support Available',
  },
  {
    name: 'Scheme Eligibility',
    email: 'schemes@healthgov.in',
    phone: '011-2023-9012',
    hours: 'Monday - Friday, 10 AM - 5 PM (IST)',
  },
  {
    name: 'Grievance Redressal',
    email: 'grievance@healthgov.in',
    phone: '011-2023-3456',
    hours: 'Monday - Friday, 9 AM - 5:30 PM (IST)',
  },
]

const officeLocations = [
  {
    name: 'Head Office',
    address: '123 Health Street, New Delhi - 110001',
    phone: '+91-11-2023-1234',
    email: 'headquarters@healthgov.in',
    hours: '9 AM - 5:30 PM (Monday - Friday)',
  },
  {
    name: 'Regional Office - Mumbai',
    address: '456 Wellness Avenue, Mumbai - 400001',
    phone: '+91-22-2023-5678',
    email: 'mumbai@healthgov.in',
    hours: '9 AM - 5:30 PM (Monday - Friday)',
  },
  {
    name: 'Regional Office - Bangalore',
    address: '789 Care Lane, Bangalore - 560001',
    phone: '+91-80-2023-9012',
    email: 'bangalore@healthgov.in',
    hours: '9 AM - 5:30 PM (Monday - Friday)',
  },
  {
    name: 'Regional Office - Kolkata',
    address: '321 Health Park, Kolkata - 700001',
    phone: '+91-33-2023-3456',
    email: 'kolkata@healthgov.in',
    hours: '9 AM - 5:30 PM (Monday - Friday)',
  },
]

const faqs = [
  {
    question: 'How do I register on HealthGov?',
    answer: 'Visit the registration page, enter your phone number, verify OTP, and complete your profile with required details. You can register using email or phone number.',
  },
  {
    question: 'How do I check my scheme eligibility?',
    answer: 'Go to "Schemes" section, enter your details, and the platform will automatically check your eligibility for all available government health schemes.',
  },
  {
    question: 'Is my health data secure?',
    answer: 'Yes, we use end-to-end encryption and follow HIPAA standards. Your health data is protected with strict privacy controls and only accessible to authorized healthcare providers.',
  },
  {
    question: 'How do I book a telemedicine consultation?',
    answer: 'Navigate to "Telemedicine" section, select a doctor, choose your preferred time slot, and complete the booking. You will receive a consultation link via email.',
  },
  {
    question: 'What if I face technical issues?',
    answer: 'Contact our technical support team at tech-support@healthgov.in or call our 24/7 helpline for immediate assistance.',
  },
  {
    question: 'How do I update my profile information?',
    answer: 'Log in to your account, go to "My Profile" section, click "Edit" and update your information. Changes are saved automatically.',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'General Inquiry',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'General Inquiry',
        message: '',
      })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen w-full">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 mb-6">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Contact Us</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Get in Touch with HealthGov</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Have questions? Our dedicated team is here to help you 24/7. Choose your preferred way to connect with us.
          </p>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Ways to Reach Us</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactChannels.map((channel) => (
              <div key={channel.id} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-lg transition">
                <div className="text-5xl mb-4">{channel.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{channel.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{channel.description}</p>
                <div className="bg-emerald-50 p-3 rounded-2xl mb-3">
                  <p className="font-semibold text-slate-900 text-sm">{channel.contact}</p>
                </div>
                <p className="text-xs text-slate-500">{channel.responseTime}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Send us a Message</h2>

              {submitted ? (
                <div className="rounded-3xl bg-emerald-50 border-2 border-emerald-200 p-6 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-emerald-900 mb-2">Thank You!</h3>
                  <p className="text-emerald-700">Your message has been sent successfully. Our team will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
                        placeholder="Your phone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none"
                      >
                        <option>General Inquiry</option>
                        <option>Technical Issue</option>
                        <option>Scheme Related</option>
                        <option>Grievance</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
                      placeholder="Subject of your message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
                      placeholder="Please describe your inquiry in detail"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-emerald-700 px-8 py-3 font-semibold text-white transition hover:bg-emerald-800"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Offices</h2>

              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div key={index} className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{office.name}</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex gap-2">
                        <span className="text-lg">📍</span>
                        <div>
                          <p className="font-semibold text-slate-900">Address</p>
                          <p className="text-slate-600">{office.address}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-lg">📞</span>
                        <div>
                          <p className="font-semibold text-slate-900">Phone</p>
                          <p className="text-slate-600">{office.phone}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-lg">📧</span>
                        <div>
                          <p className="font-semibold text-slate-900">Email</p>
                          <p className="text-slate-600">{office.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-lg">🕐</span>
                        <div>
                          <p className="font-semibold text-slate-900">Hours</p>
                          <p className="text-slate-600">{office.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Department Contacts</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {departmentContacts.map((dept, index) => (
              <div key={index} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{dept.name}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-semibold">Email</p>
                    <a href={`mailto:${dept.email}`} className="text-emerald-600 hover:underline">
                      {dept.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-semibold">Phone</p>
                    <a href={`tel:${dept.phone}`} className="text-slate-900 font-semibold hover:text-emerald-600">
                      {dept.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-semibold">Business Hours</p>
                    <p className="text-slate-700">{dept.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 cursor-pointer hover:border-emerald-300">
                <summary className="flex items-center justify-between font-semibold text-slate-900 select-none">
                  {faq.question}
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Still Need Help?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Our support team is available 24/7 to assist you. Don't hesitate to reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="rounded-full bg-emerald-700 px-8 py-3 font-semibold text-white transition hover:bg-emerald-800">
              Start Live Chat
            </button>
            <button className="rounded-full border-2 border-emerald-700 px-8 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50">
              Call Helpline
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
