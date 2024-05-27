import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import data from "./data.json";
import "./global.scss";
import "./App.css";
import Home from "./pages/home/home";
import Features from "./pages/features/features";
import AppContext from "./AppContext";
import PriorityPage from "./pages/priorityPage/priorityPage";
import NotFound from "./pages/notFound/notFound";
import HomeWebsite from "./website/pages/homeWebsite/homeWebsite";
import WhatWebsite from "./website/pages/whatWebsite/whatWebsite";
import WhyWebsite from "./website/pages/whyWebsite/whyWebsite";
import HowWebsite from "./website/pages/howWebsite/howWebsite";
import WhoWebsite from "./website/pages/whoWebsite/whoWebsite";

const DATA = data;
const DATA_VERSION = DATA.version;
// ALL TASKS ARE MANAGED BY STATE cardData , everything else is passed through DATA.anything

function App() {
	const [cardsData, setCardsData] = useState(() => {
		const savedData = localStorage.getItem("preSavedData");
		const savedVersion = localStorage.getItem("dataVersion");

		if (savedData && JSON.parse(savedVersion) === DATA_VERSION) {
			return JSON.parse(savedData);
		}

		// If no saved data or version mismatch, use default data
		localStorage.setItem(
			"preSavedData",
			JSON.stringify(DATA.PRIORITY_CARDS)
		);
		localStorage.setItem("dataVersion", JSON.stringify(DATA_VERSION));
		return DATA.PRIORITY_CARDS;
	});

	useEffect(() => {
		localStorage.setItem("preSavedData", JSON.stringify(cardsData));
	}, [cardsData]);

	function handleAddTaskBtn(optionId, taskContent) {
		const updatedCardsData = cardsData.map((card) => {
			if (card.id == optionId) {
				const newTaskId =
					card.content.length > 0
						? card.content[card.content.length - 1].id + 1
						: 1;
				return {
					...card,
					content: [
						...card.content,
						{
							id: newTaskId,
							taskName: taskContent,
							completed: false,
						},
					],
				};
			}
			return card;
		});
		setCardsData(updatedCardsData);
	}

	function handleTaskDeleteBtn(cardId, taskId) {
		const updatedCardsData = cardsData.map((card) => {
			if (cardId === card.id) {
				return {
					...card,
					content: card.content.filter((task) => {
						return task.id !== taskId;
					}),
				};
			}
			return card;
		});
		setCardsData(updatedCardsData);
	}

	function handleTaskCheckbox(cardId, taskId) {
		const updatedCardsData = cardsData.map((card) => {
			if (cardId === card.id) {
				return {
					...card,
					content: card.content.map((task) => {
						if (taskId === task.id) {
							return { ...task, completed: !task.completed };
						}
						return task;
					}),
				};
			}
			return card;
		});
		setCardsData(updatedCardsData);
	}

	const handleUpdateTask = (cardId, taskId, newText) => {
		const updatedCardsData = cardsData.map((card) => {
			if (card.id === cardId) {
				return {
					...card,
					content: card.content.map((task) => {
						if (task.id === taskId) {
							return { ...task, taskName: newText };
						}
						return task;
					}),
				};
			}
			return card;
		});
		setCardsData(updatedCardsData);
	};

	return (
		<AppContext.Provider
			value={{
				DATA,
				cardsData,
				handleTaskCheckbox,
				handleTaskDeleteBtn,
				handleAddTaskBtn,
				handleUpdateTask,
			}}
		>
			<div className="App">
				<Routes>
					<Route
						index
						element={<HomeWebsite />}
					/>

					<Route
						path="/"
						element={<HomeWebsite />}
					/>

					<Route
						path="/app"
						element={
							<Home
								cardsData={cardsData}
								appTitle={DATA.APP_TITLE}
							/>
						}
					/>

					<Route
						path="/features"
						element={<Features />}
					/>

					<Route
						path="/priorityPage"
						element={<PriorityPage />}
					/>
					<Route
						path="/what"
						element={<WhatWebsite />}
					/>
					<Route
						path="/why"
						element={<WhyWebsite />}
					/>
					<Route
						path="/how"
						element={<HowWebsite />}
					/>
					<Route
						path="/who"
						element={<WhoWebsite />}
					/>
					<Route
						path="*"
						element={<NotFound />}
					/>
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
