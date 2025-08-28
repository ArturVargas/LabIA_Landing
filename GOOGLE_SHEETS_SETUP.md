T# Configuración de Google Sheets como Base de Datos

## Paso 1: Crear la Hoja de Cálculo

1. Ve a [Google Sheets](https://sheets.google.com) y crea una nueva hoja de cálculo
2. Configura las siguientes columnas en la primera fila:
   - A1: `Email`
   - B1: `Name`
   - C1: `Language`
   - D1: `Timestamp`
   - E1: `UTM Source`
   - F1: `UTM Medium`
   - G1: `UTM Campaign`

3. Copia el ID de la hoja de cálculo desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/TU_SPREADSHEET_ID_AQUI/edit
   ```

## Paso 2: Configurar Google Apps Script

1. Ve a [Google Apps Script](https://script.google.com)
2. Crea un nuevo proyecto
3. Copia el código del archivo `google-apps-script.js` en el editor
4. Reemplaza `TU_SPREADSHEET_ID_AQUI` con el ID real de tu hoja de cálculo
5. Guarda el proyecto con un nombre como "Waitlist Handler"
6. Haz clic en "Deploy" > "New deployment"
7. Selecciona "Web app" como tipo
8. Configura:
   - Execute as: "Me"
   - Who has access: "Anyone"
9. Haz clic en "Deploy"
10. Copia la URL del Web App que se genera

## Paso 3: Configurar Variables de Entorno

1. Copia el archivo `.env.example` a `.env.local`
2. Agrega las siguientes variables:
   ```
   GOOGLE_SHEETS_ID=tu_spreadsheet_id_aqui
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
   ```

## Paso 4: Probar la Integración

1. Ejecuta tu aplicación Next.js
2. Envía un POST a `/api/waitlist` con:
   ```json
   {
     "email": "test@example.com",
     "name": "Test User",
     "language": "es"
   }
   ```
3. Verifica que el email se agregue a tu hoja de cálculo

## Estructura de la Hoja de Cálculo

La hoja de cálculo debe tener esta estructura:

| Email | Name | Language | Timestamp | UTM Source | UTM Medium | UTM Campaign |
|-------|------|----------|-----------|------------|------------|--------------|
| test@example.com | Test User | es | 2024-01-01T12:00:00.000Z | google | cpc | waitlist |

## Funcionalidades

- ✅ Agregar emails a la waitlist
- ✅ Prevenir duplicados
- ✅ Guardar información de UTM
- ✅ Timestamp automático
- ✅ Soporte multiidioma
- ✅ Obtener lista completa de suscriptores

## Notas Importantes

1. **Seguridad**: El Google Apps Script es público, pero solo permite operaciones específicas
2. **Límites**: Google Sheets tiene límites de 10 millones de celdas por hoja
3. **Rendimiento**: Para grandes volúmenes, considera usar una base de datos real
4. **Backup**: Google Sheets tiene respaldo automático

## Solución de Problemas

### Error: "Este email ya está registrado"
- El sistema previene duplicados automáticamente
- Verifica que el email no exista en la hoja

### Error: "Acceso denegado"
- Asegúrate de que el Google Apps Script esté desplegado como Web App
- Verifica que "Who has access" esté configurado como "Anyone"

### Error: "Spreadsheet ID no válido"
- Verifica que el ID de la hoja de cálculo sea correcto
- Asegúrate de que la hoja sea accesible desde tu cuenta de Google
