import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle } from "lucide-react";

const services = [
  { name: "Diamond Cut Repairs", href: "/services#diamond-cut" },
  { name: "Cosmetic Repairs", href: "/services#cosmetic" },
  { name: "Custom Colour", href: "/services#custom-colour" },
  { name: "Buckle Wheel Repair", href: "/services#buckle-repair" },
  { name: "Cracked Wheel Repair", href: "/services#cracked-repair" },
  { name: "Wheel Restoration", href: "/services#wheel-restoration" },
];

const quickLinks = [
  { name: "Gallery", href: "/gallery" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="ASA Wheel Repairs Logo" 
                className="h-20 w-auto"
              />
              {/* <div>
                <p className="font-display text-lg font-bold tracking-wide">
                  ASA WHEEL REPAIRS
                </p>
                <p className="text-muted-foreground text-xs">
                  Est. 2012
                </p>
              </div> */}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sydney's leading mobile CNC wheel repair specialists. Professional diamond cut, 
              cosmetic repairs, and custom colour services with pickup and delivery available.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/asawheelrepairs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/asawheelrepairs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/61450693539"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:0450693539"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Phone className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-secondary-foreground group-hover:text-primary">
                      0450 693 539
                    </p>
                    <p className="text-xs">Call or SMS</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@asawheelrepairs.com.au"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-secondary-foreground group-hover:text-primary">
                      info@asawheelrepairs.com.au
                    </p>
                    <p className="text-xs">Email us anytime</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 mt-0.5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-secondary-foreground">
                    Sydney, NSW
                  </p>
                  <p className="text-xs">Mobile service available</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 mt-0.5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-secondary-foreground">
                    Mon - Sat: 7am - 6pm
                  </p>
                  <p className="text-xs">Sunday by appointment</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/20 bg-secondary/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} ASA Wheel Repairs. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
