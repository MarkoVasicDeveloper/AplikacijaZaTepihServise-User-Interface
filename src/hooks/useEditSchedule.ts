import api, { ApiResponse } from "../api/api";
import { removeSchedule } from "../redux/schedul/schedulSlice";
import { selectUserId } from "../redux/user/userSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useTypedSelector } from "./useTypedSelector";

export function useEditSchedule (): (schedulingCarpetId: number) => void {
  const dispatch = useAppDispatch();
  const userId = useTypedSelector(selectUserId);
  
  const editSchedul = (schedulingCarpetId: number) => {
    const schedule = async(): Promise<ApiResponse> => await api(`api/schedulingCarpet/edit/${userId}`, "post", {
      scheduling_carpet_id: schedulingCarpetId,
      is_sheduling: true,
    });

    schedule()
      .then(res => {dispatch(removeSchedule(res.data.schedulingCarpetId))})
      .catch(() => {})
  };

  return editSchedul;
}