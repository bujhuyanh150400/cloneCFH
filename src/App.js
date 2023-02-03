import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import CreateContainer from "./components/CreateContainer";
import MenuContainer from "./components/MenuContainer";

import { useEffect} from "react";
import { useStateValue } from "./context/StateProvider";
import { getAllItems } from "./utils/FirebaseFunction";
import { actionType } from "./context/reducer";

function App() {
const [{items},dispatch] = useStateValue();

const fetchData = async () =>{
  await getAllItems().then(data=>{
    dispatch({
      type: actionType.SET_ITEMS,
      items: data
    })
  });
};

useEffect(()=>{
  fetchData();
},[])

  return (
    <AnimatePresence exitBeforeEnter>
      <div>
        {/* Header */}
        <Header />

        {/* Main */}
        <main className="">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/menu" element={<MenuContainer />}  />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
