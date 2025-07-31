"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/app/firebase";
import WeddingTemplate from "@/components/invitation-templates/WeddingTemplate";
import BirthdayTemplate from "@/components/invitation-templates/BirthdayTemplate";
import FuneralTemplate from "@/components/invitation-templates/FuneralTemplate";
import JubileeTemplate from "@/components/invitation-templates/JubileeTemplate";
import EngagementTemplate from "@/components/invitation-templates/EngagementTemplate";

interface PreviewSectionProps {
  type: string;
  selectedTemplate: string;
  formData: {
    firstName: string;
    secondName: string;
    date: string;
    time: string;
    location: string;
    additionalInfo: string;
    age: string;
    parents: string;
  };
  uploadedImage?: string | null | undefined;
}

export default function PreviewSection({
  type,
  selectedTemplate,
  formData,
  uploadedImage,
}: PreviewSectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(selectedTemplate);

  // Shablon o'zgarganda yangilash
  useEffect(() => {
    // Shablon o'zgartirilganda, uni darhol yangilash
    setCurrentTemplate(selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const wrappedLocationText = formData.location
    ? formData.location.substring(0, 30)
    : "";
  const wrappedAdditionalInfo = formData.additionalInfo
    ? formData.additionalInfo.substring(0, 30)
    : "";
  const formattedDate = formData.date;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg"
    >
      <div className="flex justify-center">
        <div className="max-w-md w-full bg-white rounded-lg overflow-hidden shadow-xl">
          {type === "wedding" ? (
            <WeddingTemplate
              style={currentTemplate}
              firstName={formData.firstName}
              secondName={formData.secondName}
              date={formattedDate}
              time={formData.time}
              location={wrappedLocationText}
              additionalInfo={wrappedAdditionalInfo}
            />
          ) : type === "birthday" ? (
            <BirthdayTemplate
              style={currentTemplate}
              firstName={formData.firstName}
              date={formattedDate}
              age={formData.age}
              time={formData.time}
              location={wrappedLocationText}
              additionalInfo={wrappedAdditionalInfo}
            />
          ) : type === "funeral" ? (
            <FuneralTemplate
              style={currentTemplate}
              firstName={formData.firstName}
              date={formattedDate}
              time={formData.time}
              location={wrappedLocationText}
              additionalInfo={wrappedAdditionalInfo}
            />
          ) : type === "jubilee" ? (
            <JubileeTemplate
              style={currentTemplate}
              firstName={formData.firstName}
              age={formData.age}
              date={formattedDate}
              time={formData.time}
              location={wrappedLocationText}
              additionalInfo={wrappedAdditionalInfo}
            />
          ) : type === "engagement" ? (
            <EngagementTemplate
              style={currentTemplate}
              firstName={formData.firstName}
              parents={formData.parents}
              date={formattedDate}
              time={formData.time}
              location={wrappedLocationText}
              additionalInfo={wrappedAdditionalInfo}
            />
          ) : (
            <div className="p-8 text-center text-gray-500">
              Shablon topilmadi
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
