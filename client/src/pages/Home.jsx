import { React, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const HomeScreen = () => {
  const [code, setCode] = useState("");
  const host =
    window.location.hostname === "localhost"
      ? "http://localhost:5173"
      : `https://${window.location.hostname}`;

  const onLinkJoin = () => {
    if (code.length === 0) {
      alert("Please enter a code or link");
      return;
    }
    window.open(host + "/room/?id=" + code, "_blank");
    setCode("");
  };

  const startCall = () => {
    window.open(host + "/room", "_blank");
  };

  const { t } = useTranslation();

  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }

  return (
    <div className="flex flex-col h-screen text-[#E2E2E2]">
      <nav
        style={{ width: "100%", padding: "2rem 0", backgroundColor: "gray" }}
      >
        <button onClick={() => handleClick("en")}>English</button>
        <button onClick={() => handleClick("ko")}>Korean</button>
        <button onClick={() => handleClick("chi")}>Chinese</button>
      </nav>
      <Header />
      <div className="flex md:flex-row flex-col px-4 items-center justify-around h-full pb-48">
        <div className="flex max-w-[500px]">
          <div className="content">
            <h2 className="md:text-[40px] text-[32px] font-normal m-0 text-center">
              {t("Thanks")} {t("Why")}
            </h2>
            <p className="text-[18px] font-light mt-4 text-center">
              {t("vivek")}
            </p>
            <div className="m-10 flex items-center justify-around">
              <button
                onClick={startCall}
                className=" cursor-pointer flex items-center justify-center text-[16px] p-3 border-0 bg-primary hover:bg-[#124fb2] text-white rounded-md mr-1"
              >
                <FontAwesomeIcon icon={faVideo} />
                <span className="pl-2"> New Meeting</span>
              </button>
              <div className="ml-2 flex flex-1 items-center">
                <div className=" relative mr-2 ">
                  <FontAwesomeIcon
                    icon={faKeyboard}
                    className=" absolute top-1/2 text-[#dadce0] transform -translate-y-1/2 left-2"
                  />
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    type="text"
                    placeholder="Enter a code or link"
                    className="text-[16px] h-12 bg-darkbg border-solid border rounded-md border-[#dadce0] pl-10 pr-4 w-full"
                  />
                </div>
                <div
                  className="ml-2 text-primary font-bold cursor-pointer p-1"
                  onClick={onLinkJoin}
                >
                  Join
                </div>
              </div>
            </div>
            {/* <div className="help-text">
              <a href="#">Learn more</a> about Google Meet
            </div> */}
          </div>
        </div>
        <div className="flex">
          <div className="max-w-[500px]">
            <img
              src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg"
              alt=""
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
