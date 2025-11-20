import  axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMeals=createAsyncThunk(
    'fetchAll/meals',
    async()=>{
        const response=await
        axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        return response.data.meals.map(meal=>
            ({...meal ,price:Math.floor(Math.random()*50000)+20000})
        )
    })

    const mealsSlice=createSlice({
        name:'meals',
        initialState:{
            items:[],
            isLoading:false,
             error:null,
            searchQuery:'',
            filteredItems:[],
            categories:[],
            selectedCategories:[],
        },
        reducers:{
               setSearchQuery: (state, action) => {
                 const query = (action.payload || '').toString().trim().toLowerCase()
                 state.searchQuery = action.payload || ''
                 state.filteredItems = state.items.filter(item => {
                   // چیزهایی که می‌خوایم روشون سرچ بشه
                  const name = (item.strMeal || '').toLowerCase()
                  const category = (item.strCategory || '').toLowerCase()
                  const instructions = (item.strInstructions || '').toLowerCase()
                   // اگه چیزی تو باکس سرچ نباشه → همه رو نشون بده
                  const matchesSearch = query === '' || 
                  name.includes(query) || 
                  category.includes(query) || 
                  instructions.includes(query)
                   // دسته‌بندی انتخاب شده باشه یا نه
                  const matchesCategory = !state.selectedCategories || 
                  item.strCategory === state.selectedCategories
                  return matchesSearch && matchesCategory
                 })
                },

              setSelectedCategories: (state, action) => {
                 const category = action.payload || ''
                 state.selectedCategories = category
                 const query = (state.searchQuery || '').toString().trim().toLowerCase()
                 state.filteredItems = state.items.filter(item => {
                    const name = (item.strMeal || '').toLowerCase()
                    const categoryName = (item.strCategory || '').toLowerCase()
                    const instructions = (item.strInstructions || '').toLowerCase()
                    const matchesSearch = query === '' || 
                    name.includes(query) || 
                    categoryName.includes(query) || 
                    instructions.includes(query)
                   const matchesCategory = category === '' || 
                   item.strCategory === category
                    return matchesSearch && matchesCategory
                   })
                }  
        },
        extraReducers:(builder)=>{
            builder
            .addCase(fetchMeals.pending,(state)=>{
                state.isLoading=true;
                state.error=null
            })
            .addCase(fetchMeals.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.items=action.payload;
                state.filteredItems=action.payload;
               state.error=null;
               state.categories= [...new Set( action.payload.map(item=>item.strCategory))]
            })
            .addCase(fetchMeals.rejected,(state,action)=>{
                state.isLoading=false;
                state.error=action.error.message
            })
        }
        
    })
    export const{setSearchQuery,setSelectedCategories}=mealsSlice.actions;
    export default mealsSlice.reducer;