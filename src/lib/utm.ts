
export function withUtm(url: string, {
    source = "email",
    medium = "drip",
    campaign = "waitlist",
    content,
  }: { source?: string; medium?: string; campaign?: string; content?: string } = {}) {
    const u = new URL(url)
    u.searchParams.set("utm_source", source)
    u.searchParams.set("utm_medium", medium)
    u.searchParams.set("utm_campaign", campaign)
    if (content) u.searchParams.set("utm_content", content)
    return u.toString()
  }
  