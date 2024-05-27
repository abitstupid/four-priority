// import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { HiMiniQueueList } from "react-icons/hi2";
import styles from "./BottomNav.module.scss";
import { useState } from "react";
import Button from "../Buttons/Button";

export default function BottomNav() {
	const location = useLocation();
	const [activeBtn, setActiveBtn] = useState(location.pathname);

	function handleNavBtnClick(path) {
		setActiveBtn(path);
	}
	return (
		<div className={`${styles.bottomNavWrpper}`}>
			<Link
				to={"/app"}
				onClick={() => handleNavBtnClick("/app")}
			>
				<Button
					variant={activeBtn === "/app" ? "secondary" : "primary"}
					type="squareLarge"
					onClick={handleNavBtnClick}
				>
					<GoHomeFill
						fill={activeBtn === "/app" ? "#ffffff" : "#1e1e1e"}
						className="iconSizeSmall"
					/>
				</Button>
			</Link>
			<Link
				to={"/features"}
				onClick={() => handleNavBtnClick("/features")}
			>
				<Button
					variant={
						activeBtn === "/features" ? "secondary" : "primary"
					}
					type="squareLarge"
					onClick={handleNavBtnClick}
				>
					<HiMiniQueueList
						fill={activeBtn === "/features" ? "#ffffff" : "#1e1e1e"}
						className="iconSizeSmall"
					/>
				</Button>
			</Link>
		</div>
	);
}

// BottomNav.propTypes = {};
