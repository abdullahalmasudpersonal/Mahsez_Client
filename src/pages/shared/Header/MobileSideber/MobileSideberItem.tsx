/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./MobileSideberAll.css";
import { Link } from "react-router-dom";

const MobileSideberItem = ({ sideberData }: any) => {
  const [mSideberOpen, setMSideberOpen] = useState(false);

  if (sideberData.childrens) {
    return (
      <div
        className={
          mSideberOpen ? "mobileSideberItem mSOpen" : "mobileSideberItem"
        }
      >
        <div className="mobileSideber-title">
          <Link
            to={sideberData.path || "path"}
            className="mobileSideberCategoreName"
          >
            <span className="fw-bold">
              {/*          {sideberData.icon && <i className={sideberData.icon}></i>} */}
              {sideberData.title}
            </span>
          </Link>
          <i
            className="bi-chevron-down mSideber-toggle-btn"
            onClick={() => setMSideberOpen(!mSideberOpen)}
          ></i>
        </div>

        <div className="mobileSidebar-content pt-0">
          {sideberData.childrens.map((child: any, index: any) => (
            <MobileSideberItem key={index} sideberData={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <a
        href={sideberData.path || "path"}
        className="mobileSideberItem mSPlain"
      >
        {/*  {sideberData.icon && <i className={sideberData.icon}></i>}  */}
        {sideberData.title}
      </a>
    );
  }
};

export default MobileSideberItem;
