import React from "react";
import Weather from "./components/Weather";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <Weather />
    </div>
  );
};

export default App;
