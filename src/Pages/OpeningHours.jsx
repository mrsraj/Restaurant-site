import { motion } from "framer-motion";

export default function OpeningHours() {
    return (
        <section className="relative py-16 bg-gradient-to-br from-black via-slate-950 to-slate-900 overflow-hidden">

            {/* Background Blurs */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-amber-500/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 blur-3xl rounded-full" />

            <div className="relative max-w-4xl mx-auto px-6 text-center">

                {/* Title */}
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400"
                >
                    Opening Hours
                </motion.h3>

                {/* Table Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="overflow-hidden rounded-2xl shadow-xl border border-white/10 backdrop-blur-xl bg-white/5 w-full max-w-md mx-auto"
                >
                    <table className="w-full text-left">
                        <tbody className="text-gray-200">
                            {[
                                { day: "Monday – Friday", time: "11:00 AM – 10:00 PM" },
                                { day: "Saturday", time: "12:00 PM – 11:00 PM" },
                                { day: "Sunday", time: "12:00 PM – 9:00 PM" },
                            ].map((row, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-white/10 transition"
                                >
                                    <td className="px-5 py-3 font-medium">{row.day}</td>
                                    <td className="px-5 py-3">{row.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "140px", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="h-[3px] bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 mx-auto mt-8 rounded-full"
                />
            </div>
        </section>
    );
}
