import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import LogoAbirami from "./LogoAbirami";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <Link
              to="/"
              className="inline-flex items-center transition-opacity hover:opacity-90"
              aria-label="Home"
            >
              <LogoAbirami />
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-slate-400">
              Premium watch clocks and timeless wall pieces. Crafted for elegance, precision, and your everyday spaces.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-100">
              Quick Links
            </h3>

            <div className="mt-6 flex flex-col gap-4 text-sm text-slate-400">
              {['Home', 'Products', 'Cart', 'My Orders'].map((item) => (
                <Link 
                  key={item} 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                  className="group inline-flex w-fit items-center transition-colors hover:text-white"
                >
                  <span className="relative overflow-hidden pb-1">
                    {item}
                    <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-100">
              Account
            </h3>

            <div className="mt-6 flex flex-col gap-4 text-sm text-slate-400">
              {['Login', 'Register', 'Checkout'].map((item) => (
                <Link 
                  key={item} 
                  to={`/${item.toLowerCase()}`} 
                  className="group inline-flex w-fit items-center transition-colors hover:text-white"
                >
                  <span className="relative overflow-hidden pb-1">
                    {item}
                    <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-100">
              Contact Us
            </h3>

            <div className="mt-6 flex flex-col gap-4 text-sm text-slate-400">
              <a href="mailto:thalapathiofficial8@gmail.com" className="flex items-center gap-3 transition-colors hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-slate-500" />
                <span className="truncate">thalapathiofficial8@gmail.com</span>
              </a>
              
              <a href="tel:+916369207378" className="flex items-center gap-3 transition-colors hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-slate-500" />
                <span>+91 6369207378</span>
              </a>
              
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <span>Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800/50 pt-8 text-xs text-slate-500 sm:flex-row">
          <p className="flex items-center gap-1.5">
            &copy; {currentYear} <Clock className="h-3 w-3" /> TimeMart. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            Built with 
            <span className="font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">React</span> 
            &amp; 
            <span className="font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;