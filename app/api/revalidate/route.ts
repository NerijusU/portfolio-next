import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { locales } from "@/i18n";

/**
 * On-demand revalidation endpoint for Sanity webhooks.
 * Call when content is published to purge cached pages.
 *
 * Configure webhook at sanity.io/manage → API → Webhooks:
 * - URL: https://your-domain.com/api/revalidate?secret=YOUR_SECRET
 * - Trigger: Create, Update, Delete
 * - Filter: (optional) limit to specific document types
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json({ message: "Invalid secret" }, { status: 401 });
  }

  for (const locale of locales) {
    revalidatePath(`/${locale}`);
  }

  return Response.json({ revalidated: true, locales });
}
