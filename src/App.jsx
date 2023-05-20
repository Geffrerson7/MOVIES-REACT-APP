import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import MovieDetail from "./pages/movieDetail/MovieDetail";
import MoviesList from "./components/moviesList/moviesList";
import Login from "./pages/Login/Login";
import { Navigate } from "react-router-dom";
import Register from "./pages/Register/Register";
import Header from "./components/header/Header";
import FavoriteMovie from "./pages/favoriteMovie/FavoriteMovie";

function App() {
  const authTokens = localStorage.getItem("authTokens");

  return (
    <div className="App">
      <Router>
      {authTokens && <Header />}
        <Routes>
          <Route
            path="movie/:id"
            element={authTokens ? <MovieDetail /> : <Navigate to="/login" />}
          ></Route>
          <Route
            index
            element={authTokens ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="movies/:type"
            element={authTokens ? <MoviesList /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="movies/favorite"
            element={authTokens ? <FavoriteMovie /> : <Navigate to="/login" />}
          ></Route>
          <Route path="/*" element={<h1>Error Page</h1>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
