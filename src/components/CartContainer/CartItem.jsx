import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [{ cartItems }, dispatch] = useStateValue();
  const [items, setItems] = useState([]);

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };
  useEffect(() => {
    setItems(cartItems);
  }, [quantity]);

  const updateQuantity = (action, id) => {
    if (action === "plus") {
      setQuantity(quantity + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
        }
      });
      cartDispatch();
    }else if(action === "minus"){
      setQuantity(quantity - 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty -= 1;
        }
      });
    } 
    else {
      if (quantity === 1) {
        setItems(cartItems.filter((item) => item.id !== id));
        cartDispatch();
      } else {
        setQuantity(quantity - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
          }
        });
      }
    }
  };
  return (
    <div className="w-full p-1 px-2 rounded-lg bg-orange-100 grid grid-cols-4 gap-4">
      <img
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt="demo"
        src={item?.imgURL}
      />
      <div className="flex flex-col gap-2 col-span-2">
        <p className="text-sm font-semibold text-black">{item?.title}</p>
        <p className="text-sm text-gray-500">{item?.price * quantity}.000 đ</p>
      </div>
      <div className="group flex items-center gap-2 cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQuantity("minus", item?.id)}
        >
          <BiMinus className="text-primary" />
        </motion.div>
        <p className="w-5 h-5 flex items-center justify-center text-sm ">
          {quantity}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQuantity("plus", item?.id)}
        >
          <BiPlus className="text-primary" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
