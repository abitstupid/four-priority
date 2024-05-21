import { FaPlay } from "react-icons/fa";
import Button from "../../Buttons/Button";

export default function PlayBtn(props) {
	return (
		<div {...props}>
			<Button
				variant="primary"
				type="squareLarge"
			>
				<FaPlay className="iconSize" />
			</Button>
		</div>
	);
}
