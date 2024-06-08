import PriorityCard from "../../components/PriorityCard/PriorityCard";
import PropTypes from "prop-types";
import styles from "./todo.module.scss";
import { TbListCheck } from "react-icons/tb";
import BottomNav from "../../components/BottomNav/BottomNav";
import TopNav from "../../components/TopNav/TopNav";
import Button from "../../components/Buttons/Button";
import { useEffect, useState } from "react";
import AllTasks from "../../components/AllTasks/AllTasks";
import AddTaskBtn from "../../components/AddTaskBtn/AddTaskBtn";
import Loading from "../../components/Loading/Loading";
import data from "./../../data.json";

export default function Todo({ cardsData }) {
	const [isLoading, setIsLoading] = useState(true);
	const [cardsDataState, setCardsDataState] = useState(cardsData);
	const [showAllTasks, setShowAllTasks] = useState(false);

	// LOADING
	useEffect(() => {
		const firstVisit = localStorage.getItem("firstVisit");

		if (!firstVisit) {
			setTimeout(() => {
				setIsLoading(false);
				localStorage.setItem("firstVisit", "true");
			}, 3500);
		} else {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		setCardsDataState(cardsData);
	}, [cardsData]);

	const TODO_CARD_ID = data.cardIds.TODO_CARD_ID;

	function handleHomeModals() {
		setShowAllTasks((prev) => !prev);
	}

	return isLoading ? (
		<Loading />
	) : (
		<>
			<TopNav cardId={TODO_CARD_ID} />
			{/* Bottom Nav */}
			<BottomNav />
			<div className={`${styles.homeWrapper}`}>
				<PriorityCard cardsData={cardsDataState} />

				{/* SHOW ALL TASKS */}
				<div className={`${styles.allTaskBtn} `}>
					<Button
						variant="primary"
						type="custom"
						size={52}
						onClick={handleHomeModals}
					>
						<TbListCheck className="iconSizeSmall" />
					</Button>
				</div>
				{showAllTasks && (
					<AllTasks
						locationId={TODO_CARD_ID}
						cardsData={cardsData}
						onCancel={handleHomeModals}
					/>
				)}

				{/* ADD TASKS BTN */}
				<AddTaskBtn
					locationId={TODO_CARD_ID}
					posX={"1.5rem"}
					posY={"6rem"}
				/>
			</div>
		</>
	);
}

Todo.propTypes = {
	cardsData: PropTypes.array.isRequired,
};
