import StarRating from '../sharedComponents/StarRating.jsx';
import RatingGraph from './RatingGraph.jsx';
import React from 'react';
import './RatingAndReviews.css';
const testRatings2 = {
  5: 60,
  4: 45,
  3: 100,
  2: 55,
  1: 35,
}
const RatingsAndReviews = ({productId}) => {
  return (<div>
      <RatingGraph ratings={testRatings2}/>
  </div>
  )
};

export default RatingsAndReviews;