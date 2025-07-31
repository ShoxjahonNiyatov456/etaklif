"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Sparkles } from "lucide-react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../app/firebase";
// import { logoutUser } from "../app/services/auth";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [currentUser, setCurrentUser] = useState<any>(null);
  // const [userMenuOpen, setUserMenuOpen] = useState(false);
  // const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setCurrentUser(user);
  //     } else {
  //       setCurrentUser(null);
  //     }
  //     setAuthChecked(true);
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/80 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between pt-4 mb-4 container mx-auto px-4">
        <Link
          href="/"
          className="flex items-center -space-x-6 bg-none bg-transparent"
        >
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-500">
            QADRDONLAR
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/about"
            className="text-gray-300 hover:text-purple-400 transition-colors"
          >
            Biz haqimizda
          </Link>
          <Link
            href="/contact"
            className="text-gray-300 hover:text-purple-400 transition-colors"
          >
            Bog'lanish
          </Link>

          {/* {authChecked &&
            (currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 min-w-48 bg-gray-900 rounded-xl shadow-lg py-1 z-50 border border-gray-800 backdrop-blur-sm">
                    <div className="px-4 py-2 border-b border-gray-800">
                      <p className="text-sm font-medium text-gray-300">
                        {currentUser.email}
                      </p>
                    </div>
                    <Link
                      href="/my-proposals"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-purple-400"
                    >
                      Mening taklifnomalarim
                    </Link>
                    <button
                      onClick={async () => {
                        await logoutUser();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Chiqish
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-4 py-2 border border-purple-500 text-purple-400 rounded-full hover:bg-purple-950/30 transition-colors text-sm">
                    Kirish
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-colors text-sm">
                    Ro'yxatdan o'tish
                  </button>
                </Link>
              </>
            ))} */}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/about"
              className="text-gray-300 hover:text-purple-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Biz haqimizda
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-purple-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bog'lanish
            </Link>

            {/* {authChecked &&
              (currentUser ? (
                <>
                  <div className="border-t border-gray-800 pt-2">
                    <div className="flex items-center space-x-2 py-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                        <User size={18} className="text-white" />
                      </div>
                      <p className="text-sm font-medium text-gray-300">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/my-proposals"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400 transition-colors rounded-md">
                      Mening taklifnomalarim
                    </button>
                  </Link>

                  <button
                    onClick={async () => {
                      await logoutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-red-400 hover:bg-gray-800 transition-colors rounded-md"
                  >
                    <LogOut size={16} className="mr-2" />
                    Chiqish
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-2 border border-purple-500 text-purple-400 rounded-md hover:bg-purple-950/30 transition-colors">
                      Kirish
                    </button>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md transition-colors">
                      Ro'yxatdan o'tish
                    </button>
                  </Link>
                </>
              ))} */}
          </div>
        </div>
      )}
    </header>
  );
}
