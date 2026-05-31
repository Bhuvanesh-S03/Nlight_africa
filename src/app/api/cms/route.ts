import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import fallbackData from "@/data/cms-data.json";

const DATA_FILE = path.join(process.cwd(), "src", "data", "cms-data.json");

export async function GET() {
  try {
    if (process.env.NODE_ENV === "production") {
      // In production (Netlify), file system is read-only and paths differ
      return NextResponse.json(fallbackData);
    }
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading CMS data:", error);
    // Fallback if file read fails locally
    return NextResponse.json(fallbackData);
  }
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "CMS saves disabled on live site. Update visually by running locally, then push to GitHub." },
      { status: 403 }
    );
  }

  try {
    const payload = await request.json();
    
    // Simple schema validation
    if (!payload || !payload.companyInfo || !payload.products) {
      return NextResponse.json({ error: "Invalid CMS data structure" }, { status: 400 });
    }

    // Write back to the local database file formatted with beautiful indentation
    await fs.writeFile(DATA_FILE, JSON.stringify(payload, null, 2), "utf-8");
    
    return NextResponse.json({ success: true, message: "Database updated successfully" });
  } catch (error: any) {
    console.error("Error writing CMS data:", error);
    return NextResponse.json({ error: "Failed to save database: " + error.message }, { status: 500 });
  }
}
