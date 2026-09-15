import { motion } from "framer-motion";
import {
    FiWifi,
    FiSun,
    FiUsers,
    FiMusic,
    // FiWheelchair,
    FiCalendar
} from "react-icons/fi";

const facilities = [
    { label: "Free Wi-Fi", icon: FiWifi },
    { label: "Outdoor Seating", icon: FiSun },
    { label: "Private Dining Rooms", icon: FiUsers },
    { label: "Live Music Nights", icon: FiMusic },
    // { label: "Wheelchair Accessible", icon: FiWheelchair },
    { label: "Online Reservations", icon: FiCalendar },
];

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            when: "beforeChildren",
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: "easeOut" },
    },
};

function Facilities() {
    return (
        <section className="py-14 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-400">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-2">
                        Our Space
                    </p>
                    <h3 className="text-3xl font-extrabold">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400">
                            Facilities
                        </span>
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
                        Everything you need for a comfortable, memorable dining experience.
                    </p>
                </motion.div>

                <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid gap-5 sm:grid-cols-2 md:grid-cols-3"
                >
                    {facilities.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.li
                                key={index}
                                variants={itemVariants}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-5 shadow-[0_18px_45px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
                            >
                                {/* gradient accent */}
                                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-sky-500/20" />

                                <div className="relative flex flex-col items-center text-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-cyan-400 to-sky-500 text-slate-950 shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                                        <Icon className="text-xl" />
                                    </div>
                                    <p className="text-sm font-semibold text-slate-50">
                                        {item.label}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        Available throughout your visit at no extra cost.
                                    </p>
                                </div>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </section>
    );
}

export default Facilities;
