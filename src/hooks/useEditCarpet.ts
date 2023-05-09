import api, { ApiResponse } from "../api/api";
import { Carpet, editCarpetPrice, removeCarpet, selectCarpets } from "../redux/carpets/carpetsSlice";
import { Reception, setNewPayment } from "../redux/reception/receptionSlice";
import { selectUserId } from "../redux/user/userSlice";
import { selectWorkerId } from "../redux/worker/workerSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useTypedSelector } from "./useTypedSelector";

export function useEditCarpet () {
  const dispatch = useAppDispatch();
  
  const userId = useTypedSelector(selectUserId);
  const workerId = useTypedSelector(selectWorkerId);
  const carpets = useTypedSelector(selectCarpets);

  const editCarpet = (data: Record<string, any>, index: number, reception: Reception) => {
    const carpet = carpets.find((current: Carpet) => current.index === index);
    const edit = async (): Promise<ApiResponse> => await api(
      `api/carpet/editCarpet/${carpet?.carpetId}/${userId}`,
      "post",
      {
        carpetReception: reception.carpetReceptionId,
        width: data[`width-${index}`],
        height: data[`height-${index}`],
        price: data[`price-${index}`],
        workerId: workerId,
        deliveryDate: reception.date,
        clientsId: reception.clientId,
      }
    );

    edit()
      .then(res => {
        dispatch(setNewPayment({ oldPrice: (carpet?.forPayment || 0), newPrice: res.data.forPayment}));
        dispatch(removeCarpet(index));
        dispatch(editCarpetPrice({ index, price: res.data.forPayment }));
        
      })
  };

  return editCarpet;
}