"use client";

import { PageHeader } from "@/components/PageHeader";
import { useState, useEffect } from "react";
import { Users, UserPlus, Star, Trophy, XCircle, DollarSign, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock Data
const stats = [
  { name: "Total Leads", key: "totalLeads", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "New Leads", key: "newLeads", icon: UserPlus, color: "text-purple-500", bg: "bg-purple-500/10" },
  { name: "Qualified", key: "qualifiedLeads", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
  { name: "Won Deals", key: "wonLeads", icon: Trophy, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Lost Deals", key: "lostLeads", icon: XCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
];

const financialStats = [
  { name: "Total Pipeline Value", value: "$1,245,000", icon: DollarSign, trend: "+12.5%" },
  { name: "Won Deal Value", value: "$384,500", icon: DollarSign, trend: "+8.2%" },
];

const recentLeads = [
  { id: 1, name: "Alice Freeman", company: "TechFlow Inc", status: "New", value: "$12,000", date: "2 hours ago" },
  { id: 2, name: "Bob Smith", company: "Growth Labs", status: "Qualified", value: "$45,000", date: "5 hours ago" },
  { id: 3, name: "Charlie Davis", company: "Venture Corp", status: "Proposal Sent", value: "$8,500", date: "1 day ago" },
  { id: 4, name: "Diana Prince", company: "Amazon", status: "Won", value: "$120,000", date: "2 days ago" },
];

const statusColors: Record<string, string> = {
  "New": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Contacted": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Qualified": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Proposal Sent": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Won": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Lost": "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export default function DashboardPage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("leadbase_token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/dashboard", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setDashboardData(data);
        } else if (res.status === 401) {
          localStorage.removeItem("leadbase_token");
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full pb-10 items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/10 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Fallbacks if data is not loaded yet
  const dStats = dashboardData?.stats || {
    totalLeads: 0, newLeads: 0, qualifiedLeads: 0, wonLeads: 0, lostLeads: 0, totalPipelineValue: 0, wonDealValue: 0
  };
  const rLeads = dashboardData?.recentLeads || [];

  const financialStats = [
    { name: "Total Pipeline Value", value: `$${dStats.totalPipelineValue.toLocaleString()}`, icon: DollarSign, trend: "+12.5%" },
    { name: "Won Deal Value", value: `$${dStats.wonDealValue.toLocaleString()}`, icon: DollarSign, trend: "+8.2%" },
  ];
  return (
    <div className="flex flex-col min-h-full">
      <PageHeader 
        title="Dashboard" 
        description="Overview of your sales pipeline and team performance."
        action={
          <Link href="/leads/new" className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/20">
            + New Lead
          </Link>
        }
      />

      <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {financialStats.map((stat) => (
            <div key={stat.name} className="bg-panel border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-white/10 transition-colors">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-panel border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors group">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-white tracking-tight mb-1">{dStats[stat.key as keyof typeof dStats] || "0"}</p>
              <p className="text-sm font-medium text-zinc-400">{stat.name}</p>
            </div>
          ))}
        </div>

        {/* Recent Leads Table */}
        <div className="bg-panel border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Leads</h2>
            <Link href="/leads" className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 uppercase bg-black/20">
                <tr>
                  <th className="px-6 py-4 font-medium">Lead Name</th>
                  <th className="px-6 py-4 font-medium">Company</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Value</th>
                  <th className="px-6 py-4 font-medium">Added</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rLeads.length > 0 ? rLeads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="px-6 py-4 font-medium text-white group-hover:text-primary-400 transition-colors">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{lead.company}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-300">{lead.value}</td>
                    <td className="px-6 py-4 text-zinc-500">{lead.date}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                      No recent leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
