import clsx from "clsx";
import React, { useState } from "react";
import logo from ".././imgs/logo.png";
import logo2 from ".././imgs/logo2.png";
import { MdExitToApp } from "react-icons/md";
import { FcGoogle, FcMenu } from "react-icons/fc";
import logoUser from ".././imgs/user.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase.config";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [btnHide, setBtnHide] = useState(true);
  const [modalLogin, setModalLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ user, cart }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const [isMenuNav, setIsMenuNav] = useState(false);

  const handelLoginGoogle = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
    setBtnHide(false);
    setModalLogin(false);
  };

  const handleLogout = () => {
    setBtnHide(true);
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type : actionType.SET_CART_SHOW,
      cart: !cart,
    })
    setIsMenu(false)
  }
  console.log('====================================');
  console.log(user.photoURL);
  console.log('====================================');
  return (
    <>
      <header className="fixed w-full top-0 left-0 right-0 z-40 px-4 py-4 lg:px-44 bg-white border-b-2 ">
        {/* Navbar - PC và Tablet */}
        <nav className="hidden lg:flex w-full h-full items-center justify-between">
          <div className="flex justify-center items-center gap-8">
            {/* Logo */}
            <Link to={"/"} className={clsx("flex items-center")}>
              <img
                src={logo}
                className={clsx("max-w-[228px] object-cover")}
                alt="logo"
              />
            </Link>
            {/* Nav link */}
            <ul className={clsx("flex items-center gap-4")}>
              <Link to={"/"}>
                <li className="text-base font-semibold text-black cursor-pointer hover:text-primary duration-150 ease-in-out">
                  Trang chủ
                </li>
              </Link>
              <Link to={"/menu"}>
                <li className="text-base font-semibold text-black cursor-pointer hover:text-primary duration-150 ease-in-out">
                  Menu
                </li>
              </Link>
              <Link to={"/"}>
                <li className="text-base font-semibold text-black cursor-pointer hover:text-primary duration-150 ease-in-out">
                  Về chúng tôi
                </li>
              </Link>
              <Link to={"/"}>
                <li className="text-base font-semibold text-black cursor-pointer hover:text-primary duration-150 ease-in-out">
                  Liên hệ
                </li>
              </Link>
            </ul>
          </div>
          {/* signin-signup btn */}
          <div className="relative">
            {/* Btn */}
            {btnHide && user === null && (
              <div className="flex items-center justify-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className="text-sm font-semibold text-primary py-1 px-4 hover:opacity-80 duration-100 ease-in-out"
                  onClick={() => setModalLogin(!modalLogin)}
                >
                  Đăng nhập
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className="text-sm font-semibold  text-primary py-1 px-4 border-2 border-primary rounded-lg hover:bg-primary hover:text-white duration-200 ease-in-out"
                  onClick={() => setModalLogin(!modalLogin)}
                >
                  Đăng kí
                </motion.button>
              </div>
            )}
            {/* Avatar login */}
            {(btnHide === false || user !== null) && (
              <div
                onClick={() => {
                  setIsMenu(!isMenu);
                }}
                className="flex items-center justify-center gap-1 bg-orange-100 rounded-full py-1 px-2 cursor-pointer drop-shadow"
              >
                <motion.img
                  whileTap={{ scale: 0.6 }}
                  src={user ? user.photoURL : logoUser}
                  className="w-5 h-5 min-w-[30px] min-h-[30px] rounded-full  "
                />
                <p className="text-sm font-semibold">
                  Xin chào {' '}
                  {user.email === "bujhuyanh150400@gmail.com"
                    ? "Admin"
                    : user.displayName}
                </p>
              </div>
            )}
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, y:-40 }}
                animate={{ opacity: 1, y:0}}
                exit={{ opacity: 0, y:-40}}
                className="absolute w-full py-2 bg-orange-100 shadow-xl rounded-lg flex flex-col items-center justify-center gap-2 top-12 right-0"
              >
                {user && user.email === "bujhuyanh150400@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      onClick={() => {
                        setIsMenu(false);
                      }}
                      className="text-sm font-semibold py-1 cursor-pointer hover:text-primary transition-all duration-150 ease-out"
                    >
                      Món mới
                    </p>
                  </Link>
                )}
                <p
                  onClick={showCart}
                  className="text-sm py-1 font-semibold justify-center cursor-pointer hover:text-primary transition-all duration-150 ease-out"
                >
                  Giỏ hàng
                </p>
                <p
                  onClick={handleLogout}
                  className="text-sm py-1 font-semibold justify-center cursor-pointer text-primary "
                >
                  Đăng xuất
                </p>
              </motion.div>
            )}
          </div>
        </nav>

        {/* Navbar - mobile- tablet*/}
        <nav className="flex justify-between items-center lg:hidden w-full h-full">
          <Link to={"/"} className={clsx("flex items-center gap-2")}>
            <img
              src={logo}
              className={clsx("max-w-[180px] object-cover")}
              alt="logo"
            />
          </Link>
          <motion.div
            whileTap={{ scale: 0.6 }}
            onClick={() => setIsMenuNav(true)}
            className="relative cursor-pointer"
          >
            <FcMenu />
          </motion.div>
          {isMenuNav && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: 100 }}
              transition = {{duration:0.2}}
              className="absolute flex flex-col items-center top-0 right-0 bg-white px-6 py-4 border-l-2 w-4/12 h-screen"
            >
              <motion.div
                whileTap={{ scale: 0.6 }}
                onClick={() => setIsMenuNav(false)}
                className="absolute text-md left-3 top-3"
              >
                <MdExitToApp />
              </motion.div>
              <ul
                className={clsx(
                  "flex flex-col mt-10 items-center gap-4 py-3 border-b-2 border-primary"
                )}
              >
                <Link to={"/"}>
                  <li className="text-sm text-center font-semibold text-black cursor-pointer hover:text-primary duration-150 ease-in-out">
                    Trang chủ
                  </li>
                </Link>
                <Link to={"/menu"}>
                  <li className="text-sm text-center font-semibold text-black cursor-pointer hover:text-primary duration-150 ease-in-out">
                    Menu
                  </li>
                </Link>
                <Link to={"/"}>
                  <li className="text-sm text-center font-semibold text-black cursor-pointer hover:text-primary duration-150 ease-in-out">
                    Về chúng tôi
                  </li>
                </Link>
                <Link to={"/"}>
                  <li className="text-sm text-center font-semibold text-black cursor-pointer hover:text-primary duration-150 ease-in-out">
                    Liên hệ
                  </li>
                </Link>
              </ul>
              <div>
              {btnHide && user === null && (
              <div className="flex flex-col mt-2 items-center justify-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className="text-sm font-semibold text-primary py-1 px-4 hover:opacity-80 duration-100 ease-in-out"
                  onClick={() => setModalLogin(!modalLogin)}
                >
                  Đăng nhập
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className="text-sm font-semibold  text-primary py-1 px-4 border-2 border-primary rounded-lg hover:bg-primary hover:text-white duration-200 ease-in-out"
                  onClick={() => setModalLogin(!modalLogin)}
                >
                  Đăng kí
                </motion.button>
              </div>
            )}
                {(btnHide === false || user !== null) && (
                  <div className="mt-4 flex flex-col items-center justify-center gap-4">
                    <img
                      src={user ? user.photoURL : logoUser}
                      className=" w-5 h-5 min-w-[30px] min-h-[30px] rounded-full cursor-pointer "
                      alt="avatar"
                    />
                    <p className="text-base text-center font-bold text-primary flex justify-center item-center gap-4 ">
                      Xin chào{" "}
                      {user.email === "bujhuyanh150400@gmail.com"
                        ? "Admin"
                        : user.displayName}
                    </p>
                    {user && user.email === "bujhuyanh150400@gmail.com" && (
                      <Link to={"/createItem"}>
                        <p
                          onClick={() => {
                            setIsMenu(false);
                          }}
                          className="text-sm font-semibold flex justify-center item-center gap-4 cursor-pointer hover:text-primary transition-all duration-150 ease-out"
                        >
                          Món mới
                        </p>
                      </Link>
                    )}
                    <p
                      onClick={showCart}
                      className="text-sm font-semibold flex justify-center item-center gap-4 cursor-pointer hover:text-primary transition-all duration-100 ease-in-out"
                    >
                      Giỏ hàng
                    </p>
                    <p
                      onClick={handleLogout}
                      className="text-sm font-semibold flex justify-center item-center gap-4 cursor-pointer text-primary transition-all duration-100 ease-in-out"
                    >
                      Đăng xuất
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </nav>

        {/* Modal login */}
      {modalLogin && (
        <div className="fixed inset-0 w-screen h-screen z-50 bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className=" bg-white w-7/12 h-1/2 p-6 lg:w-3/12 md:h-2/3   relative flex flex-col justify-center gap-2 md:gap-4 opacity-100"
          >
            <motion.button
              onClick={() => setModalLogin(false)}
              whileTap={{ scale: 0.8 }}
              className="absolute right-5 top-2"
            >
              <MdExitToApp />
            </motion.button>
            <img
              src={logo2}
              className="absolute left-7 top-5 w-1/6 object-cover "
              alt="logo"
            />
            <h1 className="text-base mt-8 lg:m-0 text-start text-primary uppercase font-bold">
              Đăng nhập
            </h1>
            <div>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tên tài khoản"
                className="w-full text-sm py-2 bg-transparent font-semibold outline-none border-b-2 border-primary placeholder:text-textColor"
              />
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Mật khẩu"
                className="w-full text-sm py-2 bg-transparent font-semibold outline-none border-b-2 border-primary placeholder:text-textColor"
              />
            </div>
            <div className="flex items-center flex-col justify-center mt-4 gap-3">
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="text-base text-white bg-primary py-1 px-4 drop-shadow rounded-lg hover:opacity-80 transition-150 ease-in-out "
              >
                Đăng nhập
              </motion.button>
              <p className="text-xs md:text-justify text-center">
                Bạn không có tài khoản,{" "}
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className="text-primary"
                >
                  Đăng kí ngay
                </motion.button>
              </p>
              <div className="w-1/2 h-[1px] bg-primary"></div>
            </div>
            <div className="flex items-center flex-col justify-center gap-2">
              <p className="text-xs mt-4">Hoặc đăng nhập với</p>
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={handelLoginGoogle}
                className="text-sm flex items-center justify-center gap-2 py-1 px-4 bg-white border border-black drop-shadow hover:opacity-60 rounded-lg"
              >
                <FcGoogle className="inline" /> Google
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
      </header>
      
    </>
  );
};

export default Header;
