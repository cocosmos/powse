import { Stack, Typography } from "@mui/material";
import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./common/firebase/config";
import Header from "./common/Header";
import CompanyField from "./common/inputs/CompanyField";
import SubmitButton from "./common/inputs/SubmitButton";
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
    let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    let chaactersLength = characters.length;

    for (let i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * chaactersLength));
    }

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

        navigate("/home");
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
        navigate("/home");
      }
    });
  };
  return (
    <>
      {/*header component, containing the site **/}
      <Header />
      {/*main stack **/}
      <Stack
        spacing={5}
        justifyContent="center"
        height={"80vh"}
        textAlign="center"
        alignItems={"center"}
        maxWidth="sm"
        sx={{ margin: "0 auto" }}
      >
        {/*beginning of the form*/}
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
            {/*title of the page*/}
            <Typography variant="h3">
              {` Salut, plus qu'une étape avant de prendre ta Powse.`}
            </Typography>

            <Stack spacing={2} sx={{ width: "100%" }}>
              {/*importing components:"../components/common/inputs/CompanyField"*/}
              <CompanyField
                value={value}
                setValue={setValue}
                companyRef={companyRef}
              />
              {/*iinformation below the label*/}
              <Typography variant="body2">
                Grâce à cette information, nous pourrons te proposer les powses
                que tes collègues ont planifié.
              </Typography>
            </Stack>
            <SubmitButton label={"Suivant"} type={"submit"} href={undefined} />
          </Stack>
          {/*end of the form*/}
        </form>
        {/*end of the main stack*/}
      </Stack>
    </>
  );
};

export default Company;
