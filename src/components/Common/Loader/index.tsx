import React from "react";

interface LoaderProps {
  show: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ show }) => {
  if (!show) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <div
      id="loader"
      style={{
        zIndex: 99999,
        position: "absolute",
        left: "50%",
        top: "50%",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "20%",
          top: "30%",
        }}
      >
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
