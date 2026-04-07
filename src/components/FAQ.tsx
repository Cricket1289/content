import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FADE_UP, STAGGER_CONTAINER, VIEWPORT_ONCE } from "../utils/animations";
import contentData from "../data/content.json";

// Explicitly type the content import to handle the newly added 'faq' field
interface ContentSchema {
    faq: {
        title: string;
        items: { question: string; answer: string }[];
    };
    [key: string]: any;
}

const content = contentData as unknown as ContentSchema;
const { faq } = content;

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="px-6 py-20 bg-white">
            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <motion.div
                    variants={STAGGER_CONTAINER}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT_ONCE}
                    className="mb-12 text-center"
                >
                    <motion.h2
                        variants={FADE_UP}
                        className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl"
                    >
                        {faq.title}
                    </motion.h2>
                    <motion.div 
                        variants={FADE_UP}
                        className="mt-2 h-1 w-20 bg-primary mx-auto rounded-full" 
                    />
                </motion.div>

                {/* Accordion */}
                <motion.div
                    variants={STAGGER_CONTAINER}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT_ONCE}
                    className="space-y-4"
                >
                    {faq.items.map((item: { question: string; answer: string }, index: number) => (
                        <motion.div
                            key={index}
                            variants={FADE_UP}
                            className="overflow-hidden rounded-2xl border border-lavender bg-white transition-all hover:border-primary/20"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="flex w-full items-center justify-between p-6 text-left"
                            >
                                <span className="text-lg font-bold text-navy leading-snug">
                                    {item.question}
                                </span>
                                <span className={`text-2xl text-primary transition-transform duration-300 ${activeIndex === index ? "rotate-45" : ""}`}>
                                    +
                                </span>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-base leading-relaxed text-navy/60">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
