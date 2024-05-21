import { useContext, useEffect, useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayBtn from "./PlayBtn/PlayBtn";
import PauseBtn from "./PauseBtn/PauseBtn";
import SettingsBtn from "./SettingsBtn/SettingsBtn";
import SettingsContext from "./Settings/SettingsContext";
import WarningModal from "../WarningModal/WarningModal";
import ResetBtn from "./ResetBtn/ResetBtn";
import styles from "./Pomodoro.module.scss";
import useWarningModal from "../../utility/useWarningModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// custom css for toast in global.scss

const primaryColor = "#1e1e1e";

export default function Pomodoro() {
	const settingsInfo = useContext(SettingsContext);

	const [isPaused, setIsPaused] = useState(true);
	const [secondsLeft, setSecondsLeft] = useState(0);
	const [mode, setMode] = useState("work"); //work //break//null

	const secondsLeftRef = useRef(secondsLeft);
	const isPausedRef = useRef(isPaused);
	const modeRef = useRef(mode);

	const { isVisible, showWarningModal, handleCancel, handleContinue } =
		useWarningModal();

	const isTimerEqualWork =
		secondsLeftRef.current === settingsInfo.workMinutes * 60;
	const isTimerEqualBreak =
		secondsLeftRef.current === settingsInfo.breakMinutes * 60;

	// TOAST FUNCTION
	// custom css in global.scss
	const notify = () =>
		toast.info(
			"Don't refresh or go to another page once timer starts or it'll Reset.",
			{
				className: "custom-toast-info",
				progressClassName: "custom-toast-info-progress-bar",
				iconClassName: "custom-toast-info .Toastify__toast-icon",
			}
		);

	// PLAY PAUSE
	function handleTimerPlayPause() {
		isPaused !== false ? notify() : "";
		setIsPaused(!isPaused);
		isPausedRef.current = !isPaused;
	}

	//SETTINGS
	function handleSettingsBtnClick() {
		setIsPaused(true);
		settingsInfo.setShowSettings(!settingsInfo.showSettings);
	}

	// RESET
	function handleTimerReset() {
		setIsPaused(true);
		isPausedRef.current = true;

		if (modeRef.current === "work") {
			setSecondsLeft(settingsInfo.workMinutes * 60);
			secondsLeftRef.current = settingsInfo.workMinutes * 60;
		} else if (modeRef.current === "break") {
			settingsInfo.breakMinutes * 60;
			secondsLeftRef.current = settingsInfo.breakMinutes * 60;
		}
	}

	// TIMER ACTIONS
	function tick() {
		secondsLeftRef.current--;
		setSecondsLeft(secondsLeftRef.current);
	}

	useEffect(() => {
		function switchMode() {
			const nextMode = modeRef.current === "work" ? "break" : "work";
			const nextSeconds =
				(nextMode === "work"
					? settingsInfo.workMinutes
					: settingsInfo.breakMinutes) * 60;

			setMode(nextMode);
			modeRef.current = nextMode;

			setSecondsLeft(nextSeconds);
			secondsLeftRef.current = nextSeconds;
		}

		// init timer
		secondsLeftRef.current = settingsInfo.workMinutes * 60;
		setSecondsLeft(secondsLeftRef.current);

		const interval = setInterval(() => {
			if (isPausedRef.current) {
				return;
			}

			if (mode === "break" && secondsLeftRef.current === 0) {
				setIsPaused(true);
				isPausedRef.current = true;
			}

			if (secondsLeftRef.current === 0) {
				return switchMode();
			}

			tick();
		}, 1000);

		return () => clearInterval(interval);
	}, [settingsInfo, mode]);

	// WARNINGS
	const handleWarning = (action) => {
		if (
			secondsLeftRef.current !== 0 &&
			!isTimerEqualWork &&
			!isTimerEqualBreak
		) {
			showWarningModal(action, handleCancel);
		} else {
			action();
		}
	};

	// SHOW WARNING FOR RELOADING
	// useEffect(() => {
	// 	if (!isTimerEqualWork || !isTimerEqualBreak) {
	// 		settingsInfo.setShowExitPrompt(true);
	// 	}

	// 	return () => {
	// 		settingsInfo.setShowExitPrompt(false);
	// 	};
	// }, [settingsInfo, isTimerEqualWork, isTimerEqualBreak]);

	const totalSeconds =
		mode === "work"
			? settingsInfo.workMinutes * 60
			: settingsInfo.breakMinutes * 60;

	const percentage = Math.round(
		((totalSeconds - secondsLeft) / totalSeconds) * 100
	);

	const minutes = Math.floor(secondsLeft / 60);
	let seconds = secondsLeft % 60;

	if (seconds < 10) seconds = `0${seconds}`;

	return (
		<div className={`${styles.pomodoroWrapper} flex column`}>
			<CircularProgressbar
				value={percentage}
				strokeWidth={2}
				text={`${minutes}: ${seconds}`}
				styles={buildStyles({
					textColor: primaryColor,
					pathColor: "transparent",
					trailColor: "transparent",
				})}
			/>

			<p className={`${styles.timerModeText} primaryFont`}>
				{mode === "work" ? "Work" : "Break"}
			</p>
			<div className={`${styles.timerBtnWrapper} flex `}>
				{/* PLAY PAUSE */}
				{isPaused ? (
					<PlayBtn onClick={handleTimerPlayPause} />
				) : (
					<PauseBtn onClick={handleTimerPlayPause} />
				)}

				{/* SETTINGS */}
				<SettingsBtn
					onClick={() => {
						handleWarning(handleSettingsBtnClick);
					}}
				/>

				{/* RESET */}
				<ResetBtn
					onClick={() => {
						handleWarning(handleTimerReset);
					}}
				/>
			</div>

			{/* WARNING MODAL */}
			<WarningModal
				isVisible={isVisible}
				onCancel={handleCancel}
				onContinue={handleContinue}
			/>
			<ToastContainer
				position="bottom-right"
				autoClose={5050}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition:Bounce
			/>
		</div>
	);
}
