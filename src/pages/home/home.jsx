import PriorityCardLink from "../../components/PriorityCard/PriorityCardLink";
import PropTypes from "prop-types";
import styles from "./home.module.scss";
import { TbListCheck } from "react-icons/tb";
import BottomNav from "../../components/BottomNav/BottomNav";
import TopNav from "../../components/TopNav/TopNav";
import Button from "../../components/Buttons/Button";
import { useEffect, useState } from "react";
import AllTasks from "../../components/AllTasks/AllTasks";
import AddTaskBtn from "../../components/AddTaskBtn/AddTaskBtn";

export default function Home({ cardsData }) {
	const [cardsDataState, setCardsDataState] = useState(cardsData);
	const [showAllTasks, setShowAllTasks] = useState(false);

	useEffect(() => {
		setCardsDataState(cardsData);
	}, [cardsData]);

	const HOME_CARD_ID = 99;

	function handleHomeModals() {
		setShowAllTasks((prev) => !prev);
	}

	return (
		<>
			<TopNav cardId={HOME_CARD_ID} />
			{/* Bottom Nav */}
			<BottomNav />
			<PriorityCardLink cardsData={cardsDataState} />

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
					locationId={HOME_CARD_ID}
					cardsData={cardsData}
					onCancel={handleHomeModals}
				/>
			)}

			{/* ADD TASKS BTN */}
			<AddTaskBtn
				locationId={HOME_CARD_ID}
				posX={"1.5rem"}
				posY={"6rem"}
			/>
		</>
	);
}

Home.propTypes = {
	cardsData: PropTypes.array.isRequired,
};
