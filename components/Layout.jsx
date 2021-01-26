import Nav from './Nav'
import Footer from './Footer'

const Layout = (props) => {
  const { children } = props

  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex-grow">
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout