import { NextRequest, NextResponse } from 'next/server';
import { BusinessIdea } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { industry, objective, targetAudience, additionalInfo, prompt } = body;

    // Si viene un prompt personalizado, lo usamos directamente
    let systemPrompt = prompt;

    // Si no viene prompt personalizado, construimos uno basado en los parámetros
    if (!systemPrompt) {
      if (!industry) {
        return NextResponse.json(
          { error: 'Por favor, introduce una industria para generar ideas.' },
          { status: 400 }
        );
      }

      systemPrompt = `Actúa como un estratega de negocios creativo especializado en IA. Genera 3 ideas de negocio innovadoras para la industria: "${industry}". Cada idea debe tener un nombre pegadizo, un resumen de una frase y 2-3 características clave que utilicen IA.`;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Error de configuración del servidor.' },
        { status: 500 }
      );
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    let payload: any;

    // Si viene un prompt personalizado, usamos respuesta de texto simple
    if (prompt) {
      payload = {
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          responseMimeType: "text/plain"
        }
      };
    } else {
      // Si es el formato original, mantenemos la estructura anterior
      payload = {
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING", description: "El nombre de la idea de negocio." },
                summary: { type: "STRING", description: "Un resumen breve y atractivo." },
                features: { type: "ARRAY", items: { type: "STRING", description: "Una característica clave de IA." } }
              },
              required: ["name", "summary", "features"]
            }
          }
        }
      };
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Error de API: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const candidate = result.candidates?.[0];

    if (candidate?.content?.parts?.[0]?.text) {
      const responseText = candidate.content.parts[0].text;

      // Si viene un prompt personalizado, procesar como texto y convertir a array
      if (prompt) {
        // Dividir el texto en líneas y filtrar las líneas vacías
        const ideas = responseText
          .split('\n')
          .map((line: string) => line.trim())
          .filter((line: string) => line.length > 0 && !line.startsWith('```'))
          .slice(0, 5); // Tomar máximo 5 ideas

        return NextResponse.json({ generatedIdeas: ideas });
      }

      // Si es el formato original, intentar parsear como JSON
      try {
        const ideas: BusinessIdea[] = JSON.parse(responseText);
        return NextResponse.json({ ideas });
      } catch (parseError) {
        // Si no se puede parsear como JSON, devolver como texto
        const ideas = responseText
          .split('\n')
          .map((line: string) => line.trim())
          .filter((line: string) => line.length > 0)
          .slice(0, 5);

        return NextResponse.json({ generatedIdeas: ideas });
      }
    } else {
      throw new Error("La respuesta de la API no tuvo el formato esperado.");
    }
  } catch (err) {
    console.error("Error al llamar a la API de Gemini:", err);
    return NextResponse.json(
      { error: 'No se pudieron generar ideas. Por favor, inténtalo de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
