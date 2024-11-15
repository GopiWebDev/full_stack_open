import { Link } from 'react-router-dom'
import accountIcon from '../assets/icons/account.svg'
import logoIcon from '../assets/icons/logo.svg'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

function BasicExample() {
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand>
          <img className='w-[35px] lg:w-[60px]' src={logoIcon} alt='' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Link</Nav.Link>
            {/* <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default BasicExample

// const Navbar = () => {
//   return (
//     <div className='w-full bg-[#161616] flex justify-around items-center text-white h-[70px] lg:h-[125px] md:h-[90px] lg:text-[1.25rem]'>
//
//       <div className='flex justify-around w-[40%]'>
//         <Link to='/blogs'>BLOGS</Link>
//         <Link to='/users'>USERS</Link>
//       </div>
//       <img className='w-[30px] lg:w-[50px]' src={accountIcon} alt='account ' />
//     </div>
//   )
// }

// export default Navbar
