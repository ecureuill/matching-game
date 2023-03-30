import { useContext } from 'react';
import ArrowDown from '../../components/ArowDown';
import ScoreMeter from '../../components/ScoreMeter';
import { GameContext } from '../../contexts/GameContext';
import Text from '../Text';
import './styles.css';

const ScoreBoard = (): JSX.Element => {
	const { currentPlayer, deck, score} = useContext(GameContext)

	return (
		<header className='score-board'>
			<ArrowDown player={currentPlayer} />
			<ScoreMeter score={score[1]} totalScore={deck.front.length} ariaLabelledBy='player-1'/>
			<Text id='abacaxi' type='body'>Player 1</Text>
			<Text type='label'>vs</Text>
			<Text id='player-2'  type='body'>Player 2</Text>
			<ScoreMeter score={score[2]} totalScore={deck.front.length} ariaLabelledBy='player-2'/>
	
			<div role='status' aria-atomic='true' aria-live='assertive' className='visually-hidden'>
				<span>{score[1]} pontos para o Jogador 1</span>
			</div>
			<div role='status' aria-atomic='true' aria-live='assertive' className='visually-hidden'>
				<span>{score[2]} pontos para o Jogador 2</span>
			</div>
		</header>
	);
}

export default ScoreBoard;