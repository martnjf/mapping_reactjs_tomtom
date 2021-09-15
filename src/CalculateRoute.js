import * as tt from '@tomtom-international/web-sdk-maps' // 6.15.0
import ttapi from '@tomtom-international/web-sdk-services' // 6.15.0
import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CalcularRuta(){
/* 0. Asignación de constantes que se usan en el proyecto */
  const [startLatitude, setStartLatitude] = useState("");
  const [startLongitude, setStartLongitude] = useState("");
  const [destinationLatitude, setDestinationLatitude] = useState("");
  const [destinationLongitude, setDestinationLongitude] = useState("");
  const [result, setResult] = useState({}); 
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [latitude, setLatitude] = useState(21.1236);
  const [longitude, setLongitude] = useState(-101.68);
/* 0. */
/*  1. Colocar el mapa y centrarlo en las coordenadas indicadas*/
  useEffect(() => {
    let map = tt.map({ 
      key: "FWQcuCT1v2OQdZIZVuyL8GF0xMpar2Zq",
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true
      },
      center: [longitude, latitude], zoom: 12
    });
    setMap(map);
  }, []) 
/* 1. */
/* 2. Calcular la ruta entre las dos coordenadas */
  const CalculateRoute = () => {
    ttapi.services
      .calculateRoute({
        key: "FWQcuCT1v2OQdZIZVuyL8GF0xMpar2Zq",
        locations: `${startLatitude},${startLongitude}:${destinationLatitude},${destinationLongitude}`,
        /* locations: '21.1528,-101.7113:21.1335,-101.6804', */ // hardcodeado 
      })
      .then(function(routeData){
        map.setCenter([parseFloat(startLatitude), parseFloat(startLongitude)]);
        console.log(routeData.toGeoJson());
        const data = routeData.toGeoJson();
        setResult(data);
      })
      .catch((err) => {
        console.log(err);
        notify();
      })

  };
/* 2. */
/* 3. Mostrar kilómetros y segundos */
  const resultList = result.features ? (
    <div className="col-xs-12 col-md-4 col" key={result.id}>
      <div className="box">
        <h1 className="result">
          Distancia en metros: {result.features[0].properties.summary.lengthInMeters}
        </h1>
        <h1>
          Tiempo estimado de trayecto: {` ${result.features[0].properties.summary.travelTimeInSeconds }`}
        </h1>
      </div>
    </div>
  ) : (
    <h1>Nada</h1>
  );
  const notify = () => toast("error de datos"); // Mensaje de error 
/* 3. */
  return (  
    <div className="App">
        <ToastContainer/>
        <div>
          <h3>Punto X</h3>
          <input
            type="text"
            placeholder="Latitud"
            value={startLatitude}
            onChange={(e) => {
              setStartLatitude(e.target.value);
            }}
            required
          />
          <input
            type="text"
            placeholder="Longitud"
            value={startLongitude}
            onChange={(e) => {
              setStartLongitude(e.target.value);
            }}
            required
          />
          <h3>Punto Y</h3>
          <input
            type="text"
            placeholder="Latitud"
            value={destinationLatitude}
            onChange={(e) => {
              setDestinationLatitude(e.target.value);
            }}
            required
          />
          <input
            type="text"
            placeholder="Longitud"
            value={destinationLongitude}
            onChange={(e) => {
              setDestinationLongitude(e.target.value);
            }}
            required
          />
        </div>
        <button
          variant="primary"
          onClick={(e) => {
            CalculateRoute();
          }}
        > Mostrar Distancia y Tiempo
        </button>
        {resultList}

        <div className="map" ref={mapElement}></div>
        
        {/* <div className="inputs">
          <div>

          </div>
        </div> */}
      </div>

  ); 
}
export default CalcularRuta;

/* 
https://api.tomtom.com/maps-sdk-for-web/6.x/6.14.0/documentation/dist/classes/Services.services.calculateRoute.html
https://developer.tomtom.com/maps-sdk-web-js/documentation#Services.services.calculateRoute
https://developer.tomtom.com/routing-api/support/faq#collapse-1-8
https://api.tomtom.com/routing/1/calculateRoute/-101.7114,21.1531:-101.6932,21.1505/json?key=FWQcuCT1v2OQdZIZVuyL8GF0xMpar2Zq
https://developer.tomtom.com/blog/build-different/building-responsive-location-search-component-react-search-box
https://developer.tomtom.com/routing-api/routing-api-documentation-routing/calculate-route
*** EJEMPLO DE LOCATIONS *** https://api.tomtom.com/maps-sdk-for-web/5.x/5.38.0/documentation/dist/classes/Services.services.calculateRoute.html 
https://studiofreya.com/2019/10/06/string-concatenation-in-react-native/#:~:text=Use%20the%20%2B%20operator%20to%20concatenate%20two%20string,const%20helloWorld%20%3D%20hello%20%2B%20%27n%27%20%2B%20world%3B
https://api.tomtom.com/maps-sdk-js/4.16.1/documentation/classes/Routing.html 
*/