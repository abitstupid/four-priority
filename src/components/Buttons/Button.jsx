import PropTypes from "prop-types";
import styles from "./Button.module.scss";

export default function Button({
	variant,
	type,
	size,
	text,
	icon,
	onClick,
	children,
}) {
	const buttonClasses = getClassName(variant, type);

	const getSize = () => {
		if (type === "rect" && size) {
			return `${size}%`;
		} else if (type === "custom" && size) {
			return `${size}px`;
		} else return;
	};

	const setSize = () => {
		if (type === "rect" && size) {
			return { width: getSize() };
		} else if (type === "custom" && size) {
			return { width: getSize(), height: getSize() };
		} else return;
	};

	return (
		<div
			role="button"
			className={`${buttonClasses}`}
			onClick={onClick}
			style={setSize()}
		>
			{icon && (
				<img
					src={icon}
					alt="Icon"
				/>
			)}
			{text && <p>{text}</p>}
			{children}
		</div>
	);
}

Button.propTypes = {
	variant: PropTypes.oneOf(["primary", "secondary", "transparent"])
		.isRequired,
	type: PropTypes.oneOf([
		"squareSmall",
		"squareLarge",
		"squareNoBorder",
		"rect",
		"custom",
	]).isRequired,
	size: PropTypes.number,
	text: PropTypes.string,
	icon: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.node,
};

function getClassName(variant, type) {
	let className = styles.btn;

	if (variant === "primary") {
		className += ` ${styles.btnPrimary}`;
	} else if (variant === "secondary") {
		className += ` ${styles.btnSecondary}`;
	} else if (variant === "transparent") {
		className += ` ${styles.btnTransparent}`;
	}

	if (type === "squareLarge") {
		className += ` ${styles.btnSquareLarge}`;
	} else if (type === "squareSmall") {
		className += ` ${styles.btnSquareSmall}`;
	} else if (type === "squareNoBorder") {
		className += ` ${styles.btnSquareNoBorder}`;
	} else if (type === "rect") {
		className += ` ${styles.btnRect}`;
	} else if (type === "custom") {
		className += ` ${styles.btnCustom}`;
	}
	return className;
}
