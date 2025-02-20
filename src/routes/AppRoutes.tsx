import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routesConfig } from "./RouteConfig";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {routesConfig.map(({ path, component: Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRoutes;