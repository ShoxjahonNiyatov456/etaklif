"use client";

import { useState } from "react";
import { Share2, Check, Loader2 } from "lucide-react";
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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { generateShareableLink } from "@/app/services/share";

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
    const [isGeneratingLink, setIsGeneratingLink] = useState(false);

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

    const handleShareInvitation = async () => {
        try {
            setIsGeneratingLink(true);
            const link = await generateShareableLink(
                type as string,
                selectedTemplate,
                formData
            );
            setShareableLink(link);
            setIsShareModalOpen(true);
            setIsGeneratingLink(false);
        } catch (error) {
            console.error("Error generating link:", error);
            setIsGeneratingLink(false);
            // Add error notification if you have a notification system
        }
    };

    const handlePaymentProcessing = async () => {
        try {
            setPaymentProcessing(true);
            // Simulate payment processing
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            // Generate link after successful payment
            setIsGeneratingLink(true);
            const link = await generateShareableLink(
                type as string,
                selectedTemplate,
                formData
            );
            setShareableLink(link);
            
            // Complete payment flow
            setIsConfirmDialogOpen(false);
            setPaymentCompleted(true);
            setPaymentProcessing(false);
            setIsGeneratingLink(false);
        } catch (error) {
            console.error("Error in payment processing:", error);
            setPaymentProcessing(false);
            setIsGeneratingLink(false);
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
                            <div className="flex items-center justify-center">
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                <span>Tayyorlanmoqda...</span>
                            </div>
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
                                <AlertDialogAction 
                                    onClick={handlePaymentProcessing} 
                                    disabled={paymentProcessing}
                                    className={paymentProcessing ? "opacity-70 cursor-not-allowed" : ""}
                                >
                                    {paymentProcessing ? (
                                        <div className="flex items-center">
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            To'lov amalga oshirilmoqda...
                                        </div>
                                    ) : (
                                        "Yakunlash"
                                    )}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-6 mt-6">
                    <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.6667 16L14.6667 20L21.3333 12"
                                stroke="#10B981"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle cx="16" cy="16" r="12" stroke="#10B981" strokeWidth="2" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-green-600">To'lov muvaffaqiyatli yakunlandi!</h3>
                    <p className="text-gray-600 text-center mx-6">
                        Siz ushbu taklifnomadan muhim voqealaringizni tahrirlash va baham ko'rish imkoniyatiga ega bo'ldingiz.
                    </p>
                    <button
                        onClick={shareableLink ? () => setIsShareModalOpen(true) : handleShareInvitation}
                        disabled={isGeneratingLink}
                        className={`px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors flex items-center justify-center ${isGeneratingLink ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isGeneratingLink ? (
                            <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                <span>Havola tayyorlanmoqda...</span>
                            </>
                        ) : (
                            "Taklifnomani ulashish"
                        )}
                    </button>
                </div>
            )}
            {shareableLink && (
                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    url={shareableLink}
                    title={`${formData?.groom?.name || "To'y"} taklif qiladi!`}
                />
            )}
        </div>
    );
}