"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ProposalCard } from "@/components/ui/proposal-card";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function SelectTypePage() {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const invitationTypes = [
    {
      id: "wedding",
      name: "To'y",
      description: "To'y marosimi uchun chiroyli taklifnomalar",
      image: "/tuy.webp",
    },
    {
      id: "birthday",
      name: "Tug'ilgan kun",
      description: "Tug'ilgan kun bazmi uchun maxsus taklifnomalar",
      image: "/tugulgankun.jpg",
    },
    {
      id: "funeral",
      name: "El oshi",
      description: "El oshi marosimi uchun taklifnomalar",
      image: "/osh.jpg",
    },
    {
      id: "jubilee",
      name: "Yubiley",
      description: "Yubiley tantanasi uchun taklifnomalar",
      image: "/yubiley.avif",
    },
    {
      id: "engagement",
      name: "Qiz uzatish",
      description: "Qiz uzatish marosimi uchun taklifnomalar",
      image: "/qizuzatish.jpg",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleTypeSelect = (typeId: string) => {
    router.push(`/create/${typeId}`);
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={hasMounted ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Taklifnoma turini tanlang
            </h1>
            <p className="text-lg text-gray-600 mb-12">
              Yaratmoqchi bo'lgan taklifnoma turini tanlang va keyingi bosqichga
              o'ting
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={hasMounted ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {invitationTypes.map((type) => (
              <ProposalCard
                key={type.id}
                id={type.id}
                title={type.name}
                description={type.description}
                imageSrc={type.image || "/placeholder.svg"}
                linkPath={`/create/${type.id}`}
                buttonText="Tanlash"
                onClick={() => handleTypeSelect(type.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
