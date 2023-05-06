import { useDispatch } from "react-redux";
import api, { type ApiResponse } from "../api/api";
import { selectUserId } from "../redux/user/userSlice";
import { setWorker } from "../redux/worker/workerSlice";
import { useTypedSelector } from "./useTypedSelector";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function useWorkerLoginCheck (data: Record<string, any>): {
  sendWorkerData: (data: Record<string, any>, event: React.ChangeEvent) => void
  logMessage: string
}{

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useTypedSelector(selectUserId);

  const [ logMessage, setLogMessage ] = useState('');

  useEffect(() => {setLogMessage('')}, [data]);

  const sendWorkerData = (data: Record<string, any>, event: React.ChangeEvent): void => {
    event.preventDefault();

    const workerLogin = async (): Promise<ApiResponse> => await api(`api/worker/findWorker/${userId}`, "post",
      { name: data.name, password: data.password }, "user"
    );

    workerLogin()
      .then((res): void => {
        if (res.data.statusCode === -5002 || res.data.statusCode === -5003)
          return setLogMessage('Ime ili lozinka nisu tacni!');
        
        dispatch(setWorker({
          name: res.data.name,
          id: res.data.workerId,
          logIn: true,
        }));

        navigate("/reception");
      })
      .catch(() => setLogMessage('Nesto nije u redu!'));
  };

  return { sendWorkerData, logMessage }
}