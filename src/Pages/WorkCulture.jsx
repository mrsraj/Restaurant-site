import { motion } from "framer-motion";

export default function WorkCulture() {
    return (
        <section className="relative py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-black overflow-hidden">

            {/* Decorative Blur Circle */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-emerald-500/20 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/10 blur-3xl rounded-full" />

            <div className="relative max-w-5xl mx-auto px-6 text-center">
                {/* Heading */}
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400"
                >
                    Our Work Culture
                </motion.h3>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg leading-relaxed"
                >
                    At MyRestaurant, we believe that happy teams create happy customers.
                    We foster an inclusive, growth-focused work environment where creativity and hospitality thrive.
                </motion.p>

                {/* Divider */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "140px", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="h-[3px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 mx-auto rounded-full mb-6"
                />

                {/* Quote */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-400 italic text-lg"
                >
                    “We’re not just building a restaurant — we’re building a family.”
                </motion.p>
            </div>
        </section>
    );
}
