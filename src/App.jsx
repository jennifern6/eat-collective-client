import './App.scss';
import { 
  createBrowserRouter, 
  RouterProvider, 
} from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Single from './pages/Single';
import Write from './pages/Write';



const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page!</div>,
  },
  {
  path: "/register",
  element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
