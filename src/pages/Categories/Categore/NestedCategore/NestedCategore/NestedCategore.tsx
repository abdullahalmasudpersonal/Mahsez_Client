import item from "../SideberData/SideberItem.json";
import "./NestedCategore.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import NestedItem from "../NestedItem/NestedItem";

const NestedCategore = () => {
  return (
    <div className="sidebar">
      <div className="nestedCategore-title">
        <FontAwesomeIcon style={{ padding: "16px" }} icon={faAlignLeft} />
        <span>ALL CATEGORIES</span>
      </div>

      {item.map((item, index) => (
        <NestedItem key={index} item={item} />
      ))}
    </div>
  );
};

export default NestedCategore;
