"use client";

import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, User } from "lucide-react";
import client, { urlFor } from "@/lib/sanity-client";
import { myPortableTextComponents } from "../components/MyPortableComponent";

interface Author {
  name: string;
  image: string;
}

interface ProjectData {
  title: string;
  publishedAt: string;
  authors?: Author[];
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}

const ProjectDetailSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="mx-auto h-12 w-3/4" />
    <div className="flex items-center justify-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-32" />
    </div>
    {[...Array(3)].map((_, i) => (
      <div key={i} className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    ))}
  </div>
);

const AuthorsList = ({ authors }: { authors: Author[] }) => (
  <div className="flex flex-wrap items-center justify-center gap-4">
    {authors.map((author, index) => (
      <div key={index} className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          {author.image ? (
            <AvatarImage src={urlFor(author.image).url()} alt={author.name} />
          ) : (
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          )}
        </Avatar>
        <span className="text-sm">{author.name}</span>
        {index < authors.length - 1 && (
          <span className="ml-2 text-gray-400">•</span>
        )}
      </div>
    ))}
  </div>
);

const Page = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const [data, setData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setError("No project ID provided");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    client
      .fetch<ProjectData[]>(
        `*[_type == 'project' && _id == '${projectId}']{
          title,
          publishedAt,
          'authors': authors[]->{
            name,
            'image': image.asset._ref
          },
          content
        }`,
      )
      .then((result) => {
        if (result.length === 0) {
          setError("Project not found");
        } else {
          setData(result[0]);
        }
      })
      .catch((err) => {
        setError("Error loading project");
        console.error("Error fetching project:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-screen-2xl border-none outline-none">
          <CardContent className="py-6">
            <ProjectDetailSkeleton />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-3xl bg-red-50">
          <CardContent className="py-6 text-center">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-[90vh] px-4 py-8">
      <Card className="mx-auto max-w-screen-2xl border-none shadow-none outline-none">
        <CardHeader className="space-y-6 text-center">
          <CardTitle className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-3xl font-bold text-transparent">
            {data?.title}
          </CardTitle>

          <div className="space-y-4">
            {data?.authors && data.authors.length > 0 && (
              <AuthorsList authors={data.authors} />
            )}

            {data?.publishedAt && (
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <CalendarDays className="h-4 w-4" />
                <span className="text-sm">
                  {new Date(data.publishedAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="prose prose-blue max-w-none">
          {data?.content ? (
            <PortableText
              value={data.content}
              components={myPortableTextComponents}
            />
          ) : (
            <p className="text-center text-gray-500">No content available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
