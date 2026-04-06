import { useState } from "react";
import { motion } from "framer-motion";
import content from "../data/content.json";

const { navbar } = content;

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="w-full bg-white border-b border-lavender z-50">
            {/* Top Tier: Logo, Links, Actions */}
            <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-extrabold text-lg shadow-lg shadow-primary/20">
                            {navbar.logo[0]}
                        </div>
                        <span className="hidden sm:block text-xl font-extrabold tracking-tighter text-primary">
                            {navbar.logo.slice(0, 4)}<span className="text-accent">{navbar.logo.slice(4)}</span>
                        </span>
                    </a>

                    {/* Address Selector (Simulated) */}
                    <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-lg bg-bg border border-lavender cursor-pointer hover:border-primary/30 transition-colors">
                        <span className="text-xl">📍</span>
                        <div className="text-[10px] uppercase font-bold text-navy/40 leading-none">
                            Delivery Address
                            <div className="text-xs text-navy mt-1">Select Address ⌄</div>
                        </div>
                    </div>
                </div>

                {/* Desktop Links (Main) */}
                <ul className="hidden xl:flex items-center gap-6">
                    {navbar.top_links.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.href}
                                className="text-sm font-bold text-primary transition-colors hover:text-accent"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right Actions: Cart & Login */}
                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-primary hover:bg-bg rounded-full transition-colors">
                        <span className="text-2xl">🛒</span>
                        <span className="absolute top-0 right-0 h-5 w-5 bg-accent text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-white">
                            0
                        </span>
                    </button>
                    <button className="hidden sm:flex items-center gap-2 rounded-xl border-2 border-primary/10 px-6 py-2.5 text-sm font-bold text-primary transition-all hover:border-primary hover:bg-primary hover:text-white">
                        {navbar.cta} <span className="text-xl">👤</span>
                    </button>
                    
                    {/* Mobile menu toggle */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden p-2 text-primary">
                        {mobileOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {/* Bottom Tier: Category Bar (Dark) */}
            <div className="bg-primary-dark overflow-x-auto no-scrollbar">
                <div className="mx-auto max-w-7xl px-6">
                    <ul className="flex items-center gap-8 py-3 whitespace-nowrap">
                        {navbar.categories.map((cat) => (
                            <li key={cat}>
                                <a
                                    href="#"
                                    className="text-xs font-semibold text-white/80 hover:text-white transition-colors"
                                >
                                    {cat}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
                <div className="xl:hidden bg-white border-t border-lavender p-6">
                    <ul className="flex flex-col gap-4">
                        {navbar.top_links.map((link) => (
                            <li key={link.label}>
                                <a href={link.href} className="text-base font-bold text-primary">{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
