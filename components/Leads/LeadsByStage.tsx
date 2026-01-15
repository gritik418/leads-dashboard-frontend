"use client";

import { useMemo } from "react";

const stages = [
  {
    key: "Lead",
    label: "New Leads",
    icon: "📧",
    gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
  },
  {
    key: "Qualified",
    label: "Qualified",
    icon: "✅",
    gradient: "bg-gradient-to-r from-indigo-400 to-indigo-600",
  },
  {
    key: "Proposal",
    label: "Proposals",
    icon: "📄",
    gradient: "bg-gradient-to-r from-emerald-400 to-emerald-600",
  },
];

const LeadsByStage = ({ data }: { data: Record<string, number> }) => {
  const getTotal = useMemo(() => {
    let total = 0;
    if (data) {
      Object.values(data).map((a: number) => {
        total += a;
      });
    }
    return total;
  }, [data]);

  const total = getTotal;

  return (
    <div className="bg-linear-to-br from-white to-gray-50 border border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Leads by Stage</h3>
        <div className="text-2xl font-bold text-gray-900">{total}</div>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => {
          const count = data[stage.key];
          const percentage = total ? (count / total) * 100 : 0;

          return (
            <div
              key={stage.key}
              className="group cursor-pointer p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60 hover:bg-white hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="text-xl group-hover:scale-110 transition-transform">
                    {stage.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                    {stage.label}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {count}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    ({percentage.toFixed(0)}%)
                  </span>
                </div>
              </div>

              <div className="h-3 w-full bg-gray-150 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full ${stage.gradient} rounded-full shadow-lg transition-all duration-500`}
                  style={{ width: `${Math.max(percentage, 5)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadsByStage;
