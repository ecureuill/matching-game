import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { CardType, ICardStates } from '../../types';
import './styles.css';

type GameCardProps = {
	id: string,
	index: number,
	role: string
 };

const GameCard = ( {card, id, flipped, matching, index, role}: GameCardProps & ICardStates): JSX.Element => {
	
	const { deck, setFlipped, getFlipped, gameStatus } = useContext(GameContext);
	const [ disabled, setDisabled ] = useState(false);

	const onClick = () => {
		setFlipped(id)
	}

	useEffect(() => {
		if(!getFlipped(id))
			setDisabled(gameStatus==='waiting');
	}, [gameStatus])

	return (
		<>
		<div role={role} className={`flip-card-wrapper ${getFlipped(id)? '-flipped': ''}  matching-${matching}`}>
			<div className="flip-card-inner">
				<button
					disabled={disabled} /*don´t allow new moviments while gameStatus is waiting*/
					tabIndex={getFlipped(id)? -1 : 0} /*don´t allow tab through flipped cards*/
					className={`flip-card card-game -back`}
					onClick={() => onClick()}
					aria-label={`carta ${index+1}`}
				>
					<img src={deck.back.image} alt={''}/>
				</button>
				<div className={`flip-card card-game -front`} >
					<img src={card.image} alt={`card ${card.name}`}/>
				</div>
			</div>
		</div>
		<div role='status' aria-live='assertive' className='visually-hidden'>
			{getFlipped(id) && <span>Virou a carta {card.name}</span>}
		</div>
		</>
	);
}

export default GameCard;