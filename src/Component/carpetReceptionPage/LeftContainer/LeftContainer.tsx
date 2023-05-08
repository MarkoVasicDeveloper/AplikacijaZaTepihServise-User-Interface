import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeftContainer.css";

import { selectLogIn } from "../../../redux/user/userSlice";

import { InputWithValidation } from "../../layout/input/input";
import { Button } from "../../layout/button/button";
import { Textarea } from "../../layout/textarea/textarea";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useInputText } from "../../../hooks/useInputText";
import { useAddClient } from "../../../hooks/useAddClient";
import { useAddReception } from "../../../hooks/useAddReception";
import { useReceptionNumber } from "../../../hooks/useReceptionNumber";

export default function LeftContainer() {
  const userLogIn = useTypedSelector(selectLogIn);

  const navigator = useNavigate();

  const { data, edit } = useInputText({});
  const [clean, setClean] = useState(false);

  useReceptionNumber();
  const addClient = useAddClient();
  useAddReception(data);

  useEffect(() => { if (!userLogIn) navigator("/") }, [navigator, userLogIn]);

  return (
    <section id="container">
      <h3>Podaci o klijentu</h3>
      <InputWithValidation onChangeInput={edit} name='name' id='name' placeholder="Ime" label="Ime" cleanUp={clean} required/>
      <InputWithValidation onChangeInput={edit} name='surname' id='surname' placeholder="Prezime" label="Prezime" cleanUp={clean} required />
      <InputWithValidation onChangeInput={edit} name='address' id='address' placeholder="Adresa" label="Adresa" cleanUp={clean} required />
      <InputWithValidation onChangeInput={edit} name='phone' id='phone' placeholder="Telefon" label="Telefon" cleanUp={clean} />

      <h3>Popis tepiha</h3>
      <InputWithValidation onChangeInput={edit} name='carpets' id='carpets' placeholder="Broj tepiha" label="Broj tepiha" cleanUp={clean} />
      <InputWithValidation onChangeInput={edit} name='tracks' id='tracks' placeholder="Broj staza" label="Broj staza" cleanUp={clean} />

      <Textarea name='note' id='note' onChangeInput={edit} label='Napomena' placeholder="Napomena" cleanUp={clean} />
      <div className="sendButton">
        <Button title={"Posalji..."} type="submit" onClickFunction={() => { addClient(data); setClean(!clean)}} />
      </div>
    </section>
  );
}
