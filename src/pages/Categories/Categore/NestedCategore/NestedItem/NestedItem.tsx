import { useState } from "react";
import { Link } from "react-router-dom";
import "./NestedItem.css";

interface Child {
  title: string;
  path: string;
  childrens?: Child[];
}

interface NestedItemProps {
  item: Child; // or Category depending on your structure
}

const NestedItem = ({ item }: NestedItemProps) => {
  const [nestedOpen, setNestedOpen] = useState(false);

  if (item.childrens) {
    return (
      <div
        className={
          nestedOpen ? "nestedSidebarItem nestedOpen" : "nestedSidebarItem"
        }
      >
        <div className="nestedSidebarTitle">
          <Link
            className="text-decoration-none nestedSidebarTitleName"
            to={item.path || ""}
          >
            <span>{item.title}</span>
          </Link>
          <i
            className="bi-chevron-right nestedToggleBtn"
            onClick={() => setNestedOpen(!nestedOpen)}
          ></i>
        </div>
        <div className="nestedSidebarContent">
          {item.childrens.map((child, index) => (
            <NestedItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Link
        className="text-decoration-none nestedSidebarItem nestedPlain"
        to={item.path || "path"}
      >
        {item.title}
      </Link>
    );
  }
};

export default NestedItem;
