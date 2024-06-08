// import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
// import { GoHomeFill } from "react-icons/go";
import { HiMiniQueueList } from "react-icons/hi2";
import { SiGoogletasks } from "react-icons/si";
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
			{/* home */}
			{/* <Link
				to={"/app"}
				onClick={() => handleNavBtnClick("/app")}
			>
				<Button
					variant={activeBtn === "/app" ? "primary" : "secondary"}
					type="squareLarge"
					onClick={handleNavBtnClick}
				>
					<GoHomeFill
						fill={activeBtn === "/app" ? "#1e1e1e" : "#ffffff"}
						className="iconSizeSmall"
					/>
				</Button>
			</Link> */}

			{/* to dos btn */}
			<Link
				to={"/todo"}
				onClick={() => handleNavBtnClick("/todo")}
			>
				<Button
					variant={activeBtn === "/todo" ? "primary" : "secondary"}
					type="squareLarge"
					onClick={handleNavBtnClick}
				>
					<SiGoogletasks
						fill={activeBtn === "/todo" ? "#1e1e1e" : "#ffffff"}
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
						activeBtn === "/features" ? "primary" : "secondary"
					}
					type="squareLarge"
					onClick={handleNavBtnClick}
				>
					<HiMiniQueueList
						fill={activeBtn === "/features" ? "#1e1e1e" : "#ffffff"}
						className="iconSizeSmall"
					/>
				</Button>
			</Link>
		</div>
	);
}

// BottomNav.propTypes = {};
