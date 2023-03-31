import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import { GameContext } from '../../contexts/GameContext';
import GameCard from '../GameCard';
import GameEnd from '../GameEnd';
import './styles.css';

type GameBoardProps = {
	columns?: number
};

const GameBoard = ( {columns = 4}: GameBoardProps): JSX.Element => {
	const style = { "--spacing-columns": columns} as React.CSSProperties;
	const statusRef = useRef<HTMLSpanElement>(null);

	const { cards, currentPlayer, matchStatus, score } = useContext(GameContext);

	return (
		<>
		<div role={'grid'} >
			<div role={'row'} style={style} className='game-board'>
			{
				cards.map((item, index) => 
					<GameCard role={'gridcell'} key={item.id} index={index} {...item} statusRef={statusRef} />
				)
			}
			</div>
		</div>
		<div role='status' aria-atomic='true' aria-live='assertive' className='visually-hidden'>
			<span>É a vez do Jogador {currentPlayer}</span>
		</div>
		<div role='status' aria-atomic='true' aria-live='assertive' className='visually-hidden'>
			{matchStatus!==undefined && matchStatus === true &&	<span>Um par!</span>}
			{matchStatus!==undefined && matchStatus === false &&	<span>Não é um par!</span>}
		</div>
		<div role='status' aria-atomic='true' aria-live='assertive' className='visually-hidden'>
			<span ref={statusRef}></span>
		</div>
		<GameEnd />
		</>
	);
}

export default GameBoard;