"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { LinkedinIcon } from "lucide-react";
import { myPortableTextComponents } from "../components/MyPortableComponent";
import client, { urlFor } from "@/lib/sanity-client";

interface Member {
  _id: string;
  name: string;
  role: {
    title: string;
  };
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any;
  image: string;
  linkedin?: string;
}

interface MemberCategory {
  _id: string;
  categoryName: string;
  order: number;
  members: Member[];
}

const MemberCardSkeleton = () => (
  <Card className="w-full max-w-3xl">
    <CardContent className="flex h-60 p-0">
      <div className="relative w-2/6 bg-gray-200">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex w-4/6 flex-col justify-center space-y-3 p-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const SkeletonSection = () => (
  <div className="mb-12">
    <Skeleton className="mx-auto mb-8 h-10 w-48" />
    <div className="grid grid-cols-2 justify-items-center gap-6 md:grid-cols-2 2xl:grid-cols-2">
      {[...Array(4)].map((_, index) => (
        <MemberCardSkeleton key={index} />
      ))}
    </div>
  </div>
);

function getBackgroundColorClass(index: number): string {
  const colors = ["bg-blue-100", "bg-sky-100"];
  return colors[index % colors.length];
}

const MemberCard: React.FC<{ member: Member; colorClass: string }> = ({
  member,
  colorClass,
}) => (
  <Card className="group w-full max-w-3xl transition-all duration-300 hover:shadow-xl">
    <CardContent className="flex h-60 p-0">
      <div className={`${colorClass} relative w-2/6 overflow-hidden`}>
        {member.linkedin ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block h-full w-full"
                >
                  <div className="relative h-full w-full">
                    <img
                      src={urlFor(member.image).url()}
                      alt={member.name}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
                    <LinkedinIcon className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>View LinkedIn Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={urlFor(member.image).url()}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          </div>
        )}
      </div>
      <div className="flex w-4/6 flex-col justify-center space-y-3 p-6">
        <div>
          <h3 className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-2xl font-bold text-transparent">
            {member.name}
          </h3>
          {member.role && 
          <Badge variant="secondary" className="mt-1">
            {member.role.title}
          </Badge>}
        </div>
        <div className="prose-sm scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent max-h-36 overflow-y-auto text-sm text-gray-600">
          <PortableText
            value={member.description}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

const CategorySection: React.FC<{
  category: MemberCategory;
}> = ({ category }) => {
  if (!category.members?.length) return null;

  return (
    <div className="mb-12">
      <h2 className="mb-8 text-3xl font-bold">
        <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-left text-transparent">
          {category.categoryName}
        </span>
      </h2>
      <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 2xl:grid-cols-2">
        {category.members.map((member, index) => (
          <MemberCard
            key={index}
            member={member}
            colorClass={getBackgroundColorClass(index)}
          />
        ))}
      </div>
    </div>
  );
};

const Members: React.FC = () => {
  const [categories, setCategories] = useState<MemberCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "memberCategory"] | order(order asc) {
      categoryName,
      order,
      "members": currentMembers[]-> {
        name,
        "role": role->{title},
        description,
        "image": image.asset._ref,
        linkedin
      }
    }`;

    client
      .fetch<MemberCategory[]>(query)
      .then((fetchedData) => {
        console.log(fetchedData);
        
        setCategories(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {[...Array(2)].map((_, index) => (
          <SkeletonSection key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-[90vh] px-4 py-8">
      {categories.map((category,index) => (
        <CategorySection key={index} category={category} />
      ))}
    </div>
  );
};

export default Members;
