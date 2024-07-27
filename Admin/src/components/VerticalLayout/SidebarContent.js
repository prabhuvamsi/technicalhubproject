import PropTypes from "prop-types"
import React, { useEffect, useRef, useCallback } from "react"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"
import { withTranslation } from "react-i18next"
import SimpleBar from "simplebar-react"
import MetisMenu from "metismenujs"


const SidebarContent = ({ location, t }) => {
  const ref = useRef()

  useEffect(() => {
    ref.current.recalculate()
  }, [])

  // Extract role from URL query parameter or default to an empty string
  const urlParams = new URLSearchParams(location.search)
  const role = urlParams.get('role') || ''

  return (
    <React.Fragment>
      <SimpleBar ref={ref} className="vertical-simplebar">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{t("Menu")} </li>
            <li>
              <Link to={`/dashboard?role=${role}`} className="waves-effect">
                <i className="dripicons-arrow-right" />
                <span>{t("Number Of Hardwares")}</span>
              </Link>
            </li>
            
            <li>
              <Link to={`/hardware?role=${role}`} className="waves-effect">
                <i className="dripicons-arrow-right" />
                <span>{t("Floor Wise Hardware Data")}</span>
              </Link>
            </li>
            <li>
              <Link to={`/software?role=${role}`}  className="waves-effect">
                <i className="dripicons-arrow-right" />
                <span>{t("Software Data")}</span>
              </Link>
              
            </li> 
            {role === 'admin' && (
              <li>
                <Link to={`/adduser?role=${role}`} className="waves-effect">
                  <i className="dripicons-arrow-right" />
                  <span>{t("AddUsers/Permissions")}</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
