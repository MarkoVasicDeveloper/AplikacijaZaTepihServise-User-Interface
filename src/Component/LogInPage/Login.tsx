import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeftLong, faKey, faMailBulk, faSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./LogIn.scss";
import { InputWithValidation } from "../layout/input/input";
import { useInputText } from "../../hooks/useInputText";
import { SocialIcon } from "../layout/socialIcon/socialIcon";
import { Button } from "../layout/button/button";
import { useLoginCheck } from "../../hooks/useLoginCheck";
import { useWorkerLoginCheck } from "../../hooks/useWorkerLoginCheck";

interface LoginProps {
  workerLogIn: boolean
}

export default function Login({ workerLogIn }: LoginProps) {
  const { data, edit } = useInputText({});
  const { sendData, message } = useLoginCheck(data);
  const { sendWorkerData, logMessage } = useWorkerLoginCheck(data);

  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if ((!data.password || !data.email) && !workerLogIn) return setDisabled(true);
    if ((!data.password || !data.name) && workerLogIn) return setDisabled(true);
    setDisabled(false);
  }, [data, workerLogIn]);

  function send(e: React.ChangeEvent) {
    if (!workerLogIn) {
      sendData(data, e);
      edit('password');
      return;
    };
    sendWorkerData(data, e);
  }

  return (
    <section id="logIn">
      <div className="form-holder">
        <div className="form-header">
          <FontAwesomeIcon icon={faArrowLeftLong} onClick={() => navigate("/")} />

          <h1>{workerLogIn ? 'Radnik' : 'Prijavite se'}</h1>

          <div className="relative">
            <SocialIcon icon={faFacebook} link={"facebook.com"} />
            <SocialIcon icon={faInstagram} link={"instagram.com"} />
          </div>
        </div>

        <InputWithValidation icon={workerLogIn ? faSignature : faMailBulk} onChangeInput={edit} name={workerLogIn ? "name" : "email"} placeholder={workerLogIn ? "Ime" : "Email"} id={workerLogIn ? "name" : "email"} cleanUp={workerLogIn} required />
        <InputWithValidation icon={faKey} onChangeInput={edit} name={"password"} placeholder="Password" id={"password"} type="password" cleanUp={workerLogIn} required />

        <div className="message-container">
          <p className={message ? "api-message" : ''}> {message} </p>
          <p className={logMessage ? "api-message" : ''}> {logMessage} </p>
        </div>

        <Button title="Login" onClickFunction={(e) => send(e)} type='submit' disabled={disabled} />

        <div className="form-footer">
          <p>
            Nemate nalog? &nbsp;
            <span>
              <Link to={workerLogIn ? "/workersingup" : "/singup"}>Sing Up</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
