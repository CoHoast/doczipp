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
    const { query, documentType } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const openai = getOpenAIClient();
    
    if (!openai) {
      // Return mock suggestions if no API key
      return NextResponse.json({
        suggestions: getMockSuggestions(query),
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that suggests line items for business documents (invoices, quotes, estimates). 
          
Given a brief description or keyword, suggest 3-5 relevant line items with:
- description: A professional description of the service/product
- rate: A reasonable market rate in USD (number only)
- quantity: Suggested quantity (usually 1 for services, may vary for products)

Return ONLY valid JSON array, no markdown, no explanation. Format:
[{"description": "...", "rate": 100, "quantity": 1}]`
        },
        {
          role: "user",
          content: `Suggest line items for: "${query}" (Document type: ${documentType || 'invoice'})`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content || "[]";
    
    // Parse the JSON response
    let suggestions = [];
    try {
      suggestions = JSON.parse(content);
    } catch {
      suggestions = getMockSuggestions(query);
    }

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("AI suggestion error:", error);
    return NextResponse.json({
      suggestions: getMockSuggestions(""),
    });
  }
}

function getMockSuggestions(query: string): Array<{description: string, rate: number, quantity: number}> {
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes("web") || lowercaseQuery.includes("site")) {
    return [
      { description: "Website Design & Development", rate: 2500, quantity: 1 },
      { description: "Responsive Mobile Optimization", rate: 500, quantity: 1 },
      { description: "Content Management System Setup", rate: 750, quantity: 1 },
    ];
  }
  
  if (lowercaseQuery.includes("logo") || lowercaseQuery.includes("brand")) {
    return [
      { description: "Logo Design (3 concepts, 2 revisions)", rate: 800, quantity: 1 },
      { description: "Brand Guidelines Document", rate: 400, quantity: 1 },
      { description: "Business Card Design", rate: 150, quantity: 1 },
    ];
  }
  
  if (lowercaseQuery.includes("consult")) {
    return [
      { description: "Strategy Consultation Session", rate: 150, quantity: 2 },
      { description: "Market Research & Analysis", rate: 500, quantity: 1 },
      { description: "Implementation Roadmap", rate: 350, quantity: 1 },
    ];
  }

  if (lowercaseQuery.includes("photo")) {
    return [
      { description: "Professional Photo Session (2 hours)", rate: 350, quantity: 1 },
      { description: "Photo Editing & Retouching (per image)", rate: 25, quantity: 10 },
      { description: "Digital Delivery (high-res files)", rate: 50, quantity: 1 },
    ];
  }
  
  // Default suggestions
  return [
    { description: "Professional Services", rate: 100, quantity: 1 },
    { description: "Project Management", rate: 75, quantity: 2 },
    { description: "Consultation & Support", rate: 125, quantity: 1 },
  ];
}
