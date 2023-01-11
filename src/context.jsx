import React,{useContext, useEffect,useState} from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({children}) =>{

    const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
    const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
     const [meal,setMeals] = useState([])
     const [loading,setLoading] = useState(false);
     const [searchTerm,setSearchTerm] = useState('')
     const [message,setMessage] = useState('')
    
    
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

    return(
        <AppContext.Provider value={{meal,loading,setSearchTerm,fetchRandomMeals,ResetData,message}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}

export {AppProvider, AppContext}

