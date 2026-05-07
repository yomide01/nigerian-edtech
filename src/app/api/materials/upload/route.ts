import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const courseId = formData.get("courseId") as string;
    const title = formData.get("title") as string;
    const materialType = formData.get("materialType") as string;
    const userId = formData.get("userId") as string; // In production, extract from JWT

    if (!file || !courseId || !title || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save file locally
    const fileName = `${uuidv4()}-${file.name}`;
    const filePath = path.join(uploadsDir, fileName);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, fileBuffer);

    // Save metadata to database
    const materialId = uuidv4();
    const insertMaterial = db.prepare(`
      INSERT INTO materials (id, user_id, course_id, title, file_path, file_type, file_size, material_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertMaterial.run(
      materialId,
      userId,
      courseId,
      title,
      `/uploads/${fileName}`,
      file.type,
      file.size,
      materialType || "lecture_note"
    );

    return NextResponse.json({
      message: "Material uploaded successfully",
      material: {
        id: materialId,
        title,
        file_path: `/uploads/${fileName}`,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
