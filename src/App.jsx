import { useEffect, useState } from "react";
import TipTap from "./components/TipTap/TipTap";
import { Routes, Route } from "react-router-dom";

import data from "./data.json";
import "./global.scss";
import "./App.css";
import Home from "./pages/home/home";

const PRIORTY_CARDS = data.PRIORITY_CARDS;
const APP_TITLE = data.appTitle;

function App() {
	const [cardsData, setCardsData] = useState(() => {
		const savedData = localStorage.getItem("preSavedData");
		return savedData ? JSON.parse(savedData) : PRIORTY_CARDS;
	});

	useEffect(() => {
		localStorage.setItem("preSavedData", JSON.stringify(cardsData));
	}, [cardsData]);

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
					element={
						<Home
							cardsData={cardsData}
							appTitle={APP_TITLE}
						/>
					}
				/>
				<Route
					index
					element={
						<Home
							cardsData={cardsData}
							appTitle={APP_TITLE}
						/>
					}
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
