import { useContext } from "react";
import { SignupForm } from "../components/SignupForm";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { dispatch, currentUser } = useContext(AuthContext);

  return (
    <>
      <h1>Register</h1>
      <SignupForm />
    </>
  );
};

export default Register;
