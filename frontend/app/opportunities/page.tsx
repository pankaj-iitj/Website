"use client";

import { Handshake } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Section {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const sections: Section[] = [
  {
    title: "Project Work",
    description:
      "We offer short-term (6 months) projects with direct implications in the industry. You are welcome to bring your own project proposal to work on, and we will be happy to host you if it aligns with our research areas. Please contact me if you wish to undertake your bachelor's or master's thesis. External students (non-IITJ) may also approach us for their thesis work. Accommodation will be provided at the hostel, subject to availability.",
    buttonText: "Explore Projects",
    buttonLink: "/projects",
  },
  {
    title: "PhD Position",
    description:
      "We are interested in candidates passionate about big data analytics, deep learning, statistical genetics, or bioinformatics. To secure a PhD position, you will need to apply to the PhD programme at IIT Jodhpur.",
    buttonText: "Contact Us",
    buttonLink: "/contactUs",
  },
  {
    title: "Post-doctoral Position",
    description:
      "Postdoctoral fellows with their own funding are welcome to reach out to me directly. I can assist in drafting project proposals and finding funding options.",
    buttonText: "Contact Us",
    buttonLink: "/contactUs",
  },
  {
    title: "Interested in Joining?",
    description:
      "If you are interested in joining us, please send your updated CV and a brief motivation letter to pyadav@iitj.ac.in.",
    buttonText: "Meet Our Team",
    buttonLink: "/members",
  },
];

export default function JoinUs() {
  return (
    <div className="p-8 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          <Handshake className="h-8 w-8 text-blue-900" />
          Join Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{section.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={section.buttonLink}>
                  <Button className="bg-blue-500 hover:bg-blue-700">
                    {section.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
