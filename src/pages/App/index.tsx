import './styles.css';
import deckJson from '../../data/decks.json'
import ScoreBoard from '../../components/ScoreBoard';
import GameBoard from '../../components/GameBoard';
import { DeckType } from '../../types';
import { GameContext } from '../../contexts/GameContext';
import { useContext, useEffect } from 'react';

type AppProps = {

};

const App = ( props: AppProps): JSX.Element => {
	
	let deck: DeckType = deckJson;
	const { init } = useContext(GameContext);
	
	useEffect(() => {
		init(deck as DeckType)
	}, []);

	
	return (
		<>
			<ScoreBoard />
			<main>
				<GameBoard />
			</main>
		</>
	);
}

export default App;