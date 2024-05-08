import { FaArrowRotateRight } from "react-icons/fa6";
import styles from "./ResetBtn.module.scss";

export default function ResetBtn(props) {
	return (
		<button
			{...props}
			className={`${styles.timerResetBtn} timerBtn  btn btnPrimary`}
		>
			<FaArrowRotateRight className="iconSize" />
		</button>
	);
}
