import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import Moviedetails from "./components/Moviedetails";
import Tvdetails from "./components/Tvdetails";
import PersonDetails from "./components/PersonDetails";

const App = () => {
  return (
    <div className="bg-[#1F1E24]  flex w-screen h-screen   ">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>
        <Route path="/movie" element={<Movie />}>

        </Route>
         <Route path="/movie/details/:id" element={<Moviedetails/>} />
         <Route path="/tv" element={<Tvshows />}>
         </Route>
            <Route path="/tv/details/:id" element={<Tvdetails/>} />
         <Route path="/person" element={<People />}>
         </Route>
            <Route path="/person/details/:id" element={<PersonDetails/>} />
      </Routes>
    </div>
  );
};

export default App;
