import React from 'react'
import {Form,Input,Button,message} from 'antd'
import {useSelector ,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {login} from '../features/authoSlice'

function LoginPage() {
    const navigate=useNavigate();
    const dispatch= useDispatch()
    const {loading,error}=useSelector ((state)=>state.autho) 
    const onFinish=async (values)=>{
        try{
            await dispatch(login(values)).unwrap()
            message.success('ورود موفق آمیز بود')
            navigate('/dashboard')
        } 
        catch(err){
            message.error(err||'خطایی رخ داد')
        }
    }
  return (
    <Form 
    name='login'
    initialValues={{remember:'true'}}
    onFinish={onFinish}
    style={{maxWidth:300 , margin:'70px auto'}}
    >
        <Form.Item
        name='username'
        rules={[{ required: true, message: 'لطفا نام کاربری خود را وارد کنید' }]}
        >
            <Input  placeholder='نام کاربری'/>
        </Form.Item>

        <Form.Item
        name='password'
        rules={[{ required: true, message: 'لطفا رمز عبور خود را وارد کنید' }]}
        >
            <Input  placeholder='رمزعبور'/>
        </Form.Item>
        {error && <div style={{color:'red' , marginTop:'10px'}}>{error}</div>}
        <Form.Item>
            <Button type='primary' 
            htmlType='submit'
            loading={loading}
            style={{width:'100%'}} 
            > 
            ورود
            </Button>
        </Form.Item>
    </Form>
  )
}

export default LoginPage