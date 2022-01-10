import React, { Fragment } from "react";

import { connect } from "react-redux";

import { changePassword } from "../../actions/auth";

class ChangePassword extends React.Component 
{
  constructor (props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange () {
    const newPassword = document.getElementById('newPass').value;
    const confirmPassword = document.getElementById('confirmPass').value;
    const currentPassword = document.getElementById('currentPass').value;

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
    }
    else if (newPassword === '') {
      alert('New password required!');
    }
    else if (currentPassword === '') {
      alert('Current password required!');
    }
    else {
      this.props.changePassword(this.props.auth.user.username, currentPassword, newPassword);
    }
  }

  render () {
  
    return (
      <Fragment>
        <form>
          <div className="card card-body mt-4 mb-4">
            <h2>Change Password</h2>
            
            <div className="card card-body">
              <div className="form-group">
                <label htmlFor="year">
                  Current Password
                  <input 
                    type="password" 
                    className="form-control" 
                    id="currentPass" placeholder="" required
                    ></input>
                </label>
                
                <br />
                <label htmlFor="year">
                  New Password
                  <input 
                    type="password" 
                    className="form-control" 
                    id="newPass" placeholder="" required
                    ></input>
                </label>

                <br />
                <label htmlFor="year">
                  Confirm Password
                  <input 
                    type="password" 
                    className="form-control" 
                    id="confirmPass" placeholder="" required
                    ></input>
                </label>

                <br />
                <button 
                  type="button" 
                  className="btn btn-primary form-control"
                  onClick={ this.onChange }
                  style={{ width: "20%" }} 
                  >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  dispatch => ({
    changePassword: (username, password, newPassword) => dispatch(changePassword(username, password, newPassword))
  })
)(ChangePassword);
