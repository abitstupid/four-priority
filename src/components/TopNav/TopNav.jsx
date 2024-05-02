import styles from "./TopNav.module.scss";

import { IoMdArrowRoundBack } from "react-icons/io";
import { RiInfoI } from "react-icons/ri";

export default function TopNav() {
	return (
		<div className={`${styles.topNavWrpper}`}>
			<button className={`${styles.BackBtn}`}>
				<IoMdArrowRoundBack />
			</button>
			<div className={`${styles.infoWrapper}`}>
				<RiInfoI />
			</div>
		</div>
	);
}

TopNav.propTypes = {};
