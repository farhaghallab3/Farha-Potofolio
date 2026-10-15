import { Cursor } from "@/components/cursor";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { About, Capabilities, Contact, Experience, Footer } from "@/components/sections";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <Nav />
      <Cursor />
      <main id="main">
        <Hero />
        <Work />
        <Capabilities />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
