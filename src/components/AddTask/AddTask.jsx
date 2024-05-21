import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./AddTask.module.scss";
import AppContext from "../../AppContext";
import CustomSelect from "../Form/CustomSelect/CustomSelect";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { autoResizeTextarea } from "../../utility/utility";
import Button from "../Buttons/Button";
import ButtonWrapper from "../Buttons/ButtonWrapper";

export default function AddTask({ onCancel, locationId }) {
	const appContextData = useContext(AppContext);

	const filteredOptions = appContextData.DATA.selectOptions.filter(
		(option) => option.id === locationId
	);

	const initValue =
		filteredOptions.length === 0
			? appContextData.DATA.selectOptions[0]
			: filteredOptions[0];

	const [value, setValue] = useState(initValue);
	const [taskInput, setTaskInput] = useState("");
	const taskTitleInputRef = useRef(null);
	useLockBodyScroll();

	useEffect(() => {
		autoResizeTextarea("input");
		const textareaRef = taskTitleInputRef.current;
		const handleNewLine = (e) => {
			if (e.code === "Enter" || e.keyCode === 13) {
				e.preventDefault();
			}
		};
		textareaRef.addEventListener("keydown", handleNewLine);
	}, []);

	function handleAddTaskClick() {
		if (taskInput.trim().length < 5) {
			alert("Please write more than 5 characters");
		} else {
			appContextData.handleAddTaskBtn(value.id, taskInput);
			onCancel();
		}
	}

	return (
		<section className={`${styles.addTaskWrapper} center primaryFont`}>
			<div className={`${styles.addTask}`}>
				<p className={`${styles.taskTitle} marginBottomSmall `}>
					Write your Task
				</p>
				<textarea
					tabIndex={1}
					ref={taskTitleInputRef}
					name={`${styles.taskTitleInput}`}
					className={`${styles.taskTitleInput} `}
					maxLength={900}
					placeholder="Write your task here..."
					value={taskInput}
					onChange={(e) => {
						setTaskInput(e.target.value);
					}}
				></textarea>

				<p className={`${styles.taskPriority} marginBottomSmall `}>
					Choose Priority
				</p>
				<article className="marginBottomMedium">
					<CustomSelect
						locationId={locationId}
						options={appContextData.DATA.selectOptions}
						value={value}
						onChange={(option) => setValue(option)}
					/>
				</article>
				{/* buttons */}
				<ButtonWrapper>
					<Button
						variant={"primary"}
						type={"rect"}
						size={40}
						text={"Cancel"}
						onClick={onCancel}
					/>

					<Button
						variant={"secondary"}
						type={"rect"}
						size={60}
						text={"Add Task"}
						onClick={handleAddTaskClick}
					/>
				</ButtonWrapper>
			</div>
		</section>
	);
}

AddTask.propTypes = {
	onCancel: PropTypes.func.isRequired,
	locationId: PropTypes.number.isRequired,
};
