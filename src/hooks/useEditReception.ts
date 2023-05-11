import api from "../api/api";
import { Reception } from "../redux/reception/receptionSlice";
import { selectUserId } from "../redux/user/userSlice";
import { useTypedSelector } from "./useTypedSelector";

export function useEditReception () {
  const userId = useTypedSelector(selectUserId);
  
  async function editReception(reception: Reception, index: number) {
    return await api(
      `api/carpetReception/editReception/${reception.workerReceivedId}/${userId}`,
      "post",
      {
        carpetReceptionId: reception.carpetReceptionUserId,
        prepare: reception.prepared + index + 1,
      },
      "user"
    );
  };

  return editReception;
}