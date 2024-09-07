import React from "react";
import Basics from "./components/Basics"; // Asegúrate de que la ruta sea correcta

const App = () => {
  return (
    <div className="App">
      <h1>Agora RTC Video Call</h1>
      <Basics /> {/* Usa el componente Basics */}
    </div>
  );
};

export default App;
