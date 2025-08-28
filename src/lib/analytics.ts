export function trackClick(id: string, properties?: Record<string, unknown>) {
  // Integración con Google Analytics, Mixpanel, etc.
  console.log(`[Analytics] CTA Click: ${id}`, properties);
}