import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWaitlistWelcomeEmail({
  email,
  name,
  language = 'es'
}: {
  email: string
  name?: string
  language?: 'es' | 'en'
}) {
  try {
    const subject = language === 'es' 
      ? '¡Bienvenido a la lista de espera de LabIA! 🎯'
      : 'Welcome to LabIA\'s waitlist! 🎯'

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #000; color: #fff; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border-radius: 10px; padding: 30px;">
            <h1 style="color: #fff; text-align: center; margin-bottom: 20px;">
              ${language === 'es' ? '¡Bienvenido a la lista de espera!' : 'Welcome to the waitlist!'}
            </h1>
            
            <p style="color: #ccc; line-height: 1.6; margin-bottom: 20px;">
              ${language === 'es' 
                ? `Hola ${name || 'Usuario'}, gracias por unirte a LabIA. Estás en la primera fila para el próximo reto de 100 días.`
                : `Hello ${name || 'User'}, thanks for joining LabIA. You're in the front row for the next 100-day challenge.`
              }
            </p>
            
            <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #fff; margin-top: 0;">
                ${language === 'es' ? 'Lo que obtienes:' : 'What you get:'}
              </h3>
              <ul style="color: #ccc; line-height: 1.8;">
                <li>🎯 ${language === 'es' ? 'Acceso anticipado al próximo reto' : 'Early access to the next challenge'}</li>
                <li>💰 ${language === 'es' ? 'Descuentos exclusivos para la lista de espera' : 'Exclusive discounts for waitlist members'}</li>
                <li>📧 ${language === 'es' ? 'Contenido exclusivo y tips semanales' : 'Exclusive content and weekly tips'}</li>
                <li>🚀 ${language === 'es' ? 'Primera fila para nuevos features' : 'Front row for new features'}</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://labia.coach" style="background-color: #8b5cf6; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                ${language === 'es' ? 'Ver el sitio web' : 'Visit website'}
              </a>
            </div>
            
            <p style="color: #888; font-size: 14px; text-align: center; margin-top: 30px;">
              ${language === 'es' 
                ? 'Te mantendremos informado sobre el progreso del desarrollo.'
                : 'We\'ll keep you updated on development progress.'
              }
            </p>
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: 'LabIA <noreply@waitlist.labia.coach>',
      to: [email],
      subject,
      html: htmlContent,
    })

    if (error) {
      console.error('Error sending email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

export { resend }
