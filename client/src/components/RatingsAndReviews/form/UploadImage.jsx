import React, { useState, useEffect, useRef } from "react";

const UploadImage = ({ formData, setFormData, setImageList, imageList }) => {
  const [selectedImages, setTempImageList] = useState(imageList);

  const handleFileChange = (e) => {
    if (selectedImages.length >= 5) return;
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
      console.log(formData)
      fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.secure_url) {
            addImage(data.secure_url);
            setImageList(selectedImages.concat(data.secure_url));
            let prevPhotos = JSON.parse(localStorage.getItem(`Ratings_and_reviews_form_photos`)) || [];
            localStorage.setItem("Ratings_and_reviews_form_photos",JSON.stringify([...prevPhotos, data.secure_url])
            );
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleRemove = (removeIndex) => {
    let prevPhotos = JSON.parse(localStorage.getItem(`Ratings_and_reviews_form_photos`)) || [];
    prevPhotos = prevPhotos.filter((x, i) => i !== removeIndex);
    localStorage.setItem("Ratings_and_reviews_form_photos", JSON.stringify([...prevPhotos]));
    const newImageList = imageList.filter((x, i) => i !== removeIndex);
    setImageList(newImageList);
  };

  const addImage = (url) => {
    if (selectedImages.length < 5)
      setTempImageList(selectedImages.concat(url))
  };

  const thumbnailStyle = { 'width': '50px', 'height': '50px' }
  return (
    <div>
      {
        imageList.map((image, i) => <span key={image + i}> <button onClick={() => handleRemove(i)}>X</button> <img src={image} style={thumbnailStyle}></img></span>)
      }
      {imageList.length < 5 ?
        (<div>
          <input type="file" onChange={handleFileChange} />
        </div>) : ""
      }
    </div>
  );
};

export default UploadImage;
