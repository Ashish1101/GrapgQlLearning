import React, { useEffect, useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import {darkMode as toggleMode , GET_DARK_MODE} from '../graphql/ReactVar'
import {useQuery} from '@apollo/client'
// const Navigation = (props) => {
//   const [collapsed, setCollapsed] = useState(true);

//   const toggleNavbar = () => setCollapsed(!collapsed);
//   const token = localStorage.getItem('userToken')

//   return (

//     <div>
//       {/* <Navbar color="faded" light>
//         <NavbarBrand href="/" className="mr-auto">Grapgql</NavbarBrand>
//         <Collapse isOpen={!collapsed} navbar>
//           {!token ? (<Nav navbar>
//             <NavItem>
//               <NavLink to="/">Register</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink to="/login">Login</NavLink>
//             </NavItem>
//           </Nav>) : (
//             <Nav navbar>
//                <NavItem>
//                 <NavLink to="/todo">Todos</NavLink>
//               </NavItem>
//               <Button color="danger" onClick={() => localStorage.removeItem('userToken')}>Logout</Button>
//             </Nav>
//           )}
//         </Collapse>
//       </Navbar> */}

//     </div>
//   );
// }

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color , setColor] = useState('light')
  const {data} = useQuery(GET_DARK_MODE)

  useEffect(() => {
    if( data?.darkMode === true) {
      setColor('dark')
    } else {
      setColor('light')
    }
  } , [color , data.darkMode])

	const toggle = () => setIsOpen(!isOpen);
  const token = localStorage.getItem("userToken");
  
  const logout = () => {
    localStorage.removeItem("userToken")
  }

  

  const toggleDarkMode = () => {
     console.log(data.darkMode)
     localStorage.setItem('theme' , data?.darkMode)
     toggleMode(!data.darkMode)
    
  }

	return (
		<div className="">
			<Navbar color={color} light expand='md'>
				<NavbarBrand href='/'>Graphql Learning</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={!isOpen} navbar>
					{!token ? (
						<Nav navbar>
							<NavItem>
								{" "}
								<NavLink to='/'>Register</NavLink>
							</NavItem>
              {" "}
							<NavItem className="ml-4">
								<NavLink to='/login'>Login</NavLink>
							</NavItem>
						</Nav>
					) : (
						<Nav navbar>
							<NavItem className="mt-2">
								<NavLink to='/todo'>Todos</NavLink>
							</NavItem>
							<NavItem className="ml-4">
              <Button
                color='danger'
                outline
								onClick={logout}
							>
								Logout
							</Button>
              </NavItem>
              <NavItem className="ml-4">
              <Button
                color="success"
                outline
                onClick={toggleDarkMode}
							>
								DarkMode
							</Button>
              </NavItem>
						</Nav>
					)}
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Navigation;
