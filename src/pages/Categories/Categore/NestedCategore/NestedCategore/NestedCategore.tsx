// import item from "../SideberData/SideberItem.json";
import "./NestedCategore.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import NestedItem from "../NestedItem/NestedItem";
import { navCategoreData } from "../../../../shared/navber/navCategoreData/NavCategoreData";

const NestedCategore = () => {
  return (
    <div className="sidebar">
      <div className="nestedCategore-title">
        <FontAwesomeIcon style={{ padding: "16px" }} icon={faAlignLeft} />
        <span>ALL CATEGORIES</span>
      </div>

      {navCategoreData.map((sideberData, index) => (
        <NestedItem key={index} sideberData={sideberData} />
      ))}
    </div>
  );
};

export default NestedCategore;
