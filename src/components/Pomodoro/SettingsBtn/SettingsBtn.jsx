import { IoMdSettings } from "react-icons/io";
import styles from "./SettingsBtn.module.scss";

export default function SettingsBtn(props) {
	return (
		<button
			{...props}
			className={`${styles.timerSettingsBtn} timerBtn  btn btnPrimary`}
		>
			<IoMdSettings className="iconSize" />
		</button>
	);
}
