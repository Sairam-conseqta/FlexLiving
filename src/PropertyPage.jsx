import React from 'react';
import './PropertyPage.css';

export default function PropertyPage({ propertyName, reviews = [], onBack }) {
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  const avgRating = safeReviews.length
    ? Math.round(
        safeReviews.reduce((s, r) => s + (r.rating || 0), 0) /
          safeReviews.length
      )
    : '—';

  return (
    <div className="property-container">
      <button onClick={onBack} className="property-back-btn">
        ← Back to Dashboard
      </button>

      <div className="property-header">
        <div className="property-img">IMG</div>
        <div>
          <h1>{propertyName}</h1>
          <div className="property-subtitle">
            2 bed • 1 bath • Shoreditch
          </div>
        </div>
      </div>

      <div className="property-layout">
        <div>
          <div className="property-card property-overview">
            <h3>Overview</h3>
            <p>
              A bright and airy property in Shoreditch. This page shows
              selected guest reviews (approved in the Manager Dashboard).
            </p>
          </div>

          <div className="property-reviews">
            <h3>Guest Reviews</h3>
            {safeReviews.length === 0 && (
              <div className="property-review-empty">
                No reviews approved for this property.
              </div>
            )}
            {safeReviews.map((r) => (
              <div key={r.id} className="property-review">
                <div className="property-review-header">
                  <div>
                    <div className="property-review-guest">
                      {r.guestName}
                    </div>
                    <div className="property-review-date">
                      {r.submittedAt
                        ? new Date(r.submittedAt).toLocaleDateString()
                        : ''}
                    </div>
                  </div>
                  <div className="property-review-rating">
                    {r.rating ?? '—'}
                  </div>
                </div>
                <div className="property-review-text">
                  {r.publicReview}
                </div>
                <div className="property-review-categories">
                  Categories:{' '}
                  {Object.entries(r.categories || {})
                    .map(([k, v]) => `${k}:${v}`)
                    .join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <div className="property-card property-summary">
            <h4>Property Summary</h4>
            <div className="property-summary-rating">
              Rating: {avgRating}
            </div>
            <div className="property-summary-meta">
              Based on {safeReviews.length} approved review(s).
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
