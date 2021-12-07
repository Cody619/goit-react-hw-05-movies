import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'

import { HomePage } from './components/HomePage';
import { MovieDetailsPage } from './components/MovieDetailsPage';
import { Header } from './components/Header';
import { MoviesPage } from './components/MoviesPage';

const App = () => {
  return (
    <>
      <Header/> 
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/movies/" element={<MoviesPage />} />
        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
        <Route path="*" element={<Navigate replace to="/"/>}/>
      </Routes>
    </>
  );
}

export default App;
