import { useState } from "react";
import api, { ApiResponse } from "../api/api";
import { setClient } from "../redux/client/clientSlice";
import { setReception } from "../redux/reception/receptionSlice";
import { selectUserId } from "../redux/user/userSlice"
import { useAppDispatch } from "./useAppDispatch";
import { useTypedSelector } from "./useTypedSelector"
import { setCarpetsEmpty } from "../redux/carpets/carpetsSlice";

export function useCurrentReception ()
: {getReception: (receptionUserId: number, date: Date) => void; worker: string;} {
  const userId = useTypedSelector(selectUserId);

  const dispatch = useAppDispatch();

  const [worker, setWorker] = useState('');

  const getReception = (receptionUserId: number, date: Date): void => {
    const reception = async (): Promise<ApiResponse> => await api(
      `api/carpetReception/getReceptionById/${receptionUserId}/${userId}`,
      "post",
      {}
    );

    reception()
      .then(currentReception => {
        dispatch(setCarpetsEmpty([]));
        if (currentReception.data.statusCode === -5001)
        return dispatch(setReception({ show: 0 }));

        dispatch(setClient(
          { 
            clientId: currentReception.data.clients.clientsId,
            name: currentReception.data.clients.name,
            surname: currentReception.data.clients.surname,
            address: currentReception.data.clients.address,
            phone: currentReception.data.clients.phone,
            note: currentReception.data.note,
            timeAt: currentReception.data.timeAt,
            numberOfCarpets: currentReception.data.numberOfCarpet,
            numberOfTracks: currentReception.data.numberOfTracks
          }));

        dispatch(setReception({
          date: date.toISOString().split("T")[0],
          clientId: currentReception.data.clientsId,
          carpetReceptionUserId: receptionUserId,
          carpetReceptionId: currentReception.data.carpetReception,
          forPay: 0,
          workerReceivedId: currentReception.data.workerId,
          prepared: currentReception.data.prepare,
          show:
            currentReception.data.numberOfCarpet +
            currentReception.data.numberOfTracks -
            currentReception.data.prepare,
        }));

        getWorker(currentReception.data.workerId);
      })
      .catch(() => {});
    }

    const getWorker = (workerId: number) => {
      const worker = async() => await api(
        `api/worker/${workerId}/${userId}`,
        "get",
        {}
      );

      worker()
        .then(res => setWorker(res.data.name))
        .catch(() => {})
    }
    return { getReception, worker };
}