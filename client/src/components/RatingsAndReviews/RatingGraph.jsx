import React from 'react';
const RatingGraph = ({ ratings }) => {
  ratings = testRatings2;
  if (typeof ratings !== 'object') { return <div>Cannot Display Element</div> }
  const maxCount = Math.max(...Object.values(ratings));
  const ratingCounts = new Array(5).fill().map((rating, i) => ratings[5 - i] || 0);
  const maxWidth = 270;
  return (<div>
    {
      ratingCounts.map((count, i) => {
        const fullWidth = Math.floor(count / maxCount * maxWidth);
        const emptyWidth = maxWidth - fullWidth;
        const fullStyle = { width: fullWidth }
        const emptyStyle = { width: emptyWidth }
        return <div key={2 << (7 * i) + count}>
          <span className={'star-graph-full'} style={fullStyle}></span>
          <span className={'star-graph-empty'} style={emptyStyle}></span>
        </div>
      })}
  </div>
  )
};

export default RatingGraph;