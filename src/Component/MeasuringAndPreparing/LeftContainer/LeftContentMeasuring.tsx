import { useState } from "react";
import "./LeftContentMeasuring.css";

import DatePicker from "react-date-picker";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { selectClient } from "../../../redux/client/clientSlice";
import { selectReceptionForPay } from "../../../redux/reception/receptionSlice";

import { useInputText } from "../../../hooks/useInputText";
import { useCurrentReception } from "../../../hooks/useCurrentReception";

import { Input } from "../../layout/input/input";
import { Button } from "../../layout/button/button";

export default function LeftContentMeasuring() {
  const client = useTypedSelector(selectClient);
  const forPay = useTypedSelector(selectReceptionForPay);

  const { data, edit } = useInputText({});
  const [date, onChangeDate] = useState(new Date());
  const { getReception, worker } = useCurrentReception();

  const labels = ['Ime: ', 'Prezime: ', 'Adresa: ', 'Telefon: ', 'Broj tepiha: ', 'Broj staza: ', 'Vreme prijema: ', 'Radnik: ', 'Napomena: '];
  const displayData = [client.name, client.surname, client.address, client.phone, client.numberOfCarpets, client.numberOfTracks, client.timeAt, worker, client.note];

  return (
    <section id="leftContentMeasuring">
      <div className="carpetId">
        <label htmlFor="receptionUserId">
          Unesite <span>ID</span> broj tepiha:
        </label>
        <Input onChangeInput={edit} name={"receptionUserId"} id={"receptionUserId"} />
        <Button title="Posalji" onClickFunction={() => getReception(data.receptionUserId, date) } />
      </div>
      <div className="userInfo">
        {
          displayData.map((data, index) => (
            <div key={index} className="info">
              <label>{labels[index]}</label>
              <p>{data}</p>
            </div>
          ))
        }

        <div className="date">
          <label htmlFor="deliveryDate">Dan isporuke je:</label>
          <DatePicker
            name="deliveryDate"
            value={date}
            onChange={onChangeDate}
          />
        </div>
      </div>
      <div className="forPay">
        <p>
          ZA NAPLATU: &nbsp;
          <span> {forPay ? forPay + " din" : ""}</span>
        </p>
      </div>
    </section>
  );
}
