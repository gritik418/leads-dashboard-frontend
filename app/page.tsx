"use client";
import { Users, UserPlus, BadgeCheck, CheckCircle2 } from "lucide-react";
import StatCard from "@/components/StatCard/StatCard";
import { useGetDashboardStatsQuery } from "@/services/dashboardApi";
import { useEffect, useState } from "react";
import RecentLeads from "@/components/RecentLeads/RecentLeads";
import LeadsByStage from "@/components/Leads/LeadsByStage";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/userSlice";

export default function HomePage() {
  const [analytics, setAnalytics] = useState<DashboardStatsData>();
  const [stageData, setStageData] = useState({});
  const user = useSelector(selectUser);

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
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-slate-600 font-medium">
                    Welcome back,{" "}
                    <span className="font-semibold">{user?.name}</span> 👋
                  </p>
                </div>
              </div>
              <p className="text-slate-500 max-w-lg">
                Here's what's happening with your leads today. You have
                <span className="font-semibold px-1 text-indigo-600">
                  {analytics?.newLeads || 0}
                </span>
                new leads requiring attention.
              </p>
            </div>
          </div>
        </div>
      </div>

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
