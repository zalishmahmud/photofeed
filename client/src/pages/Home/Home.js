import React, { useEffect, useState } from "react";
import CreatePost from "../../components/CreatePost";
import PostCard from "../../components/PostCard";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "./Home.css";

function Home({ loggedIn }) {
  const [uploads, setUploads] = useState([]);
  let history = useHistory();
  useEffect(() => {
    Axios.get("http://localhost:3001/user/posts").then((response) => {
      setUploads(response.data);
    });
  }, []);

  if (!loggedIn) {
    history.push("/login");
  }
  return (
    <div className="Home">
      <div className="createPost">
        <CreatePost />
      </div>

      <div className="showPost">
        {[...uploads].reverse().map((val, key) => {
          return <PostCard key={key} values={val} />;
        })}
        <h6>-.-</h6>
      </div>
    </div>
  );
}

export default Home;
