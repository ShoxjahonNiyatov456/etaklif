"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { adminAuthService, AdminUser } from "@/app/services/admin-auth";
import {
  LayoutDashboard,
  Calendar,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Templates,
  FileText
} from "lucide-react";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventTypesExpanded, setEventTypesExpanded] = useState(false);
  const [templatesExpanded, setTemplatesExpanded] = useState(false);
  
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
  
  // Login sahifasida layourni ko'rsatmaslik
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }
  
  // Admin yuklanayotganda loading ko'rsatish
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  // Agar admin avtorizatsiyadan o'tmagan bo'lsa
  if (!admin) {
    return <>{children}</>;
  }
  
  const menuItems = [
    {
      title: "Boshqaruv paneli",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      title: "Bayram turlari",
      icon: <Calendar size={20} />,
      path: "/admin/event-types",
      submenu: [
        { title: "Barcha bayram turlari", path: "/admin/event-types" },
        { title: "Yangi bayram turi qo'shish", path: "/admin/event-types/new" }
      ],
      expanded: eventTypesExpanded,
      setExpanded: setEventTypesExpanded
    },
    {
      title: "Shablonlar",
      icon: <FileText size={20} />,
      path: "/admin/templates",
      submenu: [
        { title: "Barcha shablonlar", path: "/admin/templates" },
        { title: "Yangi shablon qo'shish", path: "/admin/templates/new" }
      ],
      expanded: templatesExpanded,
      setExpanded: setTemplatesExpanded
    },
    {
      title: "Sozlamalar",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    }
  ];
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-indigo-800 text-white">
        <div className="p-4 border-b border-indigo-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <div className="flex-grow overflow-y-auto">
          <nav className="mt-5">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className="mb-1">
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => item.setExpanded(!item.expanded)}
                        className={`flex items-center w-full px-4 py-2 text-sm rounded-lg ${
                          pathname.startsWith(item.path)
                            ? "bg-indigo-900 text-white"
                            : "text-indigo-200 hover:bg-indigo-700"
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.title}
                        <ChevronDown
                          size={16}
                          className={`ml-auto transition-transform ${
                            item.expanded ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>
                      {item.expanded && (
                        <ul className="pl-10 mt-1">
                          {item.submenu.map((subitem, subindex) => (
                            <li key={subindex}>
                              <Link
                                href={subitem.path}
                                className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                                  pathname === subitem.path
                                    ? "bg-indigo-900 text-white"
                                    : "text-indigo-200 hover:bg-indigo-700"
                                }`}
                              >
                                {subitem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                        pathname === item.path
                          ? "bg-indigo-900 text-white"
                          : "text-indigo-200 hover:bg-indigo-700"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
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

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-black bg-opacity-50 transition-opacity ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-800 text-white transition-transform md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
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
        <div className="flex-grow overflow-y-auto">
          <nav className="mt-5">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className="mb-1">
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => item.setExpanded(!item.expanded)}
                        className={`flex items-center w-full px-4 py-2 text-sm rounded-lg ${
                          pathname.startsWith(item.path)
                            ? "bg-indigo-900 text-white"
                            : "text-indigo-200 hover:bg-indigo-700"
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.title}
                        <ChevronDown
                          size={16}
                          className={`ml-auto transition-transform ${
                            item.expanded ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>
                      {item.expanded && (
                        <ul className="pl-10 mt-1">
                          {item.submenu.map((subitem, subindex) => (
                            <li key={subindex}>
                              <Link
                                href={subitem.path}
                                className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                                  pathname === subitem.path
                                    ? "bg-indigo-900 text-white"
                                    : "text-indigo-200 hover:bg-indigo-700"
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subitem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                        pathname === item.path
                          ? "bg-indigo-900 text-white"
                          : "text-indigo-200 hover:bg-indigo-700"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="px-4 py-3 flex justify-between items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 md:text-xl">
              {menuItems.find((item) => 
                item.submenu 
                  ? pathname.startsWith(item.path)
                  : pathname === item.path
              )?.title || "Admin Panel"}
            </h1>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-4 hidden md:block">
                {admin.name || admin.email}
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
} 