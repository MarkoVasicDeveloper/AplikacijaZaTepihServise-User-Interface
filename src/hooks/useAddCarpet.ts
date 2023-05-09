import api from "../api/api";
import { setCarpets } from "../redux/carpets/carpetsSlice";
import { selectClientId } from "../redux/client/clientSlice";
import { Reception, setForPay } from "../redux/reception/receptionSlice";
import { selectUserId } from "../redux/user/userSlice";
import { selectWorkerId } from "../redux/worker/workerSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useEditReception } from "./useEditReception";
import { useTypedSelector } from "./useTypedSelector";

export function useAddCarpet () {
  const editReception = useEditReception()
  
  const dispatch = useAppDispatch();

  const userId = useTypedSelector(selectUserId);
  const workerId = useTypedSelector(selectWorkerId);
  const clientId = useTypedSelector(selectClientId);
  
  const addCarpet = (data: Record<string, unknown>, index: number, reception: Reception) => {
    if (!data[`width-${index}`] && !data[`height-${index}`] && !data[`price-${index}`]) return;

    const add = async () => await api(`api/carpet/addCarpet/${userId}`, "post", {
      carpetReception: reception.carpetReceptionUserId,
      width: data[`width-${index}`],
      height: data[`height-${index}`],
      price: data[`price-${index}`],
      workerId: workerId,
      deliveryDate: new Date().toISOString().replace('T', " ").slice(0, -5),
      clientsId: clientId,
    });

    add()
      .then(res => {
        dispatch(setForPay(res.data.forPayment));
        dispatch(setCarpets({...res.data, index}));
        editReception(reception, index);
      })
  };

  return addCarpet;
}