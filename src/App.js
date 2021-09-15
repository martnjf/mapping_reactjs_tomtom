import { BrowserRouter as Router, Route } from "react-router-dom";
import CalculateRoute from "../src/CalculateRoute"
export default function App() {
  return (
    <Router>
      <Route path='/' component={CalculateRoute} />
    </Router>
  );
}

/* 
  Herramientas utilizadas:
  - API de TomTom, utilizando su entorno, sus API de map y routing para poder calcular ditsnacias no lineales entre dos puntos.
    - @tomtom-international/web-sdk-maps
    - @tomtom-international/web-sdk-services
  - React JS.
  - React Toastify para poder mostrar errores.
    - import { ToastContainer, toast } from "react-toastify";
*/