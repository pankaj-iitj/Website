"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";

interface MapProps {
  location?: string;
  className?: string;
  height?: string;
}

export default function Map({
  location = "IIT Jodhpur",
  className = "",
  height = "400px",
}: MapProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const GOOGLE_MAPS_API_KEY =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Card
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-100">
          <Skeleton className="h-full w-full" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
          <MapPin className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Map Unavailable
          </h3>
          <p className="text-sm text-gray-500">
            Unable to load the map. Please try again later or{" "}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                location,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              view on Google Maps
            </a>
          </p>
        </div>
      )}

      <iframe
        className={`h-full w-full transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
          location,
        )}&zoom=15`}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        title={`Map showing location of ${location}`}
      />

      <div className="absolute bottom-0 right-0 bg-white bg-opacity-75 p-2">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            location,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600"
        >
          <MapPin className="h-3 w-3" />
          View Larger Map
        </a>
      </div>
    </Card>
  );
}
