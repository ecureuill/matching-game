import arrowdown from '../../images/arrowDown.png'

type ArrowDownProps = {
	player: 1 | 2
}

const ArrowDown = ({player = 1}: ArrowDownProps): JSX.Element => {
	return (
		<img className={`arrow-down player-${player}`} src={arrowdown} alt="" />
	);
}

export default ArrowDown;