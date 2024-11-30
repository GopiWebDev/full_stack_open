import { Routes, Route } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import './index.css'
import Home from './components/Home'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
      <Link to='/'>
        <button>Home</button>
      </Link>
      <Link to='/authors'>
        <button>authors</button>
      </Link>
      <Link to='/books'>
        <button>books</button>
      </Link>
      <Link to='/add'>
        <button>add book</button>
      </Link>
    </div>
  )
}

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
      </Routes>
    </>
  )
}

export default App
