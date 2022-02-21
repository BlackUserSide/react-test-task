import * as React from "react";
import { fireBaseApi } from "./firebase";
import { Route, Routes } from "react-router-dom";
import { MainLogin } from "./components/MainLogin";
import "./main.sass";
import { Cabinet } from "./components/Cabinet";
export const App: React.FC = () => {
  React.useEffect(() => {
    console.log(fireBaseApi.name);
  }, []);

  return (
    <div className="main-app-wrapper">
      <Routes>
        <Route path="/" element={<MainLogin />} />
        <Route path="/cabinet" element={<Cabinet />} />
      </Routes>
    </div>
  );
};
