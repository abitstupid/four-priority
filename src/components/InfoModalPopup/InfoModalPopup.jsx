import PropTypes from "prop-types";
import styles from "./InfoModalPopup.module.scss";
import { IoClose } from "react-icons/io5";
import data from "./../../data.json";
import { useLockBodyScroll } from "@uidotdev/usehooks";

const INFO_DATA = data.infoData;

export default function InfoModalPopup({ cardId, handleModal }) {
	useLockBodyScroll();
	return (
		<div className={`${styles.infoModalPopupWrapper} center`}>
			<div className={`${styles.infoModal} centerH column`}>
				<button
					className={`${styles.infoModalCloseBtn} btn btnPrimary btnSmall`}
					onClick={handleModal}
				>
					<IoClose className="iconSize" />
				</button>

				{/* ID = 99 is for home.jsx */}
				{cardId === 99 ? (
					<>
						<p>{INFO_DATA.welcome.content}</p>
						{INFO_DATA?.cardsInfo?.map((info) => {
							return (
								<div
									className={`${styles.infoModalContent}`}
									key={info.id}
								>
									{info?.content?.map((para, idx) => {
										return <p key={idx}>{para}</p>;
									})}
								</div>
							);
						})}
					</>
				) : (
					INFO_DATA.cardsInfo.map((info) => {
						if (info.id === cardId) {
							return (
								<div
									className={`${styles.infoModalContent}`}
									key={info.id}
								>
									{info.content.map((para, idx) => {
										return <p key={idx}>{para}</p>;
									})}
								</div>
							);
						}
						return null;
					})
				)}
			</div>
		</div>
	);
}

InfoModalPopup.propTypes = {
	cardId: PropTypes.number,
	handleModal: PropTypes.func,
};
