import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const FoodContainer = ({ data }) => {
  const [{ cartItems }, dispatch] = useStateValue();

  const [items, setItems] = useState([]);
  const addItemToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };
  useEffect(() => {
    addItemToCart();
  }, [items]);
  return (
    <div className="w-full mt-8 grid grid-cols-2 md:grid-cols-3 px-4 lg:px-16 gap-6 border-l-2">
      {data &&
        data.map((item) => (
          <div
            key={item?.id}
            className="flex flex-col gap-2 items-center justify-center transition-all ease-out"
          >
            <motion.img
              whileHover={{ scale: 0.95 }}
              className="drop-shadow-lg rounded-xl cursor-pointer"
              alt="imgdrink-tea-cake"
              src={item?.imgURL}
            />
            <div className="flex flex-col gap-2 justify-center items-center">
              <h3 className="text-sm hover:text-primary cursor-pointer font-semibold">
                {item?.title}
              </h3>
              <p className="text-sm">{item?.price} đ</p>
            </div>
            <motion.button
              onClick={() => setItems([...cartItems, item])}
              whileTap={{ scale: 0.8 }}
              className="bg-primary text-white text-sm px-2 py-1 rounded-xl font-semibold transition-all duration-100 ease-in-out hover:shadow-lg"
            >
              Thêm vào giỏ
            </motion.button>
          </div>
        ))}
    </div>
  );
};

export default FoodContainer;
