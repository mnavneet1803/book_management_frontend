import React from "react";
import "./Card.css";
import { useNavigate } from "react-router";
import { getAuthToken } from "./Auth";
import axios from "axios";
export default function Card({ book ,index}) {
  const { _id, title, author, genre, publicationDate } = book;

  const navigate = useNavigate();

  //book details page
  const navigateToBookDetails = () => {
    navigate(`/book/details/${_id}`);
  };

  //drop book
  const dropBook = async(e) => {
    e.stopPropagation();
    // Call api to drop book
    const token = getAuthToken();
    if (!token) {
      alert("please sign in");
      navigate("/signin/user");
    } else {
      const bookDetails = await axios.delete(`/book/drop/${_id}`, {
        headers: {
          token: token,
        },
      });
      alert("data deleted successfully",bookDetails.message)
      window.location.reload();
    }
    // Redirect to home page
  };

  //edit book page
  const editBook = (e) => {
    e.stopPropagation();
    // Redirect to edit page
    navigate(`/book/edit/${_id}`);
  };
  return (
    <div class="card" >
  <div class="card-body">
    <h5 class="card-title">{title}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">{author}</li>
    <li class="list-group-item">Genre: {genre}</li>
    <li class="list-group-item">Publication date: {publicationDate}</li>
  </ul>
  <div class="card-body">
     <button className="btn btn-primary m-1" onClick={editBook}>Edit</button>
       <button className="btn btn-danger" onClick={dropBook}>Delete</button>
  </div>
</div>
  );
}
