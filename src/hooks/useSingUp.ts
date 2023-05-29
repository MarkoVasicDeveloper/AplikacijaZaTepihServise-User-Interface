import { useState } from "react";
import api, { ApiResponse } from "../api/api"
import { useNavigate } from "react-router-dom";

export function useSingUp () {
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const addUser = (data: Record<string, unknown>, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const add = async(): Promise<ApiResponse> => await api('api/user/addUser', 'post', data);

    add()
      .then(res => {
        if (res.data.statusCode === -10001) {
          return setMessage("Email je zauzet!");
        }
        setMessage('');
        navigate('/');
      })
      .catch((error) => {console.log(error)})
  }

  return { addUser, message };
}