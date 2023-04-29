import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeftLong,
  faKey,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveRefreshToken, saveToken } from "../../api/api";
import { useUser } from "../../Context/UserContext";
import { errorHandler, positionOptions } from "../../misc/Function/Location";
import {
  getUserInfo,
  userAuthorization,
} from "../../misc/Function/LogInPage/UserLogIn";

import "./LogIn.scss";
import { InputWithValidation } from "../layout/input/input";
import { useInputText } from "../../hooks/useInputText";
import { SocialIcon } from "../layout/socialIcon/socialIcon";
import { Button } from "../layout/button/button";

export default function Login() {
  const { data, edit } = useInputText({});
  const [message, setMessage] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const { setUserEvent } = useUser() as any;

  useEffect(() => {
    setMessage(false);
    if (!data.password || !data.email) return setDisabled(true);
    setDisabled(false);
  }, [data])

  async function sendSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    setMessage(false);
    const userAuth = await userAuthorization(data.email, data.password);
    console.log(userAuth.data);
    if (!userAuth.data.token) {
      setMessage(true);
      setDisabled(true);
      return;
    };
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
    };
    navigate("/workerlogin");
  }

  return (
    <section id="logIn">
      <div className="form-holder">
        <div className="form-header">
          <FontAwesomeIcon icon={faArrowLeftLong} onClick={() => navigate("/")} />

          <h1>Log In</h1>

          <div className="relative">
            <SocialIcon icon={faFacebook} link={"facebook.com"} />
            <SocialIcon icon={faInstagram} link={"instagram.com"} />
          </div>
        </div>

        <InputWithValidation icon={faMailBulk} onChangeInput={edit} name={"email"} placeholder="Email" id={"email"} required />
        <InputWithValidation icon={faKey} onChangeInput={edit} name={"password"} placeholder="Password" id={"password"} type="password" required />

        <div className="message-container">
          <p className={message === false ? "hiddenMessage" : "showMessage"}>
            Mail ili lozinka nisu tacni!
          </p>
        </div>
        <Button title="Login" onClickFunction={(e) => sendSubmit(e)} type='submit' disabled={disabled} />
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
    </section>
  );
}
