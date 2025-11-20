import React, { useEffect } from 'react'
import { fetchMeals, setSearchQuery, setSelectedCategories } from '../features/mealsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Row, Col, Button, Typography, Spin, Input, Select, message } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { addToCart } from '../features/cartSlice'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography
const { Search } = Input
const { Option } = Select

function ProductPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { filteredItems: meals, isLoading, categories, selectedCategories } = useSelector(state => state.meals)
  const isLogin = useSelector(state => state.autho.isLogin)

  useEffect(() => {
    dispatch(fetchMeals())
  }, [dispatch])


  const handlerAddToCart = (meal) => {
    if (isLogin) {
      dispatch(addToCart({
        id: meal.idMeal,
        name: meal.strMeal,
        price: meal.price,
        quantity: 1
      }))
      message.success(`${meal.strMeal} به سبد خرید اضافه شد`)
    } else {
      message.warning('لطفاً ابتدا وارد شوید یا ثبت‌نام کنید')
      setTimeout(() => navigate('/login'), 1000) 
    }
  }

  const handlerSearch = (value) => {
    dispatch(setSearchQuery(value))
  }

  const handlerCategoryChange = (value) => {
    dispatch(setSelectedCategories(value))
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div style={{ padding: '20px 24px', minHeight: '100vh' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
        منوی غذاها
      </Title>

      {/* سرچ و دسته‌بندی */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Search
            placeholder="جستجو در اسم غذا، مواد اولیه یا دسته‌بندی..."
            allowClear
            enterButton="جستجو"
            size="large"
            onChange={(e) => handlerSearch(e.target.value)}
            onSearch={handlerSearch}
          />
        </Col>
        <Col xs={24} md={12}>
          <Select
            style={{ width: '100%' }}
            size="large"
            placeholder="انتخاب دسته‌بندی"
            allowClear
            value={selectedCategories || undefined}
            onChange={handlerCategoryChange}
          >
            <Option value="">همه دسته‌بندی‌ها</Option>
            {categories.map(cat => (
              <Option key={cat} value={cat}>{cat}</Option>
            ))}
          </Select>
        </Col>
      </Row>

      {/* لیست غذاها */}
      <Row gutter={[16, 24]}>
        {meals.length === 0 ? (
          <Col span={24}>
            <Title level={4} type="secondary" style={{ textAlign: 'center', marginTop: 80 }}>
              هیچ محصولی با این مشخصات یافت نشد
            </Title>
          </Col>
        ) : (
          meals.map(meal => (
            <Col xs={24} sm={12} md={8} lg={6} key={meal.idMeal}>
              <Card
                hoverable
                cover={
                  <img
                    alt={meal.strMeal}
                    src={meal.strMealThumb}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
                actions={[
                  <div key="action" style={{ padding: '12px 0' }}>
                    <Button
                      type="primary"
                      danger={!isLogin}
                      icon={<ShoppingCartOutlined />}
                      size="large"
                      block
                      onClick={() => handlerAddToCart(meal)}
                      style={{
                        height: 52,
                        fontWeight: 700,
                        fontSize: 16,
                        borderRadius: 12,
                        background: isLogin
                          ? 'linear-gradient(45deg, #1890ff, #0066ff)'
                          : '#ffffff',
                        color: isLogin ? '#fff' : '#ff4d4f',
                        border: isLogin ? 'none' : '2.5px solid #ff4d4f',
                        boxShadow: isLogin
                          ? '0 6px 20px rgba(24,144,255,0.4)'
                          : '0 6px 20px rgba(255,77,79,0.25)',
                      }}
                    >
                      {isLogin ? 'افزودن به سبد خرید' : 'ابتدا وارد شوید'}
                    </Button>
                  </div>
                ]}
              >
                <Card.Meta
                  title={meal.strMeal}
                  description={
                    <>
                      <Paragraph ellipsis={{ rows: 2 }}>
                        {meal.strInstructions || 'غذای خوشمزه و خانگی'}
                      </Paragraph>
                      <Title level={5} type="danger">
                        {meal.price.toLocaleString()} تومان
                      </Title>
                      <Paragraph type="secondary">
                        دسته‌بندی: {meal.strCategory}
                      </Paragraph>
                    </>
                  }
                />
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  )
}

export default ProductPage