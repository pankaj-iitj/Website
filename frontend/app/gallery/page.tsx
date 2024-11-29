"use client";

import { useEffect, useState } from "react";
import client, { urlFor } from "@/lib/sanity-client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  image: string;
  description: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const data = await client.fetch<GalleryImage[]>(
          '*[_type == "galleryImage"]{"image":image.asset._ref,description}'
        );
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!isModalOpen) return;

    switch (e.key) {
      case "ArrowLeft":
        handlePreviousImage();
        break;
      case "ArrowRight":
        handleNextImage();
        break;
      case "Escape":
        setIsModalOpen(false);
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen]);

  if (isLoading) {
    return (
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-8 [column-fill:_balance]">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="aspect-square bg-gray-200 rounded-md animate-pulse mb-4"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-8 [column-fill:_balance]">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative mb-4 break-inside-avoid cursor-pointer group"
            onClick={() => {
              setCurrentImageIndex(index);
              setIsModalOpen(true);
            }}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={urlFor(image.image).url()}
                alt={image.description}
                loading="lazy"
                className="w-full h-auto transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-center px-4 py-2">
                  {image.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="max-w-[95vw] max-h-[90vh] h-[90vh] p-0 overflow-hidden"
          onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
          onTouchMove={(e) => setTouchEnd(e.touches[0].clientX)}
          onTouchEnd={() => {
            const diff = touchStart - touchEnd;
            if (diff > 50) {
              handleNextImage();
            }
            if (diff < -50) {
              handlePreviousImage();
            }
          }}
        >
          <DialogHeader className="absolute top-2 right-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsModalOpen(false)}
              className="rounded-full bg-black/20 hover:bg-black/40 text-white"
            />
          </DialogHeader>

          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePreviousImage}
              className="absolute left-2 z-20 rounded-full bg-black/20 hover:bg-black/40 text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={urlFor(images[currentImageIndex]?.image).url()}
                  alt={images[currentImageIndex]?.description || ""}
                  className="max-w-full h-full max-h-[calc(90vh-8rem)] w-auto h-auto object-contain"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-center">
                {images[currentImageIndex]?.description}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextImage}
              className="absolute right-2 rounded-full bg-black/20 hover:bg-black/40 text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}