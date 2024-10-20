import React, { useState, useEffect, useRef } from 'react';


const UploadImage = ({ formData, setFormData, setImageList, imageList }) => {
  //if (formData) imageList = formData['photos'];
  console.log(formData);
  const [tempImageList, setTempImageList] = useState(imageList);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'daxozvday',
      uploadPreset: 'FEC_Rating_and_reviews',
      maxFiles: (5 - imageList.length)
    }, (error, result) => {
      if (result.event === 'success') {
        //addImage(result.info.secure_url);
        let prevPhotos = JSON.parse(localStorage.getItem(`Ratings_and_reviews_form_photos`)) || [];
        localStorage.setItem("Ratings_and_reviews_form_photos", JSON.stringify([...prevPhotos, result.info.secure_url]));
      }
      if (result.event === 'close') {
        const oldFormData = { ...formData };
        setFormData([]);
        setFormData(oldFormData);
      }
      if (error) { return console.log(error) }
    });

  }, []);

  const handleRemove = (removeIndex) => {
    let prevPhotos = JSON.parse(localStorage.getItem(`Ratings_and_reviews_form_photos`)) || [];
    prevPhotos = prevPhotos.filter((x, i) => i !== removeIndex);
    localStorage.setItem("Ratings_and_reviews_form_photos", JSON.stringify([...prevPhotos]));
    const newImageList = imageList.filter((x, i) => i !== removeIndex);
    setImageList(newImageList);
  };

  const addImage = (url) => {
    if (tempImageList.length < 5)
      setTempImageList(tempImageList.concat(url))
  };
  // good!
  const saveImageList = () => {
    setImageList(tempImageList.slice(0, 5));
  };

  const thumbnailStyle = { 'width': '50px', 'height': '50px' }
  return (
    <div>
      {
        imageList.map((image, i) => <span key={image + i}> <button onClick={() => handleRemove(i)}>X</button> <img src={image} style={thumbnailStyle}></img></span>)
      }{
        imageList.length < 5 ?
          <div>
            <button onClick={(e) => {
              e.preventDefault()
              widgetRef.current.open()
            }}>
              Upload
            </button>
          </div> : ""
      }
    </div>
  );
};

export default UploadImage;

