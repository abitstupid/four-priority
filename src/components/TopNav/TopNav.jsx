import PropTypes from "prop-types";
import { IoArrowBackOutline } from "react-icons/io5";
import styles from "./TopNav.module.scss";
import InfoButton from "../InfoButton/InfoButton";
import { Link } from "react-router-dom";
export default function TopNav({ cardId }) {
	return (
		<div className={`${styles.topNavWrpper}`}>
			<Link to={"/"}>
				<button className={`${styles.BackBtn} btn btnPrimary`}>
					<IoArrowBackOutline className="iconSize" />
				</button>
			</Link>
			<InfoButton cardId={cardId} />
		</div>
	);
}

TopNav.propTypes = {
	cardId: PropTypes.number,
};
