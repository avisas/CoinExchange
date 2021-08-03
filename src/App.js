import React from 'react';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance';
import AppHeader from './components/AppHeader/AppHeader';
import styled from 'styled-components';
import axios from 'axios';

const Div = styled.div`
  text-align: center;
  background-color: rgb(22, 118, 156);
  color: antiquewhite;
`;

const CoinCount = 10;

class App extends React.Component {
  state = {
    balance: 10000,
    showBalance: true,
    coinData: [
      /*
      {
        name: 'Bitcoin',
        ticker: 'BTC',
        balance: 0.5,
        price: 9999.99
      },
      {
        name: 'Ethereum',
        ticker: 'ETH',
        balance: 32.0,
        price: 299.99
      },
      {
        name: 'Tether',
        ticker: 'USDT',
        balance: 0,
        price: 1.0
      },
      { 
        name: 'Ripple',
        ticker: 'XRP',
        balance: 1000,
        price: 0.2
      },
      {
        name: 'Bitcoin Cash',
        ticker: 'BCH',
        balance: 0,
        price: 298.99
      }
      */
    ]
  }

  componentDidMount = async() => {
    let response = await axios.get('https://api.coinpaprika.com/v1/coins')
    let coinData = response.data.slice(0, CoinCount).map(function(coin){
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: 0
      }
    });
    this.setState({coinData});
  }

  handleBalanceVisibilityChange = () => {
    this.setState( function(oldState) {
      return {
        ...oldState,
        showBalance: !oldState.showBalance
      }
    });
  }

  handleRefresh = (valueChangeTicker) => {
    const newCoinData = this.state.coinData.map(function(values) {
      let newValues = {...values};
      if(valueChangeTicker === values.ticker) {
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newValues.price *= randomPercentage;
      }
      return newValues
    });
    this.setState({coinData: newCoinData});
  }
  render() {
    return (
      <Div>
        <AppHeader />
        <AccountBalance 
          amount={this.state.balance} 
          showBalance={this.state.showBalance} 
          handleBalanceVisibilityChange={this.handleBalanceVisibilityChange}/>
        <CoinList 
          coinData={this.state.coinData} 
          showBalance={this.state.showBalance}
          handleRefresh={this.handleRefresh}/>
      </Div>
    );
  }
}

// to represent a number, fractional number -> put in brackets.


export default App;
