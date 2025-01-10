import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import Root from '../src/routes/Root';
import CheckRatesPage from './Pages/CheckRatesPage/CheckRatesPage';
import './index.css'


const router = createBrowserRouter([
  {
    path: "/delivery_app/",
    element: <Root />,
    children: [
      {
        index: true,
        path: "/delivery_app/",
        element: <HomePage />
      }, {
        path: "/delivery_app/check_rates",
        element: <CheckRatesPage />
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);