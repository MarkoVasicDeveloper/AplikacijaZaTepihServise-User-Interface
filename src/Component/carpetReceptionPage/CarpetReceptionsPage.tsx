import Header from "../Header/header";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import LeftContainer from "./LeftContainer/LeftContainer";
import RightContainer from "./RightContainer/RightContainer";

export default function CarpetReceptionsPage() {
  return (
    <section id="reception">
      <Header />
      <HeaderTopInfo />
      <h1>Prijem tepiha</h1>
      <div className="container">
        <div className="row justify-center">
          <LeftContainer />
          <RightContainer />
        </div>
      </div>
    </section>
  );
}
