import "./RightContentMeasuring.css";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { selectReception } from "../../../redux/reception/receptionSlice";
import { Carpet } from "./carpet/carpet";

export default function RightContentMeasuring() {
  const reception = useTypedSelector(selectReception);

  return (
    <section id="rightContentMeasuring">
      {reception.show > 0
        ? new Array(reception.show).fill(0).map((_: any, index: number) => {
            return <Carpet key={index} reception={reception} index={index} />
          })
        : <h2>Tepisi pripremljeni!</h2>}
    </section>
  );
}
