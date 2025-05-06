"use client";

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
    const wrappedLocationText = formData.location
        ? formData.location.substring(0, 30)
        : "";

    const wrappedAdditionalInfo = formData.additionalInfo
        ? formData.additionalInfo.substring(0, 30)
        : "";

    const formattedDate = formData.date;

    switch (type) {
        case "wedding":
            return (
                <WeddingTemplate
                    style={selectedTemplate}
                    firstName={formData.firstName}
                    secondName={formData.secondName}
                    date={formattedDate}
                    time={formData.time}
                    location={wrappedLocationText}
                    additionalInfo={wrappedAdditionalInfo}
                />
            );
        case "birthday":
            return (
                <BirthdayTemplate
                    style={selectedTemplate}
                    firstName={formData.firstName}
                    age={formData.age}
                    date={formattedDate}
                    time={formData.time}
                    location={wrappedLocationText}
                    additionalInfo={wrappedAdditionalInfo}
                    uploadedImage={uploadedImage}
                />
            );
        case "funeral":
            return (
                <FuneralTemplate
                    style={selectedTemplate}
                    firstName={formData.firstName}
                    date={formattedDate}
                    time={formData.time}
                    location={wrappedLocationText}
                    additionalInfo={wrappedAdditionalInfo}
                    uploadedImage={uploadedImage}
                />
            );
        case "jubilee":
            return (
                <JubileeTemplate
                    style={selectedTemplate}
                    firstName={formData.firstName}
                    celebrationType={formData.age}
                    date={formattedDate}
                    time={formData.time}
                    location={wrappedLocationText}
                    additionalInfo={wrappedAdditionalInfo}
                    uploadedImage={uploadedImage}
                />
            );
        case "engagement":
            return (
                <EngagementTemplate
                    style={selectedTemplate}
                    firstName={formData.firstName}
                    parents={formData.parents}
                    date={formattedDate}
                    time={formData.time}
                    location={wrappedLocationText}
                    additionalInfo={wrappedAdditionalInfo}
                    uploadedImage={uploadedImage}
                />
            );
        default:
            return <div>Shablon topilmadi</div>;
    }
}