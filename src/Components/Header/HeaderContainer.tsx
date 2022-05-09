import { useHistory } from 'react-router'
import { Menu } from 'antd'
import '../Header/HeaderContainer.css'
import { UserOutlined } from '@ant-design/icons'
const HeaderContainer = () => {
    const history = useHistory()

    return (
        <>
            <Menu className='navbar' theme="light" mode="horizontal">
                <Menu.Item  onClick={() => history.push('/home')}>
                    Hello
                </Menu.Item>
                <Menu.Item  onClick={() => history.push('/autoparks')}>
                    Autoparks
                </Menu.Item>
                <Menu.Item  onClick={() => history.push('/bookingcheck')}>
                    Bookings
                </Menu.Item>
                <Menu.Item  onClick={() => history.push('/autoparks')}>
                    Reports
                </Menu.Item>
                
            </Menu>
            
        </>
    )
}

export default HeaderContainer
