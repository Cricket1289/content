import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServiceGrid from "../components/ServiceGrid";
import DoctorCarousel from "../components/DoctorCarousel";
import LabTests from "../components/LabTests";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className="bg-bg min-h-screen">
            <Layout>
                <Navbar />
                <Hero />
                <ServiceGrid />
                <DoctorCarousel />
                <LabTests />
                <FAQ />
                <Footer />
            </Layout>
        </div>
    );
}
