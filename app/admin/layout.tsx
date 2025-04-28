"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { adminAuthService, AdminUser } from "@/app/services/admin-auth";
import {
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const adminUser = await adminAuthService.getCurrentAdmin();
        setAdmin(adminUser);
        setLoading(false);

        if (!adminUser && pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      } catch (error) {
        setLoading(false);
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      }
    };

    checkAdmin();
  }, [pathname, router]);

  const handleLogout = async () => {
    await adminAuthService.logoutAdmin();
    document.cookie = `admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    router.push("/admin/login");
  };
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  if (!admin) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex flex-col w-64 bg-indigo-800 text-white">
        <div className="p-4 border-b border-indigo-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <div className="p-4 border-t border-indigo-700">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
              <Users size={18} />
            </div>
            <div className="text-sm">
              <p className="font-medium">{admin.name || admin.email}</p>
              <p className="text-indigo-300 text-xs">
                {admin.role === "superadmin" ? "Super Admin" : "Admin"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center text-indigo-200 hover:text-white text-sm w-full"
          >
            <LogOut size={18} className="mr-2" />
            Chiqish
          </button>
          <Link href={"/"} className="mt-4 flex items-center text-indigo-200 hover:text-white text-sm w-full">Asosiy sahifaga O'tish</Link>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-40 md:hidden bg-black bg-opacity-50 transition-opacity ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-800 text-white transition-transform md:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4 border-b border-indigo-700 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-full text-indigo-200 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 border-t border-indigo-700">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
              <Users size={18} />
            </div>
            <div className="text-sm">
              <p className="font-medium">{admin.name || admin.email}</p>
              <p className="text-indigo-300 text-xs">
                {admin.role === "superadmin" ? "Super Admin" : "Admin"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center text-indigo-200 hover:text-white text-sm w-full"
          >
            <LogOut size={18} className="mr-2" />
            Chiqish
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="px-4 py-3 flex justify-between items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-4 hidden md:block">
                {admin.name || admin.email}
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}