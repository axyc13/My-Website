import Hero from "@/src/app/components/home/Hero";
import Header from "@/src/app/components/common/Header";
import Footer from "@/src/app/components/common/Footer";

import "./globals.css";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
