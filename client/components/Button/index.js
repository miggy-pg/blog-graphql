import React from "react";
import { Link } from "react-router-dom";

function Button({ type, label, to, onClick }) {
  switch (type) {
    case "submit":
      return (
        <button type="submit" className="btn-submit">
          {label}
        </button>
      );
    case "navigate":
      return (
        <Link to={to} className="btn-navigate">
          {label}
        </Link>
      );
    case "action":
      return (
        <button className="btn-action" onClick={onClick}>
          {label}
        </button>
      );
    default:
      return (
        <button type="button" className="btn-submit">
          {label}
        </button>
      );
  }
}

export default Button;
