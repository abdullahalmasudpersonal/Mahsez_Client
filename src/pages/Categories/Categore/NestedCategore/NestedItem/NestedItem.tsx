import { useState } from "react";
import { Link } from "react-router-dom";
import "./NestedItem.css";
import { SidebarItem } from "../../../../shared/navber/navCategoreData/NavCategoreData";

interface MobileSideberItemProps {
  sideberData: SidebarItem;
}

const NestedItem: React.FC<MobileSideberItemProps> = ({ sideberData }) => {
  const [nestedOpen, setNestedOpen] = useState(false);

  if (sideberData.childrens) {
    return (
      <div
        className={
          nestedOpen ? "nestedSidebarItem nestedOpen" : "nestedSidebarItem"
        }
      >
        <div className="nestedSidebarTitle">
          <Link
            className="text-decoration-none nestedSidebarTitleName"
            to={sideberData.path || ""}
          >
            <span>{sideberData.title}</span>
          </Link>
          <i
            className="bi-chevron-right nestedToggleBtn"
            onClick={() => setNestedOpen(!nestedOpen)}
          ></i>
        </div>
        <div className="nestedSidebarContent">
          {sideberData.childrens.map((child, index) => (
            <NestedItem key={index} sideberData={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Link
        className="text-decoration-none nestedSidebarItem nestedPlain"
        to={sideberData.path || "path"}
      >
        {sideberData.title}
      </Link>
    );
  }
};

export default NestedItem;
