// app/api/twitter/route.ts
// ─── Server-side Twitter/X profile lookup ─────────────────────
// Runs on the server — zero CORS issues.
// Tries two strategies in order:
//   1. RapidAPI Twitter scraper  (most reliable, free tier = 500 req/mo)
//   2. Official Twitter v2 API   (needs approved developer account)
// Returns: { name, bio, followers, following, avatarUrl }

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // deploy to Vercel Edge for fast global response

interface TwitterProfile {
  name: string;
  bio: string;
  followers: number | null;
  following: number | null;
  avatarUrl: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle')?.replace(/^@/, '').trim();

  if (!handle) {
    return NextResponse.json({ error: 'handle is required' }, { status: 400 });
  }

  // Avatar via unavatar.io — always works, no auth needed
  const avatarUrl = `https://unavatar.io/twitter/${encodeURIComponent(handle)}`;

  // ── Strategy 1: RapidAPI ──────────────────────────────────────
  const rapidKey  = process.env.RAPIDAPI_KEY;
  const rapidHost = process.env.RAPIDAPI_HOST || 'twitter-api45.p.rapidapi.com';

  if (rapidKey) {
    try {
      const url = `https://${rapidHost}/screenname.php?screenname=${encodeURIComponent(handle)}`;
      const res = await fetch(url, {
        headers: {
          'x-rapidapi-key':  rapidKey,
          'x-rapidapi-host': rapidHost,
        },
        next: { revalidate: 300 }, // cache 5 mins
      });

      if (res.ok) {
        const data = await res.json();
        // RapidAPI Twitter45 schema
        const profile: TwitterProfile = {
          name:      data.name       ?? handle,
          bio:       data.desc       ?? data.description ?? '',
          followers: data.sub_count  ?? data.followers_count ?? null,
          following: data.friends    ?? data.friends_count   ?? null,
          avatarUrl,
        };
        return NextResponse.json(profile);
      }
    } catch (e) {
      console.error('[twitter/route] RapidAPI error:', e);
    }
  }

  // ── Strategy 2: Official Twitter v2 Bearer Token ──────────────
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  if (bearerToken) {
    try {
      const url =
        `https://api.twitter.com/2/users/by/username/${encodeURIComponent(handle)}` +
        `?user.fields=name,description,public_metrics`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${bearerToken}` },
        next: { revalidate: 300 },
      });

      if (res.ok) {
        const json = await res.json();
        const u = json.data;
        const m = u?.public_metrics;
        const profile: TwitterProfile = {
          name:      u?.name        ?? handle,
          bio:       u?.description ?? '',
          followers: m?.followers_count ?? null,
          following: m?.following_count ?? null,
          avatarUrl,
        };
        return NextResponse.json(profile);
      }
    } catch (e) {
      console.error('[twitter/route] Twitter v2 error:', e);
    }
  }

  // ── Fallback: return avatar URL only ─────────────────────────
  // The UI shows the avatar and the user fills in name/bio manually.
  const fallback: TwitterProfile = {
    name:      handle,
    bio:       '',
    followers: null,
    following: null,
    avatarUrl,
  };
  return NextResponse.json(fallback);
}
