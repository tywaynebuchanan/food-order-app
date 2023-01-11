import React, { useState} from 'react'
import { useGlobalContext } from '../context'
import { FaThumbsUp} from 'react-icons/fa';
import {FaYoutube} from 'react-icons/fa';
import {Link } from 'react-router-dom'



const Meals = () => {

    const {meal,loading,message} = useGlobalContext()
    console.log(meal);
    

    if(loading){
        return <section className='search-container'>
            <h4>Loading...</h4>
        </section>
    }

    if(meal.length < 1){
        return <section className='section'>
            <h4>{message}</h4>
        </section>
    }

    return <section className='section-center'>
           
             {meal.map((singleMeal)=>{
                 const {idMeal:id,strMeal:title,strMealThumb:image,strTags} = singleMeal
               
               
                 return <article key={id} className="single-meal">
                     <img src={image} atl={title} className="img"/>
                     <footer>
                         <h5>{title}</h5>
                         <div className='btn-group'>
                         
                         </div> 
                     </footer>
                     <div className="tags">
                     <div><p>{strTags ? strTags : "No Tag"}</p></div>
                     <div className = "btn-group">
                        <button className='like-btn'><FaThumbsUp/></button>
                     </div>
                   
                     </div>
                 </article>
             })}
            </section>
       }
  


export default Meals