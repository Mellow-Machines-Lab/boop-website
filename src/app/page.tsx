import { Hero } from "@/components/sections/Hero";
import { Day } from "@/components/sections/Day";
import { Mac } from "@/components/sections/Mac";
import { Moods } from "@/components/sections/Moods";
import { Flavors } from "@/components/sections/Flavors";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

/* One page with one job: get an email onto the waitlist. */
export default function Page() {
  return (
    <main>
      <Hero />
      <Day />
      <Mac />
      <Moods />
      <Flavors />
      <Faq />
      <Footer />
    </main>
  );
}
