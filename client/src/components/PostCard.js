import React, { useState, useEffect } from "react";
import "./Card.css";
import heartOutline from "../assets/heart-outline.png";
import heartFill from "../assets/heart-fill.png";
import Axios from "axios";

export default function Card(props) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    Axios.post("http://localhost:3001/user/liked", {
      username: localStorage.getItem("username"),
      postid: props.values.postid,
    }).then((response) => {
      console.log(response);
      setLiked(response.data.liked);
    });
  }, []);
  const [likeCount, setLikeCount] = useState(props.values.thumbsup);

  const imgLink = "http://localhost:3001/images/";
  const likePost = (id) => {
    if (liked) {
      if (likeCount > 0) {
        Axios.post("http://localhost:3001/user/dislike", {
          username: localStorage.getItem("username"),
          postid: id,
        }).then((response) => {
          setLikeCount(likeCount - 1);
          console.log(response);
          setLiked(false);
        });
      }
    } else {
      Axios.post("http://localhost:3001/user/like", {
        username: localStorage.getItem("username"),
        postid: id,
      }).then((response) => {
        setLikeCount(likeCount + 1);
        setLiked(response.data.liked);
        setLiked(true);
      });
    }
  };

  return (
    <div
      className="card"
      onClick={() => {
        likePost(props.values.postid);
      }}
    >
      <div className="card-header">
        <div className="profile">
          <span className="letter">{props.values.username}</span>
        </div>
        <div className="card-title-group">
          <h5 className="card-title">{props.values.username}</h5>
          <div className="card-date"> {props.values.date}</div>
        </div>
      </div>
      <img
        className="card-image"
        src={imgLink + props.values.image}
        alt="Logo"
      />
      <div className="card-text">{props.values.caption}</div>
      <div className="card-like-bar">
        {liked ? (
          <img className="card-like-icon" src={heartFill} alt="Logo" />
        ) : (
          <img className="card-like-icon" src={heartOutline} alt="Logo" />
        )}
        <div className="like-text">
          <b>{likeCount}</b> people liked this.
        </div>
      </div>
    </div>
  );
}
