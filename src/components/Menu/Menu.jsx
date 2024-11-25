// import React from "react";
import "./Menu.scss";
// import { Link } from "react-router-dom";

const Menu = () => {
  const posts = [
    {
      id: 1,
      title: "Pizza: The Ultimate Flatbread Evolution",
      desc: "Who knew a flat circle of dough could hold so much joy? This cheesy masterpiece was invented to bring happiness in every slice. Pineapple lovers and haters, unite—it's all about the crust!",
      img: "https://images.pexels.com/photos/1435905/pexels-photo-1435905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      title: "Tacos: Folded Food Perfection",
      desc: "Hard shell or soft shell? The age-old debate, but one thing is clear—anything tastes better wrapped in a taco. Just watch out for the salsa drip—it’s a rite of passage.",
      img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      title: "Ice Cream: The Cold Shoulder We All Love",
      desc: "Scoops of happiness, cones of joy. Ice cream doesn't judge your choices—it melts in your presence, just like your heart when you find a hidden cookie dough chunk.",
      img: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      title: "Pasta: A Saucy Love Story",
      desc: "Spaghetti, penne, or fusilli—pasta shapes may differ, but the love remains the same. It's the edible hug we all need after a long day, paired with cheese and garlic bread.",
      img: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="menu__post" key={post.id}>
          <img className="menu__image" src={post.img} alt="Content Image" />
          <h2 className="menu__title">{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
