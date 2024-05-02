import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./global.scss";
import PriorityCardLink from "./components/PriorityCard/PriorityCardLink";
import TipTap from "./components/TipTap/TipTap";
import data from "./data.json";

const PRIORTY_CARDS = data.PRIORITY_CARDS;

function App() {
	const [cardsData, setCardsData] = useState(PRIORTY_CARDS);

	function handleCardsDataUpdate(content, id) {
		const updatedCardsData = cardsData.map((card) => {
			if (id == card.id) {
				return { ...card, content: content };
			}
			return card;
		});
		setCardsData(updatedCardsData);
	}

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={<PriorityCardLink cardsData={cardsData} />}
				/>
				<Route
					index
					element={<PriorityCardLink cardsData={cardsData} />}
				/>
				<Route
					path="/editor"
					element={
						<TipTap
							cardsData={cardsData}
							handleCardsDataUpdate={handleCardsDataUpdate}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
