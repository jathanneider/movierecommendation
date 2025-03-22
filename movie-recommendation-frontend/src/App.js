import React from "react";
import MovieRecommendation from "./components/MovieRecommendation";
import MovieList from "./components/MovieList";

const App = () => {
  return (
      <div>
        <MovieRecommendation />
        <MovieList />
      </div>
  );
};

export default App;