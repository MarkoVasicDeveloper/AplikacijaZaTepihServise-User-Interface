import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { selectReception } from "../../../redux/reception/receptionSlice";
import { Carpet } from "./carpet/carpet";

export default function RightContentMeasuring() {
  const reception = useTypedSelector(selectReception);

  return (
    <section id="rightContentMeasuring" className="col-12-sm col-8-md col-5-xl section-part">
      <div className="row justify-center">
        {reception.show > 0
          ? new Array(reception.show).fill(0).map((_: any, index: number) => (
              <Carpet key={index} reception={reception} index={index} />
            ))
          : <h2>Tepisi pripremljeni!</h2>}
      </div>
    </section>
  );
}
