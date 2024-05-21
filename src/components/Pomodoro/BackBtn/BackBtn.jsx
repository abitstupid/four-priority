import { IoClose } from "react-icons/io5";
import Button from "../../Buttons/Button";

export default function BackBtn(props) {
	return (
		<div {...props}>
			<Button
				variant="primary"
				type="squareLarge"
			>
				<IoClose className="iconSize" />
			</Button>
		</div>
	);
}
