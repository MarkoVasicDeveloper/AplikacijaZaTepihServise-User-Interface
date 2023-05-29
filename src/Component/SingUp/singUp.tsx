import { useEffect, useState } from "react";

import { faAddressBook, faArrowLeftLong, faCity, faKey, faMailBulk, faPhone, faSignature } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SocialIcon } from "../layout/socialIcon/socialIcon";
import { Input } from "../layout/input/input";
import { Button } from "../layout/button/button";

import { useInputText } from "../../hooks/useInputText";
import { useSingUp } from "../../hooks/useSingUp";

import { useNavigate } from "react-router-dom";

export function SingUp () {
  const { data, edit } = useInputText({});

  const { addUser, message } = useSingUp();

  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!data.password || !data.email || !data.name || !data.surname || !data.city || !data.phone || !data.address) return setDisabled(true);
    setDisabled(false);
  }, [data]);
  
  return (
    <section id="singUp">
      <div className="container">
        <div className="row justify-center">
          <div className="form col-12-xs col-9-sm col-6-md col-4-lg">
            <div className="form-header">
              <FontAwesomeIcon icon={faArrowLeftLong} onClick={() => navigate("/")} />

              <h2>Registracija</h2>

              <div className="relative">
                <SocialIcon icon={faFacebook} link={"facebook.com"} />
                <SocialIcon icon={faInstagram} link={"instagram.com"} />
              </div>
            </div>

            <Input icon={faSignature} onChangeInput={edit} name={"name"} placeholder={"Ime"} id={"name"} required />
            <Input icon={faSignature} onChangeInput={edit} name={"surname"} placeholder={"Prezime"} id={"surname"} required />
            <Input icon={faCity} onChangeInput={edit} name={"city"} placeholder={"Grad"} id={"city"} required />
            <Input icon={faAddressBook} onChangeInput={edit} name={"address"} placeholder={"Adresa"} id={"address"} required />
            <Input icon={faPhone} onChangeInput={edit} name={"phone"} placeholder={"Telefon"} id={"phone"} required />
            <Input icon={faMailBulk} onChangeInput={edit} name={"email"} placeholder={"Email"} id={"email"} required />
            <Input icon={faKey} onChangeInput={edit} name={"password"} placeholder="Password" id={"password"} type="password" required />

            <div className="message-container">
              <p className={message ? "api-message" : ''}> {message} </p>
            </div>
            <Button title={'Registruj se'} onClickFunction={(e) => addUser(data, e)} type='submit' disabled={disabled} />
          </div>
        </div>
      </div>
    </section>
  )
}