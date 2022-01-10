import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getInfo } from "../../actions/info";


const TiltedAxisTick = (props) => {

  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={15} 
        y={5} 
        dy={16} 
        textAnchor="end" 
        fill="#373a3c" 
        fontSize="20"
        transform="rotate(-30)">
          {payload.value}
      </text>
    </g>
  );

};

class Invoice extends React.Component 
{
  static propTypes = {
    info: PropTypes.object.isRequired,
    getInfo: PropTypes.func.isRequired,
    tag: PropTypes.string.isRequired
  }

  componentDidMount() {
    this.props.getInfo(this.props.tag);
  }

  componentDidUpdate(prevProps) {
    if (this.props.tag !== prevProps.tag)
      this.props.getInfo(this.props.tag);
  }

  render () {
    const { info } = this.props.info;
    const { status } = this.props.info;

    if (status === "fail"){
      return (
        <h3 className="text-center" style={{ marginTop: "40vh" }}>No Data. Please contact administrator.</h3>
      );
    }

    return (
      <Fragment>
        <div className="card card-body mt-4 mb-4" style={{
          borderWidth: "5px 5px 2px",
          borderStyle: "solid",
          borderColor: "orange",
          marginLeft: "2em",
          marginRight: "2em"
        }}>
          <div className="text-center" style={{ 
            width: "100%", 
            margin: "auto",
            fontSize: "200%" }}>
            <h1>Gas Bill { info.client.id }</h1>
            <h3>{ info.title }</h3>

            <div className="text-left" style={{ width: "100%", margin: "auto", paddingLeft: "100px", paddingRight: "100px" }}>
              <br />
              <span style={{ float: "left" }}>{ info.client.name }</span>
              <span style={{ float: "right" }}>Invoice: { info.invoice }</span><br />
              <span style={{ float: "left" }}>{ info.client.billTo1 }</span>
              <span style={{ float: "left" }}>{ info.client.billTo2 }</span><br />
              <span style={{ float: "left" }}>{ info.client.billTo3 }</span><br />
              <span style={{ float: "left" }}>{ info.client.billTo4 }</span><br />
              
              <br />
              <table style={{ 
                width: "60%", 
                fontSize: "30px"
                }}>
                <tbody>
                  <tr>
                    <td>Phone: </td>
                    <td>{ info.client.phone }</td>
                  </tr>
                  <tr>
                    <td>Fax: </td>
                    <td>{ info.client.fax }</td>
                  </tr>
                  <tr>
                    <td>Email: </td>
                    <td>{ info.client.email }</td>
                  </tr>
                </tbody>
              </table>

              <br />
              <table 
                style={{ 
                  width: "60%", 
                  float: "left",
                  fontSize: "30px" }}
                className="table-bordered"
                >
                <tbody>
                  <tr>
                    <td>Prior Month Reading: </td>
                    <td>{ info.gas.prev }</td>
                  </tr>
                  <tr>
                    <td>Current Month Reading: </td>
                    <td>{ info.gas.current }</td>
                  </tr>
                  <tr>
                    <td>Current Usage: </td>
                    <td>{ info.gas.therms }</td>
                  </tr>
                  <tr>
                    <td>Rate: </td>
                    <td>{ info.gas.rate }</td>
                  </tr>
                  <tr>
                    <td>Amount Due: </td>
                    <td>${ info.gas.amount }</td>
                  </tr>
                </tbody>
              </table>

              <span style={{ float: "right" }}>Date Due: { info.dateDue }</span><br />

              <div style={{ clear: "both" }}></div>

              <br />
              <span >Payable to: { info.payableTo }</span><br />
              <span>{ info.notice } </span>

              <br />

            </div>
            <br />

            <div className="text-center">
              <h2>Gas Cost { info.client.id }</h2>
              <ResponsiveContainer width='100%' minHeight={500} >
                <BarChart
                  /* width={800}
                  height={300} */
                  data={info.gasCost}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 55,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={<TiltedAxisTick />} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
      </Fragment>
    );
  }
}


const mapStateToProps = state => {
  return ({
    info: state.info,
    auth: state.auth
  });
};

export default connect(
  mapStateToProps,
  { getInfo }
)(Invoice);
