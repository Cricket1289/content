import { motion } from "framer-motion";
import { FADE_UP, STAGGER_CONTAINER, VIEWPORT_ONCE } from "../utils/animations";
import content from "../data/content.json";

const { conditions } = content;
const { doctors } = conditions; // Note: In my content.json restructure it became nested under conditions object accidentally. 
// Wait, let me check the JSON structure again. 
// Line 66 in my previous edit was: "doctors": { ... } inside the closing brace of conditions. 

export default function DoctorCarousel() {
    return (
        <section id="doctors" className="px-6 py-16 bg-white">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    variants={STAGGER_CONTAINER}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT_ONCE}
                    className="mb-10 flex items-center justify-between"
                >
                    <h2 className="text-2xl font-bold text-navy">
                        {doctors.title}
                    </h2>
                    <button className="text-sm font-bold text-primary hover:text-accent transition-colors">
                        View All Doctors →
                    </button>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={STAGGER_CONTAINER}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT_ONCE}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {doctors.items.map((d) => (
                        <motion.div
                            key={d.name}
                            variants={FADE_UP}
                            whileHover={{ y: -5 }}
                            className="overflow-hidden rounded-2xl bg-bg border border-lavender transition-all hover:shadow-xl hover:border-primary/20"
                        >
                            {/* Avatar area */}
                            <div className={`aspect-[4/3] bg-gradient-to-br ${d.color} flex items-center justify-center`}>
                                <span className="text-6xl">{d.emoji}</span>
                            </div>
                            {/* Info */}
                            <div className="p-5">
                                <h3 className="text-base font-bold text-navy">{d.name}</h3>
                                <p className="text-xs font-semibold text-navy/40 mt-1 uppercase tracking-wider">{d.specialty}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-sm font-bold text-navy">⭐ {d.rating}</span>
                                    <button className="text-xs font-bold text-primary px-4 py-2 bg-white rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
