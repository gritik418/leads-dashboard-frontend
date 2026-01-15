"use client";
import Link from "next/link";
import {
  User,
  Globe,
  Clock,
  ChevronRight,
  CircleCheck,
  XCircle,
  Clock as ClockIcon,
} from "lucide-react";

const statusConfig = {
  New: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: ClockIcon },
  Contacted: {
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    icon: ClockIcon,
  },
  Qualified: {
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: CircleCheck,
  },
  Lost: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
  Closed: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: CircleCheck,
  },
};
export const dummyLeads = [
  {
    _id: "1",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    source: "Website",
    status: "New",
    stage: "Prospect",
    createdAt: "2025-01-10",
  },
  {
    _id: "2",
    name: "Ananya Verma",
    email: "ananya@gmail.com",
    source: "Referral",
    status: "Contacted",
    stage: "Opportunity",
    createdAt: "2025-01-11",
  },
  {
    _id: "3",
    name: "Amit Patel",
    email: "amit@gmail.com",
    source: "Email",
    status: "Qualified",
    stage: "Negotiation",
    createdAt: "2025-01-12",
  },
  {
    _id: "4",
    name: "Sneha Kapoor",
    email: "sneha@gmail.com",
    source: "Social Media",
    status: "Lost",
    stage: "Closed",
    createdAt: "2025-01-13",
  },
  {
    _id: "5",
    name: "Vikas Singh",
    email: "vikas@gmail.com",
    source: "Website",
    status: "New",
    stage: "Prospect",
    createdAt: "2025-01-14",
  },
];
const RecentLeads = () => {
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl p-8">
        <div className="flex items-center space-x-3 text-slate-500">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading recent leads...</span>
        </div>
      </div>
    );
  }

  const recentLeads = dummyLeads || [];

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden">
      <div className="bg-linear-to-r from-slate-200 to-indigo-50/30 px-8 py-6 border-b border-white/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Recent Leads
              </h2>
              <p className="text-sm text-slate-600">
                Latest activity in your pipeline
              </p>
            </div>
          </div>
          <Link
            href="/leads"
            className="group flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-indigo-200/50 hover:border-indigo-300 transition-all hover:shadow-md"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="divide-y divide-slate-100/50 max-h-96 overflow-y-auto">
        {recentLeads.length === 0 ? (
          <div className="p-12 text-center">
            <User className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              No recent leads
            </h3>
            <p className="text-slate-500 mb-4">
              Your pipeline is looking quiet
            </p>
          </div>
        ) : (
          recentLeads.map((lead: any) => {
            const StatusIcon =
              statusConfig[lead.status as keyof typeof statusConfig]?.icon ||
              ClockIcon;
            const statusColors =
              statusConfig[lead.status as keyof typeof statusConfig]?.color ||
              "bg-gray-100 text-gray-800 border-gray-200";

            return (
              <Link
                key={lead._id}
                href={`/leads/${lead._id}`}
                className="p-6 hover:bg-slate-50/50 group transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                    <span className="text-white font-semibold text-sm">
                      {lead.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700 truncate">
                        {lead.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors}`}
                      >
                        <StatusIcon className="w-3 h-3 inline -ml-1 mr-1" />
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 truncate max-w-50">
                      {lead.email}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center">
                      <Globe className="w-3 h-3 mr-1" />
                      {lead.source}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-1 ml-4 shrink-0">
                  <div className="flex items-center space-x-1 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentLeads;
