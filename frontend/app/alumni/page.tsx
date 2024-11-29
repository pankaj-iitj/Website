"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LinkedinIcon } from "lucide-react";
import client, { urlFor } from "@/lib/sanity-client";
import { PortableText } from "@portabletext/react";
import { myPortableTextComponents } from "../components/MyPortableComponent";

interface Member {
  name: string;
  isAlumni: boolean;
  image?: {
    asset?: {
      _ref: string;
    };
  };
  linkedin?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any;
}

interface MemberCategory {
  categoryName: string;
  order: number;
  alumniMembers: Member[];
}

const AlumniCard: React.FC<{ member: Member }> = ({ member }) => {
  const imageUrl = member?.image?.asset?._ref
    ? urlFor(member.image.asset._ref).url()
    : "";

  return (
    <Card className="group w-full max-w-xs transition-all duration-300 hover:shadow-xl">
      <CardContent className="relative h-[320px] p-0">
        <div className="relative flex h-1/3 items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {member.linkedin ? (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="group relative">
                        <Avatar className="h-32 w-32 border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                          <AvatarImage
                            src={imageUrl}
                            alt={member.name}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {member.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 transition-all duration-300 group-hover:bg-black/20">
                          <LinkedinIcon className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                      <AvatarImage
                        src={imageUrl}
                        alt={member.name}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {member.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </TooltipTrigger>
                {member.linkedin && (
                  <TooltipContent>
                    <p>View LinkedIn Profile</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex h-[270px] flex-col px-6 pb-6 pt-20 text-center">
          <h3 className="bg-blue-600 bg-clip-text text-2xl font-bold text-transparent">
            {member.name}
          </h3>
          <h4 className="mt-2 text-lg font-medium text-blue-600">
            <PortableText
              value={member.description}
              components={myPortableTextComponents}
            />
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

const CategorySection: React.FC<{ category: MemberCategory }> = ({
  category,
}) => {
  if (!category.alumniMembers || category.alumniMembers.length === 0)
    return null;

  return (
    <div className="mb-16">
      <h2 className="mb-8 text-4xl font-bold text-blue-800">
        {category.categoryName}
      </h2>
      <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.alumniMembers.map((member, index) => (
          <AlumniCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

const Alumni: React.FC = () => {
  const [categories, setCategories] = useState<MemberCategory[]>([]);

  useEffect(() => {
    client
      .fetch<MemberCategory[]>(
        `*[_type == "memberCategory"] | order(order asc) {
          categoryName,
          order,
          "alumniMembers": alumniMembers[]-> {
            name,
            isAlumni,
            image,
            linkedin,
            description
          }
        }`,
      )
      .then((data) => {
        // Filter out categories with no alumni members
        console.log(data);

        const categoriesWithAlumni = data.filter(
          (category) =>
            category.alumniMembers && category.alumniMembers.length > 0,
        );
        setCategories(categoriesWithAlumni);
      })
      .catch((error) => {
        console.error("Error fetching alumni categories:", error);
      });
  }, []);

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="mb-16 text-center text-6xl font-bold">
        <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Alumni
        </span>
      </h1>
      {categories.map((category, index) => (
        <CategorySection key={index} category={category} />
      ))}
    </div>
  );
};

export default Alumni;
