"use client";

import { useEffect, useState } from "react";
import client, { urlFor } from "@/lib/sanity-client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Institution {
  _id: string;
  name: string;
  url: string;
  country?: string;
}

interface Category {
  _id: string;
  title: string;
  order: number;
}

interface Collaborator {
  name: string;
  institution: {
    _ref: string;
  };
  category: {
    _ref: string;
  };
  details: string[];
  img?: {
    asset?: {
      _ref: string;
    };
  };
  linkedin?: string;
}

interface CollaboratorWithReferences extends Omit<Collaborator, 'institution' | 'category'> {
  institution: Institution;
  category: Category;
}

// Skeleton components remain the same
const CollaboratorCardSkeleton = () => (
  <Card className="w-full">
    <CardContent className="p-6">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-5 w-36" />
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mx-auto h-4 w-5/6" />
          <Skeleton className="mx-auto h-4 w-4/6" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const TabsSkeleton = () => (
  <div className="w-full space-y-6">
    <div className="mx-auto w-full max-w-md">
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <CollaboratorCardSkeleton key={i} />
        ))}
    </div>
  </div>
);

const CollaboratorsPage = () => {
  const [data, setData] = useState<CollaboratorWithReferences[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        setIsLoading(true);
        
        // First fetch categories to ensure proper ordering
        const categoriesResult = await client.fetch<Category[]>(
          `*[_type == 'collaboratorCategory'] | order(order asc) {
            _id,
            title,
            order
          }`
        );
        
        setCategories(categoriesResult);
        if (categoriesResult.length > 0 && !activeTab) {
          setActiveTab(categoriesResult[0]._id);
        }

        // Fetch collaborators with expanded references
        const result = await client.fetch<CollaboratorWithReferences[]>(
          `*[_type == 'collaborator'] | order(category.order asc) {
          _id,
            name,
            details,
            img,
            linkedin,
            "institution": *[_type == 'institution' && _id == ^.institution._ref][0] {
              _id,
              name,
              url,
              country
            },
            "category": *[_type == 'collaboratorCategory' && _id == ^.category._ref][0] {
              _id,
              title,
              order
            }
          }`
        );
        
        setData(result);
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollaborators();
  }, []);

  const filteredCollaborators = data.filter(
    (collab) => collab.category?._id === activeTab
  );

  const renderCollaborators = () => {
    if (filteredCollaborators.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Users className="mb-4 h-12 w-12" />
          <p className="text-lg font-medium">No collaborators found</p>
          <p className="text-sm">Try switching to a different category</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCollaborators.map((collab, index) => (
          <Card
            key={index}
            className="w-full transition-shadow hover:shadow-lg"
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={
                      collab?.img?.asset?._ref
                        ? urlFor(collab.img.asset._ref).url()
                        : ""
                    }
                    alt={collab.name}
                  />
                  <AvatarFallback>
                    {collab.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center">
                  <h3 className="text-lg font-semibold">{collab.name}</h3>
                  <Button
                    variant="link"
                    className="text-blue-600 hover:text-blue-800"
                    asChild
                  >
                    <a
                      href={collab.institution.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      {collab.institution.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                  {collab.linkedin && (
                    <Button
                      variant="link"
                      className="text-blue-600 hover:text-blue-800"
                      asChild
                    >
                      <a
                        href={collab.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        LinkedIn Profile
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                  <div className="space-y-1">
                    {collab.details.map((detail, i) => (
                      <p key={i} className="text-sm text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {isLoading ? (
          <Skeleton className="mx-auto h-10 w-64" />
        ) : (
          <h1 className="text-center text-3xl font-bold text-blue-600">
            Our Collaborators
          </h1>
        )}

        {isLoading ? (
          <TabsSkeleton />
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList
              className={`mx-auto grid w-full max-w-md grid-cols-${categories.length}`}
            >
              {categories.map((category) => (
                <TabsTrigger key={category._id} value={category._id}>
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category._id} value={category._id} className="mt-6">
                {renderCollaborators()}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default CollaboratorsPage;