import { Stack, Typography } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../components/common/firebase/config";
import CompanyField from "../components/common/inputs/CompanyField";
import SubmitButton from "../components/common/inputs/SubmitButton";
import { AuthContext } from "../contexts/AuthContext";

const Company = () => {
  const [value, setValue] = useState<any | null>(null);
  const { currentUser } = useContext(AuthContext);
  const companyRef = useRef({ value: "" });

  const navigate = useNavigate();

  const handleCompany = (e) => {
    e.preventDefault();
    const entrepriseRef = companyRef.current.value;
    let companys = [];
    let companysId = [];
    let check = false;
    let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    let chaactersLength = characters.length;

    for (let i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * chaactersLength));
    }

    console.log(result);
    // queries
    const q = query(
      collection(db, "entreprise"),
      where("name", "==", entrepriseRef)
    );

    // realtime collection data
    onSnapshot(q, async (snapshot) => {
      snapshot.docs.forEach((doc) => {
        companys.push(doc.data().name);
        companysId.push(doc.id);
      });
      if (companys[0] === entrepriseRef) {
        await updateDoc(doc(db, "/users/", currentUser.uid), {
          entreprise: entrepriseRef,
          entrepriseUid: companysId[0],
          timeStamp: serverTimestamp(),
        });
        navigate("/");
      } else {
        setDoc(doc(db, `entreprise`, result), {
          name: entrepriseRef,
          timeStamp: serverTimestamp(),
        });

        updateDoc(doc(db, "/users/", currentUser.uid), {
          entreprise: entrepriseRef,
          entrepriseUid: result,
          timeStamp: serverTimestamp(),
        });
        navigate("/");
      }
    });

    /*  onSnapshot(collection(db, "entreprise"), (snapshot) => {
      snapshot.docs.map((adminDoc) => {
        companys.push({ ...adminDoc.data(), id: adminDoc.id });

        companys.forEach((element) => {
          if (element.name === entrepriseRef) {
            updateDoc(doc(db, "/users/", currentUser.uid), {
              entreprise: element.name,
              entrepriseUid: element.id,
              timeStamp: serverTimestamp(),
            });
          }
        });
      });
    }); */
    /*  if (check) {
        const registerCompany = () => {
          setDoc(doc(db, `entreprise`, result), {
            name: entrepriseRef,
            timeStamp: serverTimestamp(),
          });

          updateDoc(doc(db, "/users/", currentUser.uid), {
            entreprise: entrepriseRef,
            entrepriseUid: result,
            timeStamp: serverTimestamp(),
          });
          // navigate("/");
          console.log("notsame");
        };
        registerCompany();
      } */
  };
  return (
    <Stack
      spacing={5}
      justifyContent="center"
      height={"100%"}
      textAlign="center"
      alignItems={"center"}
      maxWidth="sm"
      sx={{ margin: "0 auto" }}
    >
      <form onSubmit={handleCompany}>
        <Stack
          spacing={10}
          justifyContent="center"
          height={"100%"}
          textAlign="center"
          alignItems={"center"}
          maxWidth="sm"
          sx={{ margin: "0 auto" }}
        >
          <Typography variant="h3">
            {` Salut, plus qu'une étape avant de prendre ta Powse.`}
          </Typography>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <CompanyField
              value={value}
              setValue={setValue}
              companyRef={companyRef}
            />
            <Typography variant="subtitle1">
              Grâce à cette information, nous pourrons te proposer les powses
              que tes collègues ont planifié.
            </Typography>
          </Stack>
          <SubmitButton label={"Suivant"} type={"submit"} href={undefined} />
        </Stack>
      </form>
    </Stack>
  );
};

export default Company;
