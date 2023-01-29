import "./App.css";
import { Route } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import Homepage from "./Pages/HomePage";
import VideoCall from "./Pages/VideoCall";
function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={ChatPage} />
      <Route path="/video/:id" component={VideoCall} />
    </div>
  );
}
export default App;
