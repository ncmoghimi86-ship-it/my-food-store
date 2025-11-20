import { createSlice } from "@reduxjs/toolkit";


const cartSlice=createSlice({
    name:'cart',
    initialState:{
        items:[]
    },
    reducers:{
        addToCart:(state,action)=>{
            const existItem=state.items.find(item=>item.id===action.payload.id)
            if(existItem){
                existItem.quantity+=1
            }
            else{
                state.items.push({...action.payload , quantity:1})
             
            }
        },

        removeFromCart:(state,action)=>{
           state.items= state.items.filter(item=>item.id!==action.payload)

        },
        updateQuantity:(state,action)=>{
            const{id,quantity}=action.payload
            const item=state.items.find(item=>item.id===id)
            if(item){
                item.quantity=quantity
            }
        },
        clearCart:(state)=>{
            state.items=[]
        }
    }
})
export default cartSlice.reducer
export const{addToCart,removeFromCart,updateQuantity,clearCart}=cartSlice.actions