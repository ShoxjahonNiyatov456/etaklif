import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Send } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 relative">
      <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Taklifnoma
            </h3>
            <p className="text-gray-400 mb-6">Zamonaviy va chiroyli taklifnomalar yaratish platformasi.</p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-purple-900/50 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-purple-900/50 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/taklifnoma"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-purple-900/50 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Foydali havolalar</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                  Biz haqimizda
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-purple-400 transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                  Bog'lanish
                </Link>
              </li>
              <li>
                <Link
                  href="/examples"
                  className="text-gray-400 hover:text-purple-400 transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                  Namunalar
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                  Ko'p so'raladigan savollar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Bog'lanish</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 mt-0.5">
                  <MapPin className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-gray-400">Jizzax shahri, Sharof Rashidov tumani</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  <Phone className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-gray-400">+998 95 557 13 02</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  <Mail className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-gray-400">info@etaklif.vercel.app</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Taklifnoma. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  )
}
