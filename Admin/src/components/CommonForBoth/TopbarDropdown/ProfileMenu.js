import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// users
import user4 from "../../../assets/images/users/avatar-4.jpg"
const urlParams = new URLSearchParams(window.location.search);
      const role = urlParams.get('role') || '';
      
const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={"  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK5bH09wRnHn9nohTY4YZw81N3BPDns3LGHFpYzZaq5q6kqCuTMLCKE-igqkNLg7oiGNc&usqp=CAU"}
            alt="Header Avatar"
          />{" "}
          <span className="d-none d-xl-inline-block ms-1">{role === 'admin' ? 'Admin' : 'User'}</span>{" "}
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>{" "}
        </DropdownToggle>
        
        <DropdownMenu className="dropdown-menu-end">
          {/* <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1"></i>{" "}
            {props.t("View Profile")}{" "}
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="/#">
            <i className="bx bx-wallet font-size-16 align-middle me-1"></i>{" "}
            {props.t("My Wallet")}
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="/usersdata">
            <span className="badge bg-success float-end"></span><i
              className="bx bx-wrench font-size-16 align-middle me-1"></i>{" "}
            {props.t("Settings")}
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1"></i>{" "}
            {props.t("Lock screen")}
          </DropdownItem> */}
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item text-danger">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>{" "}
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)