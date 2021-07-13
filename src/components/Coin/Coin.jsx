import React, { Component } from 'react';
import './Coin.css';
import PropTypes from 'prop-types';

export default class Coin extends Component {
  constructor(props) {
    super(props);
      this.state = {
        price: this.props.price
      }
  }

  // catch state when component mount to DOM
  componentDidMount() {
    const callback = () => {
      const randomPercentage = 0.995 + Math.random() * 0.01;
      this.setState( function(oldState) {
        return {
          price: oldState.price * randomPercentage
        };
      });
    }
    setInterval( callback, 1000);
  }
    render() {
        return (
            <tr className='coin-row'>
              <td>{this.props.name}</td>
              <td>{this.props.ticker}</td> 
              <td>${this.state.price}</td>  
            </tr>
          );
    }
}

Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}