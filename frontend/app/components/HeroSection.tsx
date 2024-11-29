"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import client from "@/lib/sanity-client";
import { title } from "process";

export type CarouselImages = {
  title: string;
  imageUrl: string;
  link: string;
};

const HeroCarousel = () => {
  const [data, setData] = useState<CarouselImages[]>([]);

  useEffect(() => {
    client
      .fetch(
        "*[_type == 'carouselImage']{title,'imageUrl': image.asset->url,link}",
      )
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="relative h-fit w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {data.map((val, index) => (
            <CarouselItem key={index}>
              <div className="relative max-h-[80vh] w-full bg-lime-50/25 max-md:max-h-[40vh] md:max-h-[80vh]">
                <img
                  src={val.imageUrl}
                  alt={`${title}`}
                  className="w-full max-lg:h-[60vh] max-md:h-[40vh] md:h-[60vh]"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
