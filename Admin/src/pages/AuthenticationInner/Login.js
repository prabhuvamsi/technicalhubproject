import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import { Row, Col, Alert, Container } from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from 'axios'; // Import Axios for making HTTP requests
import { loginUser, apiError, socialLogin } from "../../store/actions";
import logo from "../../assets/images/logo-sm-dark.png";
const axiosAPI = axios.create()


const Login = (props) => {
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    document.body.className = "authentication-bg";
    return function cleanup() {
      document.body.className = "";
    };
  });

  const handleValidSubmit = async (event, values) => {
    event.preventDefault();
    const { userId, password } = values; // Destructure values object to get userId and password

    try {
      const response = await axiosAPI.post('http://localhost:5000/api/addlogin', { userId, password });
      console.log('Login successful!', response.data);
      if (response.data.message === 'Login successful') {
        window.location.href = `/dashboard`;
      } else {
        alert('Login failed');
      }
      setError(null);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Set specific error message from response
      } else {
        setError('An error occurred while logging in.'); // Set generic error message
      }
      console.error('Error logging in:', error);
    }
  };

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="card overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Welcome Back !</h5>
                    <p className="text-white-50 mb-0">Sign in to continue to Qovex.</p>
                    <Link to="/" className="logo logo-admin mt-4">
                      <img src={logo} alt="" height="30" />
                    </Link>
                  </div>
                </div>
                <div className="card-body pt-5">
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v);
                      }}
                    >
                      {error && typeof error === "string" ? (
                        <Alert color="danger">{error}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          name="userId"
                          label="User ID"
                          placeholder="Enter User ID"
                          type="text"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                     
                    </AvForm>
                  </div>
                </div>
              </div>
              
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const { error } = state.Login;
  return { error };
};

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
);

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
};
