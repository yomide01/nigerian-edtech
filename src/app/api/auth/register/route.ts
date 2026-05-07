import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const JWT_SECRET = process.env.JWT_SECRET || "edunaija_secret_key_2025";

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName, universityId } = await request.json();

    if (!email || !password || !fullName || !universityId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const userId = uuidv4();
    const insertUser = db.prepare(`
      INSERT INTO users (id, email, password_hash, full_name, university_id)
      VALUES (?, ?, ?, ?, ?)
    `);
    insertUser.run(userId, email, passwordHash, fullName, universityId);

    // Generate JWT
    const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "7d" });

    return NextResponse.json({
      message: "Registration successful",
      token,
      user: { id: userId, email, full_name: fullName, university_id: universityId },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
