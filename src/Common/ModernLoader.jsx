import React from "react";

const ModernLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center py-10 col-span-full">
            {/* Spinning gradient ring */}
            <div className="relative h-14 w-14 mb-3">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 animate-spin" />
                <div className="absolute inset-2 rounded-full bg-[#1619d4]" />
            </div>

            {/* Text + shimmer bar */}
            <p className="text-sm font-semibold text-gray-300 tracking-wide">
                Loading menu...
            </p>
            <div className="h-1.5 w-32 mt-2 overflow-hidden rounded-full bg-gray-700">
                <div className="h-full w-1/2 animate-[loader_1.4s_ease-in-out_infinite] bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400" />
            </div>
        </div>
    );
};

export default ModernLoader;
