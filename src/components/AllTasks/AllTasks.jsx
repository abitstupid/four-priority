import PropTypes from "prop-types";
import styles from "./AllTasks.module.scss";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { Fragment } from "react";
import Task from "../Task/Task";
import { IoClose } from "react-icons/io5";
import Button from "../Buttons/Button";
import AddTaskBtn from "../AddTaskBtn/AddTaskBtn";

function AllTasks({ cardsData, onCancel, locationId }) {
	useLockBodyScroll();

	function handleAllTaskCloseBtn() {
		onCancel();
	}
	return (
		<div className={`${styles.allTaskWrapper} primaryFont`}>
			<div className={`${styles.allTask}`}>
				<p
					className={`${styles.allTaskHeading} primaryFontMedium marginBottomMedium`}
				>
					All Tasks
				</p>
				{cardsData.map((card) => {
					return (
						<Fragment key={card.id}>
							<article
								className={`${styles.tasksWrapper} marginBottomMedium`}
							>
								<p
									className={`${styles.priorityHeading} primaryFontMedium marginBottomVerySmall`}
								>
									{card.heading}
								</p>
								<Task
									taskArr={card.content}
									cardId={card.id}
									showButtons={true}
								/>
							</article>
						</Fragment>
					);
				})}
				<div className={`${styles.allTaskCloseBtn}`}>
					<Button
						variant="primary"
						type="squareLarge"
						onClick={handleAllTaskCloseBtn}
					>
						<IoClose className="iconSize" />
					</Button>
				</div>
			</div>
			<AddTaskBtn
				locationId={locationId}
				posX="1.5rem"
				posY={"6rem"}
			/>
		</div>
	);
}

AllTasks.propTypes = {
	locationId: PropTypes.number.isRequired,
	cardsData: PropTypes.array.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default AllTasks;
