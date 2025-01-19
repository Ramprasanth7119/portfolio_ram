import React, { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

import Home from "./components/Home/Home";
import About from "./components/About/About";
 import Skills from "./components/Skills/Skills";
// import Projects from "./components/Projects/Projects";
// import Blog from "./components/Blog/Blog";

import { Routes, Route } from "react-router-dom";
import Img from '../src/assets/Images/home.png';

function App() {
  const [isopen, setisopen] = useState(false);
  const toggle = () => {
    setisopen(!isopen);
  };

  const projects = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing my work and skills.",
      image: Img,
      githubLink: "https://github.com/Ramprasanth7119",
      liveLink: "https://myportfolio.com",
      stack: ["React", "CSS", "JavaScript"]
    },
    {
      title: "E-commerce App",
      description: "A full-stack e-commerce application with payment gateway integration.",
      image: Img,
      githubLink: "https://github.com/mygithub/e-commerce-app",
      liveLink: "https://ecommerceapp.com",
      stack: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      title: "E-commerce App",
      description: "A full-stack e-commerce application with payment gateway integration.",
      image: Img,
      githubLink: "https://github.com/mygithub/e-commerce-app",
      liveLink: "https://ecommerceapp.com",
      stack: ["React", "Node.js", "MongoDB", "Express"]
    },
    
  ];

  // return (
  //   <>
  //     <Navbar toggle={toggle} />
  //     <Sidebar isopen={isopen} toggle={toggle} />
  //     <Routes>
  //       <Route path="/" element={<Home />}/>
  //       <Route path="/about" element={<About />} />
  //       <Route path="/skills" element={<Skills/>}/>
  //       <Route path="/projects" element={<Projects  projects={projects}/>}/>
  //       <Route path="/blog" element={<Blog/>}/>
  //     </Routes>
  //   </>
  // );
  return (
    <>
      <Navbar toggle={toggle} />
      <Sidebar isopen={isopen} toggle={toggle} />
      <Home/>
      {/* <Projects projects={projects}/> */}
      <Skills/>
      <About/>
    </>
  );
}

export default App;

