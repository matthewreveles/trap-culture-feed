export async function GET() {
  try {
    const pageId = process.env.FB_PAGE_ID!;
    const token = process.env.FB_PAGE_TOKEN!;
    const url = `https://graph.facebook.com/v24.0/${pageId}/photos?fields=images,link,name,created_time&access_token=${token}`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("Graph API error", err);
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}
