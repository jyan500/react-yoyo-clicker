import React, {useEffect, useState} from 'react';
import './App.css';

const App = () => {
	const [positiveClicks, setPositiveClicks] = useState(0)	
	const [negativeClicks, setNegativeClicks] = useState(0)
	return (
		<div className="flex flex-col justify-center items-center p-4">
			<div className = "text-center p-2">
			    <h1>Yoyo Clicker</h1>
				<p>Press "F" for positive clicks, "D" for negative clicks. Click the "Reset" button to reset the scores, and "Input Score" to save the competitor name, freestyle and your scores. </p>
			</div>
			<div className = "flex flex-row p-2">
				<div className = "flex flex-col justify-center items-center p-2">
					<h1>Positive Clicks</h1>	
					<div>+{positiveClicks}</div>
				</div>
				<div className = "flex flex-col justify-center items-center p-2">
					<h1>Negative Clicks</h1>
					<div>-{negativeClicks}</div>
				</div>
			</div>
		</div>
	);
}

export default App;
