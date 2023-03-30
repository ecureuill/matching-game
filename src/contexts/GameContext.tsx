import { useState, createContext, FC, PropsWithChildren } from 'react';
import { CardType, GameContextType, ICardStates, DeckType } from '../types';
import { shuffle } from '../utils';

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider: FC<PropsWithChildren> = ({children}) => {

	const deckDefault: DeckType = {
		back: {
			image: ""
		},
		front: []
	}

	const [score, setScore] = useState<{1: number, 2: number}>({1:0, 2:0})
	const [currentPlayer, setCurrentPlayer] = useState<1|2>(1);
	const [lastFlippedCard, setLastFlippedCard] = useState<string|undefined>(undefined)
	const [cards, setCards] = useState<Array<ICardStates>>([]);
	const [deck, setDeck] = useState<DeckType>(deckDefault);
	const [gameStatus, setGameStatus] = useState<'in progress'| 'finished' | 'waiting'>('in progress');
	const [matchStatus, setMatchStatus] = useState<boolean|undefined>(undefined);
	const checkMatching = (card: string) => {
		if(lastFlippedCard === undefined)
			return undefined
		else 
			return lastFlippedCard === card;
	}

	const init = (deck: DeckType) => {
		let newCards: CardType[] = [];
		
		deck.front.map((item, index) => {
			newCards = [item, item, ...newCards]
		})


		setDeck(deck);

		setCards( 
			shuffle(
				newCards.reduce<Array<ICardStates>>((acc: ICardStates[], current: CardType, index: number) => {
					return [...acc,
							{
								card: current,
								flipped: false,
								matching: undefined,
								id: `${current.name}${index}`
							}] as ICardStates[]
					}, [] as ICardStates[])
			) 
		);
	}

	const setNewMatchRound = () => {
		setTimeout( () => {
			let flippedNonMatchingCards = cards.filter(item => item.matching === false);

			if(flippedNonMatchingCards.length > 0)
			{
				setCurrentPlayer(currentPlayer === 1? 2 : 1);

				flippedNonMatchingCards[0].flipped = false;
				flippedNonMatchingCards[0].matching = undefined;


				flippedNonMatchingCards[1].flipped = false;
				flippedNonMatchingCards[1].matching = undefined;

				cards[cards.indexOf(flippedNonMatchingCards[0])] = flippedNonMatchingCards[0];
				cards[cards.indexOf(flippedNonMatchingCards[1])] = flippedNonMatchingCards[1];

				setCards(cards);

				setMatchStatus(undefined);

				setGameStatus('in progress');
			}
		}, 3000)
	}

	const restart = () => {
		setScore({1:0, 2:0})
		setCurrentPlayer(1);
		setLastFlippedCard(undefined);

		setCards( 
			shuffle(
				cards.reduce<Array<ICardStates>>((acc: ICardStates[], current: ICardStates, index: number) => {
					console.debug(current)
					return [...acc,
							{
								...current,
								flipped: false,
								matching: undefined,
							}] as ICardStates[]
					}, [] as ICardStates[])
			) 
		);

		setGameStatus('in progress')
	}

	const setFlipped = (id: string) => {
		setGameStatus('waiting');
		let index = cards.findIndex( item => item.id === id);
		cards[index].flipped = !cards[index].flipped 
		
		cards[index].matching = checkMatching(cards[index].card.name);
		setMatchStatus(cards[index].matching);

		setCards([
			...cards.slice(0, index),
			cards[index],
			...cards.slice(index+1),
		])

		if(cards[index].matching === undefined){
			//first card flipped
				setLastFlippedCard(cards[index].card.name);
				setGameStatus('in progress');
		}
		else{
		        setTimeout(() => {
					updatePreviousFlippedCardMatchingStatus(!!cards[index].matching);
				}, 400)

				if(cards[index].matching)
				{
					setScore({
						...score,
						[currentPlayer]: score[currentPlayer] + 1
					})
					setGameStatus('in progress');

					setTimeout(() => {
						if(cards.every(item => item.matching === true))
							setGameStatus('finished');
					}, 1400)
				}
				else {
					setNewMatchRound();
				}

				setLastFlippedCard(undefined);
		}
	}
	
    const updatePreviousFlippedCardMatchingStatus = (matching: boolean) => {
        let previousFlippedCard = cards.find(item => item.flipped && item.matching === undefined);
        let index = cards.indexOf(previousFlippedCard!);

            previousFlippedCard!.matching = matching;

            setCards([
                ...cards.slice(0, index),
                previousFlippedCard!,
                ...cards.slice(index + 1),
            ]);
    }
	
	const getFlipped = (id: string) => {
		let index = cards.findIndex( item => item.id === id);
		return cards[index].flipped
	}

	return (
		<GameContext.Provider value={{gameStatus, matchStatus, deck, cards, currentPlayer, lastFlippedCard, score, init, restart, setFlipped, getFlipped}}>
			{children}
		</GameContext.Provider>
	);
}