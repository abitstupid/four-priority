import { FaArrowRotateRight } from "react-icons/fa6";
import Button from "../../Buttons/Button";

export default function ResetBtn(props) {
	return (
		<div {...props}>
			<Button
				variant="primary"
				type="squareLarge"
			>
				<FaArrowRotateRight className="iconSize" />
			</Button>
		</div>
	);
}
