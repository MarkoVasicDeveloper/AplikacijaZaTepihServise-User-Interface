import Header from "../Header/header";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import LeftContentMeasuring from "./LeftContainer/LeftContentMeasuring";
import RightContentMeasuring from "./RightContainer/RightContentMeasuring";

export default function MeasuringAndPreparingCarpet() {
  return (
    <section id="measuringAndPreparingCarpet">
      <Header />
      <HeaderTopInfo />
      <h1>Priprema tepiha za isporuku</h1>
      <div className="container">
        <div className="row justify-center">
          <LeftContentMeasuring />
          <RightContentMeasuring />
        </div>
      </div>
    </section>
  );
}
