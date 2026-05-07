import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const courseId = formData.get("courseId") as string;
    const title = formData.get("title") as string;
    const materialType = formData.get("materialType") as string;

    if (!file || !courseId || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Upload file to Supabase Storage
    const fileName = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("materials")
      .upload(`${user.id}/${fileName}`, file);

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("materials")
      .getPublicUrl(`${user.id}/${fileName}`);

    // Save material metadata to database
    const { data: material, error: dbError } = await supabase
      .from("materials")
      .insert({
        user_id: user.id,
        course_id: courseId,
        title,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
        material_type: materialType,
      })
      .select()
      .single();

    if (dbError) {
      return NextResponse.json(
        { error: dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Material uploaded successfully",
      material,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
