import React, { useState, useEffect } from 'react';
import './nav.css';
import Landing from '../Landing/index';
import InputBox from '../container/inputBox';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { checkLoginStatus } from '../../actions/AuthAction';
import { Redirect, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';


const SearchBar = (props) => {
  const { changeSearch,page } = props;
  console.log("page value : ",page)
  return (<div style={{ marginTop: "5px" }}>
    <InputBox placeHolder={page!=="lists"?"Search card's name or reason":" Search by list's or card's name"} onChangeFunct={changeSearch} />
  </div>)
}
function Index(props) {
  const { authAction, isLoggedin, username, activated, profilePic, checkLoginStatus, changeSeacrch } = props;
  const [isOpen, setisOpen] = useState(false);
  const [page, setpage] = useState('');
  const fakeFunc = () => { }
  useEffect(() => {
    if (!authAction)
      checkLoginStatus();
      const pathName = window.location.pathname
      console.log("pathName, typeOf(pathName) ",pathName, typeof(pathName))
      if(pathName!=="undefined" && pathName==undefined && pathName!==null)
        setpage(pathName.includes('card') ? "cards" :
        (pathName.includes('list') ? "lists" : ''))
      else{
        console.log("got undefiles alwasy")
        setpage('lists')
      }

  }, [])
  return (authAction ?
    ((isLoggedin && activated) ?
      (
        <div>
          <Navbar className="navStyle" light expand="md">
            <NavbarBrand href="/"><div className="logo"><img id="logo" width="100%" height="100%" src="/logo.PNG" /></div></NavbarBrand>
            <NavbarToggler onClick={() => { setisOpen(!isOpen) }} />

            <Collapse isOpen={isOpen} navbar>
              <div style={{ width: "100%" }}>
                {(page === "lists" || page === "cards") ? <SearchBar changeSearch={changeSeacrch} page={page}/> : null}
              </div>
              <Nav className="mr-auto" style={{ width: "500px" }} navbar>
                <NavItem style={{ width: "80px", textAlign: "center" }}>
                  <NavLink>
                    <Link to={{ pathname: "/@" + username + "/cards" }}>Cards</Link>
                  </NavLink>
                </NavItem>
                <NavItem style={{ width: "80px" }}>
                  <NavLink>
                    <Link to={{ pathname: "/@" + username + "/lists" }}>Lists</Link>
                  </NavLink>
                </NavItem>
                <NavItem style={{ width: "80px" }}>
                  <NavLink href={"/@" + username + "/teams"}>Teams</NavLink>
                </NavItem>
                <UncontrolledDropdown style={{ width: "80px" }} nav inNavbar>
                  <DropdownToggle nav >
                    <img width="35px" height="35px" src={profilePic} style={{ borderRadius: "50%", marginTop: "-5px" }}></img>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Logout
                  </DropdownItem>
                    {/* <DropdownItem divider /> */}
                    <DropdownItem>
                      Export to csv
                  </DropdownItem>


                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>) : (<Redirect to={{ pathname: '/' }} />)) :
    (<p>loading</p>))
}
Index.PropType = {
  checkLoginStatus: PropType.func.checkLoginStatus,
};
const mapStateToProps = state => ({
  authAction: state.auth.authAction,
  isLoggedin: state.auth.isLoggedin,
  activated: state.auth.activated,
  profilePic: state.auth.profilePic,
  username: state.auth.username
})

export default connect(mapStateToProps, { checkLoginStatus })(Index)
