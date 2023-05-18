import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { selectClient } from "../../../redux/client/clientSlice";

import { LastVisitsChart } from "./lastVisitChart/lastVisitsChart";

export default function RightContainer() {
  const client = useTypedSelector(selectClient);

  const labels = ['Ime: ', 'Prezime: ', 'Telefon: ', 'Adresa: ', 'Broj tepiha: ', 'Broj staza: '];
  const data = [client.name, client.surname, client.phone, client.address,  client.numberOfCarpets, client.numberOfTracks];

  return (
    <section id="right-container" className="col-12-sm col-8-md col-5-xl section-part">
      <div className="savedInformation">
        <div className="headlineInformation">
          <h3>
            ID broj klijenta: <span>{client.lastReception}</span>
          </h3>
        </div>
        <div className="row justify-center">
          {
            data.map((data, index) => (
              <div key={index} className="information col-12-xs col-5-sm col-5-md col-4-xl">
                <span>{ labels[index] } </span>
                <span title={data as string}>{data}</span>
              </div>
            ))
          }
        </div>
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
