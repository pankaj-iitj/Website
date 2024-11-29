"use client";

import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { BookOpen } from "lucide-react";
import client from "@/lib/sanity-client";
import { myPortableTextComponents } from "../components/MyPortableComponent";

interface PublicationCategory {
  _id: string;
  title: string;
  content: Array<{
    _type: string;
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }>;
}

const PublicationCategory: React.FC<PublicationCategory> = ({
  title,
  content,
}) => (
  <section>
    <div className="flex items-center gap-2 mb-4">
      <BookOpen className="h-5 w-5 text-blue-600" />
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>

    <div className="grid gap-2">
      <div className="prose prose-sm max-w-none">
        <PortableText value={content} components={myPortableTextComponents} />
      </div>
    </div>
  </section>
);

const PublicationList: React.FC = () => {
  const [publications, setPublications] = useState<PublicationCategory[]>([]);

  useEffect(() => {
    client
      .fetch<PublicationCategory[]>(
        '*[_type == "Publication"] | order(order asc) { _id, title, content,  }'
      )
      .then((data) => {
        console.log(data);
        setPublications(data);
      })
      .catch((error) => {
        console.error("Error fetching publications:", error);
      });
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 max-w-screen-2xl">
      <h1 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
        Publications
      </h1>
      <div className="space-y-10">
        {publications.map((pub) => (
          <PublicationCategory
            _id={pub._id}
            key={pub._id}
            title={pub.title}
            content={pub.content}
          />
        ))}
      </div>
    </div>
  );
};

export default PublicationList;
