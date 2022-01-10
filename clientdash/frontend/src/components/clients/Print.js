/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getCustomers, setSelected } from "../../actions/info";
import store from "../../store";


class Print extends React.Component 
{
  static propTypes = {
    customers: PropTypes.object.isRequired,
    getCustomers: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.handlePrint = this.handlePrint.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

    this.state = {
      selected: {}
    };
  }

  componentDidMount() {
    this.props.getCustomers();
  }

  handlePrint(evt) {
    const selectedCustomers = Object.keys(this.state.selected).filter(x => this.state.selected[x]);
    if (selectedCustomers.length === 0) {
      alert('Please select at least one.');
      return;
    }
    this.props.setSelected(selectedCustomers);
    // store.dispatch(this.props.setSelected(this.state.selected));
    this.props.history.push('/start-print');
  }

  handlePreview(evt) {
    evt.preventDefault();
  }

  handleToggle(evt) {
    const {tag} = evt.target.dataset;
    const {checked} = evt.target;
    this.setState(prevState => ({
      selected: { ...prevState.selected, [tag]: checked }
    }));
  }

  render () {
    const { status, customers } = this.props.customers;
    const { selected } = this.state;

    return (
      <Fragment>
        <form>
          <div className="card card-body mt-4 mb-4">
            <div style={{display: 'inline'}}>
              <h2 style={{display: 'inline'}}>Customers</h2>
              <button 
                type="button" 
                className="btn btn-primary form-control"
                onClick={ this.handlePrint }
                style = {{ float: "right", width: "20%" }}
                >
                Print
              </button>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Print?</th>
                  <th>Tag</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address Line 1</th>
                  <th>Address Line 2</th>
                  <th>Address Line 3</th>
                  <th>Address Line 4</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {status==='success' && customers.users.map(user => (
                  <tr key={user.username}>
                    <td>
                      <input type="checkbox" data-tag={user.tag} value={selected[user.tag]} onChange={this.handleToggle}></input>
                    </td>
                    <td>{user.tag}</td>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.email}</td>
                    <td>{user.billTo1}</td>
                    <td>{user.billTo2}</td>
                    <td>{user.billTo3}</td>
                    <td>{user.billTo4}</td>
                    <td>
                      <Link
                        to = {`/dashboard/${user.tag}`}
                        className="nav-link"
                        target = "_blank"
                      >
                        Preview Bill
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    customers: state.customers
  }),
  { getCustomers, setSelected }
)(Print);
