import React from 'react'
import{Form,Input,Button,message}from 'antd'
import{register} from '../features/authoSlice'
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormItem from 'antd/es/form/FormItem'

function RegisterPage() {
    const{loading,error}=useSelector((state)=>state.autho)
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const onFinish= async(values)=>{
        try{
            await dispatch(register(values)).unwrap()
            message.success('ثبت نام با موفقیت انجام شد')
            navigate('/')
        }
        catch(error){message.error(error)}
    }
  return (
    <Form
    name='register'  
    onFinish={onFinish}
    style={{maxWidth:600 ,margin:'70px auto'}}
    initialValues={{remember:'true'}}
    >
        <FormItem name='username' rules={[{required:'true',message:'نام کاربری خودرا وارد کنید'}]}> 
            <Input placeholder='نام کاربری'/>
            </FormItem>
        <FormItem name='password' rules={[{required:'true',message:'رمزعبورخودرا وارد کنید'}]} >
            <Input.Password placeholder='رمزعبور'/>
            </FormItem>
        <FormItem 
        name='confirmpassword'
        dependencies={['password']}
         rules={[
            {required:'true',message:'رمزعبور خودرا تکرارکنید'},
             ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('رمز عبور جدید با قبلی تطابق ندارد!'));
            },
          }),
         ]} 
         >
            <Input.Password  placeholder='تکرار رمز عبور'/>
            </FormItem>
            {error &&<div style={{color:'red',marginTop:'20px'}}>{error}</div>}
        <FormItem>
            <Button type='primary'
             htmlType='submit'
             style={{width:'100%'}}
             loading={loading}
             >
                ثبت نام
             </ Button>
         </FormItem>
        
    </Form>
  )
}

export default RegisterPage