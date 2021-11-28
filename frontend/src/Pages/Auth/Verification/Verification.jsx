import React, { useState, useEffect } from "react";
import Topbar from "../../../Components/Topbar/Topbar";
import { Button, TextField } from "@mui/material";
import styles from "./Verification.module.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import axios from "../../../Helper/axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
const cookies = new Cookies();

const getBase64 = (file, cb) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const Verification = () => {
  const [nid, setNid] = useState("");
  const [nidFront, setNidFront] = useState("");
  const [nidBack, setNidBack] = useState("");
  const formRef = React.useRef();
  const handleChange = async (event, type) => {
    switch (type) {
      case "nationalIdNumber":
        setNid(event.target.value);
        break;
      case "nidBack":
        setNidBack(await getBase64(event.target.files[0]));
        break;
      case "nidFront":
        setNidFront(await getBase64(event.target.files[0]));
        break;
      default:
        break;
    }
  };

  useEffect(async () => {
    console.log(nidBack);
  }, [nidBack]);

  useEffect(async () => {
    console.log(nidFront);
  }, [nidFront]);

  const submit = () => {
    const body = {
      nid,
    };
    console.log(body);
    axios
      .patch("api/users/sellers/updateProfileInfo", body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.mainDiv} style={{ backgroundColor: "#def6ff" }}>
      <Topbar list={[]} />
      <div className={styles.mainSignUpDiv}>
        <form ref={formRef} className={styles.signUpDiv}>
          <p className={styles.signUpText}>Verification</p>
          <TextField
            required="true"
            onChange={(event) => {
              handleChange(event, "nationalIdNumber");
            }}
            className={styles.textField}
            id="standard-basic"
            label="National Identity Number"
            variant="standard"
          />
          <div className={styles.imageInputs}>
            <input
              type="file"
              onChange={(event) => {
                handleChange(event, "nidFront");
              }}
            />
            <input
              type="file"
              hidden
              onChange={(event) => {
                handleChange(event, "nidBack");
              }}
            />
          </div>
          <Button
            className={styles.btn}
            onClick={submit}
            variant="contained"
            endIcon={<DoubleArrowIcon />}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
