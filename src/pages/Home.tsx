import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Home = async () => {
  const querySnapshot = await getDocs(collection(db, "company/Crea/users"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  return <h1>Home</h1>;
};

export default Home;
