import Sidebar from './Sidebar'
import Mainbar from './Mainbar'

const LayoutContainer = () => {
  return (
    <div className='layout-container'>
      <Sidebar />
      <div className="main-content">
        <Mainbar />
      </div>
    </div>
  )
}

export default LayoutContainer