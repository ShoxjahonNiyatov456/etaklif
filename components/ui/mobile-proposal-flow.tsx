"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import Link from "next/link";

interface MobileProposalFlowProps {
  children: ReactNode;
  onComplete?: () => void;
}

interface TabItem {
  id: string;
  title: string;
  content: ReactNode;
  isCompleted: boolean;
}

export function MobileProposalFlow({
  children,
  onComplete,
}: MobileProposalFlowProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabs, setTabs] = useState<TabItem[]>([
    {
      id: "info",
      title: "Ma'lumotlar",
      content: null,
      isCompleted: false,
    },
    {
      id: "template",
      title: "Shablon",
      content: null,
      isCompleted: false,
    },
    {
      id: "preview",
      title: "Taklifnoma",
      content: null,
      isCompleted: false,
    },
  ]);
  const [isPaid, setIsPaid] = useState(false);

  const updateTabContent = (index: number, content: ReactNode) => {
    setTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      newTabs[index].content = content;
      return newTabs;
    });
  };

  const markTabAsCompleted = (index: number) => {
    setTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      newTabs[index].isCompleted = true;
      return newTabs;
    });
  };

  const goToNextTab = () => {
    if (activeTabIndex < tabs.length - 1) {
      markTabAsCompleted(activeTabIndex);
      setActiveTabIndex(activeTabIndex + 1);
    }
  };

  const goToTab = (index: number) => {
    if (
      tabs[index].isCompleted ||
      index === activeTabIndex ||
      index === activeTabIndex + 1
    ) {
      setActiveTabIndex(index);
    }
  };

  useEffect(() => {
    updateTabContent(0, children);
  }, [children]);

  return (
    <div className="flex flex-col h-full">
      {/* Tab navigatsiyasi */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-sm">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => goToTab(index)}
            className={`flex flex-col items-center ${index === activeTabIndex
              ? "text-primary-600"
              : tab.isCompleted
                ? "text-green-600"
                : "text-gray-400"
              } 
              ${index > activeTabIndex && !tab.isCompleted ? "opacity-50" : ""
              }`}
            disabled={index > activeTabIndex && !tabs[index - 1].isCompleted}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
              ${index === activeTabIndex
                  ? "bg-primary-100 text-primary-600"
                  : tab.isCompleted
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400"
                }`}
            >
              {tab.isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className="text-xs font-medium">{tab.title}</span>
          </button>
        ))}
      </div>
      <div className="flex-grow overflow-auto">
        {tabs[activeTabIndex].content}
      </div>
      {activeTabIndex === 2 && !isPaid && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <button className="w-full px-4 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors">
              Yakunlash uchun bosing!
            </button>
          </div>
        </div>
      )}
      {activeTabIndex < 2 && (
        <div className="p-4 border-t bg-white">
          <button
            onClick={goToNextTab}
            disabled={!tabs[activeTabIndex].content}
            className={`w-full px-4 py-3 bg-primary-600 text-white font-medium rounded-xl flex items-center justify-center
              ${!tabs[activeTabIndex].content
                ? "opacity-50"
                : "hover:bg-primary-700"
              } transition-colors`}
          >
            {activeTabIndex === 0 ? "Davom etish" : "Keyingi bosqich"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
