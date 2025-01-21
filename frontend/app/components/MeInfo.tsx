"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, Trophy } from "lucide-react";
import NEWS from "./News";
import client, { urlFor } from "@/lib/sanity-client";

interface ProfileData {
  professionalCareer: {
    record: string[];
  };
  academicRecords: {
    record: string[];
  };
  awardsHonours: {
    record: string[];
  };
  cv?: string;
  image?: string;
}

interface InfoSectionProps {
  title: string;
  records: string[] | undefined;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  records,
  icon: Icon,
  className,
}) => (
  <Card className={`flex h-[500px] flex-col ${className}`}>
    <CardHeader className="flex-shrink-0 border-b bg-white">
      <CardTitle className="flex items-center gap-2 text-xl font-semibold text-blue-700">
        <Icon className="h-6 w-6" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="custom-scrollbar flex-1 overflow-y-auto py-4">
      <ul className="space-y-0">
        {records?.map((record, index) => (
          <li
            key={index}
            className="flex items-start gap-3 rounded border-b border-gray-100 p-2 pb-2 text-gray-700 transition-colors last:border-0 hover:bg-gray-50"
          >
            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
            <span
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: record }}
            />
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const MeInfo: React.FC = () => {
  const [data, setData] = useState<ProfileData | null>(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == 'profile' ]{
          "professionalCareer": {
            "record": professionalCareer.record
          },
          "academicRecords": {
            "record": academicRecords.record
          },
          "awardsHonours": {
            "record": awardsHonours.record
          },
          cv,
          "image": profileImage.asset._ref
        }`,
      )
      .then((fetchedData: ProfileData[]) => {
        if (fetchedData.length > 0) {
          setData(fetchedData[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4">
      {/* Header Section with Profile and News */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Info */}
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center p-6">
            <div className="my-4 h-48 w-48 overflow-hidden rounded-full border-4 border-blue-200 shadow-lg">
              <img
                src={`${data?.image ? urlFor(data?.image).url() : ""}`}
                alt="Dr. Pankaj Yadav"
                className="h-[192px] w-[192px] object-cover"
              />
            </div>
            <div className="mt-4 space-y-2 text-center">
              <h3 className="font-serif text-2xl font-semibold text-blue-800">
                Dr. Pankaj Yadav
              </h3>
              <p className="text-lg text-blue-600">Associate Professor</p>
              <div className="text-gray-600">
                <p>Department of Bioscience and Bioengineering,</p>
                <p>Indian Institute of Technology, Jodhpur, India.</p>
              </div>
              {data?.cv && (
                <Button asChild variant="default" className="mt-4 w-full">
                  <Link
                    href={data.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download CV
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* News Section */}
        <Card className="md:col-span-2">
          <NEWS />
        </Card>
      </div>

      {/* Information Sections */}
      <div className="grid gap-6 lg:grid-cols-9">
        {/* Academic Records */}
        <div className="lg:col-span-3">
          <InfoSection
            title="Academic Records"
            records={data?.academicRecords.record}
            icon={BookOpen}
          />
        </div>

        {/* Professional Career */}
        <div className="lg:col-span-3">
          <InfoSection
            title="Professional Career"
            records={data?.professionalCareer.record}
            icon={GraduationCap}
          />
        </div>

        {/* Awards and Honours */}
        <div className="lg:col-span-3">
          <InfoSection
            title="Awards and Honours"
            records={data?.awardsHonours.record}
            icon={Trophy}
          />
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e2e8f0;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default MeInfo;
