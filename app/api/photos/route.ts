import { NextResponse } from "next/server";

const PAGE_ID = "168019856388972"; // Trap Culture Page
const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const after = searchParams.get("after") || "";

  if (!PAGE_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Missing FACEBOOK_PAGE_ACCESS_TOKEN" },
      { status: 500 }
    );
  }

  const fields = [
    "id",
    "images",
    "name",
    "created_time"
  ].join(",");

  const limit = 100;

  const url = `https://graph.facebook.com/v24.0/${PAGE_ID}/photos?fields=${fields}&limit=${limit}${
    after ? `&after=${after}` : ""
  }&access_token=${PAGE_ACCESS_TOKEN}`;

  try {
    const fbRes = await fetch(url);
    const json = await fbRes.json();

    if (json.error) {
      return NextResponse.json(json, { status: 500 });
    }

    return NextResponse.json({
      photos: json.data || [],
      nextCursor: json.paging?.cursors?.after || null
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch photos", details: err },
      { status: 500 }
    );
  }
}
