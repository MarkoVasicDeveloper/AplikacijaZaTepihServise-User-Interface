import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeftLong, faKey, faMailBulk, faSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../layout/input/input";
import { useInputText } from "../../hooks/useInputText";
import { SocialIcon } from "../layout/socialIcon/socialIcon";
import { Button } from "../layout/button/button";
import { useLoginCheck } from "../../hooks/useLoginCheck";
import { useWorkerLoginCheck } from "../../hooks/useWorkerLoginCheck";
import { useWorkerSingUp } from "../../hooks/useWorkerSingUp";

interface LoginProps {
  workerLogIn?: boolean
  workerSingUp?: boolean
}

export default function LoginAndWorkerSingUp({ workerLogIn, workerSingUp }: LoginProps) {
  const { data, edit } = useInputText({});
  const { sendData, message } = useLoginCheck(data);
  const { sendWorkerData, logMessage } = useWorkerLoginCheck(data);
  const { addWorker } = useWorkerSingUp();

  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if ((!data.password || !data.email) && !workerLogIn) return setDisabled(true);
    if ((!data.password || !data.name) && workerLogIn) return setDisabled(true);
    setDisabled(false);
  }, [data, workerLogIn]);

  function send(e: React.ChangeEvent) {
    if (!workerLogIn && !workerSingUp) {
      sendData(data, e);
      edit('password');
      return;
    };

    if (workerSingUp) return addWorker(data);
    sendWorkerData(data, e);
  }

  return (
    <section id="logIn">
      <div className="container">
        <div className="row justify-center">
          <div className="form col-12-xs col-9-sm col-6-md col-4-lg">
            <div className="form-header">
              <FontAwesomeIcon icon={faArrowLeftLong} onClick={() => navigate("/")} />

              <h2>{workerSingUp ? 'Prijava radnika' : workerLogIn ? 'Radnik' : 'Prijavite se'}</h2>

              <div className="relative">
                <SocialIcon icon={faFacebook} link={"facebook.com"} />
                <SocialIcon icon={faInstagram} link={"instagram.com"} />
              </div>
            </div>

            <Input icon={workerLogIn || workerSingUp ? faSignature : faMailBulk} onChangeInput={edit} name={workerLogIn || workerSingUp ? "name" : "email"} placeholder={workerLogIn || workerSingUp ? "Ime" : "Email"} id={workerLogIn || workerSingUp ? "name" : "email"} cleanUp={workerLogIn || workerSingUp} required />
            <Input icon={faKey} onChangeInput={edit} name={"password"} placeholder="Password" id={"password"} type="password" cleanUp={workerLogIn} required />

            <div className="message-container">
              <p className={message ? "api-message" : ''}> {message} </p>
              <p className={logMessage ? "api-message" : ''}> {logMessage} </p>
            </div>

            <Button title={workerSingUp ? 'Registruj se' : "Login"} onClickFunction={(e) => send(e)} type='submit' disabled={disabled} />

            <div className="form-footer">
              <p>
                Nemate nalog? &nbsp;
                <span>
                  <Link to={workerLogIn ? "/workersingup" : "/singup"}>Sing Up</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
