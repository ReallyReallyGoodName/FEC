import React from 'react';
import axios from 'axios';
import StarRating from '../sharedComponents/StarRating.jsx';
const ReviewListEntry = ({ review }) => {
  if (review === undefined) { return <div>Error Loading  Component</div> }
  const { summary, rating, body, date, photos, helpfulness, reviewer_name, response, recommend } = review;
  return (
    <div className="review-entry">
      <StarRating className="review-entry-stars" rating={rating} dimensions={15} />
      <span className="review-entry-date">
        {new Intl.DateTimeFormat('en-US').format(new Date(date))}
      </span>
      <div className="review-entry-title">
        {summary.length > 60 ? summary.slice(0, 60) + '...' : summary}
      </div>
      <div className="review-entry-text">
        {body}
      </div>
      {response ? <div className="review-response">Response from Seller: {response}</div> : ""}
      <div>
        {recommend ? <span>I recommend this product✔️</span> : ""}
        <div className="reviewer-name">{reviewer_name}</div>
      </div>
      <div>
        <span>Helpful?          <a href="">Yes</a>
          <span>{helpfulness}</span>
        </span>|
        <span>
          <a href="">Report</a>
        </span>
      </div>
    </div>
  )
};

export default ReviewListEntry;