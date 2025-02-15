
import App from './App.jsx';
import AllDrinks from './components/AllDrinks.jsx';
import AllDrinksTypes from './components/AllDrinkTypes.jsx';
import AddCategoryForm from './components/AddCategoryForm.jsx';

const routes = [
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
];

export default routes;