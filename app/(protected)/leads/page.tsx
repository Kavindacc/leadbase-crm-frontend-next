"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";

// Mock Data
const mockLeads = [
  { id: 1, name: "Alice Freeman", company: "TechFlow Inc", email: "alice@techflow.com", source: "Website", status: "New", salesperson: "Admin User", value: "$12,000", date: "2026-05-08" },
  { id: 2, name: "Bob Smith", company: "Growth Labs", email: "bob@growthlabs.io", source: "Referral", status: "Qualified", salesperson: "Admin User", value: "$45,000", date: "2026-05-07" },
  { id: 3, name: "Charlie Davis", company: "Venture Corp", email: "charlie@venture.com", source: "Cold Email", status: "Proposal Sent", salesperson: "Admin User", value: "$8,500", date: "2026-05-06" },
  { id: 4, name: "Diana Prince", company: "Amazon", email: "diana@amazon.com", source: "LinkedIn", status: "Won", salesperson: "Jane Doe", value: "$120,000", date: "2026-05-05" },
  { id: 5, name: "Evan Wright", company: "Stark Industries", email: "evan@stark.com", source: "Event", status: "Lost", salesperson: "Jane Doe", value: "$55,000", date: "2026-05-04" },
];

const statusColors: Record<string, string> = {
  "New": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Contacted": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Qualified": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Proposal Sent": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Won": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Lost": "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchLeads = async () => {
      const token = localStorage.getItem("leadbase_token");
      try {
        const res = await fetch("http://localhost:5000/api/leads", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    
    const token = localStorage.getItem("leadbase_token");
    try {
      const res = await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col min-h-full pb-10">
      <PageHeader 
        title="Leads" 
        description="Manage and track your potential customers."
        action={
          <Link href="/leads/new" className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/20">
            + Add Lead
          </Link>
        }
      />

      <div className="p-8 max-w-[1400px] mx-auto w-full">
        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search leads by name, company, or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-panel border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-sm"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-4 rounded-lg bg-panel border border-white/10 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-sm appearance-none pr-8 cursor-pointer relative"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23a1a1aa\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat' }}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
            <select 
              className="h-10 px-4 rounded-lg bg-panel border border-white/10 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-sm appearance-none pr-8 cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23a1a1aa\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat' }}
            >
              <option value="All">All Sources</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
            <button className="h-10 px-4 rounded-lg bg-panel border border-white/10 text-zinc-300 hover:bg-white/5 transition-all text-sm font-medium flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-panel border border-white/5 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 uppercase bg-black/20 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-medium">Lead info</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Source</th>
                  <th className="px-6 py-4 font-medium">Assigned To</th>
                  <th className="px-6 py-4 font-medium">Est. Value</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-zinc-500">Loading leads...</td></tr>
                ) : filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{lead.name}</span>
                        <span className="text-zinc-500">{lead.company} • {lead.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[lead.status] || "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{lead.source}</td>
                    <td className="px-6 py-4 text-zinc-400 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary-600/20 text-primary-400 flex items-center justify-center text-[10px] font-bold">
                        {lead.salesperson.substring(0, 2).toUpperCase()}
                      </div>
                      {lead.salesperson}
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-300">{lead.value}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/leads/${lead.id}`} className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/leads/${lead.id}/edit`} className="p-2 text-zinc-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(lead.id)} className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-sm text-zinc-500">
            <span>Showing 1 to 5 of 5 entries</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded border border-white/10 disabled:opacity-50">Previous</button>
              <button className="px-3 py-1 rounded border border-white/10 disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
