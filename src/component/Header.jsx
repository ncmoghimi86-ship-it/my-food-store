// src/component/Header.jsx
import { useState } from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/authoSlice'
import { 
  HomeOutlined, 
  ShoppingCartOutlined, 
  DashboardOutlined, 
  LogoutOutlined, 
  LoginOutlined, 
  UserOutlined 
} from '@ant-design/icons'

function Header() {
  const isLoggedIn = useSelector(state => state.autho.isLogin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [current, setCurrent] = useState('home')

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const menuItems = [
    { key: 'home', label: <Link to='/'>محصولات</Link>, icon: <HomeOutlined /> },
    { key: 'cart', label: <Link to='/cart'>سبد خرید</Link>, icon: <ShoppingCartOutlined /> },
    ...(isLoggedIn 
      ? [
          { key: 'dashboard', label: <Link to='/dashboard'>داشبورد</Link>, icon: <DashboardOutlined /> },
          { key: 'logout', label: 'خروج', icon: <LogoutOutlined />, onClick: handleLogout }
        ]
      : [
          { key: 'login', label: <Link to='/login'>ورود</Link>, icon: <LoginOutlined /> },
          { key: 'register', label: <Link to='/register'>ثبت نام</Link>, icon: <UserOutlined /> }
        ]
    )
  ]

  return (
    <>
      {/* دسکتاپ */}
      <div className="header-desktop">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          items={menuItems}
          onClick={e => setCurrent(e.key)}
          className="desktop-menu"
        />
      </div>

      {/* موبایل ! */}
      <div className="header-mobile">
        <Link to="/" className="mobile-logo">My Food Store</Link>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[current]}
          items={menuItems}
          onClick={e => {
            setCurrent(e.key)
            if (e.key === 'logout') handleLogout()
          }}
        />
      </div>
    </>
  )
}

export default Header