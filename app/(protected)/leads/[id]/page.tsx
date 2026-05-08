"use client";

import { useState, use } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ArrowLeft, Edit, Mail, Phone, Building, Globe, DollarSign, Clock, Send, MessageSquare, Star, Users } from "lucide-react";

const statusColors: Record<string, string> = {
  "New": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Contacted": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Qualified": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Proposal Sent": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Won": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Lost": "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [status, setStatus] = useState("Qualified");
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([
    { id: 1, content: "Had a great initial call. They are very interested in our premium plan.", author: "Admin User", date: "2 days ago" },
    { id: 2, content: "Sent over the requested proposal document via email.", author: "Admin User", date: "1 day ago" }
  ]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([{ id: Date.now(), content: newNote, author: "Admin User", date: "Just now" }, ...notes]);
    setNewNote("");
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      <PageHeader 
        title="Bob Smith" 
        description="Growth Labs"
        action={
          <div className="flex gap-3">
            <Link href="/leads" className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
            <Link href={`/leads/${resolvedParams.id}/edit`} className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/20">
              <Edit className="w-4 h-4 mr-2" />
              Edit Lead
            </Link>
          </div>
        }
      />

      <div className="p-8 max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Lead Details & Status */}
        <div className="space-y-6 lg:col-span-1">
          {/* Status Updater */}
          <div className="bg-panel border border-white/5 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Current Status</h2>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`w-full h-11 px-4 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all appearance-none cursor-pointer ${statusColors[status]}`}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          {/* Lead Information Card */}
          <div className="bg-panel border border-white/5 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-white border-b border-white/5 pb-4">Lead Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-zinc-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-zinc-400">Company</p>
                  <p className="text-base text-white">Growth Labs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-zinc-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-zinc-400">Email</p>
                  <a href="mailto:bob@growthlabs.io" className="text-base text-primary-400 hover:underline">bob@growthlabs.io</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-zinc-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-zinc-400">Phone</p>
                  <p className="text-base text-white">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-zinc-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-zinc-400">Source</p>
                  <p className="text-base text-white">Referral</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-zinc-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-zinc-400">Est. Value</p>
                  <p className="text-base font-semibold text-emerald-400">$45,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Notes & History */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Notes Section */}
          <div className="bg-panel border border-white/5 rounded-2xl p-6 shadow-sm flex flex-col h-[500px]">
            <h2 className="text-lg font-semibold text-white border-b border-white/5 pb-4 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary-400" />
              Notes
            </h2>
            
            {/* Notes List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
              {notes.map((note) => (
                <div key={note.id} className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-300">{note.author}</span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {note.date}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>

            {/* Add Note Input */}
            <form onSubmit={handleAddNote} className="relative mt-auto">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a new note..."
                className="w-full min-h-[80px] p-4 pr-12 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
              />
              <button 
                type="submit"
                disabled={!newNote.trim()}
                className="absolute right-3 bottom-3 p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-500 disabled:opacity-50 disabled:hover:bg-primary-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Timeline Section */}
          <div className="bg-panel border border-white/5 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-white border-b border-white/5 pb-4 mb-6">Status History</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-panel text-amber-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Star className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-white/5">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-white text-sm">Status changed to Qualified</div>
                    <time className="font-medium text-xs text-zinc-500">2 days ago</time>
                  </div>
                  <div className="text-sm text-zinc-400">By Admin User</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-panel text-blue-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Users className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-white/5">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-white text-sm">Lead Created (New)</div>
                    <time className="font-medium text-xs text-zinc-500">5 days ago</time>
                  </div>
                  <div className="text-sm text-zinc-400">By Admin User</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
