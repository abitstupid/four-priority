import { MdEdit } from "react-icons/md";
import Button from "../../Buttons/Button";
import PropTypes from "prop-types";

export default function EditBtn({ onClick }) {
	return (
		<div className="center">
			<Button
				variant="transparent"
				type="squareNoBorder"
				onClick={onClick}
			>
				<MdEdit className="iconSizeSmall" />
			</Button>
		</div>
	);
}

EditBtn.propTypes = {
	onClick: PropTypes.func.isRequired,
};
