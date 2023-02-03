import React, { useEffect, useState } from "react";
import { categories } from "../../utils/data";
import { motion } from "framer-motion";
import FoodContainer from "./FoodContainer";
import { useStateValue } from "../../context/StateProvider";
import CartContainer from "../CartContainer";

const MenuContainer = () => {
  const [{ items,cart }, dispatch] = useStateValue();
  const [category, setCategory] = useState("All");
  useEffect(() => {}, [category]);

  return (
    <>
      <section
        className="mt-[50px] lg:mt-20 lg:px-44 grid lg:grid-flow-row lg:grid-cols-4 grid-cols-1"
        id="menu"
      >
        <div className="flex justify-start items-start p-0 lg:py-10">
          {/* Mobile + tablet select categories */}
          <div className="w-full p-2 flex items-center justify-center shadow-md lg:hidden">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="border-2 text-sm font-semibold rounded-lg outline-none p-2 w-full"
            >
              {categories &&
                categories.map((item) => (
                  <option
                    key={item.id}
                    value={item.urlName}
                    className="text-sm border-0 outline-none capitalize bg-white text-textColor"
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          {/* PC select categories */}
          <div className="hidden lg:block">
            <h1 className="text-xl capitalize text-primary font-bold mb-4">
              Danh mục sản phẩm
            </h1>
            <ul className="flex border-l-2 border-primary px-4 flex-col items-start justify-center gap-2">
              {categories &&
                categories.map((item) => (
                  <motion.li
                    whileTap={{ scale: 0.8 }}
                    className={`cursor-pointer text-sm pl-2  py-1 font-semibold transition-all duration-100 ease-in-out ${
                      category === item.urlName
                        ? "rounded-xl shadow-md w-full bg-primary text-white"
                        : "text-stone-500"
                    }`}
                    onClick={() => {
                      setCategory(item.urlName);
                    }}
                    key={item.id}
                    value={item.urlName}
                  >
                    {item.name}
                  </motion.li>
                ))}
            </ul>
          </div>
        </div>
        <div className=" lg:col-span-3 p-0 lg:py-10">
          <FoodContainer
            data={items?.filter((item) => {
              if (category === "All") {
                return item;
              } else {
                return item.category === category;
              }
            })}
          />
        </div>
      </section>
      {/* Giỏ hàng */}
      {cart && <CartContainer />}
    </>
  );
};

export default MenuContainer;
