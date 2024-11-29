"use client";

import Link from "next/link";
import { BASE_PATH } from "@/lib/constants";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    name: "Scopus",
    href: "https://www.scopus.com/authid/detail.uri?authorId=56467755700",
    icon: "/images/icons/Scopus.png",
    width: 72,
    height: 32,
  },
  {
    name: "Orcid",
    href: "http://orcid.org/0000-0001-7160-9209",
    icon: "/images/icons/orcid.png",
    width: 32,
    height: 32,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/pankaj-yadav-125a3030/",
    icon: "/images/icons/linkedin.png",
    width: 32,
    height: 32,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center text-sm text-gray-500 sm:text-left">
            © {currentYear}{" "}
            <Link
              href="/"
              className="font-medium transition-colors hover:text-blue-600"
            >
              Pankaj Yadav
            </Link>
            . All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "transition-transform hover:scale-110",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  "rounded-sm",
                )}
                aria-label={link.name}
              >
                <div className="relative">
                  <img
                    src={`${BASE_PATH}${link.icon}`}
                    alt={`${link.name} icon`}
                    className={`object-contain`}
                    style={{
                      width: `${link.width}px`,
                      height: `${link.height}px`,
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
