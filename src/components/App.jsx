import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import axios from "axios";

export default function App() {
  const [pointData, setPointData] = useState([]);
  const [expData, setExpData] = useState([]);
  const [coinData, setCoinData] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const bot_sid = params.get("bot_sid");
  const uid = params.get("uid");

  // exp資料
  useEffect(() => {
    axios
      .get(
        `https://www.flashfalcon.net/product_transaction_list_api/?bot_sid=${bot_sid}&uid=${uid}&list_type=List&type=Exp`
      )
      .then((response) => {
        setExpData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // point資料
  useEffect(() => {
    axios
      .get(
        `https://www.flashfalcon.net/product_transaction_list_api/?bot_sid=${bot_sid}&uid=${uid}&list_type=List&type=Point`
      )
      .then((response) => {
        setPointData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // coin資料
  useEffect(() => {
    axios
      .get(
        `https://www.flashfalcon.net/product_transaction_list_api/?bot_sid=${bot_sid}&uid=${uid}&list_type=List&type=Coin`
      )
      .then((response) => {
        setCoinData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(expData.contents);
  return (
    <div>
      <div>
        <header>會員紀錄</header>
      </div>
      <Tabs>
        <TabList>
          <Tab>經驗紀錄</Tab>
          <Tab>積分紀錄</Tab>
          <Tab>金幣紀錄</Tab>
        </TabList>
        <TabPanel classID="exp">
          <div className="total-num-content">
            <FontAwesomeIcon className="blue-icon" icon={faStar} size="lg" />
            <p className={`total-num ${expData.balance ? "" : "no-value"}`}>
              {expData.balance ? expData.balance : "尚無紀錄"}
            </p>
            <FontAwesomeIcon
              className="blue-icon"
              icon={faCircleQuestion}
              size="lg"
            />
          </div>
          <div className="order">
            {expData &&
              expData.contents &&
              expData.contents.map((content, index) => {
                return (
                  <Card
                    key={index}
                    id={index}
                    name={content.num}
                    amount={content.amount}
                    time={content.mdt_add}
                    icon="faStar"
                  />
                );
              })}
          </div>
        </TabPanel>
        <TabPanel classID="point">
          <div className="total-num-content">
            <FontAwesomeIcon className="blue-icon" icon={faAward} size="lg" />
            <p className={`total-num ${pointData.balance ? "" : "no-value"}`}>
              {pointData.balance ? pointData.balance : "尚無紀錄"}
            </p>
            <FontAwesomeIcon
              className="blue-icon"
              icon={faCircleQuestion}
              size="lg"
            />
          </div>
          <div className="order">
            {pointData &&
              pointData.contents &&
              pointData.contents.map((content, index) => {
                return (
                  <Card
                    key={index}
                    id={index}
                    name={content.num}
                    amount={content.amount}
                    time={content.mdt_add}
                    icon="faAward"
                  />
                );
              })}
          </div>
        </TabPanel>
        <TabPanel classID="coin">
          <div className="total-num-content">
            <FontAwesomeIcon
              className="blue-icon"
              icon={faDatabase}
              size="lg"
            />
            <p className={`total-num ${coinData.balance ? "" : "no-value"}`}>
              {coinData.balance ? coinData.balance : "尚無紀錄"}
            </p>
            <FontAwesomeIcon
              className="blue-icon"
              icon={faCircleQuestion}
              size="lg"
            />
          </div>
          <div className="order">
            {coinData &&
              coinData.contents &&
              coinData.contents.map((content, index) => {
                return (
                  <Card
                    key={index}
                    id={index}
                    name={content.num}
                    amount={content.amount}
                    time={content.mdt_add}
                    icon="faDatabase"
                  />
                );
              })}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
