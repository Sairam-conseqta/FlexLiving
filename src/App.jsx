import React, { useEffect, useState } from 'react';
import PropertyPage from './PropertyPage';
import './Dashboard.css';

function Header(){
  return (
    <div className="header">
      <img src="/logo192.png" alt="Flex Living logo" />
      <div className="header-brand">
        <h1>Flex Living</h1>
        <div className="small">Reviews Dashboard</div>
      </div>
    </div>
  );
}

function Filters({filters,setFilters}){
  return (
    <div className="filters-row">
      <select value={filters.property||''} onChange={e=>setFilters({...filters,property:e.target.value})}>
        <option value="">All properties</option>
        <option value="2B N1 A - 29 Shoreditch Heights">Shoreditch Heights</option>
        <option value="1A - Riverside Apartments">Riverside</option>
      </select>
      <select value={filters.rating||''} onChange={e=>setFilters({...filters,rating:e.target.value})}>
        <option value="">All ratings</option>
        <option value="8">&gt;= 8</option>
        <option value="5">&gt;= 5</option>
      </select>
    </div>
  );
}

function ReviewsList({reviews, onToggleSelect, selected}){
  if(!reviews.length) return <div className="card">No reviews</div>
  return (
    <div>
      {reviews.map(r=> (
        <div key={r.id} className="review-card">
          <div className="review-meta">
            <div>
              <div className="guest-name">{r.guestName} <span className="small">· {r.listingName}</span></div>
              <div className="review-date-inline">{new Date(r.submittedAt).toLocaleString()}</div>
            </div>
            <div className="right-align">
              <div className="badge">{r.rating ?? '—'}</div>
              <div style={{marginTop:6}}>
                <label className="checkbox-row">
                  <input type="checkbox" checked={!!selected[r.id]} onChange={()=>onToggleSelect(r.id)} />
                  <span className="small">Show on website</span>
                </label>
              </div>
            </div>
          </div>
          <div className="review-margin-top">{r.publicReview}</div>
          <div className="review-categories-inline small">Categories: {Object.entries(r.categories||{}).map(([k,v])=>`${k}:${v}`).join(', ')}</div>
        </div>
      ))}
    </div>
  );
}

function RightPane({selectedReviews, viewControl}) {
  return (
    <div>
      <div className="card">
        <h3 className="section-title">Selected Reviews Preview</h3>

        {selectedReviews.length ? (
          <div className="selected-preview-list">
            {selectedReviews.map(r=> (
              <div key={r.id} className="review-card small-preview">
                <div className="guest-name">{r.guestName}</div>
                <div className="small review-margin-top">{r.publicReview}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="small">No reviews selected. Use the checkbox on each review to preview it here and publish it to the property page.</div>
        )}

        {/* Button moved into the same card as the preview */}
        {selectedReviews.length > 0 && viewControl && (
          <div className="selected-preview-footer">
            <button
              className="button view-property-btn"
              onClick={() => {
                const first = selectedReviews[0];
                viewControl.openProperty(first.listingName || 'Property', selectedReviews);
              }}
            >
              View Property Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App(){
  const [reviews,setReviews] = useState([]);
  const [filters,setFilters] = useState({});
  const [selected,setSelected] = useState({});
  const [view, setView] = useState({name:'dashboard', props:{}});

  useEffect(()=>{
    fetch('/api/reviews/hostaway').then(r=>r.json()).then(data=>{
      setReviews(data.reviews || [])
    }).catch(err=>{
      console.error(err)
    })
  },[])

  const filtered = reviews.filter(r=>{
    if(filters.property && r.listingName!==filters.property) return false
    if(filters.rating && r.rating < Number(filters.rating)) return false
    return true
  })

  const onToggleSelect = id => setSelected(s => ({...s,[id]:!s[id]}))
  const selectedReviews = reviews.filter(r=>selected[r.id])

  if (view.name === 'property') {
    const propName = view.props.propertyName || 'Property';
    return <PropertyPage propertyName={propName} reviews={view.props.reviews || []} onBack={()=>setView({name:'dashboard', props:{}})} />
  }

  return (
    <div className="container">
      <Header />
      <div className="card main-card" style={{marginTop:16}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2 style={{margin:0}}>Manager Dashboard</h2>
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        <div className="grid">
          <div>
            <div className="card" style={{marginTop:12}}>
              <h3 className="section-title">Reviews</h3>
              <ReviewsList reviews={filtered} onToggleSelect={onToggleSelect} selected={selected} />
            </div>
          </div>
          <div>
            <RightPane selectedReviews={selectedReviews} viewControl={{openProperty: (propertyName, reviewsForProperty) => setView({name:'property', props:{propertyName, reviews: reviewsForProperty}})}} />
          </div>
        </div>
      </div>
    </div>
  )
}
