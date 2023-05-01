import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeftLong, faKey, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./LogIn.scss";
import { InputWithValidation } from "../layout/input/input";
import { useInputText } from "../../hooks/useInputText";
import { SocialIcon } from "../layout/socialIcon/socialIcon";
import { Button } from "../layout/button/button";
import { useLoginCheck } from "../../hooks/useLoginCheck";

export default function Login() {
  const { data, edit } = useInputText({});
  const { sendData, message } = useLoginCheck(data);

  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!data.password || !data.email) return setDisabled(true);
    setDisabled(false);
  }, [data])

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
          <p className={message ? "api-message" : ''}> {message} </p>
        </div>

        <Button title="Login" onClickFunction={(e) => sendData(data, e)} type='submit' disabled={disabled} />

        <div className="form-footer">
          <p>
            Nemate nalog? &nbsp;
            <span>
              <Link to="/singup">Sing Up</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
