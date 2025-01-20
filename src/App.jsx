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

  const toggle = () => {
    setisopen(!isopen);
  };

  const Loading = () => (
    <div className="loader-container">
      <div className="spinner"></div>
      Loading...
    </div>
  );

  return (
    <>
      {/* Suspense with a single loading spinner */}
      <Suspense fallback={<Loading />}>
        <Navbar toggle={toggle} />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Sidebar isopen={isopen} toggle={toggle} />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Skills />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <About />
      </Suspense>
    </>
  );
}

export default App;
