import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Card from "./componentes/Card";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Card/>} />


        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
