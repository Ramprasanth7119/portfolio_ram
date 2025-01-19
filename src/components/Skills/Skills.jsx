import React from 'react'
import {motion} from "framer-motion"
import StackIcon from "tech-stack-icons";
import './Skills.css'

const Skill = ({ name, x, y }) => {
  return (
    <motion.div 
      className='flex items-center justify-center rounded-full font-semibold text-light bg-dark py-3 px-6 shadow-dark cursor-pointer absolute'
      whileHover={{ scale: 10 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y }} // Animating with x and y values passed as props
      transition={{ duration: 1.5 }}
    >
    <StackIcon name={name} className='icon'/>
    
    </motion.div>
  )
}

const Skills = () => {
  return (
    <>
      <h2 className='font-bold text-8xl mt-64 w-full text-center'>Skills</h2>
      Skills

      <div className='w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight web'>
        <motion.div 
          className='flex items-center justify-center rounded-full font-semibold text-white bg-white p-8 shadow-dark cursor-pointer fixed ani-web'
          whileHover={{ scale: 1.05 }}
        >
          Web
        </motion.div>

        {/* Skills */}
        <Skill name="java" x="-14.5vw" y="-4vw"/>
        <Skill name="python" x="4vw" y="-13vw"/> 
        <Skill name="dart" x="4.5vw" y="5.5vw"/>
        <Skill name="html5" x="-52vw" y="19.5vw"/>
        <Skill name="css3" x="-40.5vw" y="-10vw"/>
        <Skill name="js" x="-22.5vw" y="10vw"/>
        <Skill name="reactjs" x="-7vw" y="11.5vw"/>
        <Skill name="nodejs" x="24vw" y="-11.5vw"/>
        <Skill name="mongodb" x="-29vw" y="-15vw"/>
        <Skill name="tailwindcss" x="-52vw" y="19.5vw"/>
        <Skill name="github" x="-37vw" y="6vw"/>
        <Skill name="postman" x="35vw" y="-2vw"/>
        <Skill name="redis" x="18vw" y="18vw"/>

        <motion.div 
          className="absolute" 
          style={{ width: "50px", height: "50px" }}
          initial={{ x: 0, y: 0 }}
          whileInView={{ x: "17.8vw", y: "0.5vw" }} // Replace with x and y values as needed
          transition={{ duration: 1.5 }}
        >
          <img 
            width="50" 
            src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/c.png" 
            alt="C" 
            title="C" 
          />
        </motion.div>

      </div>
    </>
  )
}

export default Skills
