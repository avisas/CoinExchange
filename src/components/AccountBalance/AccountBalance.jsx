import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    line-height: 3rem;
    display: inline-block;
`;

const Balance = styled.div`
    min-width: 250px;
    margin: 0.5rem 0 0 2.5rem;
    font-size: 1.5rem;
    vertical-align: middle;
    text-align: left;
`;

const Button = styled.button`
    margin: 0 8px;
`; 

const BalanceToggleButton = styled(Button)`
    width: 150px;
`;

var formatter = Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'USD'
});

export default function AccountBalance(props) {

    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    let content = null;
    const buttonClass = 'btn ' + (props.showBalance ? 'btn-warning' : 'btn-info');
    if (props.showBalance) {
        content = <>{formatter.format(props.amount)}</>;
    }
    return (
        <>
        <Balance>{content}</Balance>
        <Section>
            <BalanceToggleButton onClick={props.handleBalanceVisibilityChange}
                    className={buttonClass}>
                    {buttonText}
            </BalanceToggleButton>
            <Button className="btn btn-success">
                <i className="fas fa-helicopter"></i>
            </Button>
        </Section>
        </>
    );
}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
};
