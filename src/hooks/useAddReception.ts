import { useEffect } from 'react';

import { selectClientId, setClient } from "../redux/client/clientSlice";
import { useTypedSelector } from "./useTypedSelector";
import api from '../api/api';
import { selectWorkerId } from '../redux/worker/workerSlice';
import { selectUserId } from '../redux/user/userSlice';
import { useAppDispatch } from './useAppDispatch';

export function useAddReception (data: Record<string, unknown>) {
  const userId = useTypedSelector(selectUserId);
  const clientId = useTypedSelector(selectClientId);
  const workerId = useTypedSelector(selectWorkerId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!clientId) return;

    const addReception = async () => await api(
    `api/carpetReception/addReception/${workerId}`,
    "post",
    {
      clientsId: clientId,
      numberOfCarpet: Number(data.carpets),
      numberOfTracks: Number(data.tracks),
      note: data.note,
      carpet_reception_user: localStorage.getItem("reception_user"),
      userId: userId,
    }
  );

  addReception()
    .then(res => {
      const lastReception =
        res.data.carpetReceptions[res.data.carpetReceptions.length - 1].carpetReceptionUser;

      localStorage.setItem("reception_user", lastReception + 1);
      
      dispatch(setClient({
        numberOfCarpets: res.data.carpetReceptions[ res.data.carpetReceptions.length - 1 ].numberOfCarpet,
        numberOfTracks: res.data.carpetReceptions[ res.data.carpetReceptions.length - 1 ].numberOfTracks,
        userCarpetReceptions: res.data.carpetReceptions,
        lastReception
      }))

    })
    .catch(() => {})
  
  }, [clientId]) // eslint-disable-line react-hooks/exhaustive-deps
  
}