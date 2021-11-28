import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useHistory } from "react-router";
import Topbar from "../../Components/Topbar/Topbar";
import Cookies from "universal-cookie";
import {
  Radio,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import profile from "./profile.png";
import axios from "../../Helper/axios";
let cookies = new Cookies();
const Profile = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    axios
      .get("api/users/userInfo")
      .then((res) => {
        console.log(res);
        const user = res.data.user;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPhone(user.phone);
        setPassword(user.password);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const formRef = React.useRef();
  let history = useHistory();
  const handleChange = (event, type) => {
    switch (type) {
      case "firstname":
        setFirstName(event.target.value);
        break;
      case "lastname":
        setLastName(event.target.value);
        break;
      case "phone":
        setPhone(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const submit = () => {
    if (formRef.current.reportValidity()) {
      const body = {
        firstName,
        lastName,
        phone,
        password,
      };
      console.log(body);
      if (cookies.get("bargainr") === "seller") {
        axios
          .patch("api/users/sellers/updateProfileInfo", body)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .patch("/api/users/customers/updateProfileInfo", body)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  return (
    <div className={styles.mainDiv} style={{ backgroundColor: "#baecff" }}>
      {cookies.get("bargainc") ? (
        <Topbar
          list={[
            {
              link: "profile",
              base: <img className={styles.profileImage} src={profile}></img>,
              type: "image",
            },
          ]}
        />
      ) : (
        <Topbar
          list={[
            { link: "login", base: "Login" },
            { link: "signUp", base: "Sign Up" },
          ]}
        />
      )}
      <div className={styles.mainSignUpDiv}>
        <form ref={formRef} className={styles.signUpDiv}>
          <p className={styles.signUpText}>Update An Account</p>
          <TextField
            value={firstName}
            required="true"
            onChange={(event) => {
              handleChange(event, "firstname");
            }}
            className={styles.textField}
            id="standard-basic"
            label="First Name"
            variant="outlined"
          />
          <TextField
            value={lastName}
            required="true"
            onChange={(event) => {
              handleChange(event, "lastname");
            }}
            className={styles.textField}
            id="standard-basic"
            label="Last Name"
            variant="outlined"
          />
          <TextField
            value={phone}
            required="true"
            onChange={(event) => {
              handleChange(event, "phone");
            }}
            className={styles.textField}
            id="standard-basic"
            label="Phone Number"
            variant="outlined"
          />
          <TextField
            required="true"
            onChange={(event) => {
              handleChange(event, "password");
            }}
            className={styles.textField}
            id="standard-basic"
            label="Password"
            type="password"
            variant="outlined"
          />
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

export default Profile;
