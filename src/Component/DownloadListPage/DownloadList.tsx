import Header from "../Header/header";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import { Button } from "../layout/button/button";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAllSchedul } from "../../hooks/useAllSchedul";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEditSchedule } from "../../hooks/useEditSchedule";

import { selectUserCoord } from "../../redux/user/userSlice";
import { Schedul, removeSchedule, selectOldSchedul } from "../../redux/schedul/schedulSlice";

export default function DownloadList() {
  const dispatch = useAppDispatch();
  const userCoord = useTypedSelector(selectUserCoord);
  const oldSchedule = useTypedSelector(selectOldSchedul);
  const editSchedule = useEditSchedule();

  useAllSchedul();

  const labels = ['Ime', 'Prezime', 'Adresa', 'Telefon', 'Napomena'];
  const data = ['name', 'surname', 'address', 'phone', 'note'];

  return (
    <section id="deliveryPage">
      <Header />
      <HeaderTopInfo />
      <h2>Za preuzimanje</h2>
      <div className="container">
        <div className="row justify-center">
          {oldSchedule.map((reception: Schedul, index: number) => (
            <div key={index} className="col-12-xs col-12-sm col-8-md section-part">
              <div className="row justify-center">
                {
                  labels.map((label: string, index: number) => (
                    <div key={index} className="information col-12-xs col-8-sm col-6-md">
                      <span>{label}</span>
                      <span>{reception[data[index] as keyof {}]}</span>
                    </div>
                  ))
                }
              </div>
              <div className="big-button">
                <Button default title='Treba ti pomoc da nadjes?' onClickFunction={() =>
                  (window.location.href = `https://www.google.com/maps/dir/${userCoord} ${userCoord}/${reception.address}`)} />
                <Button type="submit"
                  title='Isporuka zavrsena?'
                  onClickFunction={
                    () => { 
                      dispatch(removeSchedule(reception.schedulingCarpetId));
                      editSchedule(reception.schedulingCarpetId) }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
