import { DomainVerification } from "@mui/icons-material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const GetData = () => {
  const colRef = collection(db, "company/9hQGHBPKsssS0b9gsEbl/users");
  getDocs(colRef)
    .then((snapshot) => {
      console.log(snapshot);
      const books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      console.log(books);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default GetData;
