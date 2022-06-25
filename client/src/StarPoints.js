import React from "react";
import StarIcon from "@mui/icons-material/Star";

function StarPoints({
  stars = 5,
  customClass = "",
  rateContent,
  activeStar,
  handleOpenRateForm,
}) {
  const rateContentArr = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"];
  return (
    <div className={`stars_point  d-flex ${customClass}`}>
      {Array(stars)
        .fill()
        .map((_, i) => (
          <div
            key={i}
            className={`${
              activeStar == i
                ? "star text-center cl-star mw-8 active"
                : "star text-center cl-star mw-8"
            }`}
            onClick={() => handleOpenRateForm(i)}
          >
            <StarIcon />
            {rateContent ? <p className="mt-1">{rateContentArr[i]}</p> : ""}
          </div>
        ))}
    </div>
  );
}

export default StarPoints;
