import React from "react";
import { DotSpinner, Orbit } from "@uiball/loaders";
const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DotSpinner size={35} color="#231F20" />
    </div>
  );
};

export default Loader;
