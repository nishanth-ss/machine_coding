import { Outlet } from 'react-router-dom'

const Mainbar = () => {
  return (
    <div className='mainbar'>
        <Outlet />
    </div>
  )
}

export default Mainbar