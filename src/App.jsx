import React, { useState, Suspense } from "react";
import "./App.css";

// Dynamically import components
const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const Sidebar = React.lazy(() => import("./components/Sidebar/Sidebar"));
const Home = React.lazy(() => import("./components/Home/Home"));
const About = React.lazy(() => import("./components/About/About"));
const Skills = React.lazy(() => import("./components/Skills/Skills"));

function App() {
  const [isopen, setisopen] = useState(false);

  // Toggle function for opening/closing the sidebar
  const toggle = () => {
    setisopen(!isopen);
  };

  return (
    <>
      {/* Suspense is used to handle loading state while the components are being loaded */}
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar toggle={toggle} />
      </Suspense>

      <Suspense fallback={<div>Loading Sidebar...</div>}>
        <Sidebar isopen={isopen} toggle={toggle} />
      </Suspense>

      {/* Main content sections */}
      <Suspense fallback={<div>Loading Home...</div>}>
        <Home />
      </Suspense>

      <Suspense fallback={<div>Loading Skills...</div>}>
        <Skills />
      </Suspense>

      <Suspense fallback={<div>Loading About...</div>}>
        <About />
      </Suspense>
    </>
  );
}

export default App;
