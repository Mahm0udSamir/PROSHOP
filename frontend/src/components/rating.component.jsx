import PropTypes from "prop-types";

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? "fas fa-star"
              : value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 2
              ? "fas fa-star"
              : value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? "fas fa-star"
              : value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 4
              ? "fas fa-star"
              : value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 5
              ? "fas fa-star"
              : value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

Rating.propType = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

// const Ratingj = ({ value, total }) => {
//   const stars = [];
//   const avrage = 5 * (value / total);
//   const fullStart = Math.round(avrage);
//   const addHalfStar = avrage - fullStart > 0;

//   for (let i = 0; i < 5; i++) {
//     if (i < fullStart) {
//       stars.push("fa-solid fa-star");
//     } else {
//       stars.push("fa-regular fa-star");
//     }
//   }
//   if (addHalfStar) {
//     stars[fullStart] = "fa-solid fa-star-half-stroke";
//   }

//   return (
//     <>
//       {stars.map((star, index) => (
//         <i key={index} className={star}></i>
//       ))}
//     </>
//   );
// };

export default Rating;
