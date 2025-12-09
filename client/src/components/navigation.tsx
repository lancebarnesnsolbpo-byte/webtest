import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Building, User, Phone, Sun, Moon } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/listings", label: "Listings", icon: Building },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-background/80 backdrop-blur-sm"
      }`}
      data-testid="navigation-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" data-testid="link-logo">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">SM</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-semibold text-lg text-foreground">Sarah Mitchell</span>
                <span className="block text-xs text-muted-foreground tracking-wider uppercase">Realty</span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="navigation-desktop">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`relative px-4 py-2 font-medium transition-colors ${
                    location === link.href
                      ? "text-accent"
                      : "text-foreground"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                  {location === link.href && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent rounded-full" />
                  )}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground"
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Link href="/contact" className="hidden md:block">
              <Button className="bg-accent text-accent-foreground font-semibold px-6" data-testid="button-contact-nav">
                Get in Touch
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border" data-testid="navigation-mobile">
          <nav className="flex flex-col py-4 px-4 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 py-3 ${
                      location === link.href ? "bg-accent/10 text-accent" : ""
                    }`}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
            <Link href="/contact" className="mt-2">
              <Button className="w-full bg-accent text-accent-foreground font-semibold" data-testid="button-contact-mobile">
                Get in Touch
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
