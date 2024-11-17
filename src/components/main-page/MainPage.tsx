import "./MainPage.css";
import React from "react";
import { Map } from "./Map";

export function MainPage() {
  return (
    <div className="page">
      {/* <h1 className="page-header">Добро пожаловать, авантюрист</h1> */}

      <div className="content">
        <img
          className="banner"
          width="320"
          height="320"
          src="./images/banner.png"
          alt="расписание клуба"
        />

        <Map></Map>
      </div>
    </div>
  );
}
