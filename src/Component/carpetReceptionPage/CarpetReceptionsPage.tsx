import Header from "../Header/header";
import HeaderTopInfo from "../HeaderTopInfo/HeadetTopInfo";
import "./CarpetReceptionsPage.css";
import LeftContainer from "./LeftContainer/LeftContainer";
import RightContainer from "./RightContainer/RightContainer";

export default function CarpetReceptionsPage() {
  return (
    <section id="reception">
      <Header />
      <HeaderTopInfo />
      <h1>Prijem tepiha</h1>
      <div className="centralContent">
        <LeftContainer />
        <RightContainer />
      </div>
    </section>
  );
}
