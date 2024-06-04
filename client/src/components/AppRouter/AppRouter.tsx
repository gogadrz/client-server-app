import { Route, Routes } from "react-router-dom";
import { Main } from "../Main";
import SomeContent from "../patterns/SomeContent";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/some" element={<SomeContent />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
}
