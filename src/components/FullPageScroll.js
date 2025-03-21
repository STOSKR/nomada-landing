import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";

export default function FullPageScroll() {
  return (
    <ReactFullpage
      scrollingSpeed={800} // Velocidad del scroll en ms
      navigation={true} // Muestra los puntos de navegación en el lado derecho
      sectionsColor={[
        "#ff5f45",
        "#0798ec",
        "#fc6c7c",
        "#435b71",
        "#eb9e34",
        "#1d1d1d",
      ]} // Colores de fondo
      render={() => (
        <ReactFullpage.Wrapper>
          {[...Array(6)].map((_, i) => (
            <div className="section" key={i}>
              <h1>Sección {i + 1}</h1>
            </div>
          ))}
        </ReactFullpage.Wrapper>
      )}
    />
  );
}
