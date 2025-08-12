import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const settingsFile = path.join(process.cwd(), "settings.json");

export async function GET() {
  if (fs.existsSync(settingsFile)) {
    const data = fs.readFileSync(settingsFile, "utf8");
    return NextResponse.json(JSON.parse(data));
  }
  return NextResponse.json({});
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  fs.writeFileSync(settingsFile, JSON.stringify(body, null, 2));
  return NextResponse.json({ message: "Settings saved" });
}
