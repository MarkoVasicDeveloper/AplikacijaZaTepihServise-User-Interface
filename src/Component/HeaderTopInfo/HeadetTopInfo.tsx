import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import { selectUserName } from "../../redux/user/userSlice";
import { selectWorkerName, setWorker } from "../../redux/worker/workerSlice";

import { Button } from "../layout/button/button";
import { Modal } from "../modal/modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListDots } from "@fortawesome/free-solid-svg-icons";

export default function HeaderTopInfo() {
  const dispatch = useAppDispatch();
  const userName = useTypedSelector(selectUserName);
  const workerName = useTypedSelector(selectWorkerName);

  const [showWorker, setShowWorker] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="header-reception">
        <div className="washer-logo" >
          <h2>WASHER</h2>
        </div>
        <span onClick={() => setShowWorker(!showWorker)}><FontAwesomeIcon icon={faListDots} /></span>
      </div>

      <Modal open={showWorker} close={() => setShowWorker(!showWorker)}>
          <div className="info-mobile">
            <div className="animation-0">
              <p>Korisnik</p>
              <span>{userName}</span>
            </div>
            <div className="animation-1">
              <p>Radnik</p>
              <span>{workerName}</span>
            </div>
            <Button
              default
              onClickFunction={() => {
                dispatch(setWorker({
                  workerName: "",
                  workerId: 0,
                  workerLogIn: false,
                }));
                navigate("/workerlogin");
              }}
              title="Odjava radnika" />
          </div>
      </Modal>
    </>
  );
}
