"use client";

import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex gap-2 justify-center mt-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 cursor-pointer py-1 border rounded-lg disabled:opacity-50 transition"
      >
        Previous
      </button>

      {pages.map((page, idx) =>
        typeof page === "number" ? (
          <button
            key={idx}
            onClick={() => goToPage(page)}
            className={`px-3 py-1 border rounded-lg cursor-pointer transition ${
              page === currentPage
                ? "bg-indigo-500 text-white border-indigo-500"
                : ""
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={idx} className="px-3 py-1">
            {page}
          </span>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border cursor-pointer rounded-lg disabled:opacity-50 transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
