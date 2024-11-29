"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactDetail {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

export function ContactInfo() {
  const contactDetails: ContactDetail[] = [
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Office Address",
      content: (
        <div className="space-y-1">
          <p>Room 217, 1st floor</p>
          <p>Department of Bioscience and Bioengineering</p>
          <p>Indian Institute of Technology</p>
          <p>Jodhpur 342030, India</p>
        </div>
      ),
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      content: (
        <a
          href="tel:+912912801211"
          className="transition-colors hover:text-blue-600"
        >
          +91 (0) 291280 1211
        </a>
      ),
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      content: (
        <a
          href="mailto:pyadav@iitj.ac.in"
          className="transition-colors hover:text-blue-600"
        >
          pyadav@iitj.ac.in
        </a>
      ),
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Website",
      content: (
        <a
          href="http://home.iitj.ac.in/~pyadav"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-blue-600"
        >
          http://home.iitj.ac.in/~pyadav
        </a>
      ),
    },
  ];

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold text-blue-800">
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {contactDetails.map((detail, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 rounded-lg p-4 transition-colors hover:bg-gray-50"
          >
            <div className="text-blue-600">{detail.icon}</div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                {detail.title}
              </h3>
              <div className="text-gray-600">{detail.content}</div>
            </div>
          </div>
        ))}

        <div className="mt-8 flex justify-center space-x-4">
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            asChild
          >
            <a href="mailto:pyadav@iitj.ac.in">
              <Mail className="h-4 w-4" />
              <span>Send Email</span>
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
