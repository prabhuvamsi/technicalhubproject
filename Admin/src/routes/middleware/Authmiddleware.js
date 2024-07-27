import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const isAuthenticated = localStorage.getItem("userId");

      if (isAuthProtected && !isAuthenticated) {
        // If route is protected and user is not authenticated, redirect to login page
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      // Otherwise, render the component with the specified layout
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);


Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware
