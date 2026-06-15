import Link from "next/link";
import { MessageSquare, Mail, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#000] py-16 md:py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F54E02]/5 rounded-t-full blur-[100px] pointer-events-none z-0" />

      <div className="relative container mx-auto px-6 lg:px-12 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-16 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FF4500] flex items-center justify-center shadow-[0_0_20px_rgba(255,85,0,0.3)] group-hover:shadow-[0_0_30px_rgba(255,85,0,0.5)] transition-all duration-300">
                <span className="text-white font-black text-2xl leading-none tracking-tighter">T</span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-white group-hover:text-gray-200 transition-colors">TalentScore</span>
            </Link>
            <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
              AI-powered hiring intelligence. Stop gambling with your hires and build teams with absolute confidence.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#F54E02]/10 hover:text-[#F54E02] hover:border-[#F54E02]/30 transition-all duration-300">
                <MessageSquare className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#F54E02]/10 hover:text-[#F54E02] hover:border-[#F54E02]/30 transition-all duration-300">
                <Mail className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#F54E02]/10 hover:text-[#F54E02] hover:border-[#F54E02]/30 transition-all duration-300">
                <Globe className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#features" className="text-sm text-gray-400 hover:text-[#F54E02] transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="text-sm text-gray-400 hover:text-[#F54E02] transition-colors">How it Works</Link></li>
              <li><Link href="#pricing" className="text-sm text-gray-400 hover:text-[#F54E02] transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#F54E02] transition-colors">Integrations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#F54E02] transition-colors">About</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#F54E02] transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#F54E02] transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#F54E02] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#F54E02] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#F54E02] transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#F54E02] transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} TalentScore Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Designed with precision.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
