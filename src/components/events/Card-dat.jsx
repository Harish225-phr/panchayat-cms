import React from "react";
import { Link } from "react-router-dom";

const Event = ({ title, data, button }) => {
  return (
    <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
      {/* Header */}
      <div className="card-header bg-color text-white text-center fw-bold">
        {title}
      </div>

      {/* Body */}
      <div className="card-body p-0">
        <ul className="list-group list-group-flush">
          {Array.isArray(data) &&
            data.map((item, index) => (
              <li
                key={index}
                className="list-group-item border-0 px-3 py-2"
                style={{
                  transition: "all 0.2s ease-in-out",
                }}
              >
               {/* <a
  href={item.link}
  target="_blank"
  rel="noopener noreferrer"
  className="text-decoration-none text-dark d-block"
  style={{ fontSize: "0.95rem" }}
  onMouseEnter={(e) => (e.target.style.color = "#0d6efd")}
  onMouseLeave={(e) => (e.target.style.color = "black")}
>
  ➤ {item.label}
</a> */}
<a
                  href={item.link}
                  target={title === "📑 Important Documents" ? "_self" : "_blank"} // Open in same tab for "Important Documents"
                  rel={title === "📑 Important Documents" ? "" : "noopener noreferrer"} // Remove rel for same tab
                  className="text-decoration-none text-dark d-block"
                  style={{ fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.target.style.color = "#0d6efd")}
                  onMouseLeave={(e) => (e.target.style.color = "black")}
                >
                  ➤ {item.label}
                </a>

              </li>
            ))}
        </ul>
      </div>

      {/* Footer */}
      {/* {button && (
        <div className="card-footer bg-light text-center">
        <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
            {button}
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Event;
