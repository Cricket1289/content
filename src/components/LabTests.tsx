import { motion } from "framer-motion";
import { FADE_UP, STAGGER_CONTAINER, VIEWPORT_ONCE } from "../utils/animations";
import content from "../data/content.json";

const { conditions } = content;

export default function LabTests() {
    return (
        <section className="px-6 py-12 bg-bg">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    variants={STAGGER_CONTAINER}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT_ONCE}
                    className="mb-10"
                >
                    <motion.h2
                        variants={FADE_UP}
                        className="text-2xl font-bold text-navy"
                    >
                        {conditions.title}
                    </motion.h2>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={STAGGER_CONTAINER}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT_ONCE}
                    className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                >
                    {conditions.items.map((item) => (
                        <motion.div
                            key={item.name}
                            variants={FADE_UP}
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                            className="bg-white p-4 rounded-xl shadow-sm border border-lavender flex items-center gap-4 cursor-pointer hover:border-primary/30 transition-all"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-bg text-2xl">
                                {item.icon}
                            </div>
                            <span className="text-sm font-bold text-navy/70 leading-tight">
                                {item.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
