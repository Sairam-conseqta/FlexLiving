import fs from 'fs';
import path from 'path';

function normalizeHostaway(raw) {
  const result = (raw.result || []).map(r => {
    const categories = (r.reviewCategory || []).reduce((acc, c) => {
      acc[c.category] = c.rating;
      return acc;
    }, {});
    return {
      id: r.id,
      type: r.type,
      status: r.status,
      rating:
        r.rating ??
        (r.reviewCategory && r.reviewCategory.length
          ? Math.round(
              r.reviewCategory.reduce((s, c) => s + (c.rating || 0), 0) /
                r.reviewCategory.length
            )
          : null),
      publicReview: r.publicReview,
      categories,
      submittedAt: r.submittedAt,
      guestName: r.guestName,
      listingName: r.listingName,
    };
  });
  return { status: raw.status || 'success', reviews: result };
}

export default function handler(req, res) {
  const mockPath = path.join(process.cwd(), 'public', 'mock-hostaway.json');
  const mockRaw = JSON.parse(fs.readFileSync(mockPath, 'utf-8'));
  const normalized = normalizeHostaway(mockRaw);
  res.status(200).json(normalized);
}
