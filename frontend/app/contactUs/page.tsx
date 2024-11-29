"use client";

import { ContactInfo } from "./components/ContactInfo";
import Map from "./components/Map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Mail } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-[2000px]">
        {/* Desktop Layout */}
        <div className="hidden gap-8 md:grid md:grid-cols-2">
          <div className="h-full">
            <ContactInfo />
          </div>
          <div className="h-[600px]">
            <Map />
          </div>
        </div>

        {/* Mobile Layout with Tabs */}
        <div className="md:hidden">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Info
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="p-4">
              <ContactInfo />
            </TabsContent>
            <TabsContent value="map" className="p-4">
              <div className="h-[400px]">
                <Map />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Optional Form Section */}
        {/* <div className="mt-8">
          <ContactUsForm />
        </div> */}
      </div>
    </div>
  );
}
