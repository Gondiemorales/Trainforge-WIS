import Link from "next/link";

export function LandingFooter() {
  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <span className="text-lg font-black text-white">
          Train<span className="text-primary">Forge</span>
        </span>

        <p className="text-sm text-white/30">
          © 2026 TrainForge · SaaS platform for personal trainers
        </p>

        <Link href="/login" className="btn btn-ghost btn-sm rounded-full text-white/50 hover:text-white">
          Sign in →
        </Link>
      </div>
    </footer>
  );
}
