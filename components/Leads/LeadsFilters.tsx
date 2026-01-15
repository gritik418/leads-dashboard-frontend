"use client";

import { Dispatch, SetStateAction } from "react";

interface LeadsFiltersProps {
  searchQuery: string;
  source: string | null;
  status: string | null;
  stage: string | null;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setSource: Dispatch<SetStateAction<string | null>>;
  setStage: Dispatch<SetStateAction<string | null>>;
  setStatus: Dispatch<SetStateAction<string | null>>;
}

const LeadsFilters = ({
  source,
  stage,
  status,
  searchQuery,
  setSource,
  setStage,
  setStatus,
  setSearchQuery,
}: LeadsFiltersProps) => {
  const commonSelectClass =
    "px-4 py-2 border border-gray-300 bg-white rounded-lg w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition";

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-4 items-end">
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 border bg-white border-gray-300 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />

      <select
        value={source || ""}
        onChange={(e) => setSource(e.target.value || null)}
        className={commonSelectClass}
      >
        <option value="">All Sources</option>
        <option value="Website">Website</option>
        <option value="Referral">Referral</option>
        <option value="Ads">Ads</option>
        <option value="Social">Social Media</option>
      </select>

      <select
        value={status || ""}
        onChange={(e) => setStatus(e.target.value || null)}
        className={commonSelectClass}
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Converted">Converted</option>
        <option value="Lost">Lost</option>
      </select>

      <select
        value={stage || ""}
        onChange={(e) => setStage(e.target.value || null)}
        className={commonSelectClass}
      >
        <option value="">All Stages</option>
        <option value="Lead">Lead</option>
        <option value="Qualified">Qualified</option>
        <option value="Proposal">Proposal</option>
      </select>
    </div>
  );
};

export default LeadsFilters;
