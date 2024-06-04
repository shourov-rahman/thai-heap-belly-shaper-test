import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { AppRoutes } from "./routes/routes";

const App = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        {AppRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default App;
