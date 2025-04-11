"use client";
import axios from "axios";

const page = () => {
  const uploadData = async () => {
    const data = JSON.parse(localStorage.getItem("user"));
    await axios.post("/api/post/user-data", data);
  };
  return (
    <div>
      <button onClick={uploadData}>Upload Data</button>
    </div>
  );
};
export default page;
