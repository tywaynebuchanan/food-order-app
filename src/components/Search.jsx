import React,{useState} from 'react'
import { useGlobalContext } from '../context'
import {Link} from 'react-router-dom'

const Search = () => {

  const [text,setText] = useState("")
  const {setSearchTerm,fetchRandomMeals,ResetData} = useGlobalContext();

  const handleChange = (e) =>{
     setText(e.target.value)
  }

  const handleReset = () =>{
      setSearchTerm('')
      setText('')
      ResetData()
   
  }
  const handleSubmit = (e) =>{
     e.preventDefault()
    if(text){
      setSearchTerm(text)
     }
  }

  const handleRandomMeals = () =>{
    setSearchTerm('')
    setText('')
    fetchRandomMeals()
  }



  return (
    <section className='search-container'>
    <form onSubmit={handleSubmit}>
    
      <input name='search' value = {text} placeholder = "Enter your meal" className='form-input' onChange={handleChange}/>
      <button className='btn' type='submit' >Search</button>
      <button className='btn btn-hipster' onClick = {handleRandomMeals}>Random</button>
      <button className='btn btn-hipster' onClick = {handleReset}>Reset</button>
    </form>
      
    </section>
  )
}

export default Search