
import * as React from "react"
import {
  Section, Text, Button, Hr
} from "@react-email/components"
import EmailLayout from "./EmailLayout"

type Props = {
  name?: string
  email: string
  language?: "es" | "en"
}

export default function WaitlistWelcome({
  language = "es"
}: Props) {
  const copy = {
    es: {
      subject: "¡Bienvenido a la lista de espera de LabIA! 🎯",
      preview: "Gracias por unirte. Te avisaremos cuando lancemos el próximo reto de 100 días.",
      title: "¡Bienvenido a la lista de espera!",
      subtitle: "Gracias por unirte a LabIA. Estás en la primera fila para el próximo reto de 100 días.",
      benefits: [
        "🎯 Acceso anticipado al próximo reto",
        "💰 Descuentos exclusivos para la lista de espera", 
        "📧 Contenido exclusivo y tips semanales",
        "🚀 Primera fila para nuevos features"
      ],
      cta: "Ver el sitio web",
      footer: "Te mantendremos informado sobre el progreso del desarrollo."
    },
    en: {
      subject: "Welcome to LabIA's waitlist! 🎯",
      preview: "Thanks for joining. We'll notify you when we launch the next 100-day challenge.",
      title: "Welcome to the waitlist!",
      subtitle: "Thanks for joining LabIA. You're in the front row for the next 100-day challenge.",
      benefits: [
        "🎯 Early access to the next challenge",
        "💰 Exclusive discounts for waitlist members",
        "📧 Exclusive content and weekly tips", 
        "🚀 Front row for new features"
      ],
      cta: "Visit website",
      footer: "We'll keep you updated on development progress."
    }
  }[language]

  return (
    <EmailLayout
      previewText={copy.preview}
      brandName="LabIA"
    >
      <Section className="text-center">
        <Text className="text-2xl font-bold text-white mb-4">
          {copy.title}
        </Text>
        
        <Text className="text-zinc-300 mb-6 leading-6">
          {copy.subtitle}
        </Text>

        <Hr className="border-white/10 my-6" />

        <Text className="text-lg font-semibold text-white mb-4">
          {language === "es" ? "Lo que obtienes:" : "What you get:"}
        </Text>

        {copy.benefits.map((benefit, index) => (
          <Text key={index} className="text-zinc-300 mb-2">
            {benefit}
          </Text>
        ))}

        <Hr className="border-white/10 my-6" />

        <Button
          href="https://labia.coach"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold no-underline"
        >
          {copy.cta}
        </Button>

        <Text className="text-sm text-zinc-400 mt-6">
          {copy.footer}
        </Text>
      </Section>
    </EmailLayout>
  )
}
