import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaLocationPin, FaPhone, FaInstagram } from 'react-icons/fa6';
import { FiMail, FiSend, FiClock } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

const contactInfo = [
  {
    icon: <FaLocationPin className="w-5 h-5" />,
    label: 'Visit Us',
    value: 'Lagos, Nigeria',
    sub: 'Island & Mainland locations',
  },
  {
    icon: <FaPhone className="w-5 h-5" />,
    label: 'Call Us',
    value: '+234 814 666 4972',
    sub: 'Mon–Sat, 9am–6pm',
    href: 'tel:+2348146664972',
  },
  {
    icon: <FiMail className="w-5 h-5" />,
    label: 'Email Us',
    value: 'hello@iglasss.ng',
    sub: 'We reply within 24 hours',
    href: 'mailto:azeezkolapo05@gmail.com',
  },
  {
    icon: <FiClock className="w-5 h-5" />,
    label: 'Opening Hours',
    value: 'Mon – Sat',
    sub: '9:00 AM – 6:00 PM',
  },
];

const faqs = [
  {
    q: 'Do you offer prescription lenses?',
    a: 'Yes! We offer single vision, progressive, and bifocal prescription lenses for most of our frames. Upload your prescription during checkout.',
  },
  {
    q: 'How does the AR try-on work?',
    a: 'Our AR try-on uses your device camera to map your face and overlay glasses in real time. No app download required — it runs in your browser.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer 30-day free returns on all frames. Prescription lenses are subject to a quality inspection before refund.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Lagos orders arrive within 24 hours. Other Nigerian states take 2–5 business days.',
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0A1D37] to-[#2F465E] text-white py-20 px-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300 mb-4 block">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">Contact Us</h1>
          <p className="text-white/65 text-lg max-w-xl mx-auto">
            Questions about frames, prescriptions, or your order? We're here to help.
          </p>
        </section>

        {/* Contact info cards */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="bg-[#FAF9F6] rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-[#2F465E]/10 text-[#2F465E] rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-gray-900 font-bold hover:text-[#2F465E] transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-900 font-bold">{item.value}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form + FAQ */}
        <section className="py-16 px-4 bg-[#FAF9F6]">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Send us a message</h2>
              <p className="text-gray-500 mb-8 text-sm">
                Fill out the form and we'll get back to you within 24 hours.
              </p>

              {sent ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="text-3xl mb-3">✅</div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700 text-sm">
                    Thanks for reaching out. We'll reply to your inbox within 24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 text-sm text-[#2F465E] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2F465E] focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2F465E] focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2F465E] focus:border-transparent transition text-gray-700"
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order inquiry</option>
                      <option value="prescription">Prescription help</option>
                      <option value="return">Returns & exchanges</option>
                      <option value="ar">AR try-on support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2F465E] focus:border-transparent transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#2F465E] hover:bg-[#1a2d3d] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
                  >
                    <FiSend className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">FAQs</h2>
              <p className="text-gray-500 mb-8 text-sm">Common questions answered.</p>

              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-sm font-semibold text-gray-800 pr-4">{faq.q}</span>
                      <span
                        className={`text-[#2F465E] transition-transform duration-300 flex-shrink-0 text-lg ${
                          openFaq === i ? 'rotate-45' : ''
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === i ? 'max-h-48 pb-4' : 'max-h-0'
                      }`}
                    >
                      <p className="px-5 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-10 p-6 bg-[#0A1D37] rounded-2xl text-white">
                <p className="text-sm font-semibold mb-4">Follow us for updates & offers</p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/iglasss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <FaInstagram className="w-5 h-5" />
                    Instagram
                  </a>
                  <a
                    href="https://twitter.com/iglasss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <FaXTwitter className="w-5 h-5" />
                    Twitter/X
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
