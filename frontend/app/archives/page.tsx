"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import client from "@/lib/sanity-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileX,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity-client";
import { PortableText } from "@portabletext/react";

interface Member {
  name: string;
  _id: string;
}

interface Archive {
  _id: string;
  title: string;
  shortDescription: string;
  related: Member[];
  order: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  carouselImages: any[];
  publishedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any[];
  showInNews: boolean;
}

export default function ArchiveList() {
  const [archives, setArchives] = useState<Archive[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [activeImageIndex, setActiveImageIndex] = useState<
    Record<string, number>
  >({});
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Handle URL parameter
  useEffect(() => {
    if (id) {
      setExpandedCards(new Set([id]));
      setActiveImageIndex((prev) => ({ ...prev, [id]: 0 }));
    }
  }, [id]);

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        setIsLoading(true);
        const result = await client.fetch<Archive[]>(
          `*[_type == 'archive'] | order(order asc) {
            _id,
            title,
            shortDescription,
            "related": related[]->{ name, _id },
            order,
            mainImage,
            carouselImages,
            publishedAt,
            content,
            showInNews
          }`,
        );
        setArchives(result);
      } catch (error) {
        console.error("Error fetching archives:", error);
      } finally {
        setIsLoading(false);
      }
    };

  fetchArchives();
  }, []);

  const toggleCard = (archiveId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(archiveId)) {
        newSet.delete(archiveId);
      } else {
        newSet.add(archiveId);
        setActiveImageIndex({ ...activeImageIndex, [archiveId]: 0 });
      }
      return newSet;
    });
  };

  const handleNextImage = (archiveId: string, maxIndex: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [archiveId]: (prev[archiveId] + 1) % maxIndex,
    }));
  };

  const handlePrevImage = (archiveId: string, maxIndex: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [archiveId]: (prev[archiveId] - 1 + maxIndex) % maxIndex,
    }));
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-48 w-full rounded-lg bg-gray-100"
            />
          ))}
        </div>
      );
    }

    if (!archives.length) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <FileX className="mb-4 h-12 w-12" />
          <p className="text-lg font-medium">No archives found</p>
          <p className="text-sm">Check back later for updates</p>
        </div>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {archives.map((archive) => (
          <Card
            key={archive._id}
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              expandedCards.has(archive._id)
                ? "h-[50vh] md:col-span-2 lg:col-span-3"
                : "h-auto"
            }`}
          >
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleCard(archive._id)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  {archive.title}
                </CardTitle>
                {expandedCards.has(archive._id) ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
              <p className="text-sm text-gray-500">
                {formatDate(archive.publishedAt)}
              </p>
            </CardHeader>

            <CardContent
              className={`transition-all duration-500 ease-in-out ${
                expandedCards.has(archive._id)
                  ? "h-[calc(50vh-4rem)]"
                  : "h-auto"
              }`}
            >
              {!expandedCards.has(archive._id) ? (
                <>
                  {archive.mainImage && (
                    <div className="relative mb-4 h-48 w-full">
                      <img
                        src={urlFor(archive.mainImage).url()}
                        alt={archive.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <p className="text-gray-600">{archive.shortDescription}</p>
                </>
              ) : (
                <div className="grid h-full grid-cols-2 gap-4 overflow-hidden">
                  <div className="overflow-y-auto pr-4">
                    <div className="prose prose-sm max-w-none">
                      <PortableText value={archive.content} />
                    </div>
                  </div>

                  <div className="relative flex flex-col">
                    {archive.carouselImages &&
                      archive.carouselImages.length > 0 && (
                        <div className="relative h-full">
                          <div className="absolute inset-0">
                            <img
                              src={urlFor(
                                archive.carouselImages[
                                  activeImageIndex[archive._id]
                                ],
                              ).url()}
                              alt={`${archive.title} - Image ${activeImageIndex[archive._id] + 1}`}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePrevImage(
                                  archive._id,
                                  archive.carouselImages.length,
                                );
                              }}
                              className="rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
                            >
                              <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNextImage(
                                  archive._id,
                                  archive.carouselImages.length,
                                );
                              }}
                              className="rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
                            >
                              <ChevronRight className="h-6 w-6" />
                            </button>
                          </div>

                          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                            <div className="flex space-x-1">
                              {archive.carouselImages.map((_, index) => (
                                <div
                                  key={index}
                                  className={`h-2 w-2 rounded-full ${
                                    index === activeImageIndex[archive._id]
                                      ? "bg-white"
                                      : "bg-white/50"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {!expandedCards.has(archive._id) &&
                archive.related.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium">Related Members:</p>
                    <div className="flex flex-wrap gap-2">
                      {archive.related.map((member) => (
                        <span
                          key={member._id}
                          className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600"
                        >
                          {member.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto my-8 w-full max-w-screen-2xl px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Archives</h1>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        {renderContent()}
      </ScrollArea>
    </div>
  );
}
