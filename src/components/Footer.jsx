export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col sm:flex-row justify-between items-center text-sm">
        
        {/* LEFT TEXT */}
        <p className="mb-2 sm:mb-0">
          © 2026 HealthGov. All rights reserved.
        </p>

        {/* RIGHT TEXT */}
        <p>
          Built for digital health inclusion and citizen welfare.
        </p>

      </div>
    </footer>
  );
}
