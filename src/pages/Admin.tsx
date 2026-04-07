import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { STAGGER_CONTAINER } from "../utils/animations";

export default function Admin() {
    const [content, setContent] = useState<any>(null);
    const [sha, setSha] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("Update content via Admin UI");
    const [activeTab, setActiveTab] = useState("hero");

    // Fetch current content from our local proxy
    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3001/api/content");
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setContent(data.content);
            setSha(data.sha);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setError("");
        try {
            const res = await fetch("http://localhost:3001/api/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, sha, message }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            alert("✅ Successfully pushed to GitHub!");
            fetchContent(); // Refresh SHA
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const updateNestedField = (path: string, value: any) => {
        const newContent = { ...content };
        const keys = path.split(".");
        let current = newContent;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        setContent(newContent);
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-bg">
            <div className="text-primary font-bold animate-pulse">Loading GitHub Data...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-bg flex flex-col">
            {/* Header */}
            <header className="bg-primary text-white px-8 py-4 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-white rounded text-primary flex items-center justify-center font-bold">M</div>
                    <h1 className="font-bold text-lg tracking-tight">MediCare Portal Admin</h1>
                </div>
                <div className="flex items-center gap-4">
                    {error && <span className="text-accent text-sm font-bold">⚠️ {error}</span>}
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-accent hover:bg-accent-dark text-white font-bold px-6 py-2 rounded-lg transition-all disabled:opacity-50"
                    >
                        {saving ? "Pushing Changes..." : "Push to GitHub"}
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-lavender p-6 hidden md:block">
                    <nav className="space-y-2">
                        <TabButton id="hero" label="Hero Banner" active={activeTab} onClick={setActiveTab} />
                        <TabButton id="quick_actions" label="Quick Actions" active={activeTab} onClick={setActiveTab} />
                        <TabButton id="conditions" label="Health Conditions" active={activeTab} onClick={setActiveTab} />
                        <TabButton id="faq" label="FAQ Section" active={activeTab} onClick={setActiveTab} />
                        <TabButton id="navbar" label="Navigation" active={activeTab} onClick={setActiveTab} />
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        {activeTab === "hero" && (
                            <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="space-y-6">
                                <h2 className="text-2xl font-bold text-navy">Hero Section</h2>
                                <InputField 
                                    label="Main Title" 
                                    value={content.hero.title} 
                                    onChange={(v) => updateNestedField("hero.title", v)} 
                                />
                                <InputField 
                                    label="Search Placeholder" 
                                    value={content.hero.search_placeholder} 
                                    onChange={(v) => updateNestedField("hero.search_placeholder", v)} 
                                />
                                <InputField 
                                    label="Bottom Tagline" 
                                    value={content.hero.tagline} 
                                    onChange={(v) => updateNestedField("hero.tagline", v)} 
                                />
                            </motion.div>
                        )}

                        {activeTab === "quick_actions" && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-navy">Service Cards</h2>
                                {content.quick_actions.map((action: any, index: number) => (
                                    <div key={index} className="bg-white p-6 rounded-xl border border-lavender space-y-4">
                                        <InputField 
                                            label={`Action ${index + 1} Title`} 
                                            value={action.title} 
                                            onChange={(v) => {
                                                const newActions = [...content.quick_actions];
                                                newActions[index].title = v;
                                                setContent({...content, quick_actions: newActions});
                                            }} 
                                        />
                                        <InputField 
                                            label="Subtitle" 
                                            value={action.subtitle} 
                                            onChange={(v) => {
                                                const newActions = [...content.quick_actions];
                                                newActions[index].subtitle = v;
                                                setContent({...content, quick_actions: newActions});
                                            }} 
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "faq" && (
                            <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="show" className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-navy">FAQ Management</h2>
                                    <button 
                                        onClick={() => {
                                            const newFaq = { ...content.faq };
                                            newFaq.items.push({ question: "New Question", answer: "New Answer" });
                                            setContent({...content, faq: newFaq});
                                        }}
                                        className="text-sm font-bold text-primary px-4 py-2 border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all"
                                    >
                                        + Add Question
                                    </button>
                                </div>
                                
                                {content.faq.items.map((item: any, index: number) => (
                                    <div key={index} className="bg-white p-6 rounded-xl border border-lavender space-y-4 relative group">
                                        <button 
                                            onClick={() => {
                                                const newFaq = { ...content.faq };
                                                newFaq.items.splice(index, 1);
                                                setContent({...content, faq: newFaq});
                                            }}
                                            className="absolute top-4 right-4 text-navy/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            🗑️
                                        </button>
                                        <InputField 
                                            label="Question" 
                                            value={item.question} 
                                            onChange={(v) => {
                                                const newFaq = { ...content.faq };
                                                newFaq.items[index].question = v;
                                                setContent({...content, faq: newFaq});
                                            }} 
                                        />
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-navy/40 uppercase tracking-widest">Answer</label>
                                            <textarea 
                                                value={item.answer} 
                                                onChange={(e) => {
                                                    const newFaq = { ...content.faq };
                                                    newFaq.items[index].answer = e.target.value;
                                                    setContent({...content, faq: newFaq});
                                                }}
                                                className="w-full bg-white border border-lavender rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-primary transition-colors shadow-sm"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* Commit Message */}
                        <div className="mt-12 pt-8 border-t border-lavender">
                            <label className="block text-xs font-bold text-navy/40 uppercase mb-2">Commit Message</label>
                            <textarea 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full bg-white border border-lavender rounded-xl p-4 text-sm font-medium outline-none focus:border-primary transition-colors"
                                rows={2}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function TabButton({ id, label, active, onClick }: { id: string, label: string, active: string, onClick: (id: string) => void }) {
    return (
        <button 
            onClick={() => onClick(id)}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all ${active === id ? "bg-primary text-white shadow-md shadow-primary/20" : "text-navy/50 hover:bg-bg"}`}
        >
            {label}
        </button>
    );
}

function InputField({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
    return (
        <div className="space-y-2">
            <label className="block text-xs font-bold text-navy/40 uppercase tracking-widest">{label}</label>
            <input 
                type="text" 
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white border border-lavender rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-primary transition-colors shadow-sm"
            />
        </div>
    );
}
