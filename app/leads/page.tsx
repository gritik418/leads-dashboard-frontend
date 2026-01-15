"use client";
import { useEffect, useState } from "react";
import LeadsTable from "@/components/Leads/LeadsTable";
import LeadsFilters from "@/components/Leads/LeadsFilters";
import { useGetLeadsQuery } from "@/services/leadsApi";
import Pagination from "@/components/Pagination/Pagination";

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [source, setSource] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [stage, setStage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const { data, isLoading, isFetching } = useGetLeadsQuery({
    limit: 5,
    sortby: "createdAt",
    order: "desc",
    search: searchQuery,
    source: source || "",
    status: status || "",
    stage: stage || "",
    page,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  useEffect(() => {
    if (data?.leads) {
      setRecentLeads(data.leads);
    }
    if (data?.totalPages) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-4">Leads</h1>
        <LeadsFilters
          searchQuery={searchQuery}
          source={source}
          status={status}
          stage={stage}
          setSearchQuery={setSearchQuery}
          setSource={setSource}
          setStage={setStage}
          setStatus={setStatus}
        />
        <LeadsTable leads={recentLeads} />

        {totalPages ? (
          <Pagination
            currentPage={page}
            setCurrentPage={setPage}
            totalPages={totalPages}
          />
        ) : null}
      </div>
    </div>
  );
}
