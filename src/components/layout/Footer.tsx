import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'About Us', path: '#' },
    { name: 'Contact Support', path: '#' },
    { name: 'FAQ', path: '#' },
    { name: 'Terms of Service', path: '#' },
    { name: 'Privacy Policy', path: '#' },
  ];

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">FoodDash</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {footerLinks.map((link) => (
              <Link key={link.name} to={link.path} className="hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>
          <p className="text-center text-sm">
            &copy; {currentYear} FoodDash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;