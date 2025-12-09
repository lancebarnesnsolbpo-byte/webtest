import { Link } from "wouter";
import { Home, Mail, Phone, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: SiFacebook, href: "#", label: "Facebook" },
  { icon: SiInstagram, href: "#", label: "Instagram" },
  { icon: SiLinkedin, href: "#", label: "LinkedIn" },
  { icon: SiX, href: "#", label: "X" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground" data-testid="footer">
      <div className="border-t border-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-md bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-lg">SM</span>
                </div>
                <div>
                  <span className="font-semibold text-lg">Sarah Mitchell</span>
                  <span className="block text-xs text-primary-foreground/70 tracking-wider uppercase">Realty</span>
                </div>
              </div>
              <p className="text-primary-foreground/80 mb-6 max-w-md leading-relaxed">
                Your trusted partner in finding the perfect home. With over 15 years of experience, 
                I'm committed to making your real estate journey smooth and successful.
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-accent transition-colors hover-elevate"
                      aria-label={social.label}
                      data-testid={`link-social-${social.label.toLowerCase()}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span
                        className="text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer"
                        data-testid={`link-footer-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground/80">
                    123 Main Street, Suite 100<br />
                    Metropolitan City, ST 12345
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-primary-foreground/80">(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-primary-foreground/80">sarah@mitchellrealty.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Sarah Mitchell Realty. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center md:items-end gap-1">
                <div className="flex items-center gap-2">
                  <svg className="h-6 w-6 text-primary-foreground/80" viewBox="0 0 24 24" fill="currentColor" aria-label="Equal Housing Opportunity">
                    <path d="M12 1L1 8v14h22V8L12 1zm0 2.19L21 8.77V21H3V8.77l9-5.58zM7 11h10v2H7v-2zm0 4h10v2H7v-2z"/>
                  </svg>
                  <span className="text-xs text-primary-foreground/60">EQUAL HOUSING</span>
                </div>
                <span className="text-xs text-primary-foreground/60">OPPORTUNITY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
