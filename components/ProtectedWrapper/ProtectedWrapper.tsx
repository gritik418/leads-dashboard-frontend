"use client";
import React from "react";
import { useEffect } from "react";
import { useGetUserQuery } from "../../services/userApi";
import { usePathname, useRouter } from "next/navigation";

const publicRoutes = ["/login", "/register"];

const ProtectedWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isFetching, isError } = useGetUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthenticated = !!data?.user?._id;

  useEffect(() => {
    if (isLoading || isFetching || isError) return;

    if (!isPublicRoute && !isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (isPublicRoute && isAuthenticated) {
      router.replace("/");
    }
  }, [isLoading, isFetching, isPublicRoute, isAuthenticated, router]);

  if (isError && !isPublicRoute) {
    router.replace("/login");
    return;
  }

  if (!isPublicRoute && (isLoading || isFetching)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedWrapper;
