import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { HeaderProps, headerProps } from "../../misc/HeaderProps/props";


export default function Header(): JSX.Element {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <div className={!showMobileNav ? "holder" : "mobile-nav"}>
      <nav>
        {headerProps.map((prop: HeaderProps) => {
          return (
            <ul key={prop.id}>
              <li>
                <Link to={prop.link}> {prop.text} </Link>
              </li>
            </ul>
          );
        })}
      </nav>
      <div className="manu">
        <button onClick={() => setShowMobileNav(!showMobileNav)}>Menu</button>
      </div>
    </div>
  );
}
