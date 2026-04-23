import React from "react";

const footerLinks = {
  Product: ["Features", "Integrations", "Pricing", "Changelog"],
  Developers: ["Docs", "API Reference", "Status", "Gitbook"],
  Company: ["About", "Careers", "Contact", "Privacy"],
  Socials: ["Twitter", "LinkedIn", "GitHub", "Discord"],
};

export const Footer = () => {
  return (
    <footer className="bg-background-tertiary border-t border-border-base pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
              </div>
              <span className="text-xl font-plus-jakarta font-bold tracking-tight">Vexa</span>
            </div>
            <p className="text-text-secondary text-sm max-w-xs leading-relaxed">
              Empowering developers to build intelligent doc-search experiences in minutes. Zero support tickets, instant answers.
            </p>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-manrope font-semibold text-text-primary mb-6">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-text-tertiary hover:text-accent-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-border-base/30 gap-6">
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} Vexa Inc. All rights reserved. Built with passion for developers.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-text-tertiary hover:text-text-primary">Privacy Policy</a>
            <a href="#" className="text-xs text-text-tertiary hover:text-text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
