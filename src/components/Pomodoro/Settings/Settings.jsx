import ReactSlider from "react-slider";
import "./../../../global.scss";
import "./../../../styles/scss/slider.scss";
import { useContext } from "react";
import SettingsContext from "./SettingsContext";
import BackBtn from "../BackBtn/BackBtn";
import styles from "./Settings.module.scss";

export default function Settings() {
	const settingsInfo = useContext(SettingsContext);

	return (
		<div className={`${styles.settingsWrapper}`}>
			<label htmlFor="">Work : {settingsInfo.workMinutes} minutes</label>
			<ReactSlider
				className={`${styles.slider} marginTopMedium marginBottomLarge`}
				thumbClassName={`${styles.sliderThumb}`}
				trackClassName={`${styles.sliderTrack}`}
				value={settingsInfo.workMinutes}
				min={5}
				max={55}
				step={5}
				onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
			/>
			<label htmlFor="">
				Break : {settingsInfo.breakMinutes} minutes
			</label>
			<ReactSlider
				className={`${styles.slider} marginTopMedium`}
				thumbClassName={`${styles.sliderThumb}`}
				trackClassName={`${styles.sliderTrack}`}
				value={settingsInfo.breakMinutes}
				min={5}
				max={25}
				step={5}
				onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
			/>

			<div className={`${styles.backBtnWrapper} centerH `}>
				<BackBtn
					onClick={() => {
						settingsInfo.setShowSettings(
							!settingsInfo.showSettings
						);
					}}
				/>
			</div>
		</div>
	);
}
