import Axios from "axios";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

import "./CreatePost.css";
function CreatePost() {
  let history = useHistory();
  const [caption, setCaption] = useState();
  const [file, setFile] = useState();

  const post = (event) => {
    const data = new FormData();
    data.append("caption", caption);
    data.append("file", file);
    data.append("username", localStorage.getItem("username"));
    if (file != null) {
      Axios.post("http://localhost:3001/user/createpost", data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      window.location.reload();
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="textField">
        <TextField
          type="text"
          id="caption"
          onChange={(event) => {
            const { value } = event.target;
            setCaption(value);
          }}
          label="Explain"
          variant="outlined"
        />
      </div>

      <div className="buttonCam">
        <Button
          variant="contained"
          color="primary"
          onClick={post}
          component="span"
        >
          Upload
        </Button>

        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          onChange={(event) => {
            const file = event.target.files[0];
            setFile(file);
          }}
          type="file"
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </div>
    </div>
  );
}

export default CreatePost;
