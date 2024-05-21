import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";

import styles from "./Sidebar.module.scss";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Button from "../Buttons/Button";

export default function Sidebar({ handleSidebarBtnClick }) {
	useLockBodyScroll();
	return (
		<div className={`${styles.sidebarWrapper} centerV`}>
			<div className={`${styles.sidebar}`}>
				<div className={`${styles.sidebarCloseBtn}`}>
					<Button
						variant="primary"
						type="squareLarge"
						onClick={handleSidebarBtnClick}
					>
						<IoClose className="iconSize" />
					</Button>
				</div>
				<div className={`${styles.sidebarContent}`}>
					<h4 className={` marginBottomSmall`}>Upcoming Features</h4>
					<ul className="primaryFont">
						<li>Strict Control over Priority Cards</li>
						<li>Dark Theme and Custom Themes</li>
						<li>Google/ Cloud Log in/Sign Up</li>
						<li>User Profile</li>
						<li>Cloud Data Storage</li>
						<li>Pomodoro Session History</li>
						<li>In-App Request Feature/ Feedback/ Queries Page</li>
						<li>And Many More..</li>
					</ul>

					<div className="contactMe flex column">
						<p className="primaryFontMedium">Contact me:</p>
						<a
							href="https://x.com/ThodaBewakoof"
							target="_blank"
							rel="noreferrer"
							className="primaryFont linkUnderlined marginBottomSmall"
						>
							Hemant Rai
						</a>
						<p className={`primaryFontMedium`}>
							hemantraiwork@gmail.com
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

Sidebar.propTypes = {
	handleSidebarBtnClick: PropTypes.func,
};
