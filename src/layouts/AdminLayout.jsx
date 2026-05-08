export default function AdminLayout() {
	return (
		<main className="min-h-screen bg-slate-950 text-white px-6 py-12">
			<div className="mx-auto max-w-6xl rounded-3xl bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
				<header className="mb-6">
					<p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Admin Portal</p>
					<h1 className="text-4xl font-semibold">Admin Dashboard</h1>
				</header>
				<p className="text-slate-300">You are now in the admin section. Add admin widgets here.</p>
			</div>
		</main>
	)
}
