import "./App.css";
import LoadApp from "./pages/LoadApp";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  /* 

  //Login
  Crear usuario
  Loguear usuario

  Si no tienes cookie de que ya te has logueado en esta pagina alguna vez, te muestro pantalal de crear usuario (o boton de ya tengo uno)
  Si ya tienes cookie de haber estado logueado directamente t muestro el login y boton en pequeño de (crear usuario)
  Pensar en hacer compontente reutilizable para ambos casos

  //Home
  (Tienes que loguearte)
  Caes directamente en una pagina en la que ves tu equipos creados (localstorage)
  Si no tiene ninguno te sale botón de pulsa aqui para crear un nuevo equipo (no tienes equipos)
  Si no te sale el listado de todos tus equipos con sus caracteristicas (pensar en posible ampliar/reducir para ver mas info o menos info por cada equipo)
  Cantidad de tipos; los tipos que te faltan; sumatoria de stats; 
  Boton de editar, eliminar o ver en particular un equipo

  //Editar team
  (No puedes ir aqui sin loguearte)
  Un equipo tiene un nombre por defecto te genera uno pero lo puedes modificar (y te sale sugerencia cuando creas tu primer requipo de que puedoes modificarlo)
  Si borrar el nombre no puedes guardar
  Editar hace que solo veas el equipo arriba en  pequeño y puedes añadir mas pokemon, modificar uno que ya existe o eliminar
  Abajo del equipo se muestra una lsita de pokemon que puedes filtrar por nombre
  Siempre habra seleccionado un puesto del equpo que sera donde se añade o se reeemplace un pokemon
  hay boton de eliminar al lado de cada pokemon del equipo arriba
  Gestionar el save del team con formulario (minimo 6 pokemon cargado en el formulario para guardar)


  Mejor manera de hacer y manjear formularios aleix
  Tienes algun login aleix ya hecho o algo que sepas para hacer guapo y rapido?
  Donde guardfar la informacion bbdd json server o login con firebase?


  
  */

  return (
    <BrowserRouter>
      <LoadApp />
    </BrowserRouter>
  );
}

export default App;
