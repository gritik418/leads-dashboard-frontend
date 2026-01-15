"use client";

import { useGetLeadByIdQuery } from "@/services/leadsApi";
import {
  Activity,
  ArrowLeft,
  Clock,
  Globe,
  Mail,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.id as string;
  const { data, isLoading } = useGetLeadByIdQuery(leadId);
  const [lead, setLead] = useState<Lead | null>();

  useEffect(() => {
    if (data?.lead) {
      setLead(data.lead);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/50 to-indigo-50/70 flex items-center justify-center p-4 md:p-8">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 text-center group hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="w-24 h-24 bg-linear-to-r from-orange-400/20 to-pink-400/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border-2 border-dashed border-orange-200/50 group-hover:border-orange-300 transition-all duration-300">
            <div className="text-4xl opacity-60 group-hover:opacity-80 transition-opacity">
              🔍
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-gray-900 via-slate-800 to-indigo-900 bg-clip-text text-transparent mb-4">
            Lead Not Found
          </h1>

          <p className="text-lg text-slate-600 mb-8 max-w-sm mx-auto leading-relaxed">
            The lead you're looking for doesn't exist or has been removed.
          </p>

          <div className="space-y-3">
            <Link
              href={"/leads"}
              className="w-full cursor-pointer text-indigo-600 hover:text-indigo-700 font-semibold py-3 px-6 border-2 border-indigo-200/50 hover:border-indigo-300 rounded-2xl backdrop-blur-sm transition-all duration-200 hover:bg-indigo-50/50"
            >
              Back to Leads
            </Link>
          </div>

          <div className="absolute -inset-2 bg-linear-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl -z-10 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/50 to-indigo-50/70 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href={"/leads"}
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-xl transition-all duration-200 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Leads
        </Link>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="gap-1 flex flex-col">
                  <User className="w-8 h-8" />
                  <h1 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-gray-900 to-slate-800 bg-clip-text text-transparent">
                    {lead.name}
                  </h1>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"></p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="inline-flex px-6 py-3 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                    {lead.stage}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                <ContactItem
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                  value={lead.email}
                />
                {lead?.phone ? (
                  <ContactItem
                    icon={<Phone className="w-5 h-5" />}
                    label="Phone"
                    value={lead.phone}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Activity className="w-7 h-7 text-indigo-500" />
                  Lead Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  icon={<Globe className="w-5 h-5" />}
                  label="Source"
                  value={lead.source}
                />
                <InfoItem
                  icon={<Clock className="w-5 h-5" />}
                  label="Created"
                  value={new Date(lead.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                />
                <InfoItem
                  icon={<Activity className="w-5 h-5" />}
                  label="Status"
                  value={lead.status}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ContactItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="group p-4 bg-linear-to-r from-slate-50 to-blue-50/30 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
    <div className="flex items-center gap-3 mb-1">
      <div className="p-2 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        {label}
      </span>
    </div>
    <p className="font-semibold text-slate-900 text-lg">{value}</p>
  </div>
);

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="group p-6 bg-linear-to-br from-white to-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
    <div className="flex items-start gap-4 mb-2">
      <div className="p-3 bg-indigo-100 rounded-2xl mt-0.5">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-xl font-bold text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  </div>
);
