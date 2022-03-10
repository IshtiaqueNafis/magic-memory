import React from 'react';
import PropTypes from 'prop-types';

const SingleCard = ({card, handleChoice, flipped,disabled}) => {
    const handleClick = () => {
        if(!disabled){
        handleChoice(card)
        }
    }
    return (
        <div className={'card'}>
            <div className={flipped?"flipped":''}>
                <img src={card.src} className={'front'} alt="card-front"/>
                <img src="/img/cover.png" className={'back'} onClick={handleClick} alt="card-back"/>

            </div>
        </div>
    );
};
SingleCard.prototype = {
    card: PropTypes.object.isRequired
}

export default SingleCard;
