import PropTypes from "prop-types";
import styles from "./AddTaskBtn.module.scss";
import AddTask from "../AddTask/AddTask";
import Button from "../Buttons/Button";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

function AddTaskBtn({ locationId, posX, posY }) {
	const [showAddTaskModal, setShowAddTaskModal] = useState(false);

	function handleAddTaskModal() {
		setShowAddTaskModal((prev) => !prev);
	}

	return (
		<>
			<div
				className={`${styles.addTaskBtn}`}
				style={{ bottom: posY, right: posX }}
			>
				<Button
					variant="secondary"
					type={"custom"}
					size={52}
					onClick={handleAddTaskModal}
				>
					<FaPlus className="iconSizeSmall" />
				</Button>
			</div>

			{showAddTaskModal && (
				<AddTask
					onCancel={handleAddTaskModal}
					locationId={locationId}
				/>
			)}
		</>
	);
}

AddTaskBtn.propTypes = {
	locationId: PropTypes.number.isRequired,
	posX: PropTypes.string.isRequired,
	posY: PropTypes.string.isRequired,
};

export default AddTaskBtn;
