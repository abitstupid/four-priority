import PropTypes from "prop-types";
import styles from "./WarningModal.module.scss";
import ButtonWrapper from "../Buttons/ButtonWrapper";
import Button from "../Buttons/Button";

export default function WarningModal({ isVisible, onCancel, onContinue }) {
	if (!isVisible) return null;

	return (
		<div className={`${styles.warningModalWrapper} `}>
			<div className={`${styles.warningModal}`}>
				<p className="primaryFont marginBottomMedium textCenter">
					The timer will reset, if you perform this action.
				</p>
				<div className={`${styles.warningModalBtnWrapper} flex `}>
					<ButtonWrapper>
						<Button
							variant="primary"
							type="rect"
							size={40}
							text={"Cancel"}
							onClick={onCancel}
						/>
						<Button
							variant="secondary"
							type="rect"
							size={60}
							text={"Continue"}
							onClick={onContinue}
						/>
					</ButtonWrapper>
				</div>
			</div>
		</div>
	);
}

WarningModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
	onContinue: PropTypes.func.isRequired,
};
