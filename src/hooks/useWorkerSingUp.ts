import { useState } from "react";
import api, { ApiResponse } from "../api/api";
import { selectUserId } from "../redux/user/userSlice";
import { useTypedSelector } from "./useTypedSelector";
import { useNavigate } from "react-router-dom";

export function useWorkerSingUp ()
: { addWorker: (data: Record<string, any>) => void; addErrorMessage: string; } {
  const userId = useTypedSelector(selectUserId);

  const navigate = useNavigate();

  const [addErrorMessage, setAddErrorMessage] = useState('');

  const addWorker = (data: Record<string, any>) => {
    const add = async(): Promise<ApiResponse> => await api(`api/worker/addWorker/${userId}`, "post", {
      password: data.password,
      name: data.name,
    });

    add()
      .then(res => {
        if (res.data.statusCode === -5001) return setAddErrorMessage("Ime je zauzeto!");
        navigate("/workerlogin");
        setAddErrorMessage('');
      })
      .catch(() => {})
  };

  return { addWorker, addErrorMessage };
}