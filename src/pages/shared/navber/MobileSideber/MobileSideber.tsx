import { navCategoreData } from "../navCategoreData/NavCategoreData";
import "./MobileSideberAll.css";
import MobileSideberItem from "./MobileSideberItem";

const MobileSideber = () => {
  return (
    <div className="mobile-sideber">
      {navCategoreData.map((sideberData, index) => (
        <MobileSideberItem key={index} sideberData={sideberData} />
      ))}
    </div>
  );
};

export default MobileSideber;
