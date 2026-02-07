import { NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function POST(request: Request) {
  try {
    const { description, documentType } = await request.json();

    if (!description) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    const openai = getOpenAIClient();

    if (!openai) {
      // Return enhanced description without AI
      return NextResponse.json({
        expanded: expandWithoutAI(description),
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a professional copywriter for business documents. 
          
Take a brief line item description and expand it into a clear, professional description suitable for an ${documentType || 'invoice'}. 

Keep it concise (1-2 sentences max), professional, and specific. Include deliverables where applicable.

Return ONLY the expanded description text, no quotes, no explanation.`
        },
        {
          role: "user",
          content: description
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const expanded = completion.choices[0]?.message?.content || expandWithoutAI(description);

    return NextResponse.json({ expanded: expanded.trim() });
  } catch (error) {
    console.error("AI expand error:", error);
    return NextResponse.json({
      expanded: expandWithoutAI(""),
    });
  }
}

function expandWithoutAI(description: string): string {
  // Simple expansion logic
  const desc = description.trim();
  
  if (!desc) {
    return "Professional services as discussed and agreed upon.";
  }
  
  // Check if already looks professional (has enough words)
  if (desc.split(' ').length >= 6) {
    return desc;
  }
  
  // Simple enhancements based on keywords
  const lower = desc.toLowerCase();
  
  if (lower.includes("design")) {
    return `${desc} - Custom design work including concept development, revisions, and final deliverables in requested formats.`;
  }
  
  if (lower.includes("develop") || lower.includes("build")) {
    return `${desc} - Full development including implementation, testing, and deployment as specified in project scope.`;
  }
  
  if (lower.includes("consult")) {
    return `${desc} - Professional consultation services including analysis, recommendations, and follow-up support.`;
  }
  
  if (lower.includes("manage") || lower.includes("management")) {
    return `${desc} - Comprehensive management services including planning, coordination, and progress reporting.`;
  }
  
  if (lower.includes("support") || lower.includes("maintenance")) {
    return `${desc} - Ongoing support and maintenance services to ensure optimal performance and reliability.`;
  }
  
  // Default enhancement
  return `${desc} - Professional services delivered according to agreed specifications and timeline.`;
}
