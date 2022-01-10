import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import bsCustomFileInput from 'bs-custom-file-input';
import { bulkCurrents, bulkSettings } from "../../actions/bulk";
import { excel2JSON } from '../../utils';

class Manage extends React.Component 
{
  constructor (props) {
    super(props);

    this.setCurrentData = this.setCurrentData.bind(this);
    this.setOtherData = this.setOtherData.bind(this);

    this.onCurrentData = this.onCurrentData.bind(this);
  }

  static propTypes = {
  }

  componentDidMount() {
    bsCustomFileInput.init();
  }

  setCurrentData(evt) {
    excel2JSON(document.getElementById('currentFile').files[0], this.onCurrentData);
  }

  onCurrentData(arr) {
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;

    const currents = JSON.stringify({
      year,
      month,
      data: arr
    });

    console.log(currents);

    this.props.bulkCurrents(currents);
  }

  setOtherData(evt) {
    const settings = JSON.stringify({
      title: document.getElementById('title').value,
      invoice: document.getElementById('invoice').value,
      dateDue: document.getElementById('dateDue').value
    });

    console.log(settings);

    this.props.bulkSettings(settings);
  }

  render () {
  
    return (
      <Fragment>
        <form>
          <div className="card card-body mt-4 mb-4">
            <h2>Settings</h2>
            
            {/* <button type="button" className="btn btn-primary form-control">
              Clear All
            </button>
    <br /> */}

            <div className="card card-body">
              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input 
                  type="number" 
                  className="form-control" 
                  style={{ width: "20%" }} 
                  id="year" placeholder=""
                  defaultValue={ new Date().getFullYear() }></input>
              </div>

              <div className="form-group">
                <label htmlFor="month">Month</label>
                <input 
                  type="number" 
                  className="form-control" 
                  style={{ width: "20%" }} 
                  id="month" placeholder=""
                  defaultValue={ new Date().getMonth() + 1 }></input>
              </div>

              <div className="form-group">
                <label htmlFor="currentFile">Current</label>

                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="currentFile"></input>
                  <label className="custom-file-label" htmlFor="currentFile">Choose file</label>
                </div>

                <br />
                <br />
                <button 
                  type="button" 
                  className="btn btn-primary form-control"
                  onClick={ this.setCurrentData }
                  >
                  Set Current Data
                </button>
              </div>
            </div>

            <div className="card card-body">
              <h3 className="card-title">Other</h3>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="title" placeholder="Gas Charge from ..."></input>
              </div>

              <div className="form-group">
                <label htmlFor="invoice">Invoice</label>
                <input 
                  type="number" 
                  className="form-control" 
                  style={{ width: "50%" }} 
                  id="invoice" placeholder="19053001"></input>
              </div>

              <div className="form-group">
                <label htmlFor="dateDue">Date Due</label>
                <input type="date" 
                  className="form-control" 
                  style={{ width: "50%" }} 
                  id="dateDue" placeholder=""></input>
              </div>

              <button 
                type="button" 
                className="btn btn-primary form-control"
                onClick={ this.setOtherData }
                >
                Apply Changes
              </button>
            </div>

          </div>
        </form>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { bulkCurrents, bulkSettings }
)(Manage);
