"use client";
import { Globe, Phone, User, ChevronRight } from "lucide-react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-800 border-blue-200 ring-1 ring-blue-200/50",
  Contacted:
    "bg-yellow-100 text-yellow-800 border-yellow-200 ring-1 ring-yellow-200/50",
  Qualified:
    "bg-emerald-100 text-emerald-800 border-emerald-200 ring-1 ring-emerald-200/50",
  Converted:
    "bg-green-100 text-green-800 border-green-200 ring-1 ring-green-200/50",
  Lost: "bg-red-100 text-red-800 border-red-200 ring-1 ring-red-200/50",
};

const stageColors: Record<string, string> = {
  Prospect:
    "bg-slate-100 text-slate-800 border-slate-200 ring-1 ring-slate-200/50",
  Opportunity:
    "bg-indigo-100 text-indigo-800 border-indigo-200 ring-1 ring-indigo-200/50",
  Negotiation:
    "bg-purple-100 text-purple-800 border-purple-200 ring-1 ring-purple-200/50",
  Closed:
    "bg-green-100 text-green-800 border-green-200 ring-1 ring-green-200/50",
};

const LeadsTable = ({ leads }: { leads: Lead[] }) => {
  if (leads.length === 0) {
    return (
      <div className="p-16 text-center">
        <User className="w-20 h-20 text-slate-400 mx-auto mb-6" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          No leads found
        </h3>
        <p className="text-slate-600 mb-8 max-w-sm mx-auto">
          Your leads list is empty. Create your first lead to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {leads.map((lead) => (
        <Link
          key={lead._id}
          href={`/leads/${lead._id}`}
          className="block group"
        >
          <div className="bg-white/70 relative backdrop-blur-xl rounded-2xl border border-white/40 shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition">
            <span
              className={`absolute top-3 right-3 inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border-2 ${
                statusColors[lead.status] ||
                "bg-gray-100 text-gray-800 border-gray-200"
              }`}
            >
              {lead.status}
            </span>
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                  <span className="text-white font-bold text-sm">
                    {lead.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="truncate">
                  <h3 className="font-semibold text-slate-900 truncate">
                    {lead.name}
                  </h3>
                  <p className="text-sm text-slate-600 truncate">
                    {lead.email}
                  </p>
                </div>
              </div>

              <div className="text-sm text-slate-600 mb-2">
                <div className="flex items-start gap-2 flex-col space-x-2 mt-1">
                  {lead.phone && (
                    <div className="flex items-center text-base text-slate-500">
                      <Phone className="w-3 h-3 mr-1" /> {lead.phone}
                    </div>
                  )}
                  {lead.source && (
                    <div className="flex items-center text-base text-slate-500">
                      <Globe className="w-3 h-3 mr-1" /> {lead.source}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <span
                  className={`inline-flex px-3 py-1.5 rounded text-xs font-semibold border-2 ${
                    stageColors[lead.stage] ||
                    "bg-gray-100 text-gray-800 border-gray-200"
                  }`}
                >
                  {lead.stage}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                {new Date(lead.createdAt).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <ChevronRight className="w-5 h-5 text-indigo-500" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LeadsTable;
