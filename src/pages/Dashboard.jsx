import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Table, Typography, Empty } from 'antd'
import { ShoppingOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

function Dashboard() {
  const user = useSelector(state => state.autho.user)
  const { orders, currentOrder } = useSelector(state => state.order)
  const latestOrder = currentOrder || orders[0]

  // اگه سفارشی نباشه
  if (!latestOrder || !latestOrder.items || latestOrder.items.length === 0) {
    return (
      <div className="dashboard-clean">
        <Empty
          image={<ShoppingOutlined className="empty-cart-icon" />}
          description={
            <Text className="empty-text">هنوز سفارشی ثبت نکرده‌اید</Text>
          }
        />
      </div>
    )
  }

  const totalPrice = latestOrder.totalPrice || 
    latestOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const columns = [
    {
      title: 'محصول',
      dataIndex: 'name',
      key: 'name',
      render: text => <span className="item-name">{text}</span>,
    },
    {
      title: 'تعداد',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      width: 100,
      render: qty => <span className="item-quantity">{qty}</span>,
    },
    {
      title: 'قیمت',
      key: 'total',
      align: 'right',
      width: 140,
      render: (_, record) => (
        <span className="item-total">
          {(record.price * record.quantity).toLocaleString()} تومان
        </span>
      ),
    },
  ]

  return (
    <div className="dashboard-clean">
      

      <Card className="dashboard-clean-card" title="آخرین خرید شما">
        <Table
          columns={columns}
          dataSource={latestOrder.items}
          pagination={false}
          rowKey="id"
          className="clean-order-table"
          showHeader={false}
        />

        <div className="total-section-clean">
          <Text className="total-label">مبلغ کل</Text>
          <Text className="total-price-clean">
            {totalPrice.toLocaleString()} تومان
          </Text>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard