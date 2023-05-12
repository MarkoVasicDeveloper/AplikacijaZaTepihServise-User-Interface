import { useNavigate } from "react-router-dom";
import "./HeaderTopInfo.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectUserName } from "../../redux/user/userSlice";
import { selectWorkerName, setWorker } from "../../redux/worker/workerSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export default function HeaderTopInfo() {
  const dispatch = useAppDispatch();
  const userName = useTypedSelector(selectUserName);
  const workerName = useTypedSelector(selectWorkerName);

  const navigate = useNavigate();

  return (
    <div className="header-reception">
      <div className="washer-logo">
        <h2>WASHER</h2>
      </div>
      <div className="user">
        <p>
          Korisnik: <span>{userName}</span>
        </p>
      </div>
      <div className="worker">
        <p>
          Radnik: <span>{workerName}</span>
        </p>
      </div>
      <div className="logOutButton">
        <button
          onClick={() => {
            dispatch(setWorker({
              workerName: "",
              workerId: 0,
              workerLogIn: false,
            }));
            navigate("/workerlogin");
          }}
        >
          Odjava radnika
        </button>
      </div>
    </div>
  );
}
