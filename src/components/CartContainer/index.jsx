import React from "react";
import { motion } from "framer-motion";

import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import CartItem from "./CartItem";

const CartContainer = () => {
  const [{ cart, cartItems }, dispatch] = useStateValue();
  const hideCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cart: false,
    });
  };
  console.log(cartItems);
  return (
    <motion.div
      initial={{ x: 200 }}
      animate={{ x: 0 }}
      exit={{ x: 200 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen z-[60] bg-[rgba(255,255,255,0.8)] backdrop-blur drop-shadow-md flex flex-col "
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer ">
        <motion.button whileTap={{ scale: 0.6 }} onClick={hideCart}>
          <MdOutlineKeyboardBackspace className="text-black text-xl" />
        </motion.button>
        <p className="text-lg font-semibold">Giỏ hàng</p>
        <motion.button
          whileTap={{ scale: 0.8 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-primary text-white rounded-md hover:shadow-md
           cursor-pointer text-sm"
        >
          Xóa giỏ hàng <RiRefreshFill />
        </motion.button>
      </div>

      <div className="w-full h-full flex flex-col">
        <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
          {/* Cart */}
          {cartItems &&
            cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
        </div>
        {/* Tong mon */}
        {cartItems && cartItems.length > 0 ? (
          <div className="w-full flex-1 bg-stone-300 rounded-t-2xl flex flex-col items-center justify-evenly px-8 py-2 ">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Tổng cộng</p>
              <p className="text-gray-400 text-base">{cartItems.map((item)=> item.price * item.qty)}.000 đ</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.8 }}
              className="w-full p-2 rounded-full bg-primary text-white text-lg my-2 hover:drop-shadow-lg transition-all duration-150 ease-out"
            >
              Thanh toán
            </motion.button>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center ">
            <p>Giỏ hàng của bạn đang trống không dùi</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartContainer;
