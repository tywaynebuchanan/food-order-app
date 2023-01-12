import React from 'react'
import { useGlobalContext } from '../context'
import { FaThumbsUp} from 'react-icons/fa';

const Meals = () => {

    const {meal,loading,message,selectMeal,addToFavorites} = useGlobalContext()
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
                 const {idMeal,strMeal:title,strMealThumb:image} = singleMeal
               
               
                 return <article key={idMeal} className="single-meal">
                     <img src={image} atl={title} className="img" onClick={()=>selectMeal(idMeal)}/>
                     <footer>
                         <h5>{title}</h5>
                         <div className='btn-group'>
                         <button className='like-btn' onClick={()=>addToFavorites(idMeal)}><FaThumbsUp/></button>
                         </div> 
                     </footer>
                 </article>
             })}
            </section>
       }
  


export default Meals