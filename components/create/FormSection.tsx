"use client";

import { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
        <div className="space-y-4">
            {type === "wedding" && (
                <>
                    <div>
                        <label className="form-label">
                            Kuyov ismi <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={onInputChange}
                            className="w-full border border-slate-300 h-10 px-3 rounded-md"
                            placeholder="Kuyov ismini kiriting"
                        />
                    </div>
                    <div>
                        <label className="form-label">
                            Kelin ismi <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="secondName"
                            value={formData.secondName}
                            onChange={onInputChange}
                            className="w-full border border-slate-300 h-10 px-3 rounded-md"
                            placeholder="Kelin ismini kiriting"
                        />
                    </div>
                </>
            )}

            {type === "birthday" && (
                <>
                    <div>
                        <label className="form-label">
                            Ism <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={onInputChange}
                            className="w-full border border-slate-300 h-10 px-3 rounded-md"
                            placeholder="Ismni kiriting"
                        />
                    </div>
                    <div>
                        <label className="form-label">
                            Yosh <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="age"
                            value={formData.age}
                            onChange={onInputChange}
                            className="w-full border border-slate-300 h-10 px-3 rounded-md"
                            placeholder="Yoshni kiriting"
                        />
                    </div>
                </>
            )}

            {type === "funeral" && (
                <div>
                    <label className="form-label">
                        Marhumning ismi <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={onInputChange}
                        className="w-full border border-slate-300 h-10 px-3 rounded-md"
                        placeholder="Marhumning ismini kiriting"
                    />
                </div>
            )}

            {type === "jubilee" && (
                <>
                    <div>
                        <label className="form-label">
                            Ism <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={onInputChange}
                            className="w-full border border-slate-300 h-10 px-3 rounded-md"
                            placeholder="Ismni kiriting"
                        />
                    </div>
                    <div>
                        <label className="form-label">
                            Yosh <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="age"
                            value={formData.age}
                            onChange={onInputChange}
                            className="w-full border border-slate-300 h-10 px-3 rounded-md"
                            placeholder="Yoshni kiriting"
                        />
                    </div>
                </>
            )}

            {type === "engagement" && (
                <>
                    <div>
                        <label className="form-label">
                            Qiz ismi <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={onInputChange}
                            className="w-full border border-slate-300 h-10 px-3 rounded-md"
                            placeholder="Qiz ismini kiriting"
                        />
                    </div>
                    <div>
                        <label className="form-label">
                            Ota-onasi <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="parents"
                            value={formData.parents}
                            onChange={onInputChange}
                            className="w-full border border-slate-300 h-10 px-3 rounded-md"
                            placeholder="Ota-onasining ismini kiriting"
                        />
                    </div>
                </>
            )}

            <div>
                <label className="form-label">
                    Sana <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <Select value={day} onValueChange={onDayChange}>
                        <SelectTrigger className="w-full border border-slate-300 h-10">
                            <SelectValue placeholder="Kun" />
                        </SelectTrigger>
                        <SelectContent>
                            {days.map((d) => (
                                <SelectItem key={d.value} value={d.value}>
                                    {d.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={month} onValueChange={onMonthChange}>
                        <SelectTrigger className="w-full border border-slate-300 h-10">
                            <SelectValue placeholder="Oy" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((m) => (
                                <SelectItem key={m.value} value={m.value}>
                                    {m.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {dateError && <div className="text-red-500 text-xs mt-1">{dateError}</div>}
            </div>

            <div>
                <label className="form-label">
                    Vaqt <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <Select value={hours} onValueChange={onHoursChange}>
                        <SelectTrigger className="w-full border border-slate-300 h-10">
                            <SelectValue placeholder="Soat" />
                        </SelectTrigger>
                        <SelectContent>
                            {hoursOptions.map((h) => (
                                <SelectItem key={h.value} value={h.value}>
                                    {h.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={minutes} onValueChange={onMinutesChange}>
                        <SelectTrigger className="w-full border border-slate-300 h-10">
                            <SelectValue placeholder="Daqiqa" />
                        </SelectTrigger>
                        <SelectContent>
                            {minutesOptions.map((m) => (
                                <SelectItem key={m.value} value={m.value}>
                                    {m.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                <label className="form-label">
                    Manzil <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={onInputChange}
                    className="w-full border border-slate-300 h-10 px-3 rounded-md"
                    placeholder="Manzilni kiriting"
                />
            </div>

            <div>
                <label className="form-label">Qo'shimcha ma'lumot</label>
                <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={onInputChange}
                    className="w-full border border-slate-300 h-20 px-3 py-2 rounded-md resize-none"
                    placeholder="Qo'shimcha ma'lumotlarni kiriting"
                />
            </div>
        </div>
    );
}