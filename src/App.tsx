import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { Gallery } from './pages/Gallery';
import { NewsEvents } from './pages/NewsEvents';
import { Contact } from './pages/Contact';
import { AdminAuth } from './pages/admin/AdminAuth';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLayout } from './pages/admin/AdminLayout';

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "programs", element: <Programs /> },
      { path: "gallery", element: <Gallery /> },
      { path: "news-events", element: <NewsEvents /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/admin",
    children: [
      { index: true, element: <AdminAuth /> },
      {
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
