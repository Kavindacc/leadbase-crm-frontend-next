import Link from "next/link";
import { ArrowRight, BarChart3, Users, Zap, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-6 lg:px-14 h-20 flex items-center border-b border-white/10 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
          <Zap className="w-6 h-6 text-primary-500" />
          LeadBase
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary-400 transition-colors">
            Login
          </Link>
          <Link href="/login" className="text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-full transition-all shadow-lg shadow-primary-500/20">
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-48 flex justify-center relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary-600/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container px-4 md:px-6 flex flex-col items-center text-center relative z-10">
            <div className="inline-flex items-center rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-400 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
              The new standard for sales teams
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 max-w-4xl leading-tight">
              Manage your leads with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">superhuman speed</span>.
            </h1>
            <p className="max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-10">
              LeadBase is the modern CRM built for speed, aesthetics, and results. Track pipelines, manage deals, and close faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary-600 px-8 text-sm font-medium text-white shadow-lg shadow-primary-500/25 transition-colors hover:bg-primary-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 bg-zinc-950/50 border-t border-white/5 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Everything you need to close</h2>
              <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed">
                Simple, powerful tools designed specifically for modern sales teams.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-primary-500/50 transition-colors group">
                <div className="p-3 rounded-full bg-primary-500/10 text-primary-400 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Lead Management</h3>
                <p className="text-zinc-400">Track every prospect from first contact to closed won.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-primary-500/50 transition-colors group">
                <div className="p-3 rounded-full bg-primary-500/10 text-primary-400 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Pipeline Dashboard</h3>
                <p className="text-zinc-400">Visualize your sales funnel and forecast revenue accurately.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-primary-500/50 transition-colors group">
                <div className="p-3 rounded-full bg-primary-500/10 text-primary-400 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Secure & Fast</h3>
                <p className="text-zinc-400">Enterprise-grade security with lightning-fast performance.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-8 flex items-center justify-center border-t border-white/10 bg-zinc-950">
        <p className="text-sm text-zinc-500 flex items-center gap-1">
          © 2026 LeadBase CRM. Build By Kavinda Chandrasiri        </p>
      </footer>
    </div>
  );
}
