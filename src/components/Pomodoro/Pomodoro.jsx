// import PropTypes from 'prop-types'
import { FaPlay } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import styles from "./Pomodoro.module.scss";
import Countdown from "react-countdown";

export default function Pomodoro() {
	return (
		<div className={`${styles.pomodoroWrapper} center column`}>
			\
			{/* <label htmlFor="pomodoroTitle">
				Title:
				<input
					type="text"
					name="pomodoroTitle"
					required
				/>
			</label> */}
			<div className={`${styles.clock} center`}>
				<Countdown date={Date.now() + 300000}></Countdown>
			</div>
			<div className="flex">
				<button className="btn btnPrimary">
					<FaPlay />
					{/* <FaPause /> */}
				</button>
				<button className="btn btnPrimary">
					<FaArrowRotateRight />
				</button>
			</div>
		</div>
	);
}

// Pomodoro.propTypes = {};
