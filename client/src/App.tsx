import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Features from "./components/Features";
import ExperiencesShowcase from "./components/ExperiencesShowcase";
import Menu from "./components/Menu";
import VisitorGuideFaq from "./components/VisitorGuideFaq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MobileBookingBar from "./components/MobileBookingBar";
import InquiryDialog from "./components/InquiryDialog";
import { SmoothScroll } from "./components/motion";
import { scrollToSection } from "./lib/scroll";
import NotFound from "@/pages/not-found";

function HomePage() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => {
      scrollToSection(hash, false);
    }, 180);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="grain min-h-screen w-full max-w-[100vw] overflow-x-clip bg-paper text-ink">
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:px-5 focus:py-3 focus:bg-surface focus:text-ink focus:border focus:border-ink focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Story />
        <Features />
        <ExperiencesShowcase />
        <Menu />
        <VisitorGuideFaq />
        <Contact />
      </main>
      <Footer />
      <MobileBookingBar />
      <InquiryDialog />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SmoothScroll>
          <Router />
        </SmoothScroll>
      </LanguageProvider>
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default App;
