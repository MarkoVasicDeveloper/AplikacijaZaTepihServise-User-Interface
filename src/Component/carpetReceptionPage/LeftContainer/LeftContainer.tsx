import { MouseEvent, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { useClient } from "../../../Context/ClientContext";
import {
  AddClient,
  AddReception,
  PrepareClientObject,
} from "../../../misc/Function/CarpetReception/SendData";
import {
  CarpetReceptionLeft,
  initialState,
} from "../../../Reducers/CarpetReceptionLeft";
import "./LeftContainer.css";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { selectLogIn, selectUserId } from "../../../redux/user/userSlice";
import { useInputText } from "../../../hooks/useInputText";
import { InputWithValidation } from "../../layout/input/input";
import { selectWorkerId } from "../../../redux/worker/workerSlice";
import { Button } from "../../layout/button/button";
import { Textarea } from "../../layout/textarea/textarea";

export default function LeftContainer() {
  const userLogIn = useTypedSelector(selectLogIn);
  const userId = useTypedSelector(selectUserId);
  const workerId = useTypedSelector(selectWorkerId);

  const navigator = useNavigate();

  const { data, edit } = useInputText({});

  const { setClientEvent } = useClient() as any;

  const [state, dispatch] = useReducer(CarpetReceptionLeft, initialState);

  useEffect(() => {
    if (!userLogIn) return navigator("/");
    async function setReceptionNumber() {
      const lastNumberReception = await api(
        `api/carpetReception/getBigistReceptionByUser/${userId}`,
        "post",
        {}
      );
      if (lastNumberReception.data.length === 0)
        return localStorage.setItem("reception_user", "1");

      localStorage.setItem(
        "reception_user",
        lastNumberReception.data[0].carpetReceptionUser + 1
      );
    }

    setReceptionNumber();
  }, [navigator, userId, userLogIn]);

  async function sendData(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const addClient = await AddClient(
      state.name,
      state.surname,
      state.address,
      state.phone,
      userId
    );

    const addReception = await AddReception(
      addClient,
      userId,
      state.numberOfCarpet,
      state.numberOfTracks,
      state.note,
      workerId
    );

    setClientEvent(PrepareClientObject(addReception));
    dispatch({ type: "setEmpty" });
  }

  return (
    <section id="container">
      <h3>Podaci o klijentu</h3>
      <InputWithValidation onChangeInput={edit} name='name' id='name' placeholder="Ime" label="Ime" />
      <InputWithValidation onChangeInput={edit} name='surname' id='surname' placeholder="Prezime" label="Prezime" />
      <InputWithValidation onChangeInput={edit} name='address' id='address' placeholder="Adresa" label="Adresa" />
      <InputWithValidation onChangeInput={edit} name='phone' id='phone' placeholder="Telefon" label="Telefon" />

      <h3>Popis tepiha</h3>
      <InputWithValidation onChangeInput={edit} name='carpets' id='carpets' placeholder="Broj tepiha" label="Broj tepiha" />
      <InputWithValidation onChangeInput={edit} name='tracks' id='tracks' placeholder="Broj staza" label="Broj staza" />

      <Textarea name='note' id='note' onChangeInput={edit} label='Napomena' placeholder="Napomena" />
      <div className="sendButton">
        <Button title={"Posalji..."} type="submit" onClickFunction={(e) => sendData(e)} />
      </div>
    </section>
  );
}
