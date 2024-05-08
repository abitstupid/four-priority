import PropTypes from "prop-types";
import styles from "./WarningModal.module.scss";

export default function WarningModal({ onCancel, onContinue }) {
	return (
		<div className={`${styles.warningModalWrapper} `}>
			<div className={`${styles.warningModal}`}>
				<p className="primaryFont marginBottomMedium textCenter">
					The timer will reset, if you perform this action.
				</p>
				<div className={`${styles.warningModalBtnWrapper} flex `}>
					<button
						onClick={onCancel}
						className="btn btnWithText btnPrimary primaryFont"
					>
						Cancel
					</button>
					<button
						onClick={onContinue}
						className="btn btnWithText btnSecondary primaryFont secondaryFontColor"
					>
						Continue
					</button>
				</div>
			</div>
		</div>
	);
}

WarningModal.propTypes = {
	onCancel: PropTypes.func,
	onContinue: PropTypes.func,
};
