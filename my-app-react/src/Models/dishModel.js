import {
  SweetCornSoup,
  ManchowSoup,
  MixedPlatter,
  VegPlatter,
  NonVegPlatter,
  ChilliGarlicNoodles,
  MethiChickenTikka,
  AchariPaneerTikka,
  TandooriVegPlatter,
  NonVegTandooriPlatter,
  PaneerTandooriGrilledSandwich,
  GrilledSandwichwithCheese,
  CheeseMeltDownBurger,
  ChickenSchezwanSteamMomos,
  FieryChicken,
  CornCheeseSteamMomos
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
    return new Dish(
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
      .setImage(ChilliGarlicNoodles)
      .build(),
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
      .setImage(MixedPlatter)
      .build(),
    new DishModel()
      .setName("Veg Platter")
      .setIsVeg(true)
      .setBestSeller(false)
      .setPrice(250)
      .setDescription(
        "An authentic veg platter with 3 pieces of Paneer Achari, 3 pieces of Hara Bhara, 3 pieces of Veg Seekh and 3 pieces of Malai Chaap."
      )
      .setImage(VegPlatter)
      .build(),
    new DishModel()
      .setName("NonVeg Platter")
      .setIsVeg(false)
      .setBestSeller(false)
      .setPrice(899)
      .setDescription(
        "An authentic non veg platter with 3 pieces of Barnala Mathi Chicken Tikka, 3 pieces of Dhaniya Chicken, 3 pieces of Tawa Chicken and 3 pieces of Chicken Kebab."
      )
      .setImage(NonVegPlatter)
      .build(),

    new DishModel()
      .setName("Tandoori Veg Platter")
      .setIsVeg(true)
      .setBestSeller(false)
      .setPrice(199)
      .setDescription(
        "An authentic mixed platter with 3 pieces of Barnala Methi Chicken, 3 pieces of Chicken Kebab, 3 pieces of Hara Bhara and 3 pieces of Paneer Tikka."
      )
      .setImage(TandooriVegPlatter)
      .build(),
    new DishModel()
      .setName("Non Veg Tandoori Platters")
      .setIsVeg(false)
      .setBestSeller(false)
      .setPrice(230)
      .setDescription(
        "An authentic mixed platter with 3 pieces of Barnala Methi Chicken, 3 pieces of Chicken Kebab, 3 pieces of Hara Bhara and 3 pieces of Paneer Tikka."
      )
      .setImage(NonVegTandooriPlatter)
      .build(),
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
      .setImage(AchariPaneerTikka)
      .build(),
    new DishModel()
      .setName("Methi Chicken Tikka Barnala ")
      .setIsVeg(false)
      .setBestSeller(false)
      .setPrice(250)
      .setDescription(
        "Barnala-style tender chicken Tikka flavoured with aromatic Methi."
      )
      .setImage(MethiChickenTikka)
      .build(),
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
      .setImage(ManchowSoup)
      .build(),

    new DishModel()
      .setName("Sweet Corn Soup")
      .setIsVeg(true)
      .setBestSeller(false)
      .setPrice(150)
      .setDescription(
        "An authentic mixed platter with 3 pieces of Barnala Methi Chicken, 3 pieces of Chicken Kebab, 3 pieces of Hara Bhara and 3 pieces of Paneer Tikka."
      )
      .setImage(SweetCornSoup)
      .build(),
  ],
  Sandwiches: [
    new DishModel()
      .setName("Paneer Tandoori Grilled Sandwich")
      .setIsVeg(true)
      .setBestSeller(false)
      .setPrice(238)
      .setDescription(
        "Cottage cheese tandoori sandwich grilled with white bread tasty and delectable, made to perfection, two pieces."
      )
      .setImage(PaneerTandooriGrilledSandwich)
      .build(),

    new DishModel()
      .setName("Grilled Sandwich with Cheese")
      .setIsVeg(true)
      .setBestSeller(false)
      .setPrice(210)
      .setDescription(
        "Classic grilled sandwich with cheese, grilled to perfection, made to perfection, rich and flavourful, two pieces."
      )
      .setImage(GrilledSandwichwithCheese)
      .build(),
  ],
  Burger: [
    new DishModel()
      .setName("Cheese Melt Down Burger")
      .setIsVeg(true)
      .setBestSeller(false)
      .setPrice(169)
      .setDescription(
        "Cheese oozing spicy veg patty, veggies and creamy sauce. An indulgent treat from our King's Collection!"
      )
      .setImage(CheeseMeltDownBurger)
      .build(),

    new DishModel()
      .setName("Fiery Chicken")
      .setIsVeg(false)
      .setBestSeller(false)
      .setPrice(210)
      .setDescription(
        "Too Hot to Handle. Our Spicy & Crunchy Chicken Patty topped with crispy lettuce, juicy tomatoes(seasonal) and creamy sauce with our unique corn dust buns. An indulgent treat from our King's Collection!"
      )
      .setImage(FieryChicken)
      .build(),
  ],
  Momos: [
    new DishModel()
      .setName("Chicken Schezwan Steam Momos")
      .setIsVeg(false)
      .setBestSeller(false)
      .setPrice(238)
      .setDescription(
        "Minced soft Juicy boneless Chicken, Coriander & Celery leaf cooked in blend of herbs and spices comes with mouth-watering hot Schezwan flavour (5 Pcs). Served with Spicy Red Sauce and Green Chutney."
      )
      .setImage(ChickenSchezwanSteamMomos)
      .build(),

    new DishModel()
      .setName("Corn & Cheese Steam Momos")
      .setIsVeg(true)
      .setBestSeller(false)
      .setPrice(185)
      .setDescription(
        "Wow! Momo Signature Product: Momos filled with Shredded Cheese and Sweet Corn and mixed with the flavours of Indian Spices. Served with home-made Spicy Red Sauce and Green Chutney."
      )
      .setImage(CornCheeseSteamMomos)
      .build(),
  ],
};
export default menuItems;
