import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "edunaija.db");
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma("journal_mode = WAL");

// Initialize database schema
export function initDB() {
  // Universities table
  db.exec(`
    CREATE TABLE IF NOT EXISTS universities (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      code TEXT NOT NULL UNIQUE,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Users table (self-contained auth)
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT,
      university_id TEXT REFERENCES universities(id),
      faculty TEXT,
      department TEXT,
      level TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Courses table
  db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      university_id TEXT REFERENCES universities(id),
      faculty TEXT,
      department TEXT,
      level TEXT,
      course_code TEXT NOT NULL,
      course_title TEXT,
      lecturer TEXT,
      semester TEXT,
      academic_session TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Materials table
  db.exec(`
    CREATE TABLE IF NOT EXISTS materials (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id),
      course_id TEXT REFERENCES courses(id),
      title TEXT NOT NULL,
      description TEXT,
      file_path TEXT NOT NULL,
      file_type TEXT,
      file_size INTEGER,
      material_type TEXT,
      downloads INTEGER DEFAULT 0,
      upvotes INTEGER DEFAULT 0,
      downvotes INTEGER DEFAULT 0,
      verified BOOLEAN DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // AI chats table
  db.exec(`
    CREATE TABLE IF NOT EXISTS ai_chats (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id),
      course_id TEXT REFERENCES courses(id),
      title TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // AI messages table
  db.exec(`
    CREATE TABLE IF NOT EXISTS ai_messages (
      id TEXT PRIMARY KEY,
      chat_id TEXT REFERENCES ai_chats(id),
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert sample Nigerian universities if not exists
  const unis = [
    { id: "uni_1", name: "University of Lagos", code: "UNILAG" },
    { id: "uni_2", name: "Obafemi Awolowo University", code: "OAU" },
    { id: "uni_3", name: "University of Ibadan", code: "UI" },
    { id: "uni_4", name: "Lagos State University", code: "LASU" },
    { id: "uni_5", name: "University of Nigeria, Nsukka", code: "UNN" },
    { id: "uni_6", name: "Ahmadu Bello University", code: "ABU" },
    { id: "uni_7", name: "University of Benin", code: "UNIBEN" },
    { id: "uni_8", name: "Covenant University", code: "CU" },
    { id: "uni_9", name: "Federal University of Technology, Akure", code: "FUTA" },
    { id: "uni_10", name: "University of Ilorin", code: "UNILORIN" },
  ];

  const insertUni = db.prepare("INSERT OR IGNORE INTO universities (id, name, code) VALUES (?, ?, ?)");
  for (const uni of unis) {
    insertUni.run(uni.id, uni.name, uni.code);
  }

  console.log("Database initialized successfully");
}

export { db };
