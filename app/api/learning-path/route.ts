import { NextRequest, NextResponse } from 'next/server';
import { LearningStep, GeminiApiPayload } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { learningLevel, learningInterest } = await request.json();

    if (!learningInterest) {
      return NextResponse.json(
        { error: 'Por favor, introduce tu área de interés.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Error de configuración del servidor.' },
        { status: 500 }
      );
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const systemPrompt = `Eres un experto consejero educativo de IA. Crea una ruta de aprendizaje para un usuario con nivel '${learningLevel}' interesado en '${learningInterest}'. Genera 5 pasos claros. Cada paso debe tener un título, una descripción breve y una lista de 2-3 recursos sugeridos (cursos online, libros, artículos, etc.).`;

    const payload: GeminiApiPayload = {
      contents: [{ parts: [{ text: systemPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING", description: "El título del paso de aprendizaje." },
              description: { type: "STRING", description: "Una breve explicación del paso." },
              resources: { type: "ARRAY", items: { type: "STRING", description: "Un recurso de aprendizaje sugerido." } }
            },
            required: ["title", "description", "resources"]
          }
        }
      }
    };

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
      const learningPath: LearningStep[] = JSON.parse(candidate.content.parts[0].text);
      return NextResponse.json({ learningPath });
    } else {
      throw new Error("La respuesta de la API no tuvo el formato esperado.");
    }
  } catch (err) {
    console.error("Error al llamar a la API de Gemini:", err);
    return NextResponse.json(
      { error: 'No se pudo generar la ruta de aprendizaje. Inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}
