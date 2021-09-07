import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 5rem;
`;

const Button = styled.button`
    background-image: linear-gradient(to right, #7474BF 0%, #348AC7 51%, #7474BF 100%);
    margin: 10px;
    padding: 5px 25px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    border-radius: 10px;
    display: block;
    &:hover {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        margin: 8px 10px 12px;
        background-position: right center;
    }
`;

export default function AccountBalance(props) {

    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    let content = null;
    if (props.showBalance) {
        content = <>Balance: ${props.amount}</>;
    }
    return (
        <Section>
            {content}
            <br></br>
            <Button onClick={props.handleBalanceVisibilityChange}>{buttonText}</Button>
        </Section>
    );
}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}
 
