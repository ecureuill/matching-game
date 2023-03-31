import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { CardType, ICardStates } from '../../types';
import './styles.css';

type GameCardProps = {
	id: string,
	index: number,
	role: string, 
	statusRef: React.RefObject<HTMLSpanElement>
 };

const GameCard = ( {card, id, flipped, matching, index, role, statusRef}: GameCardProps & ICardStates): JSX.Element => {
	
	const { deck, setFlipped, getFlipped, gameStatus } = useContext(GameContext);
	const [ disabled, setDisabled ] = useState(false);

	const onClick = () => {
		setFlipped(id);
		(statusRef.current! as HTMLSpanElement).innerText= `Virou a carta ${card.name}`;
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
					disabled={disabled || getFlipped(id)} 	/*don´t allow new moviments while gameStatus is waiting*/
															/*don´t allow tab through flipped cards*/
					className={`flip-card card-game -back`}
					onClick={() => onClick()}
					aria-label={`carta ${index+1}`}
				 	aria-describedby={`btn-${index}-description`}
				 	data-index={index+1}
				>
					<span id={`btn-${index}-description`} className='visually-hidden'>Vire a carta</span>
					<img src={deck.back.image} alt={''}/>
				</button>
				<div 
					className={`flip-card card-game -front`}
					data-matching={matching === undefined? '': matching? '✔': '✖'}
				>
					<img src={card.image} alt={`card ${card.name}`}/>
				</div>
			</div>
		</div>
		</>
	);
}

export default GameCard;