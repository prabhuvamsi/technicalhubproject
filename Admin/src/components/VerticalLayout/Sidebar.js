import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import avatar2 from "../../assets/images/users/avatar-2.jpg"

const Sidebar = props => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="h-100">
          <div className="user-wid text-center py-4">
            <div className="user-img">
              <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK5bH09wRnHn9nohTY4YZw81N3BPDns3LGHFpYzZaq5q6kqCuTMLCKE-igqkNLg7oiGNc&usqp=CAU"} alt="" className="avatar-md mx-auto rounded-circle" />
            </div>

              <div className="mt-3">
                <Link to="#" className="text-dark fw-medium font-size-16">TECHNICAL HUB</Link>
                <p className="text-body mt-1 mb-0 font-size-13">{}</p>
              </div>
            </div>
            <div data-simplebar className="h-100">
            {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
          </div>
          </div>
        </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
        type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
        layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
      {}
)(withRouter(withTranslation()(Sidebar)))