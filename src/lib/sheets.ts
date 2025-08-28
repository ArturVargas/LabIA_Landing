interface WaitlistEntry {
  email: string
  name?: string
  language: string
  timestamp: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export async function addToWaitlistSheet(entry: WaitlistEntry): Promise<{ success: boolean; error?: string }> {
  try {
    // Obtener el ID del spreadsheet desde la URL
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID
    
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_ID no está configurado en las variables de entorno')
    }

    // Construir la URL para agregar datos usando Google Apps Script
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL
    
    if (!scriptUrl) {
      throw new Error('GOOGLE_APPS_SCRIPT_URL no está configurado en las variables de entorno')
    }

    // Enviar datos al Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addToWaitlist',
        data: entry
      })
    })

    if (!response.ok) {
      throw new Error(`Error al agregar a la hoja: ${response.statusText}`)
    }

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Error desconocido')
    }

    return { success: true }
  } catch (error) {
    console.error('Error adding to waitlist sheet:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    }
  }
}

export async function getWaitlistEntries(): Promise<WaitlistEntry[]> {
  try {
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL
    
    if (!scriptUrl) {
      throw new Error('GOOGLE_APPS_SCRIPT_URL no está configurado')
    }

    const response = await fetch(`${scriptUrl}?action=getWaitlist`)
    
    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.statusText}`)
    }

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Error desconocido')
    }

    return result.data || []
  } catch (error) {
    console.error('Error getting waitlist entries:', error)
    return []
  }
}
