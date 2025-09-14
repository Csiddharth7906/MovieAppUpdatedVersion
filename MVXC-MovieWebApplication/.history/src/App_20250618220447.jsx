import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import Moviedetails from "./components/Moviedetails";

const App = () => {
  return (
    <div className="bg-[#1F1E24]  flex w-screen h-screen   ">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>
        <Route path="/movie" element={<Movie />}>
            <Route path="/movie/details/:id" element={<Moviedetails/>} />
        </Route>
         <Route path="/tv" element={<Tvshows />}></Route>
         <Route path="/person" element={<People />}></Route>
      </Routes>
    </div>
  );
};

export default App;
