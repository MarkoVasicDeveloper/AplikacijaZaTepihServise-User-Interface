import { useState } from "react";
import { WorkProps } from "../../misc/HeaderProps/props";
import HeaderWork from "../Header/HeaderWork";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import "./Scheduling.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useInputText } from "../../hooks/useInputText";
import { Input } from "../layout/input/input";
import { selectLastSchedul } from "../../redux/schedul/schedulSlice";
import { Textarea } from "../layout/textarea/textarea";
import { useSchedule } from "../../hooks/useSchedule";
import { Button } from "../layout/button/button";

export default function Scheduling() {
  const schedule = useTypedSelector(selectLastSchedul);

  const sendSchedule = useSchedule();

  const {data, edit} = useInputText({});
  const [clear, setClear] = useState(false);

  const labels = ['Ime:', 'Prezime', 'Adresa', 'Telefon', 'Email', 'Napomena'];
  const result = [schedule.name, schedule.surname, schedule.address, schedule.phone, schedule.email, schedule.note];

  return (
    <section id="scheduling">
      <HeaderWork item={WorkProps} />
      <HeaderTopInfo />
      <h1>Zakazivanje preuzimanja</h1>
      <div className="schedulingContent">
        <div className="leftContent">
          <h3>Obavezne informacije</h3>
          <div className="informationSheduling">
            <Input onChangeInput={edit} name="name" id="name" label="Ime:" placeholder="Ime" cleanUp={clear} required/>
            <Input onChangeInput={edit} name="surname" id="surname" label="Prezime:" placeholder="Prezime" cleanUp={clear} required/>
            <Input onChangeInput={edit} name="address" id="address" label="Adresa:" placeholder="Adresa" cleanUp={clear} required/>
            <Input onChangeInput={edit} name="phone" id="phone" label="Telefon:" placeholder="Telefon" cleanUp={clear} />

            <h3>Ostale informacije</h3>
            <Input onChangeInput={edit} name="email" id="email" label="Email:" placeholder="Email" cleanUp={clear} />
            <Textarea onChangeInput={edit} name="note" id="note" label="Napomena:" placeholder="Napomena" cleanUp={clear} />
          </div>
          <Button title='Posalji' onClickFunction={() => { sendSchedule(data); setClear(!clear) }} />
        </div>
        <div className="rightContent">
          <div className="savedInfo">
            {
              labels.map((label: string, index) => (
                <div className="rightInfo">
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
