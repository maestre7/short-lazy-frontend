
import PickUrl from "./components/PickUrl/PickUrl";
import LoadUrl from "./components/LoadUrl/LoadUrl";
import Info from "./components/Info/Info";
import Background from "./components/Background/Background";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<PickUrl />} />
                <Route path="/:urlId" element={<LoadUrl />} />
            </Routes>
            <Info />
            <Background />
        </div>
    );
}

export default App;
