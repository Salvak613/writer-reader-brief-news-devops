import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import App from "./App";
import ArticleList from "./pages/ArticleList/ArticleList";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/articles",
        element: <ArticleList />,
      },
      {
        path: "/create",
        element: <CreateArticle />,
      },
      {
        path: "/edit/:id",
        element: <EditArticle />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
