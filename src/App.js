import React, { useState, useEffect } from 'react';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance';
import AppHeader from './components/AppHeader/AppHeader';
import styled from 'styled-components';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';

const Div = styled.div`
  text-align: center;
  background-color: rgb(22, 118, 156);
  color: antiquewhite;
`;

const Coin_Count = 10;
const formatPrice = price => parseFloat(Number(price).toFixed(4));

function App(props) {
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);

  const componentDidMount = async () => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    let coinIds = response.data.slice(0, Coin_Count).map(coin => coin.id);
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers';
    const promises = coinIds.map(id => axios.get(tickerUrl + "/" + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function (response) {
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: formatPrice(coin.quotes.USD.price),
      };
    })
    // Retrieve the prices
    setCoinData(coinPriceData);
  };

  useEffect(function() {
    if(coinData.length === 0) {
      componentDidMount();
    }
  });

  const handleBalanceVisibilityChange = () => {
    setShowBalance(oldValue => !oldValue);
  };

  const handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = coinData.map(function (values) {
      let newValues = { ...values };
      if (valueChangeId === values.key) {
        newValues.price = newPrice;
      }
      return newValues
    });
    setCoinData(newCoinData);
  }
    return (
      <Div>
        <AppHeader />
        <AccountBalance
          amount={balance}
          showBalance={showBalance}
          handleBalanceVisibilityChange={handleBalanceVisibilityChange} />
        <CoinList
          coinData={coinData}
          showBalance={showBalance}
          handleRefresh={handleRefresh} />
      </Div>
    );
}

// to represent a number, fractional number -> put in brackets.


export default App;
