/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactToPrint from 'react-to-print';
import Invoice from './Invoice';


class SequentialPrint extends React.Component 
{
  static propTypes = {
    selected: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrint = this.handlePrint.bind(this);

    this.selectedTags = this.props.selected;

    this.state = {
      currentIdx: 0
    }
  }

  handleNext(evt) {
    if (this.state.currentIdx < this.selectedTags.length - 1) {
      this.setState(prevState => ({
        currentIdx: prevState.currentIdx + 1
      }));
    }
    else {
      alert('Printing finished.');
      this.props.history.push('/print');
    }
  }

  handlePrint(evt) {
    console.log(evt);
  }

  render () {
    const { currentIdx } = this.state;

    return (
      <Fragment>
        <form>
          <div className="card card-body mt-4 mb-4">
            <div style={{display: 'inline'}}>
              <h2 style={{display: 'inline'}}>Invoice for {this.selectedTags[currentIdx]}</h2>
              <ReactToPrint
                trigger={() => <button 
                  type="button" 
                  className="btn btn-primary form-control"
                  onClick={ this.handlePrint }
                  style = {{ float: "right", width: "20%" }}
                  >
                  Print
                </button>}
                content={() => this.componentRef}>
              </ReactToPrint>
              
              <button 
                type="button" 
                className="btn btn-primary form-control mr-1"
                onClick={ this.handleNext }
                style = {{ float: "right", width: "20%" }}
                >
                Next
              </button>
            </div>

            <Invoice ref={el => (this.componentRef = el)} tag={this.selectedTags[currentIdx]}></Invoice>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    selected: state.customers.selected
  })
)(SequentialPrint);
