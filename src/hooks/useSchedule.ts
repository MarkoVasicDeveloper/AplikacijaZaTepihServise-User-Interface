import api from "../api/api";
import { setSchedul } from "../redux/schedul/schedulSlice";
import { selectUserId } from "../redux/user/userSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useTypedSelector } from "./useTypedSelector";

export function useSchedule (): (data: Record<string, any>) => void {
  const dispatch = useAppDispatch();
  const userId = useTypedSelector(selectUserId);
  
  const sendSchedule = (data: Record<string, any>) => {
    const schedule = async() => await api(
      `api/schedulingCarpet/add/${userId}`,
      "post",
      data
    );

    schedule()
      .then(res => {
        dispatch(setSchedul(res.data));
      })
      .catch(() => {})
  };

  return sendSchedule;
}