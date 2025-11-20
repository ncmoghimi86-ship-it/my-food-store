import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { message,InputNumber,Table,Typography,Empty,Popconfirm,Button } from 'antd'
import {DeleteOutlined } from '@ant-design/icons'
import{ShoppingOutlined } from '@ant-design/icons'
import { removeFromCart,updateQuantity } from '../features/cartSlice'
const {Title}=Typography
function CardPage() {
    const dispatch=useDispatch()
    const cartItems=useSelector((state)=>state.cart.items)
    const navigate=useNavigate()
    const handlerQuantityChange=(id,quantity)=>{
        if(quantity>0){
            dispatch(updateQuantity({id,quantity}))
        }else{
            message.warning('تعداد محصول نمیتواند کمتر از 1 باشد!')
        }
    }
    const handleRemove=(id)=>{
        dispatch(removeFromCart(id));
        message.success('محصول  از سبد خرید شما حذف شد')
    }
    const columns=[
        {
            title:'نام محصول',
            dataIndex:'name',
            key:'name',
        },
        {
            title:'قیمت',
            dataIndex:'price',
            key:'price',
            render:(price)=>`${price.toLocaleString()}تومان`,
        },
        {
            title:'تعداد',
            // dataIndex:'quntity',
            key:'quantity',
            render:(_,record)=>(
                <InputNumber
                min={1}
                value={record.quantity}
                onChange={(value)=>handlerQuantityChange(record.id,value) }
                />
            )
            },
            {
                title:"جمع",
                // dataIndex:'total',
                key:'total',
                render:(_,record)=>`${(record.price*record.quantity).toLocaleString()}تومان`
            },
            {
                title:'عملیات',
                dataIndex:'action',
                key:'action',
                render:(_,record)=>(
                    <Popconfirm
                    title='آیا از حذف محصول مطمعن هستید؟'
                    onConfirm={()=>handleRemove(record.id)}
                    okText='بله'
                    cancelText='خیر'
                    >
                        <Button 
                         type='text'
                         danger
                         icon={<DeleteOutlined />} >
                            حذف
                         </Button>
                    </Popconfirm>
                )
            }
    ]
    //قیمت کل محصولات موجود در سبد خرید
    const total=cartItems.reduce((sum,item)=>sum+item.price*item.quantity, 0)
    // در صورت اتمام خرید و فشاردادن دکمه ثبت سفارش
    const handlerCheckOut=()=>{
        if(cartItems.length===0)
            {message.warning('سبدخرید شما خالی است')

            }else{navigate('/checkout')

            }
    }
    if(cartItems.length===0){
        return <Empty
        description={<span>سبد خرید شما خالی است</span>}
        >
            <Link to='/' >
             <Button 
            type='primary'
            icon={<ShoppingOutlined />}>
                 بازگشت به فروشگاه
                    </Button>
            </Link> 
        </Empty>
    }

  return (
    <div style={{padding:'20px'}}>
      <Title level={2}>سبد خرید</Title>
      <Table
      columns={columns}
      dataSource={cartItems}
      rowKey='id'
      pagination={false}
      summary={()=>(
        <Table.Summary.Row>
            <Table.Summary.Cell colSpan={3} >
                مجموع کل:
        </Table.Summary.Cell>
            <Table.Summary.Cell>
                <Title level={4}>{total.toLocaleString()}تومان</Title>
            </Table.Summary.Cell>
        </Table.Summary.Row>
      )}
      />
      <div style={{marginTop:16, textAlign:'right'}}>
        <Button 
        type='primary'
        size='large'
        onClick={handlerCheckOut}
        style={{marginRight:8 }}
        >
            نهایی کردن خرید 
            </Button>
        <Link to='/'>
        <Button size='large' style={{marginRight:8}} icon={<ShoppingOutlined/>}> ادامه خرید</Button>
        </Link>
      </div>    
    </div>
  )
}

export default CardPage