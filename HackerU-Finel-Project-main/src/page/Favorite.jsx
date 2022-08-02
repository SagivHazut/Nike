import React, { useEffect, useState } from "react";
import axios from "axios";

export const Favorite = (props) => {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  useEffect(() => {
    const variable = {
      _id: props.favoriteInfo._id,
      name: props.favoriteInfo.name,
      description: props.favoriteInfo.description,
      phone: props.favoriteInfo.phone,
      image1: props.favoriteInfo.image1,
      image2: props.favoriteInfo.image2,
      image3: props.favoriteInfo.image3,
      userID: props.userID,
      bizNumber: props.favoriteInfo.bizNumber,
      MenCollation: props.favoriteInfo.MenCollation,
      WomenCollation: props.favoriteInfo.WomenCollation,
    };
    axios.post("/favorite/favoriteNumber", variable).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("Falied to get favorite number");
      }
    });
    axios.post("/favorite/favorited", variable).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("Falied to get favorite info");
      }
    });
  }, []);

  return (
    <div>
      <button>
        {Favorited ? "remove from favorotie" : "Add to favorites"}
        {FavoriteNumber}
      </button>
    </div>
  );
};
//https://www.youtube.com/watch?v=BCTsHJFep8s
export default Favorite;
