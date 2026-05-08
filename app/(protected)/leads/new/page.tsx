"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ArrowLeft, Save } from "lucide-react";

export default function CreateLeadPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const token = localStorage.getItem("leadbase_token");
    try {
      const res = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        router.push("/leads");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      <PageHeader 
        title="Create New Lead" 
        description="Add a new prospect to your pipeline."
        action={
          <Link href="/leads" className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancel
          </Link>
        }
      />

      <div className="p-8 max-w-4xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-panel border border-white/5 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-white mb-6 border-b border-white/5 pb-4">Lead Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300" htmlFor="leadName">
                    Lead Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="leadName"
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full h-11 px-4 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300" htmlFor="email">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full h-11 px-4 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300" htmlFor="source">
                    Lead Source
                  </label>
                  <select
                    name="leadSource"
                    className="w-full h-11 px-4 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all appearance-none"
                  >
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Cold Email">Cold Email</option>
                    <option value="Event">Event</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300" htmlFor="status">
                    Status
                  </label>
                  <select
                    name="status"
                    className="w-full h-11 px-4 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all appearance-none"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300" htmlFor="companyName">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="companyName"
                    type="text"
                    required
                    placeholder="e.g. Acme Corp"
                    className="w-full h-11 px-4 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full h-11 px-4 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300" htmlFor="salesperson">
                    Assigned Salesperson
                  </label>
                  <select
                    name="salesperson"
                    className="w-full h-11 px-4 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all appearance-none"
                  >
                    <option value="1">Admin User</option>
                    <option value="2">Jane Doe</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300" htmlFor="dealValue">
                    Estimated Deal Value ($)
                  </label>
                  <input
                    name="dealValue"
                    type="number"
                    min="0"
                    step="100"
                    placeholder="10000"
                    className="w-full h-11 px-4 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link 
              href="/leads"
              className="px-6 py-2.5 rounded-lg font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition-all shadow-lg shadow-primary-500/25 flex items-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isLoading ? "Saving..." : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
