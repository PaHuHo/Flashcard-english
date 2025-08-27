import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";

function TopicDetail() {
  const { id } = useParams(); // lấy id từ URL

  //   useEffect(() => {
  //     fetch(`http://localhost:3000/topic/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => setTopic(data));
  //   }, [id]);

  return (
    <>
      <NavBar></NavBar>
      <div>
        <h1>{id}</h1>
      </div>
    </>
  );
}

export default TopicDetail;
