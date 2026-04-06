import { motion } from "framer-motion";
import { FADE_UP, STAGGER_CONTAINER, VIEWPORT_ONCE } from "../utils/animations";
import content from "../data/content.json";

const { footer } = content;

export default function Footer() {
    return (
        <footer className="bg-primary-dark pt-16 pb-8 text-white" id="footer">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    variants={STAGGER_CONTAINER}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT_ONCE}
                    className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
                >
                    {/* Brand column */}
                    <motion.div variants={FADE_UP} className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary font-extrabold text-lg">
                                {footer.brand.name[0]}
                            </div>
                            <span className="text-xl font-extrabold tracking-tighter">
                                {footer.brand.name.slice(0, 4)}<span className="text-accent">{footer.brand.name.slice(4)}</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-white/50 max-w-xs">
                            {footer.brand.slogan}
                        </p>
                    </motion.div>

                    {/* Link columns */}
                    {Object.entries(footer.links).map(([heading, links]) => (
                        <motion.div key={heading} variants={FADE_UP}>
                            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white/40">
                                {heading}
                            </h4>
                            <ul className="flex flex-col gap-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-white/60 transition-colors hover:text-accent"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Divider */}
                <div className="my-10 h-px bg-white/10" />

                {/* Bottom bar */}
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-xs text-white/30">
                        {footer.copyright}
                    </p>
                    <div className="flex gap-6 text-xl text-white/30">
                        <span>𝕏</span>
                        <span>in</span>
                        <span>📸</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
