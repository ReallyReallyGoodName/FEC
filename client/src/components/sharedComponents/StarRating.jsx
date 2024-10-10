import React from 'react'
const StarRating = ({ rating, ratingList, enableText = false, dimensions = 5 }) => {
  let averageRating = 0;
  if (rating !== undefined) {
    averageRating = Number(rating);
  } else if (ratingList !== undefined) {
    const ratingsArray = Object.entries(ratingList).map(([rating, count]) => [Number(rating), Number(count)]);
    const sum = ratingsArray.reduce((sum, [rating, count]) => sum + rating * count, 0);
    const totalRatings = ratingsArray.reduce((sum, [_, count]) => sum + count, 0);
    averageRating = sum / totalRatings;
  } else {
    return <div>Error Loading Stars</div>;
  }//test

  if (averageRating < 0 || averageRating > 5) { return <div>rating outside of range [0-5]</div>; }

  const quarter = "../../icons/star-one-quarter.svg";
  const half = "../../icons/star-half.svg";
  const threeQuarter = "../../icons/star-three-quarter.svg";
  const full = "../../icons/star-full.svg";
  const empty = "../../icons/star-empty.svg";

  const fullStarCount = Math.floor(averageRating);
  const emptyCount = Math.floor(5 - averageRating)
  const remaining = (averageRating % 1);
  const roundedRating = Math.floor(averageRating) + Math.round(remaining * 4) / 4;
  const fullStars = new Array(fullStarCount).fill();
  const emptyStars = new Array(emptyCount).fill();
  const topStyle = { 'verticalAlign': 'top', 'marginTop': dimensions * .75, width: dimensions, height: dimensions }
  let partialStar = empty;

  if (remaining <= 1 && remaining >= .875) partialStar = full;
  else if (remaining < .875 && remaining >= .625) partialStar = threeQuarter;
  else if (remaining < .625 && remaining >= .375) partialStar = half;
  else if (remaining < .375 && remaining >= .125) partialStar = quarter;

  return (<div>
    <span className="rounded-rating-text">{enableText ? roundedRating : ""}
      {fullStars.map((star, i) => <img key={rating * i} src={full} alt={"full star"} style={topStyle} />)}
      {remaining ? <img src={partialStar} style={topStyle} /> : ""}
      {emptyStars.map((star, i) => <img key={rating * i} src={empty} alt={"empty star"} style={topStyle} />)}</span>
  </div>
  );
}
export default StarRating;