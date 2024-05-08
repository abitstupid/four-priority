// import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { HiMiniQueueList } from "react-icons/hi2";
import styles from "./BottomNav.module.scss";
import { useState } from "react";

export default function BottomNav() {
	const location = useLocation();
	const [activeBtn, setActiveBtn] = useState(location.pathname);

	function handleNavBtnClick(path) {
		setActiveBtn(path);
	}
	return (
		<div className={`${styles.bottomNavWrpper}`}>
			<Link
				to={"/"}
				onClick={() => handleNavBtnClick("/")}
			>
				<div
					className={`${styles.bottomNavBtn} ${
						activeBtn === "/" ? styles.activeNavBtn : ""
					} btn`}
				>
					<GoHomeFill
						fill={activeBtn === "/" ? "#ffffff" : "#1e1e1e"}
						className="iconSizeSmall"
					/>
				</div>
			</Link>
			<Link
				to={"/features"}
				onClick={() => handleNavBtnClick("/features")}
			>
				<div
					className={`${styles.bottomNavBtn} ${
						activeBtn === "/features" ? styles.activeNavBtn : ""
					} btn`}
				>
					<HiMiniQueueList
						fill={activeBtn === "/features" ? "#ffffff" : "#1e1e1e"}
						className="iconSizeSmall"
					/>
				</div>
			</Link>
		</div>
	);
}

// BottomNav.propTypes = {};
