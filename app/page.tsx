export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-800">
        <h1 className="text-2xl font-bold">LensLoop <span className="text-sm text-gray-400">(Beta)</span></h1>
        <div className="space-x-6 text-sm">
          <a href="/browse" className="hover:text-gray-300">Browse Gear</a>
          <a href="/list-gear" className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200">
            List Your Gear
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Rent Verified Camera Gear <br /> in Delhi NCR
        </h2>
        <p className="mt-6 text-gray-400 max-w-xl mx-auto">
          A safer way for creators to rent cameras, lenses and pro gear. 
          No more OLX risks. Built for photographers & filmmakers.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/browse"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200"
          >
            Browse Gear
          </a>

          <a
            href="/list-gear"
            className="border border-gray-600 px-6 py-3 rounded-xl hover:bg-gray-800"
          >
            List Your Gear
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900 text-center">
        <h3 className="text-3xl font-bold">How It Works</h3>

        <div className="grid md:grid-cols-3 gap-10 mt-12 px-10">
          <div>
            <h4 className="text-xl font-semibold">1. Browse Gear</h4>
            <p className="text-gray-400 mt-2">
              Explore verified listings from creators across Delhi NCR.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold">2. Request Booking</h4>
            <p className="text-gray-400 mt-2">
              Send a rental request for your preferred dates.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold">3. Meet & Shoot</h4>
            <p className="text-gray-400 mt-2">
              Coordinate pickup locally and start creating.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 border-t border-gray-800 text-gray-500 text-sm">
        © {new Date().getFullYear()} LensLoop (Beta) – Delhi NCR
      </footer>
    </main>
  );
}