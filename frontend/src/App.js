import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
// import MainPage from "./Pages/MainPage";
// import PomoPage from "./Pages/PomoPage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      {/* we gave the word exact because as the path contains / it will give both the homepage contents and chatpage contents. Now since we gave exact, when the path is / then only homepage is shown */}
      {/* Basically we created a folder called pages in src and we create HomePage.js where it contains content of HomePage and we are extracting that in the component   */}
      <Route path="/chats" component={ChatPage} />
      {/* Similar to the above one */}
      {/* <Route path="/main" component={MainPage} />
      <Route path="/pomo" component={PomoPage} /> */}
      {/* <Route path="/todo" component={TodoPage} /> */}
    </div>
  );
}

export default App;
