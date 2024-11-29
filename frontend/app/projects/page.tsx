"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import client, {urlFor} from "@/lib/sanity-client";
interface Project {
  _id: string;
  title: string;
  category: string;
  image?: string;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const router = useRouter();

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image ? urlFor(project.image).url() : "/placeholder.jpg"}
          alt={project.title}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <Badge
          variant="secondary"
          className="absolute top-4 right-4 bg- backdrop-blur-sm"
        >
          {project.category}
        </Badge>
      </div>

      <CardHeader className="space-y-2">
        <CardTitle className="line-clamp-2 text-lg min-h-[3.5rem]">
          {project.title}
        </CardTitle>
      </CardHeader>

      <CardFooter>
        <Button
          className="w-full group"
          onClick={() => router.push(`/project/?id=${project._id}`)}
        >
          Read More
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProjectsPage: React.FC = () => {
  const [data, setData] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState("Ongoing");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    client
      .fetch<Project[]>(
        `*[_type == 'project' && category != 'Archives']  | order(order asc){
          title,
          category,
          "image": mainImage.asset._ref,
          _id
        }`
      )
      .then(setData)
      .catch((error) => {
        console.error("Error fetching projects:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredProjects = data.filter(
    (project) => project.category === activeTab
  );

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Research Projects
        </h1>

        <div className="flex justify-center mb-8">
          <Tabs
            defaultValue="Ongoing"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-md mx-auto"
          >
            <TabsList className="grid w-full grid-cols-2 h-11">
              <TabsTrigger
                value="Ongoing"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-8 py-2"
              >
                Ongoing Projects
              </TabsTrigger>
              <TabsTrigger
                value="Completed"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-8 py-2"
              >
                Completed Projects
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <Card key={n} className="overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardFooter>
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="transition-all duration-300 opacity-100"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center mt-12">
                <p className="text-gray-500 text-lg">
                  No {activeTab.toLowerCase()} projects found.
                </p>
                <p className="text-gray-400 mt-2">
                  Check back later for updates.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
