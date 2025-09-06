export function Navbar() {
  return (
    <nav className="w-full bg-black/20 backdrop-blur-md border-b border-white/10 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        <div className="flex items-center gap-3">
          <img src="/src/assets/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-white font-semibold text-lg">BezaleelSequencer</span>
        </div>
      </div>
    </nav>
  );
}
