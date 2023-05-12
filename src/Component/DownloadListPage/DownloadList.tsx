import Header from "../Header/header";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import "./DownloadList.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectUserCoord } from "../../redux/user/userSlice";
import { useAllSchedul } from "../../hooks/useAllSchedul";
import { Schedul, removeSchedule, selectOldSchedul } from "../../redux/schedul/schedulSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEditSchedule } from "../../hooks/useEditSchedule";
import { Button } from "../layout/button/button";

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
      <div className="deliveryContent">
        <div className="delivery">
          {oldSchedule.map((reception: Schedul, index: number) => (
            <div key={index} className="reception">
              <div className="infoReception">
                {
                  labels.map((label: string, index: number) => (
                    <div key={index} className="info">
                      <p>{label}</p>
                      <span>{reception[data[index] as keyof {}]}</span>
                    </div>
                  ))
                }
              </div>
              <div className="buttonReception">
                <Button title='Treba ti pomoc da nadjes?' onClickFunction={() =>
                  (window.location.href = `https://www.google.com/maps/dir/${userCoord} ${userCoord}/${reception.address}`)} />
                <Button 
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
