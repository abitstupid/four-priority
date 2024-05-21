import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./InfoButton.module.scss";
import { FaInfo } from "react-icons/fa";
import InfoModalPopup from "../InfoModalPopup/InfoModalPopup";

export default function InfoButton({ cardId }) {
	const [isModalActive, setIsModalActive] = useState(false);
	function handleModal() {
		setIsModalActive(!isModalActive);
	}

	return (
		<div className={`${styles.infoBtn} center btn btnSecondary`}>
			<FaInfo
				fill="#ffffff"
				className="iconSizeSmall"
				onClick={handleModal}
			/>
			{isModalActive && (
				<InfoModalPopup
					cardId={cardId}
					handleModal={handleModal}
				/>
			)}
		</div>
	);
}

InfoButton.propTypes = {
	cardId: PropTypes.number,
};
