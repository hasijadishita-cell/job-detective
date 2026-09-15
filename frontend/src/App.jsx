import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home"
import Analysis from "./Analysis"

function App(){
  return(
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/analysis" element={<Analysis />} />
    </Routes>
    </BrowserRouter>
  );
}
export default App;
