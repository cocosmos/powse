import { useState } from "react";
import logo from "./assets/logo.svg";
import "./App.css";
import Home from "./pages/Home";
import FirstPage from "./pages/FirstPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Upload from "./components/button/Upload";
import Send from "./components/button/Send";
import Delete from "./components/button/Delete";
import { Password } from "@mui/icons-material";
import TextField from "./components/form/TextField";
import Badge from "./components/avatar/Badge";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Home></Home>
      <FirstPage></FirstPage>
      <Login></Login>
      <Profile></Profile>
      <Register></Register>
      <Upload></Upload>
      <Send></Send>
      <Delete></Delete>
      <Password></Password>
      <TextField></TextField>
      <Badge></Badge>
    </div>
  );
}

export default App;
