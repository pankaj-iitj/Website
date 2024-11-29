"use client";

import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu } from "lucide-react";
import { BASE_PATH } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navigationMenuTriggerStyle = () =>
  cn(
    "group inline-flex h-9 w-max items-center justify-center rounded-none px-4 py-2",
    "text-sm font-medium transition-colors hover:text-blue-600",
    "focus:bg-transparent focus:text-blue-600 focus:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[active]:text-blue-600 data-[state=open]:text-blue-600",
    "bg-transparent hover:bg-transparent",
  );

const Navbar = () => {
  const navbarItems = [
    { label: "Home", href: "/" },
    {
      label: "Teams",
      items: [
        { label: "Current Members", href: "/members" },
        { label: "Alumni", href: "/alumni" },
      ],
    },
    {
      label: "Research",
      items: [
        { label: "Publications", href: "/publications" },
        { label: "Projects", href: "/projects" },

        { label: "Collaborations", href: "/collaborators" },
      ],
    },
    { label: "Teaching", href: "/teaching" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "Resources", href: "/resources" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contactUs" },
    {
      label: "Quick Links",
      items: [
        {
          label: "BSBE",
          href: "https://iitj.ac.in/department/index.php?dept=biology&cat=Laboratories&id=computational_biology_bioinformatics",
        },
        { label: "Archives", href: "/archives" },
      ],
    },
  ];

  // Mobile menu component
  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger className="p-2 md:hidden">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <Accordion type="single" collapsible>
            {navbarItems.map((item, index) =>
              !item.items ? (
                <div key={index} className="py-2">
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </div>
              ) : (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="hover:text-blue-600">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2 pl-4">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="py-2 text-sm transition-colors hover:text-blue-600"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ),
            )}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <img
              src={`${BASE_PATH}/images/iitjLogo.png`}
              alt="Logo"
              className="h-8 w-8"
            />
            <img
              src={`${BASE_PATH}/images/bioLab.png`}
              alt="Logo"
              className="h-8 w-8"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenu />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            {navbarItems.map((item, index) => (
              <NavigationMenu key={index} className="inline-block">
                <NavigationMenuList className="flex-none">
                  <NavigationMenuItem>
                    {!item.items ? (
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    ) : (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-blue-600 data-[state=open]:bg-transparent">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-48 gap-1 rounded-md bg-white p-2 shadow-lg">
                            {item.items.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={subItem.href}
                                  legacyBehavior
                                  passHref
                                >
                                  {subItem.label === "BSBE" ? (
                                    <NavigationMenuLink
                                      className={cn(
                                        "block select-none rounded-sm px-3 py-2 text-sm",
                                        "hover:bg-gray-50 hover:text-blue-600",
                                        "focus:bg-gray-50 focus:text-blue-600",
                                        "no-underline outline-none transition-colors",
                                      )}
                                      target="_blank"
                                    >
                                      {subItem.label}
                                    </NavigationMenuLink>
                                  ) : (
                                    <NavigationMenuLink
                                      className={cn(
                                        "block select-none rounded-sm px-3 py-2 text-sm",
                                        "hover:bg-gray-50 hover:text-blue-600",
                                        "focus:bg-gray-50 focus:text-blue-600",
                                        "no-underline outline-none transition-colors",
                                      )}
                                    >
                                      {subItem.label}
                                    </NavigationMenuLink>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
