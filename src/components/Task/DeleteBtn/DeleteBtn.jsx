import { MdDelete } from "react-icons/md";
import Button from "../../Buttons/Button";
import PropTypes from "prop-types";

export default function DeleteBtn({ onClick }) {
	return (
		<div className="center">
			<Button
				variant="transparent"
				type="squareNoBorder"
				onClick={onClick}
			>
				<MdDelete className="iconSizeSmall" />
			</Button>
		</div>
	);
}

DeleteBtn.propTypes = {
	onClick: PropTypes.func.isRequired,
};
