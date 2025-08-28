// /emails/components/EmailLayout.tsx
import * as React from "react"
import {
  Html, Head, Preview, Body, Container, Section, Text, Link, Hr, Img
} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

type Props = {
  previewText?: string
  children: React.ReactNode
  footerLinks?: { href: string; label: string }[]
  logoUrl?: string
  brandName?: string
}

export default function EmailLayout({
  previewText,
  children,
  footerLinks = [
    { href: "https://labia.coach/terms", label: "Terms" },
    { href: "https://labia.coach/privacy", label: "Privacy" },
    { href: "{{{unsubscribe}}}", label: "Unsubscribe" },
  ],
  logoUrl = "https://labia.coach/logo.png",
  brandName = "LabIA",
}: Props) {
  return (
    <Html>
      <Head />
      {previewText && <Preview>{previewText}</Preview>}
      <Tailwind>
        <Body className="bg-black m-0 p-0 font-sans text-white">
          <Container className="mx-auto my-0 p-0 max-w-[640px]">
            <Section className="px-24 py-24">
              <Link href="https://labia.coach">
                <Img src={logoUrl} alt={brandName} width="120" className="opacity-90" />
              </Link>
            </Section>

            {/* Card */}
            <Section className="mx-6 rounded-xl border border-white/15 bg-zinc-900 px-6 py-10">
              {children}
            </Section>

            {/* Footer */}
            <Section className="px-6 py-10 text-center">
              <Hr className="border-white/10 my-6" />
              <Text className="text-xs text-zinc-400 leading-6">
                © {new Date().getFullYear()} {brandName}. All rights reserved.
              </Text>
              <Text className="text-xs text-zinc-400">
                {footerLinks.map((l, i) => (
                  <React.Fragment key={l.href}>
                    <Link href={l.href} className="text-zinc-300 underline">
                      {l.label}
                    </Link>
                    {i < footerLinks.length - 1 ? " · " : ""}
                  </React.Fragment>
                ))}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
