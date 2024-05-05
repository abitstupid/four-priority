import BottomNav from "../../components/BottomNav/BottomNav";
import Pomodoro from "../../components/Pomodoro/Pomodoro";
import TopNav from "../../components/TopNav/TopNav";
import styles from "./features.module.scss";

export default function Features() {
	return (
		<div className={`${styles.featuresWrapper}`}>
			<TopNav />
			<BottomNav />

			<div className={`${styles.featuresItemWrapper}`}>
				<Pomodoro />
			</div>
		</div>
	);
}
