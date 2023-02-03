import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Save 1 món mới
export const saveItems = async (data) => {
  await setDoc(doc(firestore, "items", `${Date.now()}`), data, { merge: true });
};

// Get data item
export const getAllItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "items"), orderBy("id", "desc"))
  );
  return items.docs.map((doc)=> doc.data());
};
