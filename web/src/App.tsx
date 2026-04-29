import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewMeal } from './pages/NewMeal';
import { Statistics } from './pages/Statistics';
import { MealDetails } from './pages/MealDetails';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewMeal />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/meal/:id" element={<MealDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
