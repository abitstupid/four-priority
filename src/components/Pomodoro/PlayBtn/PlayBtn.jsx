import { FaPlay } from "react-icons/fa";
import styles from "./PlayBtn.module.scss";

export default function PlayBtn(props) {
	return (
		<button
			{...props}
			className={`${styles.timerPlayBtn} timerBtn  btn btnPrimary`}
		>
			<FaPlay className="iconSize" />
		</button>
	);
}
