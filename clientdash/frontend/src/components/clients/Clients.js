import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getClients, deleteClient } from "../../actions/clients";

export class Clients extends Component {
  static propTypes = {
    clients: PropTypes.array.isRequired,
    getClients: PropTypes.func.isRequired,
    deleteClient: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getClients();
  }

  render() {
    return (
      <Fragment>
        <h2>Clients</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.clients.map(lead => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.message}</td>
                <td>
                  <button
                    onClick={this.props.deleteClient.bind(this, lead.id)}
                    className="btn btn-danger btn-sm"
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.clients);
  return ({
  clients: state.clients.clients
});
};

export default connect(
  mapStateToProps,
  { getClients, deleteClient }
)(Clients);
