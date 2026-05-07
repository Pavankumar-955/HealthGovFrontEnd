import { useState } from 'react'

const slides = [
  {
    title: 'National Health Mission',
    description: 'Strengthening primary health care and digital access for every Indian citizen.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Narendra_Modi_%28cropped%29.jpg/1200px-Narendra_Modi_%28cropped%29.jpg',
  },
  {
    title: 'Ayushman Bharat Expansion',
    description: 'Delivering quality healthcare, hospital coverage and wellness outreach across rural and urban areas.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Narendra_Modi_official_portrait.jpg/1200px-Narendra_Modi_official_portrait.jpg',
  },
  {
    title: 'Digital Health Empowerment',
    description: 'Building secure e-health records, teleconsultation and citizen-centered service delivery.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Narendra_Modi_at_Rashtrapati_Bhavan%2C_New_Delhi_%281%29.jpg/1200px-Narendra_Modi_at_Rashtrapati_Bhavan%2C_New_Delhi_%281%29.jpg',
  },
]

export default function Body() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const prevSlide = () => setCurrentSlide((value) => (value === 0 ? slides.length - 1 : value - 1))
  const nextSlide = () => setCurrentSlide((value) => (value === slides.length - 1 ? 0 : value + 1))

  return (
    <main className="bg-slate-50 min-h-[calc(100vh-4rem)] w-full py-12">
      <div className="mx-auto w-full max-w-none px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid min-h-[calc(100vh-4rem)] gap-8 lg:grid-cols-[1fr_1.8fr]">
          <aside className="flex w-full flex-col justify-between rounded-[32px] border border-slate-200 bg-[#0c7b93]/10 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:p-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">HealthGov Portal</p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">India’s unified health platform</h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  A citizen-first digital health initiative offering program eligibility, health ID services, wellness campaigns, and real-time support from the Government of India.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Core services</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>• Digital health ID enrollment</li>
                    <li>• Scheme tracking & benefits</li>
                    <li>• Telemedicine access</li>
                  </ul>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Featured campaigns</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>• Ayushman Bharat Health Outreach</li>
                    <li>• National Mental Health Program</li>
                    <li>• Swasthya Mitra community care</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button className="inline-flex justify-center rounded-full bg-cyan-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800">
                Explore Programs
              </button>
              <button className="inline-flex justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Learn More
              </button>
            </div>
          </aside>

          <section className="min-h-[calc(100vh-4rem)] rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="relative overflow-hidden rounded-[32px]">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="h-[320px] w-full object-cover sm:h-[460px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200">Featured initiative</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{slides[currentSlide].title}</h2>
                <p className="mt-3 max-w-2xl text-sm text-slate-200">{slides[currentSlide].description}</p>
              </div>
              <div className="absolute inset-x-0 bottom-6 flex flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={prevSlide}
                  className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white"
                >
                  Prev
                </button>
                <button
                  onClick={nextSlide}
                  className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white"
                >
                  Next
                </button>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.title}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 w-8 rounded-full transition ${
                      currentSlide === index ? 'bg-white' : 'bg-white/40 hover:bg-white'
                    }`}
                    aria-label={`Show slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div className="rounded-3xl bg-slate-100 p-6">
                <h3 className="text-xl font-semibold text-slate-900">Prime Minister’s Message</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  HealthGov empowers citizens through access to national healthcare programs, real-time updates, and guided public health support for communities across India.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Mission</p>
                  <p className="mt-2 text-sm text-slate-600">Healthy citizens, strong nation.</p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Vision</p>
                  <p className="mt-2 text-sm text-slate-600">Universal care, digital inclusion and wellness for all.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
