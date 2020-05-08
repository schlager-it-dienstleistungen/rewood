import React from "react";

export function Checkbox({ isSelected, onChange }) {
  return (
    <>
      <input type="checkbox" style={{display: "none"}} />
      <label className="checkbox checkbox-lg checkbox-single">
        <input type="checkbox" checked={isSelected} onChange={onChange} />
        <span />
      </label>
    </>
  );
}
