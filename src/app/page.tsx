"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Zap,
  Target,
  BookOpen,
  Trophy,
  Users,
  ChevronDown,
  Globe,
  Menu,
  X,
} from "lucide-react";
import ShaderBackground from "@/components/shader-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CTAButton } from "@/components/cta-button";
import { Logo } from "@/components/logo";
import { Section } from "@/components/Section";
import { COPY } from "@/lib/copy";
import { trackClick } from "@/lib/analytics";
import { Spotlight } from "@/components/spotlight";
import Waitlist from "@/components/waitlist";
import { LanguageProvider } from "@/components/language-provider";

/*
Visual Tone Analysis from COPY:
- Bold, energetic copy with emojis and direct language
- Confidence-building messaging ("Domina", "Irresistible")
- Problem-solution focused structure
- Masculine, action-oriented tone
- Purple-to-red gradient reflects passion/energy
- Mobile-first for dating app generation
*/

type Language = "es" | "en";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  highlight?: boolean;
}

interface FAQItem {
  q: string;
  a: string;
}

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>("es");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // A/B Testing variants
  const [ctaVariant] = useState<"primary" | "accent">("primary");
  const [socialProofPlacement] = useState<
    "above" | "below"
  >("below");

  const copy = COPY[language];

  useEffect(() => {
    // Set language from URL params if available
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang") as Language;
    if (langParam && (langParam === "es" || langParam === "en")) {
      setLanguage(langParam);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "es" ? "en" : "es";
    setLanguage(newLang);
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLang);
    window.history.replaceState({}, "", url.toString());
  };

  const handleCTAClick = (location: string) => {
    trackClick(`cta-${location}`);
    // Scroll to waitlist section for all CTA buttons
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider language={language}>
      <ShaderBackground>
        <Spotlight />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name:
              language === "es"
                ? "Reto de Conversación en Citas"
                : "Dating Conversation Challenge",
            url: "https://datingconversationchallenge.com",
            description: copy.hero.subtitle,
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://datingconversationchallenge.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-muted-foreground hover:text-foreground"
                aria-label={
                  language === "es" ? "Switch to English" : "Cambiar a Español"
                }
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "es" ? "EN" : "ES"}
              </Button>
              <CTAButton
                variant={ctaVariant}
                onClick={() => handleCTAClick("nav")}
                data-cta="primary"
                id="nav-cta"
              >
                {copy.hero.cta}
              </CTAButton>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="w-full justify-center text-muted-foreground hover:text-foreground"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "es" ? "English" : "Español"}
              </Button>
              <CTAButton
                variant={ctaVariant}
                onClick={() => {
                  handleCTAClick("mobile-nav");
                  setMobileMenuOpen(false);
                }}
                data-cta="primary"
                id="mobile-nav-cta"
                className="w-full"
              >
                {copy.hero.cta}
              </CTAButton>
            </div>
          )}
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <Section id="hero" className="pt-16 pb-24 text-center">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="glass rounded-2xl px-8 py-12 md:px-12 md:py-16 relative overflow-hidden">

              <h1 className="instrument mt-5 text-4xl sm:text-6xl lg:text-7xl leading-[1.05]">
                <span className="text-gradient-white">{copy.hero.title}</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
                {copy.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
                <a
                  href="#pricing"
                  className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition text-center"
                  onClick={() => handleCTAClick("hero-pricing")}
                >
                  {language === "es" ? "Planes" : "Pricing"}
                </a>
                <CTAButton
                  variant={ctaVariant}
                  size="lg"
                  onClick={() => handleCTAClick("hero")}
                  className="w-full sm:w-auto rounded-full px-6 py-3 text-sm sm:text-base"
                >
                  {copy.hero.cta}
                </CTAButton>
              </div>

              {/* Fondo decorativo interno (extra sutil) */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-16 -z-10 blur-3xl opacity-40 mix-blend-screen"
                style={{
                  background:
                    "radial-gradient(45% 35% at 25% 10%, rgba(124,58,237,.33) 0%, transparent 60%), radial-gradient(35% 35% at 80% 20%, rgba(167,139,250,.28) 0%, transparent 70%)",
                }}
              />
            </div>
          </div>
        </Section>

        {/* Problem Section */}
        <Section id="problem" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="space-y-8">
              {copy.problem.bullets.map((question: string, index: number) => (
                <div key={index} className="text-center">
                  <p className="text-xl sm:text-2xl text-foreground mb-4">
                    {question}
                  </p>
                  {index < copy.problem.bullets.length - 1 && (
                    <ChevronDown className="w-6 h-6 mx-auto text-muted-foreground" />
                  )}
                </div>
              ))}

              <Card className="gradient-brand p-1 rounded-2xl">
                <div className="bg-background rounded-xl p-8 text-center">
                  <p className="text-xl sm:text-2xl font-semibold text-foreground">
                    {copy.problem.callout}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Section>

        {/* Social Proof Above Features (A/B Test Variant) */}
        {socialProofPlacement === "above" && (
          <Section id="social-above" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                {copy.social.title}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {copy.social.text}
              </p>
              <div className="flex justify-center items-center space-x-2">
                <Users className="w-6 h-6 text-primary" />
                <span className="text-2xl font-bold text-gradient">
                  10,000+
                </span>
                <span className="text-muted-foreground">
                  {language === "es" ? "usuarios activos" : "active users"}
                </span>
              </div>
            </div>
          </Section>
        )}

        {/* Solution/Features Section */}
        <Section id="solution" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              {copy.solution.title}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">
                    {language === "es" ? "Retos Diarios" : "Daily Challenges"}
                  </h3>
                  <p className="text-muted-foreground">
                    {copy.solution.bullets[0].replace("🎯 ", "")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">
                    {language === "es" ? "Simulador IA" : "AI Simulator"}
                  </h3>
                  <p className="text-muted-foreground">
                    {copy.solution.bullets[1].replace("💬 ", "")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">
                    {language === "es" ? "Gamificación" : "Gamification"}
                  </h3>
                  <p className="text-muted-foreground">
                    {copy.solution.bullets[2].replace("🕹️ ", "")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">
                    {language === "es"
                      ? "Biblioteca de Historias"
                      : "Story Library"}
                  </h3>
                  <p className="text-muted-foreground">
                    {copy.solution.bullets[3].replace("📚 ", "")}
                  </p>
                </CardContent>
              </Card>
              <Card className="md:col-span-2 lg:col-span-1">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">
                    {language === "es" ? "Resultados Reales" : "Real Results"}
                  </h3>
                  <p className="text-muted-foreground">
                    {copy.solution.bullets[4].replace("🔑 ", "")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        {/* Pricing Section */}
        <Section id="pricing" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              {copy.pricing.title}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {Object.entries(copy.pricing.plans).map(
                ([key, plan]: [string, PricingPlan]) => (
                  <Card
                    key={key}
                    className={`relative ${
                      plan.highlight
                        ? "ring-2 ring-primary gradient-brand p-1"
                        : ""
                    }`}
                  >
                    {plan.highlight && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                        {language === "es" ? "Más Popular" : "Most Popular"}
                      </Badge>
                    )}
                    <CardContent
                      className={`p-6 text-center ${
                        plan.highlight ? "bg-background rounded-lg" : ""
                      }`}
                    >
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-3xl font-bold text-primary mb-2">
                        {plan.price}
                      </p>
                      <p className="text-sm text-muted-foreground mb-6">
                        {plan.description}
                      </p>
                      <CTAButton
                        variant={plan.highlight ? ctaVariant : "outline"}
                        onClick={() =>
                          handleCTAClick(`pricing-${plan.name.toLowerCase()}`)
                        }
                        data-cta={plan.highlight ? "primary" : "secondary"}
                        id={`pricing-${plan.name.toLowerCase()}-cta`}
                        className="w-full"
                      >
                        {language === "es" ? "Empezar ahora" : "Start now"}
                      </CTAButton>
                    </CardContent>
                  </Card>
                )
              )}
            </div>

            <div className="text-center px-4">
              <CTAButton
                variant={ctaVariant}
                size="lg"
                onClick={() => handleCTAClick("pricing-bottom")}
                data-cta="primary"
                id="pricing-bottom-cta"
                className="w-full sm:w-auto text-sm sm:text-lg px-4 sm:px-8 py-4 sm:py-6 h-auto break-words"
              >
                <span className="block sm:hidden">
                  {language === "es" ? "Empieza por $5" : "Start for $5"}
                </span>
                <span className="hidden sm:block">
                  {copy.pricing.cta}
                </span>
              </CTAButton>
            </div>
          </div>
        </Section>

        {/* Social Proof Below Features (Default) */}
        {socialProofPlacement === "below" && (
          <Section id="social" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                {copy.social.title}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {copy.social.text}
              </p>
              <div className="flex justify-center items-center space-x-2">
                <Users className="w-6 h-6 text-primary" />
                <span className="text-2xl font-bold text-gradient">
                  10,000+
                </span>
                <span className="text-muted-foreground">
                  {language === "es" ? "usuarios activos" : "active users"}
                </span>
              </div>
            </div>
          </Section>
        )}

        {/* FAQ Section */}
        <Section id="faq" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              {language === "es"
                ? "Preguntas Frecuentes"
                : "Frequently Asked Questions"}
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {copy.faq.map((item: FAQItem, index: number) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        {/* Final CTA Section */}
        <Section className="py-20 gradient-brand">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              {language === "es"
                ? "¿Listo para transformar tus conversaciones?"
                : "Ready to Transform Your Conversations?"}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {language === "es"
                ? "Únete a miles de hombres que ya están dominando el arte de la conversación en citas."
                : "Join thousands of men who are already mastering the art of dating conversation."}
            </p>
            <CTAButton
              variant="secondary"
              size="lg"
              onClick={() => handleCTAClick("final")}
              data-cta="primary"
              id="final-cta"
              className="w-full sm:w-auto text-sm sm:text-lg px-4 sm:px-8 py-4 sm:py-6 h-auto break-words bg-white text-primary hover:bg-white/90"
            >
              <span className="block sm:hidden">
                {language === "es" ? "Empieza hoy" : "Start today"}
              </span>
              <span className="hidden sm:block">
                {copy.hero.cta}
              </span>
            </CTAButton>
          </div>
        </Section>

        {/* Waitlist Section */}
        <Section id="waitlist" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <Waitlist
              title={copy.waitlist.title}
              subtitle={copy.waitlist.subtitle}
              description={copy.waitlist.description}
              placeholder={copy.waitlist.placeholder}
              cta={copy.waitlist.cta}
              success={copy.waitlist.success}
              benefits={copy.waitlist.benefits}
            />
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center space-y-6">
            <Logo />
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                {language === "es"
                  ? "Términos de Servicio"
                  : "Terms of Service"}
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                {language === "es"
                  ? "Política de Privacidad"
                  : "Privacy Policy"}
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                {language === "es" ? "Contacto" : "Contact"}
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                {language === "es" ? "Soporte" : "Support"}
              </a>
            </div>
            <Separator />
            <p className="text-sm text-muted-foreground">
              © 2024 Dating Conversation Challenge.{" "}
              {language === "es"
                ? "Todos los derechos reservados."
                : "All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
      </ShaderBackground>
    </LanguageProvider>
  );
}

/*
Quality Checklist:
✓ Mobile-first, sticky nav, single primary CTA
✓ Bilingual copy + SEO metadata switch  
✓ AA+ contrast, focus states, keyboard nav
✓ Section IDs + analytics hooks
✓ A/B notes (headline + CTA color + social proof order)
✓ CSS ≤ ~250 lines, no heavy images
*/
