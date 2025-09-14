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
import Trailer from "./templates/Trailer";
import NotFound from "./components/NotFound";
import MoviePlayer from "./components/MoviePlayer";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import Watchlist from "./components/Watchlist";
import Favorites from "./components/Favorites";
import { AuthProvider } from "./contexts/AuthContext";
import { MobileProvider } from "./contexts/MobileContext";


const App = () => {
  return (
    <AuthProvider>
      <MobileProvider>
        <div className="bg-[#1F1E24]  flex w-screen h-screen    ">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/trending" element={<Trending />}/>
          <Route path="/popular" element={<Popular />} />
          <Route path="/movie" element={<Movie />} />
           <Route path="/movie/details/:id" element={<Moviedetails/>} >
           <Route path="/movie/details/:id/trailer" element={<Trailer/>} />
           </Route>
           
           {/* Movie Player Routes */}
           <Route path="/movie/watch/:id" element={<MoviePlayer/>} />
           <Route path="/tv/watch/:id" element={<MoviePlayer/>} />
           
           {/* Authentication Route */}
           <Route path="/auth" element={<Auth/>} />
           
           {/* User Profile Routes */}
           <Route path="/profile" element={<Profile/>} />
           <Route path="/watchlist" element={<Watchlist/>} />
           <Route path="/favorites" element={<Favorites/>} />
           
           <Route path="/tv" element={<Tvshows />} />
           <Route path="*" element={<NotFound />} />
           
            <Route path="/tv/details/:id" element={<Tvdetails/>} >
             <Route path="/tv/details/:id/trailer" element={<Trailer/>} />
            </Route>
           <Route path="/person" element={<People />} />
         
              <Route path="/person/details/:id" element={<PersonDetails/>} />
        </Routes>
        </div>
      </MobileProvider>
    </AuthProvider>
  );
};

export default App;
