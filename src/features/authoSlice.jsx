// اسلایس احراز هویت 

import{createAsyncThunk, createSlice} from "@reduxjs/toolkit"
//گرفتن اطلاعات کاربران ثبت نام کرده از لوکال استوریج
const getStoreUsers=()=>{
    const users=localStorage.getItem('users');
    return users? JSON.parse(users) :[]
}
//ذخیره کردن اطلاعات کاربر ثبت نام کننده در لوکال استوریج
const storeUser=(user)=>{
    const users=getStoreUsers()
    users.push(user);
    localStorage.setItem('users',JSON.stringify(users))
}
//شروع فرایند ثبت نام 

 export const register=createAsyncThunk(
    'autho/register',
    async(userData,{rejectWithValue})=>{
        const users=getStoreUsers();
        if( users.find(user=>user.username===userData.username)){
           return rejectWithValue('این نام کاربری قبلا ثبت شده است')
         }
         const newUser={id:Date.now(),username:userData.username,password:userData.password}
         storeUser(newUser)
         return {id:newUser.id,username:newUser.username}
    }
)

export const login=createAsyncThunk(
    'autho/login',
    async(creditDetail,{rejectWithValue})=>{
       const users=getStoreUsers();
       const user=users.find(user=>
        user.username===creditDetail.username && user.password===creditDetail.password)
        if(user){
            return {id:user.id , username:user.username }
        }
        return  rejectWithValue('نام کاربری یا رمز عبور معتبر نمی باشد')
    }
)

const authoSlice=createSlice({
    name:'autho',
    initialState:{
        user:null, //هیچ کاربری واردنشده
        isLogin:false,//کاربر وارد سیستم نیست
        loading:false,
        error:null
    },
    reducers:{
        //مدیریت خروج کاربر
        logout:(state)=>{
            state.user=null,
            state.isLogin=false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(register.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLogin=true;
            state.loading=false;
            state.user=action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(login.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(login.fulfilled ,(state,action)=>{
            state.isLogin=true;
            state.loading=false;
            state.user=action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
 
})

export default authoSlice.reducer
export const{logout}=authoSlice.actions