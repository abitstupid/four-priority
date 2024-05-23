import { useLocation } from "react-router-dom";
import styles from "./priorityPage.module.scss";
import { Fragment, useContext } from "react";
import AppContext from "../../AppContext";
import Task from "../../components/Task/Task";
import TopNav from "../../components/TopNav/TopNav";
import BottomNav from "../../components/BottomNav/BottomNav";
import AddTaskBtn from "../../components/AddTaskBtn/AddTaskBtn";

export default function PriorityPage() {
	const location = useLocation();
	const appContextData = useContext(AppContext);

	const searchParams = new URLSearchParams(location.search);
	const fetchedCardId = Number(searchParams.get("id"));
	return (
		<div className={`${styles.priorityPageWrapper}`}>
			<TopNav cardId={fetchedCardId} />
			<BottomNav />

			<div className={`${styles.priorityPageContent}`}>
				{appContextData.cardsDataContext.map((card) => {
					if (fetchedCardId == card.id) {
						return (
							<Fragment key={card.id}>
								<h2 className="marginTopMedium marginBottomMedium">
									{card.heading}
								</h2>
								<Task
									taskArr={card.content}
									cardId={card.id}
								/>
								<AddTaskBtn
									type="square"
									locationId={card.id}
									posX={"1.5rem"}
									posY={"6rem"}
								/>
							</Fragment>
						);
					}
					return null;
				})}
			</div>
		</div>
	);
}
