import React, { useState } from "react";
import { motion } from "framer-motion";
import { categories } from "../../utils/data";
import Loader from "../Loader";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { store } from "../../firebase.config";
import { getAllItems, saveItems } from "../../utils/FirebaseFunction";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import banner from ".././imgs/banner-open.png";
import banner2 from ".././imgs/_creamy.webp";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [imgAssets, setImgAssets] = useState(null);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ items }, dispatch] = useStateValue();

  const uploadImg = (e) => {
    setIsLoading(true);
    const imgFile = e.target.files[0];
    const storageRef = ref(store, `images/${Date.now()}-${imgFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMessage("Có lỗi khi upload Ảnh : hãy thử lại xem");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgAssets(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMessage("đã upload ảnh thành công");
          setAlertStatus("succsess");
          setTimeout(() => {
            setFields(false);
          }, 3000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(store, imgAssets);
    deleteObject(deleteRef).then(() => {
      setImgAssets(null);
      setIsLoading(false);
      setFields(true);
      setMessage("đã xóa ảnh thành công");
      setAlertStatus("succsess");
      setTimeout(() => {
        setFields(false);
      }, 3000);
    });
  };
  const clearDatas = () => {
    setTitle("");
    setImgAssets(null);
    setPrice("");
  };
  const saveDetails = () => {
    setIsLoading(true);
    if (!title || !imgAssets || !price || !category) {
      setFields(true);
      setMessage("Không được để trống các ô điền !!!");
      setAlertStatus("danger");
      setIsLoading(false);
      setTimeout(() => {
        setFields(false);
      }, 3000);
    } else {
      const data = {
        id: `${Date.now()}`,
        qty: 1,
        title: title,
        imgURL: imgAssets,
        price: price,
        category: category,
      };
      saveItems(data);
      setFields(true);
      setIsLoading(false);
      setMessage("Upload món thành công");
      setAlertStatus("succsess");
      clearDatas();
      setTimeout(() => {
        setFields(false);
      }, 3000);
    }
    fetchData();
  };
  const fetchData = async () => {
    await getAllItems().then((data) => {
      dispatch({
        type: actionType.SET_ITEMS,
        items: data,
      });
    });
  };
  return (
    <div className="grid gird-cols-1 lg:grid-cols-2 gap-8 w-full mt-16 md:mt-20 px-4 lg:px-44 py-4">
      <div className="hidden lg:block w-full relative">
        <div className="absolute top-0 right-0">
          <div className="relative">
            <img src={banner} alt="banner" className="h-full w-full " />
            <img
              src={banner2}
              alt="banner2"
              className="absolute left-0 right-0 top-10 "
            />
          </div>
        </div>
      </div>
      <div className="w-full border-2 border-primary rounded-lg p-4 flex flex-col items-center justift-center gap-4">
        <h1 className="title-base lg:text-2xl uppercase text-primary font-bold">
          Thêm món mới
        </h1>
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-primary text-white"
                : "bg-secondary text-white"
            } `}
          >
            {message}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-200 flex flex-col items-start justify-center gap-3 p-2">
          <p className="text-base uppercase font-semibold text-black border-b-2 border-primary">
            Tên món
          </p>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tên món"
            className="w-full h-full text-sm bg-transparent font-semibold outline-none border-none placeholder:text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-200 flex flex-col items-start justify-center gap-3 p-2">
          <p className="text-base uppercase font-semibold text-black border-b-2 border-primary">
            Giá thành
          </p>
          <input
            required
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Giá sản phẩm x đ"
            className="w-full h-full text-sm bg-transparent font-semibold outline-none border-none placeholder:text-textColor"
          />
        </div>
        <div className="w-full ">
          <select
            className="outline-none w-full text-base border-b-2 bg-white border-primary p-2 rounded-md cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="other" className="bg-white text-sm ">
              {" "}
              Chọn loại
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  value={item.urlName}
                  className="text-sm bordoer-0 outline-none capitalize bg-white text-textColor"
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-200 w-full h-[200px] md:h-[300px] cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imgAssets ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 text-base hover:text-gray-700">
                        Upload ảnh đồ uống
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImg"
                      accept="image/*"
                      onChange={uploadImg}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imgAssets}
                      alt="uploadimg"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-400 text-xl cursor-pointer text-white outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="flex items-center w-full">
          <button
            className="ml-0 w-full border-none outline-none bg-primary hover:drop-shadow-lg hover:opacity-70 transition-all duration-150 ease-in-out px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Thêm món mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
