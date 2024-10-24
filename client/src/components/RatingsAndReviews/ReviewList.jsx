
import React, { useEffect, useState } from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';
import axios from 'axios';
import AddAReviewForm from './form/AddAReviewForm.jsx';
const ReviewList = ({ recommended, productId, starFilter }) => {
  if (recommended === undefined) { return <div>Error Loading Component</div> }

  const totalReviews = (Number(recommended.false) + Number(recommended.true));
  const [sort, setSort] = useState('relevant');
  const [rList, setRList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [page, setPage] = useState(1);
  const countPerQuery = 2;

  const loadAllReviews = (sortType = sort) => {
    const params = { params: { sort: sortType, product_id: productId, count: 500 } };
    return axios
      .get('/reviews', params)
      .then(res => {
        const filteredList = filterList(res.data.results);

        setRList(filteredList);
        setViewList(filteredList.slice(0, countPerQuery));
      })
      .catch(err => console.log(err));
  };

  const filterList = (list) => {
    let filteredList = list;
    //check if filtering is disabled
    if (!starFilter.every(x => !x)) {
      filteredList = filteredList.filter(({ rating }) => starFilter[rating - 1]);
    }
    if (sort === 'relevant') {
      filteredList = filteredList.sort((a, b) =>a.helpfulness - b.helpfulness).slice(0,50).sort((a,b)=>new Date(b.date) - new Date(a.date))

    }
    return filteredList;
  };

  const moreReviews = (e) => {
    setViewList(rList.slice(0, countPerQuery * (page + 1)));
    setPage(page + 1);
  };

  const changeSort = (e) => {
    const sortType = e.target.value;
    setSort(sortType);
    loadAllReviews(sortType)
      .then(r => setPage(1))
  };

  useEffect(() => {
    loadAllReviews();
  }, [starFilter, sort, productId]);

  return (<div className="review-body">

    <div >
      <span className="review-title">{totalReviews} reviews sorted by</span>
      <select className="sort-dropdown" onChange={changeSort} value={sort}>
        <option value='relevant'>Relevant</option>
        <option value='newest'>Newest</option>
        <option value='helpful'>Helpfulness</option>
      </select>
    </div>

    <div>{
      viewList.map((review, i) => <ReviewListEntry key={review.review_id} review={review} loadReviews={loadAllReviews} />)}
    </div>
    {viewList.length < rList.length ? <button onClick={moreReviews}>MORE REVIEWS  +</button> : ''}
    <AddAReviewForm productId={productId} />
  </div>
  )
};

export default ReviewList;