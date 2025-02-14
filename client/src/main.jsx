import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App.jsx';
import AllDrinks from './components/AllDrinks.jsx';
import AllDrinksTypes from './components/AllDrinkTypes.jsx';
import AddCategoryForm from './components/AddCategoryForm.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/all-drinks",
    element: <AllDrinks />
  },
  {
    path: "/all-drink-types",
    element: <AllDrinksTypes />
  },
  {
    path: "/all-drink-types/new",
    element: <AddCategoryForm />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
