"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProposalCard } from "@/components/ui/proposal-card";

export default function Home() {
  const proposalTypes = [
    {
      id: "wedding",
      title: "To'y",
      description: "",
      imageSrc: "/tuy.webp",
      linkPath: "/select-type"
    },
    {
      id: "birthday",
      title: "Tug'ilgan Kun",
      description: "",
      imageSrc: "/tugulgankun.jpg",
      linkPath: "/select-type"
    },
    {
      id: "jubilee",
      title: "Yubiley",
      description: "",
      imageSrc: "/yubiley.avif",
      linkPath: "/select-type"
    }
  ]
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="pt-16">
      <section className="relative bg-gradient-to-r from-rose-50 to-primary-50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-lg"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
                Chiroyli <span className="text-primary-600">Taklifnomalar</span>{" "}
                Yarating
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                To'y, tug'ilgan kun, el oshi, yubiley va qiz uzatish marosimlari
                uchun zamonaviy va chiroyli taklifnomalarni yarating.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/select-type">
                  <button className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center group">
                    Boshlash
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
                <Link href="/examples">
                  <button className="px-6 py-3 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors">
                    Namunalarni ko'rish
                  </button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative h-[500px] w-full">
                <Image
                  src="/Mainimage.png"
                  alt="Taklifnoma namunasi"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Taklifnoma Turlari</h2>
            <p className="text-gray-600">
              Turli marosimlar uchun mo'ljallangan taklifnoma namunalari bilan
              tanishing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {proposalTypes.map((card) => (
              <ProposalCard
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.description}
                imageSrc={card.imageSrc}
                linkPath={card.linkPath}
                buttonText="Yaratish"
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/select-type">
              <button className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center mx-auto">
                Barcha turlarni ko'rish
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
