import { IoClose } from "react-icons/io5";

export default function BackBtn(props) {
	return (
		<button
			{...props}
			className="btn btnPrimary"
		>
			<IoClose className="iconSize" />
		</button>
	);
}
