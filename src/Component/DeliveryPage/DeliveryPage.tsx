import Header from "../Header/header";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import "./DeliveryPage.css";
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
      <div className="deliveryContent">
        <div className="delivery">
          {forDelivery.map((reception: ForDelivery, index: number) => (
            <Delivery key={index} reception={reception} />
          ))}
        </div>
      </div>
    </section>
  );
}
