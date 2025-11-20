
const AuthService={
    //متد ثبت نام////////////////////////////////////////////////////////
    register:(username,password)=>{
        const storedUser=JSON.parse(localStorage.getItem('users'))||[];
        const existUser=storedUser.find(user=>user.username=username);
        if(existUser){
            throw new Error('این نام کاربری قبلا استفاده شده است')
        }
        const newUser={username,password};
        storedUser.push(newUser);
        localStorage.setItem('users',JSON.stringify(storedUser));
        return newUser
    },
    //متد لاگین//////////////////////////////////////////////////////////
    login:(username,password)=>{
        const storedUser=JSON.parse(localStorage.getItem('users'))||[]
        const user=storedUser.find(u=>u.username===username && u.password===password)
        if(user){
            localStorage.setItem('user',JSON.stringify({id:Date.now(),username}))
            return user
        }
        else{
            throw new Error('کاربر یافت نشد  نام کاربری یا رمز عبور را بررسی کنید')
        }
    },
    //  متد لاگ اوت یا خروج کاربر/////////////////////////////////////////////////////////////////
    logout:()=>{
        localStorage.removeItem('user')
    },
    //
    getuser:()=>{}
}