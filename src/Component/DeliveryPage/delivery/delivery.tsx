import { useDelivered } from "../../../hooks/useDelivered";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { selectBill } from "../../../redux/bill/billSlice";
import { selectUserCoord } from "../../../redux/user/userSlice";
import { Button } from "../../layout/button/button";

interface DeliveryProps {
  reception: any
}

export function Delivery({ reception }: DeliveryProps) {
  const bill = useTypedSelector(selectBill);
  const setDelivered = useDelivered();
  const userCoord = useTypedSelector(selectUserCoord);

  const labels = ['Ime:', 'Prezime:', 'Adresa:', 'Telefon:', 'Tepisi:', 'Staze:', 'Racun:'];
  const client = reception.clients;
  const data = [ 
    client.name, 
    client.surname, 
    client.address, 
    client.phone, 
    reception.numberOfCarpet, 
    reception.numberOfTracks, 
    bill[reception.carpetReception as keyof {}]
  ];
  
  return (
    <div className="reception col-12-sm col-8-md col-5-xl section-part">
      <p>ID broj: <span>{reception.carpetReceptionUser}</span></p>
      <div className="row justify-center">
        {
          labels.map((label: string, index: number) => (
            <div key={index} className="info col-12-xs col-6-sm col-5-xl">
              <span>{label}</span>
              <span>{data[index]}</span>
            </div>
          ))
        }
      </div> 
      <div className="deliveryButton">
        <Button default title='Treba ti pomoc da nadjes?' onClickFunction={() =>
            (window.location.href = `https://www.google.com/maps/dir/${userCoord.lat} ${userCoord.lng}/${reception.clients.address}`)
        } />
        <Button type="submit" title='Isporuka zavrsena?' onClickFunction={() => { setDelivered(reception.carpetReceptionUser) }} />
      </div>
    </div>
  )
}