"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormSectionProps {
  type: string;
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
  day: string;
  month: string;
  hours: string;
  minutes: string;
  dateError: string | null;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onDayChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onHoursChange: (value: string) => void;
  onMinutesChange: (value: string) => void;
}

export default function FormSection({
  type,
  formData,
  day,
  month,
  hours,
  minutes,
  dateError,
  onInputChange,
  onDayChange,
  onMonthChange,
  onHoursChange,
  onMinutesChange,
}: FormSectionProps) {
  const months = [
    { value: "0", label: "Yanvar" },
    { value: "1", label: "Fevral" },
    { value: "2", label: "Mart" },
    { value: "3", label: "Aprel" },
    { value: "4", label: "May" },
    { value: "5", label: "Iyun" },
    { value: "6", label: "Iyul" },
    { value: "7", label: "Avgust" },
    { value: "8", label: "Sentyabr" },
    { value: "9", label: "Oktyabr" },
    { value: "10", label: "Noyabr" },
    { value: "11", label: "Dekabr" },
  ];

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));

  const hoursOptions = Array.from({ length: 24 }, (_, i) => ({
    value: String(i).padStart(2, "0"),
    label: String(i).padStart(2, "0"),
  }));

  const minutesOptions = [
    { value: "00", label: "00" },
    { value: "15", label: "15" },
    { value: "30", label: "30" },
    { value: "45", label: "45" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg space-y-6"
    >
      <h3 className="text-xl font-semibold mb-4 text-white">
        Ma'lumotlarni kiriting
      </h3>
      {type === "wedding" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-300">
              Kuyov ismi <span className="text-red-400">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              placeholder="Kuyov ismini kiriting"
              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondName" className="text-gray-300">
              Kelin ismi <span className="text-red-400">*</span>
            </Label>
            <Input
              id="secondName"
              name="secondName"
              value={formData.secondName}
              onChange={onInputChange}
              placeholder="Kelin ismini kiriting"
              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </>
      )}
      {type === "birthday" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-300">
              Ism <span className="text-red-400">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              placeholder="Ismni kiriting"
              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age" className="text-gray-300">
              Yosh <span className="text-red-400">*</span>
            </Label>
            <Input
              id="age"
              name="age"
              value={formData.age}
              onChange={onInputChange}
              placeholder="Yoshni kiriting"
              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </>
      )}
      {type === "funeral" && (
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-300">
            El Oshi egasining ismi <span className="text-red-400">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onInputChange}
            placeholder="El Oshi egasining ismini kiriting"
            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      )}
      {type === "jubilee" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-300">
              Ism <span className="text-red-400">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              placeholder="Ismni kiriting"
              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age" className="text-gray-300">
              Yosh <span className="text-red-400">*</span>
            </Label>
            <Input
              id="age"
              name="age"
              value={formData.age}
              onChange={onInputChange}
              placeholder="Yoshni kiriting"
              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </>
      )}
      {type === "engagement" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-300">
              Qiz ismi <span className="text-red-400">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              placeholder="Qiz ismini kiriting"
              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parents" className="text-gray-300">
              Ota-onasi <span className="text-red-400">*</span>
            </Label>
            <Input
              id="parents"
              name="parents"
              value={formData.parents}
              onChange={onInputChange}
              placeholder="Ota-onasining ismini kiriting"
              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </>
      )}
      <div className="space-y-2">
        <Label className="text-gray-300">
          Sana <span className="text-red-400">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <Select value={day} onValueChange={onDayChange}>
            <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:ring-purple-500">
              <SelectValue placeholder="Kun" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-red-900 ">
              {days.map((d) => (
                <SelectItem
                  key={d.value}
                  value={d.value}
                  className="focus:bg-purple-900/50 focus:text-white"
                >
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={month} onValueChange={onMonthChange}>
            <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:ring-purple-500">
              <SelectValue placeholder="Oy" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-red-900">
              {months.map((m) => (
                <SelectItem
                  key={m.value}
                  value={m.value}
                  className="focus:bg-purple-900/50 focus:text-white"
                >
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {dateError && <p className="text-red-400 text-sm mt-1">{dateError}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-gray-300">
          Vaqt <span className="text-red-400">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <Select value={hours} onValueChange={onHoursChange}>
            <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:ring-purple-500">
              <SelectValue placeholder="Soat" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-red-900">
              {hoursOptions.map((h) => (
                <SelectItem
                  key={h.value}
                  value={h.value}
                  className="focus:bg-purple-900/50 focus:text-white"
                >
                  {h.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={minutes} onValueChange={onMinutesChange}>
            <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:ring-purple-500">
              <SelectValue placeholder="Daqiqa" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-red-900">
              {minutesOptions.map((m) => (
                <SelectItem
                  key={m.value}
                  value={m.value}
                  className="focus:bg-purple-900/50 focus:text-white"
                >
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location" className="text-gray-300">
          Manzil <span className="text-red-400">*</span>
        </Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={onInputChange}
          placeholder="Manzilni kiriting"
          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="additionalInfo" className="text-gray-300">
          Qo'shimcha ma'lumot
        </Label>
        <Textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={onInputChange}
          placeholder="Qo'shimcha ma'lumotlarni kiriting"
          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500 resize-none h-24"
        />
      </div>
    </motion.div>
  );
}
