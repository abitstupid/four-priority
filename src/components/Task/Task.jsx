import PropTypes from "prop-types";
import styles from "./Task.module.scss";
import { Fragment, useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import DeleteBtn from "./DeleteBtn/DeleteBtn";
import EditBtn from "./EditBtn/EditBtn";
import Button from "../Buttons/Button";
import ButtonWrapper from "../Buttons/ButtonWrapper";
import { useLocation } from "react-router-dom";

const checkedAudioPath = "./assets/audio/task-completed-audio.wav";
const unCheckedAudioPath = "./assets/audio/unCheck-audio.wav";

function Task({ taskArr, cardId, showButtons = false }) {
	const appContextData = useContext(AppContext);
	const location = useLocation();
	const pathName = location.pathname;
	const [editingTaskId, setEditingTaskId] = useState(null);
	const [newTaskText, setNewTaskText] = useState("");
	const [checkedAudio, setCheckedAudio] = useState(null);
	const [unCheckedAudio, setUnCheckedAudio] = useState(null);

	useEffect(() => {
		// Preload the audio files
		const checkedAudio = new Audio(checkedAudioPath);
		const unCheckedAudio = new Audio(unCheckedAudioPath);
		setCheckedAudio(checkedAudio);
		setUnCheckedAudio(unCheckedAudio);
	}, []);

	function handleEditTaskBtn(task) {
		setEditingTaskId(task.id);
		setNewTaskText(task.taskName);
	}

	function handleSaveTask(taskId) {
		appContextData.handleUpdateTask(cardId, taskId, newTaskText);
		setEditingTaskId(null);
		setNewTaskText("");
	}

	const handleCancelEdit = () => {
		setEditingTaskId(null);
		setNewTaskText("");
	};

	const playSound = (audio) => {
		if (audio) {
			audio.play();
		}
		return;
	};

	function handleCheckboxChange(cardId, taskId, completed) {
		appContextData.handleTaskCheckbox(cardId, taskId);

		// passing the value before the checkbox is updated
		if (!completed) {
			playSound(checkedAudio);
		} else {
			playSound(unCheckedAudio);
		}
	}

	return (
		<div className={`${styles.taskWrapper} primaryFont`}>
			{taskArr.length === 0 ? (
				<p>No task to show</p>
			) : (
				<ul className={`${styles.tasks} flex column`}>
					{taskArr.map((task) => {
						return (
							<Fragment key={task.id}>
								<div
									className={`${styles.taskWrapper} flex column`}
								>
									<div className={`${styles.task} flex`}>
										{editingTaskId !== task.id && (
											<div
												className={`${styles.checkboxWrapper}`}
											>
												<input
													className={`${styles.taskCheckbox}`}
													type="checkbox"
													checked={task.completed}
													onChange={() =>
														handleCheckboxChange(
															cardId,
															task.id,
															task.completed
														)
													}
												/>
												<label
													className={`${styles.label}`}
												>
													<svg
														width="20"
														height="20"
														viewBox="0 0 100 100"
													>
														<rect
															xmlns="http://www.w3.org/2000/svg"
															x="3"
															y="3"
															width="90"
															height="90"
															rx="20"
															ry="20"
															fill="none"
															stroke="#1E1E1E"
															strokeWidth="10"
														/>
														<g transform="translate(0,-952.36222)">
															<path
																d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
																stroke="black"
																strokeWidth="6"
																fill="none"
																className={`${styles.path1}`}
															></path>
														</g>
													</svg>
												</label>
											</div>
										)}

										{editingTaskId === task.id ? (
											<article
												className={`${styles.taskEditingWrapper}`}
											>
												<input
													className={`${styles.editTaskInput} marginBottomSmall`}
													type="text"
													value={newTaskText}
													onChange={(e) =>
														setNewTaskText(
															e.target.value
														)
													}
												/>

												<ButtonWrapper>
													<Button
														type="rect"
														variant="secondary"
														size={50}
														onClick={() =>
															handleSaveTask(
																task.id
															)
														}
														text={"Update"}
													/>

													<Button
														type="rect"
														variant="primary"
														size={50}
														onClick={
															handleCancelEdit
														}
														text={"Cancel"}
													/>
												</ButtonWrapper>
											</article>
										) : (
											<li
												className={`${styles.taskListItem}`}
											>
												{task.taskName}
											</li>
										)}
									</div>

									{editingTaskId === null &&
										((pathName !== "/app" &&
											pathName !== "/how") ||
											showButtons) && (
											<div
												className={`${styles.changesBtnWrapper} flex`}
											>
												<DeleteBtn
													onClick={() =>
														appContextData.handleTaskDeleteBtn(
															cardId,
															task.id
														)
													}
												/>
												<EditBtn
													onClick={() =>
														handleEditTaskBtn(task)
													}
												/>
											</div>
										)}
								</div>
							</Fragment>
						);
					})}
				</ul>
			)}
		</div>
	);
}

Task.propTypes = {
	taskArr: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			task: PropTypes.string,
			completed: PropTypes.bool,
		})
	).isRequired,
	cardId: PropTypes.number.isRequired,
	showButtons: PropTypes.bool,
};

export default Task;
