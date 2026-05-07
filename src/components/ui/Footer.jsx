export default function Footer() {
	return (
		<footer className="bg-slate-900 text-slate-200">
			<div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
				<div className="grid gap-10 md:grid-cols-3">
					<div className="space-y-4">
						<p className="text-sm uppercase tracking-[0.3em] text-cyan-300">HealthGov</p>
						<h2 className="text-2xl font-semibold text-white">National health access for every citizen</h2>
						<p className="max-w-md text-sm leading-6 text-slate-300">
							HealthGov is India’s digital health gateway to schemes, health IDs, wellness campaigns, and eligibility services designed for citizens and communities.
						</p>
					</div>
					<div>
						<p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Explore</p>
						<ul className="mt-4 space-y-3 text-sm text-slate-300">
							<li>
								<a href="#" className="transition hover:text-white">Health ID Enrollment</a>
							</li>
							<li>
								<a href="#" className="transition hover:text-white">Ayushman Bharat</a>
							</li>
							<li>
								<a href="#" className="transition hover:text-white">Telemedicine</a>
							</li>
							<li>
								<a href="#" className="transition hover:text-white">Wellness Programs</a>
							</li>
						</ul>
					</div>
					<div>
						<p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Contact</p>
						<div className="mt-4 space-y-3 text-sm text-slate-300">
							<p>National Health Mission Office</p>
							<p>Phone: 1800-123-4567</p>
							<p>Email: support@healthgov.gov.in</p>
							<p className="text-sm text-slate-400">Mon–Fri 9:00 AM – 6:00 PM</p>
						</div>
					</div>
				</div>
				<div className="mt-10 border-t border-slate-700 pt-6 text-sm text-slate-500 sm:flex sm:items-center sm:justify-between">
					<p>© 2026 HealthGov. All rights reserved.</p>
					<p>Built for digital health inclusion and citizen welfare.</p>
				</div>
			</div>
		</footer>
	)
}
