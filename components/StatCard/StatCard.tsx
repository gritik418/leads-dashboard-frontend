"use client";
import { Users } from "lucide-react";

interface Props {
  title: string;
  value: string;
  icon?: any;
  color?: string;
  delay?: number;
}

const StatCard = ({
  title,
  value,
  icon: Icon = Users,
  color = "slate",
  delay = 0,
}: Props) => {
  return (
    <div
      className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute -inset-1 bg-linear-to-r from-transparent via-white/20 to-transparent rounded-2xl -z-10 group-hover:opacity-100 opacity-0 transition-opacity" />

      <div className="absolute top-4 right-4 w-16 h-16 bg-linear-to-r from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon
          className={`w-8 h-8 text-${
            color === "slate" ? "slate-600" : color
          }-600 group-hover:rotate-12 transition-all duration-300`}
        />
      </div>

      <div className="relative z-10">
        <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
        <h3 className="text-4xl lg:text-5xl font-black bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2 leading-tight">
          {value}
        </h3>

        <div className="flex items-center space-x-2"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-indigo-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
    </div>
  );
};

export default StatCard;
