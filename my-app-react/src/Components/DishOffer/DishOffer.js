import DishRating from "../DishRating/DishRating";
import "./dishOffer.style.css";

function DishOffer() {
  return (
    <div className="dishOffer">
      <h1>Take a Casual Dinner</h1>
      <span>North Indian Chinese</span>
      <span>Laxmi Nagar, Geeta Colony</span>
      <DishRating></DishRating>
    </div>
  );
}
export default DishOffer;
