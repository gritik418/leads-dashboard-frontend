"use client";

import { selectUser } from "@/store/userSlice";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const user = useSelector(selectUser);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const publicRoutes = ["/login", "/register"];
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPublicRoute = publicRoutes.includes(pathname);
  if (isPublicRoute) return null;

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-xl font-bold text-white">L</span>
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-gray-900 to-slate-800 bg-clip-text text-transparent hidden lg:block">
                LeadFlow
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative px-4 py-2 text-sm font-medium rounded-2xl transition-all flex items-center gap-2 ${
                      active
                        ? "text-indigo-600 bg-indigo-50 shadow-md"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen((p) => !p)}
                  className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 py-2">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="text-sm font-medium text-slate-900">
                        {user?.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {user?.email}
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:hidden flex items-center gap-4">
              <span className="text-sm font-medium truncate max-w-24">
                {user?.name}
              </span>

              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="p-2 rounded-xl hover:bg-slate-100"
              >
                {mobileOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-white/50 shadow-2xl"
        >
          <div className="px-4 py-6 space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-2xl font-semibold transition ${
                    active
                      ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 text-rose-600 hover:bg-rose-50 rounded-2xl font-semibold"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
