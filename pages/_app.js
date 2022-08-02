import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { IconContext } from "react-icons";

function MyApp({ Component, pageProps }) {
  return (
    <IconContext.Provider 
      value={{
        style:{
          marginTop:'-2px'
        }
      }}
    >
      <Component {...pageProps} />
    </IconContext.Provider>
  );
}

export default MyApp
