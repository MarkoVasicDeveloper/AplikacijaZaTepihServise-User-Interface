import api from "../api/api";
import { removeReception } from "../redux/delivery/deliverySlice";
import { selectUserId } from "../redux/user/userSlice";
import { selectWorkerId } from "../redux/worker/workerSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useTypedSelector } from "./useTypedSelector";

export function useDelivered () {
  const dispatch = useAppDispatch();
  const workerId = useTypedSelector(selectWorkerId);
  const userId = useTypedSelector(selectUserId);

  const setDelivered = (carpetReceptionUser: number) => {
    const delivered = async () => await api(
      `api/carpetReception/editReception/${workerId}/${userId}`,
      "post",
      {
        carpetReceptionId: carpetReceptionUser,
        delivered: 1,
        deliveredTime: new Date().toISOString(),
      }
    );
    delivered()
    .then((res) => { dispatch(removeReception(res.data.carpetReception)) })
    .catch(() => {})
  }

  return setDelivered;
}