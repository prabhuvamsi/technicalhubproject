import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { logoutUser } from "../../store/actions"

const Logout = props => {
  useEffect(() => {
    props.logoutUser(props.history)
  }, [])

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
  logoutUser: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  logoutUser: history => {
    // Remove user ID from local storage
    localStorage.removeItem('userId');
    // Dispatch the logout action
    dispatch(logoutUser(history));
  }
});

export default withRouter(connect(null, mapDispatchToProps)(Logout))
