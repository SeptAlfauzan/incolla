import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./features/404";
import Customize from "./features/Customize";
import Upload from "./features/Upload";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
