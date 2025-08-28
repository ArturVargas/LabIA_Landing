import { NextRequest, NextResponse } from 'next/server'
import { sendWaitlistWelcomeEmail } from '@/lib/resend'
import { addToWaitlistSheet } from '@/lib/sheets'

export async function POST(request: NextRequest) {
  try {
    const { email, name, language = 'es', utm_source, utm_medium, utm_campaign } = await request.json()

    // Validación básica
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Crear entrada para la hoja de cálculo
    const entry = {
      email,
      name: name || '',
      language,
      timestamp: new Date().toISOString(),
      utm_source: utm_source || '',
      utm_medium: utm_medium || '',
      utm_campaign: utm_campaign || ''
    }

    // Guardar en Google Sheets
    const sheetResult = await addToWaitlistSheet(entry)
    
    if (!sheetResult.success) {
      console.error('Error saving to sheet:', sheetResult.error)
      return NextResponse.json(
        { error: 'Error al guardar en la base de datos' },
        { status: 500 }
      )
    }

    // Enviar email de bienvenida
    const emailResult = await sendWaitlistWelcomeEmail({
      email,
      name,
      language
    })

    if (!emailResult.success) {
      console.error('Error sending email:', emailResult.error)
      // No fallamos aquí porque ya guardamos en la hoja
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Te has unido exitosamente a la lista de espera' 
    })

  } catch (error) {
    console.error('Error in waitlist API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
