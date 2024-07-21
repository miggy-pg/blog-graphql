import React from "react";

function Button({ type, label, action }) {
  return (
    <button type={type} onClick={action}>
      {label}
    </button>
  );
}

export default Button;
