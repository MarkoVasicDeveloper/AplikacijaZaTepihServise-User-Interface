import api, { ApiResponse } from "../api/api";
import { setClient } from "../redux/client/clientSlice";
import { selectUserId } from "../redux/user/userSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useTypedSelector } from "./useTypedSelector";

export function useAddClient (): (data: Record<string, any>) => void {
  const userId = useTypedSelector(selectUserId);
  const dispatch = useAppDispatch();

  const addClient = (data: Record<string, any>): void => {
    if(!data.name && !data.surname && !data.address && !data.phone) return;
    const add = async function (): Promise<ApiResponse> {
      return await api(`api/clients/addClient/${userId}`, "post", {
      name: data.name,
      surname: data.surname,
      address: data.address,
      phone: data.phone,
    });}

    add()
      .then((res) => {
        dispatch(setClient({
          clientId: res.data.clientsId,
          address: res.data.address,
          name: res.data.name,
          surname: res.data.surname,
          phone: res.data.phone,
          timeAt: res.data.timeAt,
          userId: res.data.userId
        }));
      })
      .catch(() => {});
  };

  return addClient;
}