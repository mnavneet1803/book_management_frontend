import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getAuthToken } from "./Auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

export default function BookAdd() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    author: "",
    publicationDate: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  //   take user to previous page
  const cancelBookAdd = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

   // Call the api to add book and redirect to home page

  const handleSubmit = async (e) => {
    const token = getAuthToken();
    e.preventDefault();
    if (!token) {
      alert("please sign in");
      navigate("/signin/user");
    } else {
      const validationErrors = {};
      if (!formData.title.trim()) {
        validationErrors.title = "title is required";
      }
      if (!formData.genre.trim()) {
        validationErrors.genre = "genre is required";
      }
      if (!formData.author.trim()) {
        validationErrors.author = "author is required";
      }
      if (!formData.publicationDate.trim()) {
        validationErrors.publicationDate = "publicationDate is required";
      }

      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        await axios.post(
          "/book/add",
           formData,
          {
            headers: {
              token: token,
            },
          }
        );

        alert("Book details inserted successfully ..");
        navigate("/");
      }
    }
  };

  return (
    <Container
      style={{
        padding: "70px",
        width: "40%",
        border: "2px  solid black",
        marginTop: "20px",
        borderRadius: "10px ",
      }}
    >
      <h1>Add Book Details</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" onChange={handleChange} />
          {errors.title && <span style={{color:"red"}}>{errors.title}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" onChange={handleChange} />
          {errors.author && <span style={{color:"red"}}>{errors.author}</span>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" name="genre" onChange={handleChange} />
          {errors.genre && <span style={{color:"red"}}>{errors.genre}</span>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>PublicationDate</Form.Label>
          <Form.Control
            type="text"
            name="publicationDate"
            onChange={handleChange}
          />
          {errors.publicationDate && <span style={{color:"red"}}>{errors.publicationDate}</span>}
        </Form.Group>
        <Button variant="primary" onClick={cancelBookAdd}>
          cancel
        </Button>
        <Button variant="primary" type="submit" className="m-2">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
