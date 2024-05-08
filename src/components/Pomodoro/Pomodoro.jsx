import { useContext, useEffect, useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayBtn from "./PlayBtn/PlayBtn";
import PauseBtn from "./PauseBtn/PauseBtn";
import SettingsBtn from "./SettingsBtn/SettingsBtn";
import SettingsContext from "./Settings/SettingsContext";
import WarningModal from "./WarningModal/WarningModal";
import ResetBtn from "./ResetBtn/ResetBtn";
import styles from "./Pomodoro.module.scss";

const primaryColor = "#1e1e1e";

export default function Pomodoro() {
	const settingsInfo = useContext(SettingsContext);
	const [isPaused, setIsPaused] = useState(true);
	const [secondsLeft, setSecondsLeft] = useState(0);
	const [mode, setMode] = useState("work"); //work //break//null
	const [showWarning, setShowWarning] = useState(false);
	const [warningType, setWarningType] = useState(null);

	const secondsLeftRef = useRef(secondsLeft);
	const isPausedRef = useRef(isPaused);
	const modeRef = useRef(mode);

	const isTimerEqualWork =
		secondsLeftRef.current === settingsInfo.workMinutes * 60;
	const isTimerEqualBreak =
		secondsLeftRef.current === settingsInfo.breakMinutes * 60;

	const warningTypes = {
		RESET: "reset",
		SETTINGS: "settings",
	};

	// PLAY PAUSE
	function handleTimerPlayPause() {
		setIsPaused(!isPaused);
		isPausedRef.current = !isPaused;
	}

	//SETTINGS
	function handleSettingsBtnClick() {
		settingsInfo.setShowSettings(!settingsInfo.showSettings);
	}

	// RESET
	function handleTimerReset() {
		setShowWarning(false);
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
			if (secondsLeftRef.current === 0) {
				return switchMode();
			}

			tick();
		}, 1000);

		return () => clearInterval(interval);
	}, [settingsInfo]);

	// WARNINGS
	const handleWarningAction = (actionType, action) => {
		if (
			secondsLeftRef.current !== 0 &&
			!isTimerEqualWork &&
			!isTimerEqualBreak
		) {
			setWarningType(actionType);
			setShowWarning(true);
		} else {
			action();
		}
	};

	// WARNING MODAL
	function handleContinue(execFunc) {
		setShowWarning(false);
		execFunc();
	}

	// SHOW WARNING FOR RELOADING
	useEffect(() => {
		if (!isTimerEqualWork || !isTimerEqualBreak) {
			settingsInfo.setShowExitPrompt(true);
		}
	}, [settingsInfo, isTimerEqualWork, isTimerEqualBreak]);

	useEffect(() => {
		return () => {
			settingsInfo.setShowExitPrompt(false);
		};
	}, []);

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
						handleWarningAction(
							warningTypes.SETTINGS,
							handleSettingsBtnClick
						);
					}}
				/>

				{/* RESET */}
				<ResetBtn
					onClick={() => {
						handleWarningAction(
							warningTypes.RESET,
							handleTimerReset
						);
					}}
				/>
			</div>
			{/* WARNING MODAL */}
			{showWarning && (
				<WarningModal
					onContinue={() => {
						handleContinue(
							warningType === warningTypes.RESET
								? handleTimerReset
								: handleSettingsBtnClick
						);
					}}
					onCancel={() => setShowWarning(false)}
				/>
			)}
		</div>
	);
}
