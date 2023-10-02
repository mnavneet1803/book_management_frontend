import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Card from "./Card";
import { getAuthToken } from "./Auth";
import { useNavigate } from "react-router";

export default function Home() {
  const nevigate = useNavigate();
  const [data, setData] = useState([]);
  //   API will get all books
  const getBooks = async () => {
    const token = getAuthToken();
    if (!token) {
      alert("please sign in");
      nevigate("/signin/user");
    } else {
      const bookDetails = await axios.get("/book/get", {
        headers: {
          token: token,
        },
      });
      setData(bookDetails.data);
    }
    // Call the api to add book and redirect to home page
  };


  useEffect(() => {
    getBooks();
   
  }, []);
  return (
    <div className="master">
      <div class="row">
        <div class="container">
          {data.map((book,index) => {
            // return <Card book={book} />;
          return (
            <div class="col-sm">
            <Card book={book} index={index} />
          </div>
          )
          })}
        </div>
      </div>
    </div>
  );
}
