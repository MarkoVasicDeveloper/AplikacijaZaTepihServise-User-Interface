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

  const labels = ['ID broj: ', 'Ime:', 'Prezime:', 'Adresa:', 'Telefon:', 'Tepisi:', 'Staze:', 'Racun:'];
  const client = reception.clients;
  const data = [
    reception.carpetReceptionUser, 
    client.name, 
    client.surname, 
    client.address, 
    client.phone, 
    reception.numberOfCarpet, 
    reception.numberOfTracks, 
    bill[reception.carpetReception as keyof {}]
  ];
  
  return (
    <div className="reception">
      <div className="infoReception flex">
        {
          labels.map((label: string, index: number) => (
            <div key={index} className="info" style={label === 'Tepisi:' ? {marginTop: '1rem'} : {}}>
              <p>{label}</p>
              <span>{data[index]}</span>
            </div>
          ))
        }
      </div> 
      <div className="buttonReception">
        <Button title='Treba ti pomoc da nadjes?' onClickFunction={() =>
            (window.location.href = `https://www.google.com/maps/dir/${userCoord.lat} ${userCoord.lng}/${reception.clients.address}`)
        } />
        <Button title='Isporuka zavrsena?' onClickFunction={() => { setDelivered(reception.carpetReceptionUser) }} />
      </div>
    </div>
  )
}