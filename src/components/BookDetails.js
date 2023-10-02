import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({});

  //   Get book details
  async function getBookDetails() {
    // Call the api to get book details
  }

  useEffect(() => {
    getBookDetails();
  }, []);
  return <div>BookDetails Page for id {id}</div>;
}
