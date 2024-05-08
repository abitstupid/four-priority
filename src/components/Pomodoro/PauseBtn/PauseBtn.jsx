import { FaPause } from "react-icons/fa";
import styles from "./PauseBtn.module.scss";

export default function PauseBtn(props) {
	return (
		<button
			{...props}
			className={`${styles.timerPauseBtn} timerBtn  btn btnPrimary`}
		>
			<FaPause className="iconSize" />
		</button>
	);
}
