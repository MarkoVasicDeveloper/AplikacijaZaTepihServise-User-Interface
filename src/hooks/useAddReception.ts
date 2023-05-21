import { useTypedSelector } from "./useTypedSelector";
import api from '../api/api';
import { selectWorkerId } from '../redux/worker/workerSlice';
import { selectUserId } from '../redux/user/userSlice';
import { useAppDispatch } from './useAppDispatch';
import { setClient } from "../redux/client/clientSlice";

export function useAddReception () {
  const userId = useTypedSelector(selectUserId);
  const workerId = useTypedSelector(selectWorkerId);

  const dispatch = useAppDispatch();

  const addReception = (data: Record<string, unknown>, clientId: number): void => {
    const reception = async () => await api(
      `api/carpetReception/addReception/${workerId}`,
      "post",
      {
        clientsId: clientId,
        numberOfCarpet: Number(data.carpets),
        numberOfTracks: Number(data.tracks),
        note: data.note,
        carpet_reception_user: localStorage.getItem("reception_user"),
        userId: userId,
        delivered: 0
      }
    );

    reception()
      .then(res => {
        const lastReception =
          res.data.carpetReceptions[res.data.carpetReceptions.length - 1];

        localStorage.setItem("reception_user", lastReception.carpetReceptionUser + 1);
        
        dispatch(setClient({
          numberOfCarpets: res.data.carpetReceptions[ res.data.carpetReceptions.length - 1 ].numberOfCarpet,
          numberOfTracks: res.data.carpetReceptions[ res.data.carpetReceptions.length - 1 ].numberOfTracks,
          userCarpetReceptions: res.data.carpetReceptions,
          note: lastReception.note,
          lastReception: lastReception.carpetReceptionUser
        }))

      })
      .catch(() => {})
  }

  return addReception;
}