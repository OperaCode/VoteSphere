import "./App.css";
import Landing from "./pages/Landing";
 import Home from "./pages/Home";
 import { useParams } from "react-router-dom";
import SpaceDetails from "./components/SpaceDetails";
import { Route, Routes } from "react-router-dom";





function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
         <Route path="/space/:spaceId" element={<SpaceDetailsWrapper />} />
       
      </Routes>

      
    </>
  );

}



  const SpaceDetailsWrapper = () => {
  const { spaceId } = useParams();
  return <SpaceDetails spaceId={spaceId} />;
};

export default App;
