import "./dishRating.style.css";
function DishRating() {
  return (
    <div className="dishRating">
      <div className="border-right">
        <span>4.1</span>
        <span>50+ Ratings</span>
      </div>
      <div className="border-right">
        <span>33 mins</span>
        <span>Delivery Time</span>
      </div>
      <div className="border-right">
        <span>₹ 199</span>
        <span>cost for two</span>
      </div>
    </div>
  );
}
export default DishRating;
