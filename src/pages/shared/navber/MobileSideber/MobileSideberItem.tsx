import { useState } from "react";
import "./MobileSideberAll.css";
import { Link } from "react-router-dom";
import { SidebarItem } from "./MobileSideberData";

interface MobileSideberItemProps {
  sideberData: SidebarItem;
}

const MobileSideberItem: React.FC<MobileSideberItemProps> = ({
  sideberData,
}) => {
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
          {sideberData.childrens.map((child, index) => (
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
