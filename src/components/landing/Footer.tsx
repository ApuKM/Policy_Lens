"use client";

import NextLink from "next/link";
import { Search } from "lucide-react";

// Social icons as inline SVGs to avoid extra dependencies
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.855L1.254 2.25H8.08l4.259 5.632 5.905-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const footerLinks = {
  Product: [
    { label: "Features", href: "/#ai-capabilities" },
    { label: "Trending Policies", href: "/#trending" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Policy Library", href: "/library" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press" },
    { label: "Contact", href: "/contact" },
    { label: "Partners", href: "/partners" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR Compliance", href: "/gdpr" },
    { label: "Security", href: "/security" },
  ],
};

const socials = [
  {
    label: "Twitter / X",
    href: "https://twitter.com/policylens",
    Icon: TwitterIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/policylens",
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/policylens",
    Icon: GitHubIcon,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@policylens",
    Icon: YouTubeIcon,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-[#091832] text-[#9baece]">
      {/* Top CTA banner */}
      <div
        className="py-14 text-center"
        style={{
          background:
            "linear-gradient(135deg, #1a3a6b 0%, #0f2345 60%, #091832 100%)",
          borderBottom: "1px solid #152f58",
        }}
      >
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Ready to understand policy like never before?
        </h3>
        <p className="text-[#9baece] mb-7 text-base max-w-xl mx-auto">
          Join thousands of analysts and researchers who trust PolicyLens for fast, accurate
          civic intelligence.
        </p>
        <NextLink
          href="/register"
          className="inline-flex items-center gap-2 bg-[#d4960a] hover:bg-[#f4ba18] text-[#040c1f] font-bold px-8 py-3 rounded-full transition-all duration-200 shadow-lg shadow-[#d4960a]/30 text-base"
        >
          Start for Free →
        </NextLink>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <NextLink href="/" className="flex items-center gap-2 text-white font-extrabold text-xl">
              <Search className="w-6 h-6 text-[#d4960a]" />
              PolicyLens
            </NextLink>
            <p className="text-sm text-[#6987b6] leading-relaxed">
              AI-powered civic intelligence that makes government policy accessible to everyone.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#152f58] text-[#6987b6] hover:bg-[#d4960a] hover:text-[#040c1f] transition-all duration-200 border border-[#1a3a6b]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">
                {group}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <NextLink
                      href={link.href}
                      className="text-sm text-[#6987b6] hover:text-[#f7ce47] transition-colors"
                    >
                      {link.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-[#152f58] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5a5650]">
            © {year} PolicyLens, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <NextLink href="/privacy" className="text-xs text-[#5a5650] hover:text-[#9baece] transition-colors">
              Privacy
            </NextLink>
            <NextLink href="/terms" className="text-xs text-[#5a5650] hover:text-[#9baece] transition-colors">
              Terms
            </NextLink>
            <NextLink href="/cookies" className="text-xs text-[#5a5650] hover:text-[#9baece] transition-colors">
              Cookies
            </NextLink>
            <span className="text-xs text-[#5a5650]">Made with ♥ for civic transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
