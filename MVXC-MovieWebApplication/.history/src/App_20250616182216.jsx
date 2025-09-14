import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
};

export default App;
