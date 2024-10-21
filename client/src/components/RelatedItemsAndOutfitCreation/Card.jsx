import React, { useState, useEffect } from "react";
import StarRating from '../sharedComponents/StarRating.jsx';

import './RelatedItemsAndOutfitCreation.css'
const Card = ({ item, type, setProductId }) => {
  if (!item) { return <div>Cannot render component</div> }
  const { original_price, sale_price, product_id,
    thumbnail_url, avgRating, category, name } = item;
  return (<div className="card-item" onClick={() => setProductId(product_id)}>
    <div>
      {
        type === 'related' ?
          <div className="related-card-corner-star">
            <div className='card-preview-image'>
              <img src={
                thumbnail_url ||
                "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
              } className="thumbnail-style" alt="Card Image" />

            <div className='right-corner-star'>
              <img src='/icons/star-empty.svg' />
            </div>
            </div>
          </div> :
          <div className="related-card-corner-star">
            <div className='right-corner-star'>
              <button>
                X
              </button>
            </div>
            <div className='card-preview-image'>
              <img src={
                thumbnail_url ||
                "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
              } className="thumbnail-style" alt="Card Image" />
            </div>
          </div>
      }</div>
    <div>
      <span>{category}</span>
      <div className='related-card-name'>{name}</div>
      <div>
        <span className={sale_price ? 'original-pricestrike-out' : 'original-price'}>
          {
            original_price ? "$ " + original_price : ""
          }</span><span className="sale-price">
          {
            sale_price ? "$ " + sale_price : ""
          }</span>
      </div>
      <StarRating rating={avgRating} dimensions={20} />
    </div>
  </div>
  )
};

export default Card;