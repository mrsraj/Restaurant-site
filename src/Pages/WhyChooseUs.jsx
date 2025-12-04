import { motion } from "framer-motion";

export default function WhyChooseUs() {
    return (
        <section className="relative py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-black overflow-hidden">

            {/* Decorative Blurred Shapes */}
            <div className="absolute -top-10 right-10 w-56 h-56 bg-orange-500/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 blur-3xl rounded-full" />

            <div className="relative max-w-5xl mx-auto px-6 text-center">

                {/* Title */}
                <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400"
                >
                    Why Choose Us?
                </motion.h3>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed"
                >
                    From the moment you walk in, we make it our mission to create a memorable experience —
                    whether you’re here for a casual lunch or a celebration dinner.
                    We promise food that comforts, ambiance that warms, and service that delights.
                </motion.p>

                {/* Animated Divider */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "150px", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="h-[3px] bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 mx-auto mt-8 rounded-full"
                />
            </div>
        </section>
    );
}
