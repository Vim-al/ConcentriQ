import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react"; //to import Chakra UI
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/*to use chakra UI we have to wrap the app in ChakraProvider*/}
    <ChakraProvider>
      <ChatProvider>
        {/*Whatever state we create inside of our context api its gonna be accessible to the whole of our app */}
        <App />
      </ChatProvider>
    </ChakraProvider>
  </BrowserRouter>
);

/*As our backend runs at localhost 5000 and frontend runs at localhost 3000 we will have an error */
/*So we go to the package.json file in present in the frontend/src and add a proxy saying that connect to 5000 */
/* To achieve multiple pages like first a login page then the chat page we have to install REACT ROUTER DOM */
