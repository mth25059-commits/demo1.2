import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SelectedWorks from "./components/SelectedWorks";
import Journal from "./components/Journal";
import Explorations from "./components/Explorations";
import Stats from "./components/Stats";
import Contact from "./components/Contact";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-bg text-text-primary">
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Navbar />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="work">
          <SelectedWorks />
        </section>

        <Journal />

        <Explorations />

        <Stats />

        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}
