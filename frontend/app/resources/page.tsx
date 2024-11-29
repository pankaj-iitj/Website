"use client";

import { useEffect, useState } from "react";
import client, { urlFor } from "@/lib/sanity-client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "lucide-react";

interface ResourceItem {
  name: string;
  link: string;
  description: string;
}

interface Resource {
  color: string;
  icon: string;
  name: string;
  items: ResourceItem[];
}

export default function Resources() {
  const [data, setData] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resourcesData = await client.fetch<Resource[]>(
          "*[_type == 'labResources']{'color':color.hex,'icon': icon.asset._ref,name,'items':items[]{name, link,description}}"
        );
        console.log(resourcesData);
        setData(resourcesData);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Lab Resources
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((resource, index) => (
            <Card 
              key={index}
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardHeader>
                <CardTitle 
                  className="flex items-center gap-3 text-lg"
                  style={{ color: resource.color }}
                >
                  <img
                    src={urlFor(resource.icon).url()}
                    alt={`${resource.name} icon`}
                    className="h-5 w-5"
                    style={{ color: resource.color }}
                  />
                  {resource.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {resource.items && (
                  <ul className="space-y-2">
                    {resource.items.map((item, idx) => (
                      <li 
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Link className="h-4 w-4 mt-1 flex-shrink-0" />
                        <a 
                          href={item.link}
                          className="hover:text-blue-600 hover:underline"
                        >
                          <span className="font-medium">{item.name}:</span>{" "}
                          {item.description}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}