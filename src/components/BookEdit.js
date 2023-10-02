import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { getAuthToken } from "./Auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

export default function BookEdit() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    author: "",
    publicationDate: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  //   take user to previous page
  const cancelBookEdit = () => {
    navigate(-1);
  };

  const getData = async () => {
    const token = getAuthToken();
    if (!token) {
      alert("please sign in");
      navigate("/signin/user");
    } else {
      const bookDetails = await axios.get(
        `/book/get/${id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      setFormData(bookDetails.data[0]);
    }
    // Call the api to add book and redirect to home page
  };

  //   edit book
  const editBook = async (e) => {
    // will call the api to edit book
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
        await axios.patch(`/book/edit/${id}`, formData, {
          headers: {
            token: token,
          },
        });
        alert("data updated successfully");
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    getData();
    // Call the api to get data
  }, []);

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
      <h1>Update Book details</h1>
      <Form onSubmit={editBook}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={handleChange}
            value={formData.title}
          />
          {errors.title && <span style={{color:"red"}}>{errors.title}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            onChange={handleChange}
            value={formData.author}
          />
          {errors.author && <span style={{color:"red"}}>{errors.author}</span>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            name="genre"
            onChange={handleChange}
            value={formData.genre}
          />
          {errors.genre && <span style={{color:"red"}}>{errors.genre}</span>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>PublicationDate</Form.Label>
          <Form.Control
            type="text"
            name="publicationDate"
            onChange={handleChange}
            value={formData.publicationDate}
          />
          {errors.publicationDate && <span style={{color:"red"}}>{errors.publicationDate}</span>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="primary" onClick={cancelBookEdit}>
          cancel
        </Button>
      </Form>
    </Container>
  );
}
