import "./RightContainer.css";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { selectClient } from "../../../redux/client/clientSlice";

import { LastVisitsChart } from "./lastVisitChart/lastVisitsChart";

export default function RightContainer() {
  const client = useTypedSelector(selectClient);

  const labels = ['Ime: ', 'Prezime: ', 'Adresa: ', 'Telefon: ', 'Broj tepiha: ', 'Broj staza: '];
  const data = [client.name, client.surname, client.address, client.phone, client.numberOfCarpets, client.numberOfTracks];

  return (
    <section id="container">
      <div className="savedInformation">
        <div className="headlineInformation">
          <h2>
            ID broj klijenta: <span>{client.lastReception}</span>
          </h2>
        </div>
        {
          data.map((data, index) => (
            <div key={index} className="information">
              <p>{ labels[index] } </p>
              <span>{data}</span>
            </div>
          ))
        }
      </div>
      <div className="lastVisit">
        <h3>
          Posete klijenta nasem servisu:
          <span> {client && client.userCarpetReceptions ? client.userCarpetReceptions.length : '' }</span>
        </h3>
        <LastVisitsChart userCarpetReceptions={client.userCarpetReceptions}  />
      </div>
    </section>
  );
}
