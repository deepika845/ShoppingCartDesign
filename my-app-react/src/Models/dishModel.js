import {
  FoodOffer,
  HeaderLogo,
  VegLogo,
  SweetCornSoup,
  ManchowSoup,
  MixedPlatter,
  VegPlatter,
  NonVegPlatter,
  ChilliGarlicNoodles,
  MethiChickenTikka,
  AchariPaneerTikka,
} from "./ImageConstants.js";
function Dish(dishName, isVeg, isBestSeller, price, desc, image) {
  this.dishName = dishName;
  this.isVeg = isVeg;
  this.isBestSeller = isBestSeller;
  this.price = price;
  this.desc = desc;
  this.image = image;
}
function DishModel() {
  this.dishName = "";
  this.isVeg = false;
  this.isBestSeller = false;
  this.price = 0;
  this.desc = "";
  this.image = "";

  this.setName = function (dishName) {
    this.dishName = dishName;
    return this;
  };
  this.setIsVeg = function (isVeg) {
    this.isVeg = isVeg;
    return this;
  };
  this.setBestSeller = function (isBestSeller) {
    this.isBestSeller = isBestSeller;
    return this;
  };
  this.setPrice = function (price) {
    this.price = price;
    return this;
  };
  this.setDescription = function (desc) {
    this.desc = desc;
    return this;
  };
  this.setImage = function (image) {
    this.image = image;
    return this;
  };

  this.build = function () {
    let newDish = new Dish(
      this.dishName,
      this.isVeg,
      this.isBestSeller,
      this.price,
      this.desc,
      this.image
    );
  };
}
const menuItems = {
  Recommended: [
    new DishModel()
      .setName("Chilli Garlic Noodles")
      .setIsVeg(true)
      .setBestSeller(true)
      .setPrice(199)
      .setDescription(
        "Asian Chinese-style garlic noodles recipe includes noodles cooked with dry red chilies and red chili sauce for a vibrant, lightly spicy dish."
      )
      .setImage(ChilliGarlicNoodles),
  ],
  Platters: [
    new DishModel()
      .setName("Mixed Platter")
      .setIsVeg(true)
      .setBestSeller(false)
      .setPrice(230)
      .setDescription(
        "An authentic mixed platter with 3 pieces of Barnala Methi Chicken, 3 pieces of Chicken Kebab, 3 pieces of Hara Bhara and 3 pieces of Paneer Tikka."
      )
      .setImage(MixedPlatter),
    new DishModel()
      .setName("Veg Platter")
      .setIsVeg(true)
      .setBestSeller(false)
      .setPrice(250)
      .setDescription(
        "An authentic veg platter with 3 pieces of Paneer Achari, 3 pieces of Hara Bhara, 3 pieces of Veg Seekh and 3 pieces of Malai Chaap."
      )
      .setImage(VegPlatter),
    new DishModel()
      .setName("NonVeg Platter")
      .setIsVeg(false)
      .setBestSeller(false)
      .setPrice(899)
      .setDescription(
        "An authentic non veg platter with 3 pieces of Barnala Mathi Chicken Tikka, 3 pieces of Dhaniya Chicken, 3 pieces of Tawa Chicken and 3 pieces of Chicken Kebab."
      )
      .setImage(NonVegPlatter),
  ],
  Starters: [
    new DishModel()
      .setName("Achari Paneer Tikka")
      .setIsVeg(true)
      .setBestSeller(false)
      .setPrice(390)
      .setDescription(
        "An authentic mixed platter with 3 pieces of Barnala Methi Chicken, 3 pieces of Chicken Kebab, 3 pieces of Hara Bhara and 3 pieces of Paneer Tikka."
      )
      .setImage(AchariPaneerTikka),
    new DishModel()
      .setName("Methi Chicken Tikka Barnala ")
      .setIsVeg(false)
      .setBestSeller(false)
      .setPrice(250)
      .setDescription(
        "Barnala-style tender chicken Tikka flavoured with aromatic Methi."
      )
      .setImage(MethiChickenTikka),
  ],
  Soups: [
    new DishModel()
      .setName("Manchow Soup")
      .setIsVeg(true)
      .setBestSeller(false)
      .setPrice(160)
      .setDescription(
        "An authentic mixed platter with 3 pieces of Barnala Methi Chicken, 3 pieces of Chicken Kebab, 3 pieces of Hara Bhara and 3 pieces of Paneer Tikka."
      )
      .setImage(ManchowSoup),

    new DishModel()
      .setName("Sweet Corn Soup")
      .setIsVeg(true)
      .setBestSeller(false)
      .setPrice(150)
      .setDescription(
        "An authentic mixed platter with 3 pieces of Barnala Methi Chicken, 3 pieces of Chicken Kebab, 3 pieces of Hara Bhara and 3 pieces of Paneer Tikka."
      )
      .setImage(SweetCornSoup),
  ],
};
export default menuItems;
