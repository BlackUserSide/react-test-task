import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Cabinet: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const localData = localStorage.getItem("auth");
    if (localData === "false" || localData === null) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="cabinet">
      <h1 className="h1">Welcome to cabinet!</h1>
    </div>
  );
};
