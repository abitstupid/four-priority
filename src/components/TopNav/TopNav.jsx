import PropTypes from "prop-types";
import { IoArrowBackOutline } from "react-icons/io5";
import styles from "./TopNav.module.scss";
import InfoButton from "../InfoButton/InfoButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "./../../data.json";
import Sidebar from "../Sidebar/Sidebar";
import Button from "../Buttons/Button";

const APP_TITLE = data.appTitle;

export default function TopNav({ cardId }) {
	const navigate = useNavigate();
	const location = useLocation();
	const [isHome, setIsHome] = useState(true);
	const [isActiveSidebar, setIsActiveSidebar] = useState(false);

	useEffect(() => {
		if (location.pathname === "/") {
			setIsHome(true);
		} else {
			setIsHome(false);
		}
	}, [location.pathname]);

	function handleSidebarBtnClick() {
		setIsActiveSidebar(!isActiveSidebar);
	}

	const handleBackButtonClick = () => {
		navigate(-1);
	};

	return (
		<div className={`${styles.topNavWrpper}`}>
			{isHome ? (
				<>
					{/* HOME LOGO */}
					{/* h1 is visually hidden; is only for SEO */}
					<h1
						className={`${styles.homeHeader} displayFont visually-hidden`}
					>
						{APP_TITLE}
					</h1>
					<div className={`${styles.appLogoWrapper} center`}>
						<Link to={"/"}>
							<span
								style={{
									position: "relative",
									display: "inline-block",
								}}
							>
								<svg
									className={`${styles?.appLogo}`}
									width="40"
									height="40"
									viewBox="0 0 100 100"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect
										width="100"
										height="100"
										fill="white"
									/>
									<path
										d="M78.594 18.0428C88.5011 18.0428 96.5325 26.0741 96.5325 35.9813V35.9813C96.5325 45.8885 88.5011 53.9198 78.5939 53.9198L66.4319 53.9198L66.4319 18.0428L78.594 18.0428Z"
										fill="#8EFB73"
									/>
									<path
										d="M3.46753 38.7041C3.46753 47.1075 10.2799 53.9198 18.6833 53.9198V53.9198C27.0867 53.9198 33.8991 47.1075 33.8991 38.7041V18.2083H3.46753L3.46753 38.7041Z"
										fill="#F55F5F"
									/>
									<rect
										x="36.8086"
										y="18.0428"
										width="26.7154"
										height="63.9144"
										fill="#EFF255"
									/>
								</svg>
								<span
									className={`${styles.appLogoBeta} fontPrimary tag`}
								>
									beta
								</span>
							</span>
						</Link>
					</div>
				</>
			) : (
				// GO BACK BTN
				<Link to={"/"}>
					<div className={`${styles.BackBtn}`}>
						<Button
							variant="primary"
							type="squareLarge"
							onClick={handleBackButtonClick}
						>
							<IoArrowBackOutline className="iconSize" />
						</Button>
					</div>
				</Link>
			)}

			<div className={`flex`}>
				{/* INFO BTN */}
				<InfoButton cardId={cardId} />

				{/*SIDEBAR  */}
				<div
					className={`${styles.sidebarBtn}`}
					onClick={handleSidebarBtnClick}
				></div>
				{isActiveSidebar && (
					<Sidebar handleSidebarBtnClick={handleSidebarBtnClick} />
				)}
			</div>
		</div>
	);
}

TopNav.propTypes = {
	cardId: PropTypes.number.isRequired,
};
