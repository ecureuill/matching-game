export type DeckType = {
	back: {
		image: string;
	},
	front: CardType[]
}

export type CardType = {
	name: string;
	image: string;
}

export interface ICardStates {
	id: string,
	card: CardType,
	flipped: boolean,
	matching: boolean | undefined
}

export type GameContextType = {
	matchStatus:boolean | undefined;
	gameStatus: 'in progress' | 'finished' | 'waiting',
	score: {1:number, 2:number},
	currentPlayer: 1 | 2;
	lastFlippedCard: string | undefined,
	cards: Array<ICardStates>,
	deck: DeckType,
	init: (deck: DeckType) => void,
	setFlipped: (id: string) => void,
	getFlipped: (id: string) => boolean
	restart: () => void
}
