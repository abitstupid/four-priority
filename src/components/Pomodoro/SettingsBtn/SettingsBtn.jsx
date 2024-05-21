import { IoMdSettings } from "react-icons/io";
import Button from "../../Buttons/Button";

export default function SettingsBtn(props) {
	return (
		<div {...props}>
			<Button
				variant="primary"
				type="squareLarge"
			>
				<IoMdSettings className="iconSize" />
			</Button>
		</div>
	);
}
