"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import client from "@/lib/sanity-client";

interface NewsItem {
  _type: "news";
  title: string;
  url: string;
}

interface ProjectItem {
  _type: "project";
  _id: string;
  title: string;
}

interface ArchiveItem {
  _type: "archive";
  _id: string;
  title: string;
}

type NewsData = NewsItem | ProjectItem | ArchiveItem;

const NEWS: React.FC = () => {
  const [data, setData] = useState<NewsData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[
  (_type == "news") ||
  (_type == "project" && showInNews == true) ||
  (_type == "archive" && showInNews == true)
] | order(_createdAt desc) {
  _type,
  _id,
  title,
  url,
}`;

        const fetchedData = await client.fetch(query);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (item: NewsData) => {
    if (item._type === "project") {
      router.push(`/project/?id=${item._id}`);
    } else if (item._type === "archive") {
      router.push(`/archives/?id=${item._id}`);
    }
  };

  return (
    <Card className="h-full w-full border-none bg-blue-100">
      <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
        <CardTitle className="text-2xl font-bold text-white">
          Latest Updates
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[400px] bg-blue-100 p-5">
          <ul className="space-y-4">
            {data.map((item, index) => (
              <li key={index} className="group flex items-start">
                <ExternalLink className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-blue-500" />
                {item._type === "news" ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 transition-colors duration-200 hover:text-blue-800"
                  >
                    {item.title}
                  </a>
                ) : (
                  <button
                    onClick={() => handleItemClick(item)}
                    className="text-left text-blue-600 transition-colors duration-200 hover:text-blue-800"
                  >
                    {item.title}
                  </button>
                )}
              </li>
            ))}
          </ul>
          <ScrollBar />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NEWS;
