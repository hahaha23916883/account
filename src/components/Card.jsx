import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

export default function Card(props) {
  function removeSignFromNumber(numberString) {
    if (numberString.startsWith("+") || numberString.startsWith("-")) {
      return numberString.substring(1);
    }
    return numberString;
  }

  // 時間擷取
  const dateTime = new Date(props.time);
  // 提取日期部分
  const date = dateTime.toISOString().split("T")[0];
  // 提取時間部分
  const time = dateTime.toISOString().split("T")[1].split(".")[0];

  const getBorderColor = () => {
    if (props.amount >= 0) {
      return "green"; // 如果 props.amount 大于等于 0，则返回绿色边框
    } else {
      return "red"; // 如果 props.amount 小于 0，则返回红色边框
    }
  };
  const cardClassName = `card ${getBorderColor()}`;

  let iconToShow;
  if (props.icon === "faAward") {
    iconToShow = faAward;
  } else if (props.icon === "faStar") {
    iconToShow = faStar;
  } else if (props.icon === "faDatabase") {
    iconToShow = faDatabase;
  }

  return (
    <div className={cardClassName}>
      <div className="card-header">
        <p className="title">{props.name}</p>
        <p className="time">{date + " " + time}</p>
      </div>
      <div className="card-body">
        {props.amount >= 0 ? (
          <div>
            <span>
              <FontAwesomeIcon
                id="icon"
                className="add-icon"
                icon={faPlus}
                size="2xl"
              />
            </span>
          </div>
        ) : null}
        {props.amount >= 0 ? null : (
          <div>
            <span>
              <FontAwesomeIcon
                id="icon"
                className="minus-icon"
                icon={faMinus}
                size="2xl"
              />
            </span>
          </div>
        )}
        <FontAwesomeIcon className="blue-icon" icon={iconToShow} size="lg" />
        <p className="num">{removeSignFromNumber(props.amount)}</p>
      </div>
    </div>
  );
}
