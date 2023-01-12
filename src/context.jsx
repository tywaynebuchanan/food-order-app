import React,{useContext, useEffect,useState} from "react";
import axios from "axios";

const AppContext = React.createContext();

const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');
    if (favorites) {
      favorites = JSON.parse(localStorage.getItem('favorites'))
    }
    else {
      favorites = []
    }
    return favorites
  }

const AppProvider = ({children}) =>{

    const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
    const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
     const [meal,setMeals] = useState([])
     const [loading,setLoading] = useState(false);
     const [searchTerm,setSearchTerm] = useState('')
     const [message,setMessage] = useState('')
     const [showModal,setShowModal] = useState(false)
     const [selectedMeal,setSelectedMeal] = useState(null)
     const [favorites,setFavorites] = useState(getFavoritesFromLocalStorage())
    
    
    const fetchMeal = async(url) =>{
        setLoading(true)
        try {
            const {data} = await axios.get(url);
            if(data.meals){
                setMeals(data.meals) 
            }else{
                setMeals([])
            }
        } catch (error) {
            console.log(error.response)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchMeal(allMealsUrl)
      }, [])

     
    useEffect(() => {
        if(!searchTerm) return
        fetchMeal(`${allMealsUrl}${searchTerm}`)
        setMessage("No food by the name of " + searchTerm)
      },[searchTerm]);

      const fetchRandomMeals = () =>{
        fetchMeal(randomMealUrl)
       }

       const ResetData = () =>{
        fetchMeal(allMealsUrl)
       }

       const selectMeal = (idMeal) =>{
        let meals;
        meals = meal.find((meals)=>meals.idMeal === idMeal)
        setSelectedMeal(meals);
        setShowModal(true)
       }
       
       const closeModal=()=>{
            setShowModal(false)
       }

       const addToFavorites=(idMeal)=>{
        console.log(idMeal);
        const meals = meal.find((meals)=>meals.idMeal === idMeal)
        const alreadyFav = favorites.find((meals)=>meals.idMeal === idMeal)
        if(alreadyFav) return
        const updateFav = [...favorites,meals]
        setFavorites(updateFav)
        localStorage.setItem("favorites", JSON.stringify(updateFav))

       }

       const removeFavorites=(idMeal)=>{
        const updateFav = favorites.filter((meals) => meals.idMeal !== idMeal);
        setFavorites(updateFav)
        localStorage.setItem("favorites", JSON.stringify(updateFav))
       }


    return(
        <AppContext.Provider value={
            {meal,
            loading,
            setSearchTerm,
            fetchRandomMeals,
            ResetData,
            message,
            showModal,
            selectedMeal,
            selectMeal,
            closeModal,
            removeFavorites,
            addToFavorites,
            favorites,
            }
            
            }>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}

export {AppProvider, AppContext}

