export function FooterSection() {
  return (
    <footer className="px-6 pb-6 bg-bg">
      <div className="bg-white rounded-3xl px-8 py-12 md:px-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Top: brand + tagline */}
          <div className="mb-12">
            <h2 className="font-switzer text-3xl font-bold text-dark">Corazon</h2>
            <p className="text-dark/50 text-sm mt-2">
              Uma contadora de historias visual — fotografia e videografia que capturam a essencia.
            </p>
          </div>

          {/* Middle: nav links + social */}
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
            {/* Explorar nav links */}
            <div>
              <h3 className="font-switzer font-semibold text-sm text-dark/40 uppercase tracking-widest mb-4">
                Explorar
              </h3>
              <nav className="flex flex-col gap-2">
                <a href="/" className="text-dark/70 text-sm hover:text-dark transition-colors">Inicio</a>
                <a href="/portfolio" className="text-dark/70 text-sm hover:text-dark transition-colors">Portfolio</a>
                <a href="/contato" className="text-dark/70 text-sm hover:text-dark transition-colors">Contato</a>
              </nav>
            </div>

            {/* Social links */}
            <div>
              <h3 className="font-switzer font-semibold text-sm text-dark/40 uppercase tracking-widest mb-4">
                Social
              </h3>
              <div className="flex gap-4">
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-dark/70 text-sm hover:text-dark transition-colors">
                  X
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark/70 text-sm hover:text-dark transition-colors">
                  Instagram
                </a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-switzer font-semibold text-sm text-dark/40 uppercase tracking-widest mb-4">
                Legal
              </h3>
              <a href="/privacidade" className="text-dark/70 text-sm hover:text-dark transition-colors">
                Privacidade
              </a>
            </div>
          </div>

          {/* Bottom: credit + copyright */}
          <div className="border-t border-dark/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark/40 text-xs">Criado por Markus Corazzione</p>
            <p className="text-dark/40 text-xs">MC. &copy; 2026</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
