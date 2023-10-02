import "./App.css";
import NewNavbar from "./components/NewNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import SignOut from "./components/Signout";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import BookEdit from "./components/BookEdit";
import BookAdd from "./components/BookAdd";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NewNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add/book" element={<BookAdd />} />
          <Route path="/signup/user" element={<SignUp />} />
          <Route path="/signin/user" element={<SignIn />} />
          <Route path="/signout/user" element={<SignOut />} />
          <Route path="/book/details/:id" element={<BookDetails />} />
          <Route path="/book/edit/:id" element={<BookEdit />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
