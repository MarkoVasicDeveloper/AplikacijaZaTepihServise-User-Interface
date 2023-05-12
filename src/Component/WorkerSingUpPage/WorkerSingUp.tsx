import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeftLong,
  faKey,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WorkerSingUp.css";
import { useInputText } from "../../hooks/useInputText";
import { Input } from "../layout/input/input";
import { Button } from "../layout/button/button";
import { SocialIcon } from "../layout/socialIcon/socialIcon";
import { useWorkerSingUp } from "../../hooks/useWorkerSingUp";

export default function WorkerSingUp(): JSX.Element {
  const { addWorker, message } = useWorkerSingUp();

  const { data, edit } = useInputText({});
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data.name || !data.password) setDisabled(true)
  }, [data])

  return (
    <div>
      <section id="singUp">
        <div className="form-holder-singUp singUp-worker">
          <div className="form-header-singUp">
            <FontAwesomeIcon icon={faArrowLeftLong} onClick={() => navigate("/")} />
            <h1>Sing up</h1>
            <div className="relative">
              <SocialIcon icon={faFacebook} link={"facebook.com"} />
              <SocialIcon icon={faInstagram} link={"instagram.com"} />
            </div>
          </div>
          <div className="input-holder">
            <div className="left-input-holder">
              <div className="input-one-singUp">
                <Input onChangeInput={edit} name='name' id='name' placeholder="Ime" icon={faSignature} required />
              </div>

              <div className="input-one-singUp">
                <Input type="password" onChangeInput={edit} name='password' id='password' placeholder="Lozinka" icon={faKey} required />
              </div>
            </div>
          </div>
          <div className="btn-textMesage-holder">
            <div>
              <p>{message}</p>
            </div>
            <div className="btn-div">
              <Button title='Registruj se' onClickFunction={() => addWorker(data)} disabled={disabled} /> 
            </div>

            <div className="form-footer-singUp">
              <p>
                Vec imate nalog?
                <span>
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
