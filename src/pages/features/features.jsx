import BottomNav from "../../components/BottomNav/BottomNav";
import Pomodoro from "../../components/Pomodoro/Pomodoro";
import TopNav from "../../components/TopNav/TopNav";
import styles from "./features.module.scss";

import Settings from "../../components/Pomodoro/Settings/Settings";
import SettingsContext from "../../components/Pomodoro/Settings/SettingsContext";
import useExitPrompt from "../../utility/useExitPrompt";
import { useState } from "react";

export default function Features() {
	const [showSettings, setShowSettings] = useState(false);
	const [workMinutes, setWorkMinutes] = useState(25);
	const [breakMinutes, setBreakMinutes] = useState(5);
	const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

	return (
		<div className={`${styles.featuresWrapper}`}>
			<TopNav />
			<BottomNav />

			<div className={`${styles.featuresItemWrapper}`}>
				<SettingsContext.Provider
					value={{
						showSettings,
						setShowSettings,
						workMinutes: workMinutes,
						breakMinutes: breakMinutes,
						setWorkMinutes,
						setBreakMinutes,
						showExitPrompt,
						setShowExitPrompt,
					}}
				>
					{showSettings ? <Settings /> : <Pomodoro />}
				</SettingsContext.Provider>
				<p
					className={`${styles.pomodoroHeading} fontPrimaryMedium`}
					style={{ display: `${showSettings ? "none" : "block"}` }}
				>
					Pomodoro
				</p>
			</div>
		</div>
	);
}
