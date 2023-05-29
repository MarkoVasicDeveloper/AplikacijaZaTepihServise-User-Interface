import { useEffect, useState } from "react";

import { useAddCarpet } from "../../../../hooks/useAddCarpet";
import { useEditCarpet } from "../../../../hooks/useEditCarpet";
import { useInputText } from "../../../../hooks/useInputText";

import { Reception } from "../../../../redux/reception/receptionSlice";

import { Input } from "../../../layout/input/input";
import { Button } from "../../../layout/button/button";

interface CarpetProps {
  reception: Reception,
  index: number
}

export function Carpet ({ reception, index }: CarpetProps) {
  const { data, edit } = useInputText({});
  const addCarpet = useAddCarpet();
  const editCarpet = useEditCarpet();

  const [clear, setClear] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => { setClear(prev => !prev) }, [reception.carpetReceptionUserId]);
  
  return (
    <div key={index} className="carpetDiv col-12-xs col-8-sm col-8-md col-5-lg col-8-xl">
      <h2>Tepih/Staza {index + 1}</h2>
      <Input type="number" onChangeInput={edit} name={`width-${index}`} id={`width-${index}`} label="Sirina" placeholder="Sirina" cleanUp={clear} />
      <Input type="number" onChangeInput={edit} name={`height-${index}`} id={`height-${index}`} label="Duzina" placeholder="Duzina" cleanUp={clear} />
      <Input type="number" onChangeInput={edit} name={`price-${index}`} id={`price-${index}`} label="Cena" placeholder="Cena" cleanUp={clear} />

      <Button type="submit" onClickFunction={() => { addCarpet(data, index, reception); setDisabled(true) }} title="Posalji" disabled={disabled} />
      <Button default onClickFunction={() => editCarpet(data, index, reception)} title="Izmeni" />
      <p>
        Povrsina: &nbsp;
        <span>
          {
            !data[`width-${index}`] && !data[`height-${index}`] && !data[`price-${index}`] ? '' :
              (data[`width-${index}`] * data[`height-${index}`]).toFixed(2)
          }
          &nbsp;
          m
          <sup>2</sup>
        </span>
      </p>
      <p>
        Za naplatu: &nbsp;
        <span>
          {
            !data[`width-${index}`] && !data[`height-${index}`] && !data[`price-${index}`] ? '' :
              (data[`width-${index}`] * data[`height-${index}`] * data[`price-${index}`]).toFixed(2)
          }
          &nbsp;
          din
        </span>
      </p>
    </div>
  )
}