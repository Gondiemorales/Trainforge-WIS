import Link from "next/link";

export function LandingNav() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: "rgba(8,8,8,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <span className="text-xl font-black tracking-tight text-white">
          Train<span className="text-primary">Forge</span>
        </span>

        <Link href="/login" className="btn btn-primary btn-sm rounded-full px-6">
          Sign in
        </Link>
      </div>
    </nav>
  );
}
