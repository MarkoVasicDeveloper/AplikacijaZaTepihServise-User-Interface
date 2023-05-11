import { WorkProps } from "../../misc/HeaderProps/props";
import HeaderWork from "../Header/HeaderWork";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import "./DeliveryPage.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useForDelivery } from "../../hooks/useForDelivery";
import { selectForDelivery } from "../../redux/delivery/deliverySlice";
import { Delivery } from "./delivery/delivery";

export default function DeliveryPage() {
  const forDelivery = useTypedSelector(selectForDelivery);
  useForDelivery();

  return (
    <section id="deliveryPage">
      <HeaderWork item={WorkProps} />
      <HeaderTopInfo />
      <div className="deliveryContent">
        <div className="delivery">
          {forDelivery.map((reception: any) => (
            <Delivery reception={reception} />
          ))}
        </div>
      </div>
    </section>
  );
}
