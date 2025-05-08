"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareModal } from "@/components/ui/share-modal";
import { getCurrentUser } from "@/app/services/auth";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";

interface PaymentSectionProps {
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
    uploadedImage: string | null;
}

export default function PaymentSection({
    type,
    selectedTemplate,
    formData,
    uploadedImage,
}: PaymentSectionProps) {
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [shareableLink, setShareableLink] = useState("");
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const handlePayment = async () => {
        const currentUser = getCurrentUser();

        if (!currentUser) {
            alert("Avval ro'yxatdan o'ting yoki tizimga kiring.");
            setPaymentProcessing(false);
            return;
        }

        try {
            setPaymentProcessing(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setPaymentCompleted(true);

            const invitationData = {
                userId: currentUser.uid,
                firstName: formData.firstName,
                secondName: formData.secondName,
                date: formData.date,
                time: formData.time,
                location: formData.location,
                additionalInfo: formData.additionalInfo,
                age: formData.age,
                parents: formData.parents,
                uploadedImage: uploadedImage,
            };

            const { generateShareableLink } = await import("@/app/services/share");
            const link = await generateShareableLink(
                type as string,
                selectedTemplate,
                invitationData
            );

            setShareableLink(link);
        } catch (error) {
            console.error("To'lov jarayonida xatolik:", error);
            alert(
                "To'lov jarayonida xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
            );
        } finally {
            setPaymentProcessing(false);
        }
    };

    const handleShareInvitation = () => {
        if (typeof window !== "undefined") {
            setIsShareModalOpen(true);
        }
    };

    return (
        <div className="">
            {!paymentCompleted ? (
                <>
                    <Button
                        onClick={() => setIsConfirmDialogOpen(true)}
                        disabled={paymentProcessing}
                        className="w-full"
                    >
                        {paymentProcessing ? (
                            "Yakunlash amalga oshirilmoqda..."
                        ) : (
                            <>Yakunlash uchun bosing!</>
                        )}
                    </Button>
                    <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Rostan ham tugallashni xoxlaysizmi?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Bu amal taklifnomangizni yakunlaydi va ulashish uchun havola yaratadi. Davom etishni xohlaysizmi?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                                <AlertDialogAction onClick={handlePayment}>Yakunlash</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                        <Check className="h-5 w-5" />
                        <span>Taklifnoma muvoffaqiyatli yakunlandi!</span>
                    </div>
                    <Button
                        onClick={handleShareInvitation}
                        className="w-full flex items-center justify-center space-x-2"
                    >
                        <Share2 className="h-5 w-5" />
                        <span>Taklifnomani ulashish</span>
                    </Button>
                </div>
            )}
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                url={shareableLink}
                title="Taklifnomani ulashish" // Added title prop as it's required by ShareModalProps
            />
        </div>
    );
}