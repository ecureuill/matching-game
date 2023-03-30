import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../contexts/GameContext';
import Diaolog from '../../components/Diaolog';
import Text from '../Text';
import archievement from '../../images/archievement.png';
import './styles.css';

// Declaring type of props - see "Typing Component Props" for more examples
type GameEndProps = {

}; /* use `interface` if exporting so that consumers can extend */

const GameEnd = ( props: GameEndProps): JSX.Element => {
	const { gameStatus, score, restart } = useContext(GameContext);
	const [ showDialog, setShowDialog ] = useState(gameStatus === 'finished')
	
	useEffect(() => {
		setShowDialog(gameStatus === 'finished')
	}, [gameStatus])


	return (
		<Diaolog open={showDialog} onClose={() => setShowDialog(false)} aria-describedby='game-end-description' aria-label='fim do jogo'>
			<div  className="game-end" id='game-end-description'>
				{
					score[1] === score[2]? <GameDraw />
					: <GameWinner winner={score[1] > score[2]? 'Jogador 1': 'Jogador 2'}/>
				}
			</div>
			<button className='game-end-button' onClick={() => restart()}>Restart</button>
		</Diaolog>
	);
}

const GameDraw = () => {
	return (
		<span>Empate</span>
	);
}

type GameWinnerProps = {
	winner: string
}
const GameWinner = ({winner}: GameWinnerProps) => {

	return (
		<>
		<Text className='game-winner' type='subtitle'>
			{winner}
		</Text>
		<Text className='game-winner' type='title'>
			Vencedor!!!
		</Text>
		<img src={archievement} alt=''/>
		</>
	);	
}

export default GameEnd;