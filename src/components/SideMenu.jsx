import React from "react";
import { Link } from "react-router-dom";
import "./SideMenu.scss";

function SideMenu() {
  return (
    <aside className="side-menu">
      <h2 className="menu-title">Silly Website</h2>
      <ul className="menu-list">
        <li>
          <Link to="/">Anasayfa</Link>
        </li>
        <li>
          <Link to="/bad-ui-1">BAD UI 1: VolumeLuck</Link>
        </li>
      </ul>
    </aside>
  );
}

export default SideMenu;
