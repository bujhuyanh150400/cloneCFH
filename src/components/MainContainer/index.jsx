import React, { useEffect } from "react";
import { motion } from "framer-motion";
import bannerApp from ".././imgs/banner-app.webp";
import demo from ".././imgs/demo.webp";
import demo2 from ".././imgs/demo-2.webp";
import demo3 from ".././imgs/demo-3.webp";
import demo4 from ".././imgs/demo-4.webp";
import demo5 from ".././imgs/demo-5.webp";
import demo6 from ".././imgs/demo-6.webp";
import { FaShippingFast, FaLocationArrow, FaPhone } from "react-icons/fa";
import logo from ".././imgs/logo.png";
import banner from ".././imgs/banner-open.png";
import banner2 from ".././imgs/_creamy.webp";
import bannerQC2 from ".././imgs/banner1.webp";
import bannerQC2Title from ".././imgs/banner-title.webp";
import CartContainer from "../CartContainer";
import { useStateValue } from "../../context/StateProvider";

const MainContainer = () => {
  const [{ items, cart }, dispatch] = useStateValue();
  useEffect(()=>{},[cart])
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center mt-16 md:mt-20 px-4 lg:px-44 py-4">
      {/* Banner quảng cáo 1 */}
      <section
        id="banner"
        className="grid gird-cols-1 md:grid-cols-2 gap-4 w-full"
      >
        <div className="py-2 gap-6 flex-1 flex flex-col items-start justify-center">
          {/* freeship */}
          <div className="flex items-center gap-2 justify-center bg-orange-100 px-2 py-1 rounded-full">
            <p className="text-xs text-center font-semibold text-primary">
              Freeship từ 50.000đ
            </p>
            <div className="w-6 h-6 bg-white flex items-center justify-center text-sm lg:text-base text-primary drop-shadow-lg rounded-full overflow-hidden">
              <FaShippingFast />
            </div>
          </div>
          {/* Title */}
          <img
            src={logo}
            className="w-full lg:w-4/6 h-auto object-cover"
            alt="logo"
          />
          <div>
            <p className="text-[2.5rem] lg:text-[3rem] font-bold tracking-wide">
              Thế hệ cà phê của sự
            </p>
            <p className="text-primary text-[3rem] lg:text-[4rem] font-bold tracking-wide">
              Đam mê sáng tạo
            </p>
          </div>
          <p className="text-base lg:text-sm  text-center lg:text-justify md:w-[80%] tracking-wide">
            Có thể chỉ mất 30 giây để chuẩn bị một ly cà phê, nhưng để cây cà
            phê ra trái là thành quả 3 năm của rất nhiều người: những người nông
            dân, thợ rang, pha chế và những thành viên khác tại Nhà. Ly cà phê
            The Coffee House gửi đến bạn là một bức thư kể về hành trình của
            những hạt cà phê, giản dị mà đầy cảm hứng.
          </p>
          <button className="bg-primary text-white font-semibold text-sm w-full md:w-auto px-4 py-2 rounded-lg hover:drop-shadow-lg hover:opacity-80 transition-all ease-in-out duration-150">
            Khám phá ngay
          </button>
        </div>
        <div className="py-2 flex-1 relative">
          <img
            src={banner}
            alt="banner"
            className="h-350 lg:h-650 w-full rounded-3xl "
          />
          <img
            src={banner2}
            alt="banner2"
            className="absolute right-0 left-0 lg:-left-10 top-10 "
          />
        </div>
      </section>
      {/* Menu home */}
      <section className="w-full mt-8 lg:mt-16">
        <div className="grid grid-cols-2 grid-flow-row gap-4 lg:grid-cols-4 lg:gap-8">
          <div className="col-span-2 cursor-pointer">
            <img src={bannerApp} className="rounded-xl drop-shadow-xl" alt="" />
          </div>
          <div className="flex flex-col justify-center items-start gap-2 lg:gap-3 ">
            <img
              src={demo}
              alt="demo"
              className="rounded-xl drop-shadow-xl cursor-pointer"
            />
            <p className="text-sm lg:text-base font-semibold leading-5 cursor-pointer hover:text-primary transition-all duration-150 ease-in-out">
              CloudFee Hạnh nhân nướng
            </p>
            <p className="text-sm text-stone-500">49.000 đ</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-2 lg:gap-3 ">
            <img
              src={demo2}
              alt="demo"
              className="rounded-xl drop-shadow-xl cursor-pointer"
            />
            <p className="text-sm lg:text-base font-semibold leading-5 cursor-pointer hover:text-primary transition-all duration-150 ease-in-out">
              The Coffee House Sữa Đá
            </p>
            <p className="text-sm text-stone-500">39.000 đ</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-2 lg:gap-3 ">
            <img
              src={demo3}
              alt="demo"
              className="rounded-xl drop-shadow-xl cursor-pointer"
            />
            <p className="text-sm lg:text-base font-semibold leading-5 cursor-pointer hover:text-primary transition-all duration-150 ease-in-out">
              Hi-Tea Vải
            </p>
            <p className="text-sm text-stone-500">49.000 đ</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-2 lg:gap-3 ">
            <img
              src={demo4}
              alt="demo"
              className="rounded-xl drop-shadow-xl cursor-pointer"
            />
            <p className="text-sm lg:text-base font-semibold leading-5 cursor-pointer hover:text-primary transition-all duration-150 ease-in-out">
              Cà Phê Sữa Đá
            </p>
            <p className="text-sm text-stone-500">29.000 đ</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-2 lg:gap-3 ">
            <img
              src={demo5}
              alt="demo"
              className="rounded-xl drop-shadow-xl cursor-pointer"
            />
            <p className="text-sm lg:text-base font-semibold leading-5 cursor-pointer hover:text-primary transition-all duration-150 ease-in-out">
              Bánh Mì VN Thịt Nguội
            </p>
            <p className="text-sm text-stone-500">35.000 đ</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-2 lg:gap-3 ">
            <img
              src={demo6}
              alt="demo"
              className="rounded-xl drop-shadow-xl cursor-pointer"
            />
            <p className="text-sm lg:text-base font-semibold leading-5 cursor-pointer hover:text-primary transition-all duration-150 ease-in-out">
              Mochi Kem Chocolate
            </p>
            <p className="text-sm text-stone-500">19.000 đ</p>
          </div>
        </div>
      </section>
      {/* Banner quảng cáo 2 */}
      <section className="w-full mt-8 lg:mt-16">
        <div className="grid grid-cols-1 grid-flow-row lg:grid-cols-2 gap-6 lg:gap-12">
          <img src={bannerQC2} alt="banner" />
          <div className="flex flex-col justify-center items-center gap-4 lg:gap-6">
            <img src={bannerQC2Title} alt="title" />
            <p className="text-base leading-6 text-justify">
              Vừa êm mượt dịu dàng, vừa bùng nổ nồng nàn, BST Trà Sữa CloudTea
              Hương Vị Nụ Hôn Đầu mang đến trải nghiệm đầy mới mẻ. Chạm môi là
              foam béo mịn bồng bềnh, càng thêm đậm đà nhờ topping vụn bánh quy
              phô mai hoặc bột ca cao thơm lừng. Kế tiếp là tầng trà sữa sóng
              sánh, đậm hương, rõ vị. Và tầng thạch nguyên chất, dai giòn giúp
              giữ trọn vị trà sữa đến ngụm cuối cùng. 3 tầng hòa quyện, nhấp một
              ngụm là ghiền, nhớ mãi không thôi.
            </p>
            <button className="text-base lg:w-2/3 text-white font-semibold rounded-lg hover:drop-shadow-lg transition-all duration-100 ease-in-out hover:bg-[rgb(178,220,220)] bg-secondary w-full py-2 ">
              Thử ngay
            </button>
          </div>
        </div>
      </section>

      {/* Giỏ hàng */}
      {cart && <CartContainer />}
    </div>
  );
};

export default MainContainer;
