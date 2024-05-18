import { useRoutes } from "react-router-dom";
import "./App.scss";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  const routs = useRoutes(router);
  return (
    <>
      {routs}
      <ToastContainer position="bottom-right" stacked autoClose={2500} hideProgressBar />
    </>
  );
}

export default App;
