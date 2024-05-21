import { FaPause } from "react-icons/fa";
import Button from "../../Buttons/Button";

export default function PauseBtn(props) {
	return (
		<div {...props}>
			<Button
				variant="primary"
				type="squareLarge"
			>
				<FaPause className="iconSize" />
			</Button>
		</div>
	);
}
