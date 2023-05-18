import Header from "../Header/header";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useForDelivery } from "../../hooks/useForDelivery";

import { ForDelivery, selectForDelivery } from "../../redux/delivery/deliverySlice";

import { Delivery } from "./delivery/delivery";

export default function DeliveryPage() {
  const forDelivery = useTypedSelector(selectForDelivery);
  useForDelivery();

  return (
    <section id="deliveryPage">
      <Header />
      <HeaderTopInfo />
      <h2>Isporuka</h2>
      <div className="container">
        <div className="row justify-center">
          {forDelivery.map((reception: ForDelivery, index: number) => (
            <Delivery key={index} reception={reception} />
          ))}
        </div>
      </div>
    </section>
  );
}
