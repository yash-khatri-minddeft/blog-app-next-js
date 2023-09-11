import connect from "@/dbConfig/dbConfig";
import Blog from "@/models/blog";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  try {
    const blogs = await prisma.blog.findMany();

    // classic mongoose method
    // const blogs = await Blog.find({});

    if (blogs.length === 0) {
      return NextResponse.json(
        { message: "No Blog found", success: false },
        { status: 200 }
      );
    }
    return NextResponse.json({ blogs, success: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message, success: false });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, thumbnailURI, content, excerpt, categories, existingSlugs } =
    body;
  const newSlug = title.toLowerCase().replaceAll(/\s+/g, "-");
  let finalSlug = newSlug;
  try {
    const blog = await Blog.findOne({ slug: finalSlug });
    if (blog) {
      finalSlug = generateUniqueSlug(newSlug, existingSlugs);
    }

    // classic mongoose method
    // const newBlog = new Blog({
    //   slug: finalSlug,
    //   title,
    //   content,
    //   excerpt,
    //   categories,
    //   author: "yash",
    //   thumbnailURI,
    // });
    // await newBlog.save();
    const newBlog = await prisma.blog.create({
      data: {
        slug: finalSlug,
        title,
        content,
        excerpt,
        categories,
        authorId: "64f6fabf140de3db4b28eacd",
        thumbnailURI,
      },
    });
    return NextResponse.json({
      success: true,
      newBlog,
      message: "Blog added successfully",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, success: false });
  }
}

function generateUniqueSlug(desiredSlug: string, existingSlugs: string[]) {
  if (!existingSlugs.includes(desiredSlug)) {
    return desiredSlug; // The desired slug is unique, no changes needed
  }

  let baseSlug = desiredSlug;
  let counter = 1;

  while (existingSlugs.includes(`${baseSlug}-${counter}`)) {
    counter++;
  }

  return `${baseSlug}-${counter}`;
}
