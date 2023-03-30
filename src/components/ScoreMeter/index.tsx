import './styles.css';

type ScoreMeterProps = {
	score: number, 
	totalScore: number
	ariaLabelledBy: string
};

const ScoreMeter = ( {score, totalScore, ariaLabelledBy}: ScoreMeterProps): JSX.Element => {
	
	const scores = new Array(totalScore);
	scores.fill('', 0, totalScore)
	scores.fill('-active', 0, score)
	return (
		<div
			role='meter'
			aria-valuetext={`${score} pontos`}
			aria-valuenow={score}
			aria-valuemin={0}
			aria-valuemax={totalScore}
			className='game-score' 
			aria-label={ariaLabelledBy}>
			{scores.map((item, index) => 
				<div key={`game-score-${index}`} className={`score ${item}`} />
				)
			}
		</div>
	);
}

export default ScoreMeter;