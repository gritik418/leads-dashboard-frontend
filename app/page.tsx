"use client";
import { Users, UserPlus, BadgeCheck, CheckCircle2 } from "lucide-react";
import StatCard from "@/components/StatCard/StatCard";
import { useGetDashboardStatsQuery } from "@/services/dashboardApi";
import { useEffect, useState } from "react";
import RecentLeads from "@/components/RecentLeads/RecentLeads";
import LeadsByStage from "@/components/Leads/LeadsByStage";

export default function HomePage() {
  const [analytics, setAnalytics] = useState<DashboardStatsData>();
  const [stageData, setStageData] = useState({});

  const { data, isLoading } = useGetDashboardStatsQuery();

  const stats = [
    {
      title: "Total Leads",
      value: analytics?.totalLeads?.toLocaleString() || "0",
      icon: Users,
      color: "indigo",
    },
    {
      title: "New Today",
      value: analytics?.newLeads || "0",
      icon: UserPlus,
      color: "indigo",
    },
    {
      title: "Qualified Leads",
      value: analytics?.qualifiedLeads || "0",
      icon: BadgeCheck,
      color: "indigo",
    },
    {
      title: "Converted Leads",
      value: analytics?.convertedLeads || "0",
      icon: CheckCircle2,
      color: "indigo",
    },
  ];

  useEffect(() => {
    if (!data?.data) return;

    setAnalytics(data.data);

    if (data.data.leadsByStage) {
      const temp: Record<string, number> = {};
      for (const element of data.data.leadsByStage) {
        temp[element._id] = element.count;
      }
      setStageData(temp);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              delay={index * 100}
            />
          ))}
        </div>

        <LeadsByStage data={stageData} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <RecentLeads />
      </div>
    </div>
  );
}
