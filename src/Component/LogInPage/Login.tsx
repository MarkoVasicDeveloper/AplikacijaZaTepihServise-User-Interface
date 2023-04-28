import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeftLong,
  faKey,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveRefreshToken, saveToken } from "../../api/api";
import { useUser } from "../../Context/UserContext";
import { errorHandler, positionOptions } from "../../misc/Function/Location";
import {
  getUserInfo,
  userAuthorization,
} from "../../misc/Function/LogInPage/UserLogIn";

import "./LogIn.css";
import { Input } from "../layout/input/input";
import { useInputText } from "../../hooks/useInputText";

export default function Login() {
  const { data, edit } = useInputText({});
  const [message, setMessage] = useState(false);

  const navigate = useNavigate();

  const { setUserEvent } = useUser() as any;

  async function sendSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    setMessage(false);
    const userAuth = await userAuthorization(data.email, data.password);
    console.log(userAuth.data);
    if (!userAuth.data.token) return setMessage(true);
    saveToken("user", userAuth.data.token);
    saveRefreshToken("user", userAuth.data.refreshToken);

    setUserEvent(await getUserInfo(userAuth));

    if (!navigator.geolocation) {
      alert("Geolokacija nije podrzana od strane vaseg internet pregledaca");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setUserEvent((prev: any) => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          })),
        errorHandler,
        positionOptions
      );
    }
    navigate("/workerlogin");
  }

  return (
    <div>
      <section id="logIn">
        <div className="form-holder">
          <div className="form-header">
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              onClick={() => navigate("/")}
            />
            <h1>Log In</h1>
            <div className="social">
              <a href="facebook.com">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="instagram.com">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>

          <Input icon={faMailBulk} onChangeInput={edit} name={"email"} placeholder="Email" id={"email"} required />
          <Input icon={faKey} onChangeInput={edit} name={"password"} placeholder="Password" id={"password"} required />

          <div className="submit-btn">
            <div
              className={message === false ? "hiddenMessage" : "showMessage"}
            >
              <p>Mail ili lozinka nisu tacni!</p>
            </div>
            <button onClick={(e) => sendSubmit(e)}>Login</button>
          </div>

          <div className="form-footer">
            <p>
              Nemate nalog?
              <span>
                <Link to="/singup">Sing Up</Link>
              </span>
            </p>
            <p>Zaboravili ste password?</p>
          </div>
        </div>
        <button onClick={() => console.log(data)}>sss</button>
      </section>
    </div>
  );
}
