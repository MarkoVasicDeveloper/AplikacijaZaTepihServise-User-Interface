import { useEffect } from "react";
import api from "../api/api";
import { useTypedSelector } from "./useTypedSelector";
import { selectUserId } from "../redux/user/userSlice";
import { useAppDispatch } from "./useAppDispatch";
import { setOldSchedule } from "../redux/schedul/schedulSlice";

export function useAllSchedul () {
  const dispatch = useAppDispatch();
  const userId = useTypedSelector(selectUserId);

  useEffect(() => {
      const schedul = async() => await api(
        `api/schedulingCarpet/getAll/${userId}`,
        "get",
        {}
      );
      schedul()
        .then(res => {dispatch(setOldSchedule(res.data))})
        .catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}