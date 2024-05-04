import PriorityCardLink from "../../components/PriorityCard/PriorityCardLink";
import PropTypes from "prop-types";
import styles from "./home.module.scss";
import InfoButton from "../../components/InfoButton/InfoButton";
import { Link } from "react-router-dom";

export default function Home({ cardsData, appTitle }) {
	const HOME_CARD_ID = 99;
	return (
		<>
			<div className={`${styles.homeHeaderWrapper}`}>
				<h1
					className={`${styles.homeHeader} displayFont visually-hidden`}
				>
					{appTitle}
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
					<InfoButton cardId={HOME_CARD_ID} />
				</div>
			</div>
			<PriorityCardLink cardsData={cardsData} />
		</>
	);
}

Home.propTypes = {
	cardsData: PropTypes.array,
	appTitle: PropTypes.string,
};