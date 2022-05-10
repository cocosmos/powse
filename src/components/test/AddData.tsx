import { collection, addDoc } from "firebase/firestore";
import { db } from "../common/firebase/config";

const AddData = async () => {
  try {
    const docRef = await addDoc(collection(db, "groupe"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return <div></div>;
};

export default AddData;
