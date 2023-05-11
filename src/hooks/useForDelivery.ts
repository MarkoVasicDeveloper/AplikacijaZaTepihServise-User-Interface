import { useEffect } from 'react';
import api from '../api/api';
import { useTypedSelector } from './useTypedSelector';
import { selectUserId } from '../redux/user/userSlice';
import { useAppDispatch } from './useAppDispatch';
import { ForDelivery, setForDelivery } from '../redux/delivery/deliverySlice';
import { setBill } from '../redux/bill/billSlice';

export function useForDelivery () {
  const dispatch = useAppDispatch();
  const userId = useTypedSelector(selectUserId);
  
  useEffect(() => {
    const getDeliveryData = async() => await api(`api/carpetReception/getReceptionByDelivery`, "get", {});
    getDeliveryData()
      .then(res => {
        const notDelivered = res.data.filter(
          (reception: any) =>
            reception.numberOfCarpet + reception.numberOfTracks === reception.prepare
        );
        dispatch(setForDelivery(notDelivered));
        getBill(notDelivered)
      });

    function getBill(forDelivery: any[]) {
      forDelivery.forEach(async (reception: ForDelivery) => {
        const clientCarpet = await api(
          `api/carpet/getAllCarpetByClientId/${reception.carpetReception}/${userId}`,
          "get",
          {}
        );
        
        const clientBill = clientCarpet.data.reduce(
          (acc: number, item: any) => acc + item.forPayment,
          0
        );
        dispatch(setBill({[String(clientCarpet.data[0]?.carpetReceptionUser)] : clientBill}));
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}