import { useState } from "react";
import { Link } from "react-router-dom";

import { HeaderProps, headerProps } from "../../misc/HeaderProps/props";

import { Button } from "../layout/button/button";
import { Modal } from "../modal/modal";

import { faBars } from "@fortawesome/free-solid-svg-icons";


export default function Header(): JSX.Element {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <>
      <div className="holder">
        <nav className="large-screen">
          <ul>
          {headerProps.map((prop: HeaderProps) => {
            return (
                <li key={prop.id}>
                  <Link to={prop.link}> {prop.text} </Link>
                </li>
            );
          })}
          </ul>
        </nav>
        <div className="manu">
          <span>WASHER</span>
          <Button icon={faBars} onClickFunction={() => setShowMobileNav(!showMobileNav)} />
        </div>
      </div>
      
      <Modal open={showMobileNav} close={() => setShowMobileNav(!showMobileNav)}>
        <div className="mobile-nav">
          <nav>
            <ul>
            {headerProps.map((prop: HeaderProps, index: number) => {
              return (
                <li key={prop.id} className={`animation-${index}`}>
                  <Link to={prop.link}> {prop.text} </Link>
                </li>
              );
            })}
            </ul>
          </nav>
        </div>
      </Modal>
    </>
  );
}
