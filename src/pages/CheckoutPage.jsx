import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, DatePicker, TimePicker, Button, Typography, Table, message } from 'antd'
import { clearCart } from '../features/cartSlice'
import { addOrder} from '../features/orderSlice' 
import { useNavigate } from 'react-router-dom'
import LocationPicker from '../component/LocationPicker'

const { Text, Title } = Typography
const { Item: FormItem } = Form

function CheckoutPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cart.items)
  const [form] = Form.useForm()
  const [selectedLocation, setSelectedLocation] = useState(null)

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const columns = [
    { title: 'نام محصول', dataIndex: 'name', key: 'name' },
    { title: 'قیمت', dataIndex: 'price', key: 'price', render: (price) => `${price.toLocaleString()} تومان` },
    { title: 'تعداد', dataIndex: 'quantity', key: 'quantity' },
    { title: 'جمع', key: 'total', render: (_, record) => `${(record.price * record.quantity).toLocaleString()} تومان` }
  ]

  const onFinish = (values) => {
    if (!selectedLocation) {
      message.error('لطفاً موقعیت مکانی خود را روی نقشه انتخاب کنید')
      return
    }

    // ساخت آبجکت سفارش کامل
    const orderData = {
      items: cartItems,
      totalPrice: total,
      fullName: values.fullName,
      address: values.address,
      location: {
    lat: selectedLocation.lat,    
    lng: selectedLocation.lng,  
    address: selectedLocation.address
  },
     
      deliveryDate: values.deliveryDate.format('YYYY/MM/DD'),
      deliveryTime: values.deliveryTime.format('HH:mm'),
    }

    // ذخیره سفارش در استور + پاک کردن سبد خرید
    dispatch(addOrder(orderData))
    dispatch(clearCart())

    // نمایش پیام موفقیت
    message.success({
      content: 'سفارش شما با موفقیت ثبت شد! در حال انتقال به داشبورد...',
      duration: 3,
      style: { marginTop: '70px' }
    })

    // بعد از 3 ثانیه برو به داشبورد
    setTimeout(()=>{ navigate('/dashboard')},3000)
     
   
  }

  const handlerLocationSelect = (location) => {
    setSelectedLocation(location)
    form.setFieldsValue({ address: location.address }) // آدرس خودکار پر بشه
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '30px 20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
        تکمیل خرید
      </Title>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <FormItem
          name="fullName"
          label="نام و نام خانوادگی"
          rules={[{ required: true, message: 'لطفاً نام و نام خانوادگی خود را وارد کنید' }]}
        >
          <Input size="large" placeholder="مثال: علی محمدی" />
        </FormItem>

        <FormItem label="انتخاب موقعیت مکانی روی نقشه" required>
          <LocationPicker onLocationSelect={handlerLocationSelect} />
        </FormItem>

        <FormItem
          name="address"
          label="آدرس دقیق (اختیاری - در صورت نیاز اصلاح)"
          rules={[{ required: true, message: 'لطفاً آدرس را تأیید یا ویرایش کنید' }]}
        >
          <Input.TextArea rows={3} placeholder="آدرس دقیق برای ارسال سفارش" />
        </FormItem>

        <FormItem
          name="deliveryDate"
          label="تاریخ ارسال"
          rules={[{ required: true, message: 'لطفاً تاریخ ارسال را انتخاب کنید' }]}
        >
          <DatePicker style={{ width: '100%' }} size="large" placeholder="انتخاب تاریخ" />
        </FormItem>

        <FormItem
          name="deliveryTime"
          label="زمان ارسال"
          rules={[{ required: true, message: 'لطفاً زمان ارسال را انتخاب کنید' }]}
        >
          <TimePicker style={{ width: '100%' }} size="large" format="HH:mm" placeholder="انتخاب زمان" />
        </FormItem>

        <Title level={4}>اقلام سفارش</Title>
        <Table
          columns={columns}
          dataSource={cartItems}
          pagination={false}
          rowKey="id"
          style={{ marginBottom: 20 }}
        />

        <div style={{ textAlign: 'right', marginBottom: 30 }}>
          <Text strong style={{ fontSize: 20, color: '#ff4d4f' }}>
            مبلغ کل قابل پرداخت: {total.toLocaleString()} تومان
          </Text>
        </div>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            style={{ height: 52, fontSize: 18, fontWeight: 'bold' }}
          >
            ثبت نهایی سفارش
          </Button>
        </FormItem>
      </Form>
    </div>
  )
}

export default CheckoutPage