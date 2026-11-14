"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/Component/layouts/Navbar";
import HeroSection from "@/Component/layouts/HeroSection";

const Aboutus = dynamic(() => import("@/Component/cards/Aboutus"), {
  loading: () => <div className="section container" style={{ minHeight: 240 }} />,
});

const Bookshelf = dynamic(() => import("@/Component/projects/Bookshelf"), {
  loading: () => <div className="section container" style={{ minHeight: 320 }} />,
});

const Products = dynamic(() => import("@/Component/products/Products"), {
  loading: () => <div className="section container" style={{ minHeight: 260 }} />,
});

const Team = dynamic(() => import("@/Component/cards/Team"), {
  loading: () => <div className="section container" style={{ minHeight: 280 }} />,
});

const TestimonialCarousel = dynamic(
  () => import("@/Component/cards/Textimonial"),
  {
    loading: () => (
      <div className="section container" style={{ minHeight: 220 }} />
    ),
  }
);

const ContactForm = dynamic(() => import("@/Component/contact/ContactForm"), {
  loading: () => <div className="section container" style={{ minHeight: 360 }} />,
});

const Footer = dynamic(() => import("@/Component/common/Footer"), {
  loading: () => <div className="container" style={{ minHeight: 180 }} />,
});

const Services = dynamic(() => import("@/Component/layouts/Services"), {
  loading: () => <div className="section container" style={{ minHeight: 280 }} />,
});

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function Reveal({ children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Reveal>
        <Services />
      </Reveal>
      <Reveal>
        <Bookshelf />
      </Reveal>
      <Reveal>
        <Products />
      </Reveal>
      <Reveal>
        <Aboutus />
      </Reveal>
      <Reveal>
        <TestimonialCarousel />
      </Reveal>
      <Reveal>
        <Team />
      </Reveal>
      <Reveal>
        <ContactForm />
      </Reveal>
      <Footer />
    </>
  );
}
