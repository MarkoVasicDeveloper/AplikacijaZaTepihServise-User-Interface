import { useState } from "react";

import Header from "../Header/header";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useInputText } from "../../hooks/useInputText";
import { useSchedule } from "../../hooks/useSchedule";

import { Textarea } from "../layout/textarea/textarea";
import { Input } from "../layout/input/input";
import { Button } from "../layout/button/button";

import { selectLastSchedul } from "../../redux/schedul/schedulSlice";

export default function Scheduling() {
  const schedule = useTypedSelector(selectLastSchedul);

  const sendSchedule = useSchedule();

  const {data, edit} = useInputText({});
  const [clear, setClear] = useState(false);

  const labels = ['Ime:', 'Prezime', 'Adresa', 'Telefon', 'Email', 'Napomena'];
  const result = [schedule.name, schedule.surname, schedule.address, schedule.phone, schedule.email, schedule.note];

  return (
    <section id="scheduling">
      <Header />
      <HeaderTopInfo />
      <h2>Zakazivanje preuzimanja</h2>
      <div className="container">
        <div className="row justify-center">
          <div className="col-12-xs col-8-sm col-5-md section-part">
            <h3>Obavezne informacije</h3>
            <Input onChangeInput={edit} name="name" id="name" label="Ime:" placeholder="Ime" cleanUp={clear} required/>
            <Input onChangeInput={edit} name="surname" id="surname" label="Prezime:" placeholder="Prezime" cleanUp={clear} required/>
            <Input onChangeInput={edit} name="address" id="address" label="Adresa:" placeholder="Adresa" cleanUp={clear} required/>
            <Input onChangeInput={edit} name="phone" id="phone" label="Telefon:" placeholder="Telefon" cleanUp={clear} required />

            <h3>Ostale informacije</h3>
            <Input onChangeInput={edit} name="email" id="email" label="Email:" placeholder="Email" cleanUp={clear} />
            <Textarea onChangeInput={edit} name="note" id="note" label="Napomena:" placeholder="Napomena" cleanUp={clear} />
            <Button type="submit" title='Posalji' onClickFunction={() => { sendSchedule(data); setClear(!clear) }} />
          </div>
          <div className="col-12-xs col-8-sm col-5-md section-part">
            {
              labels.map((label: string, index) => (
                <div key={index} className="information">
                  <p>{label}</p>
                  <span>{result[index]}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}
