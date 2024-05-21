import PropTypes from "prop-types";

function ButtonWrapper({ children, width = 100 }) {
	return (
		<div
			className={`btnWrapper`}
			style={{
				width: `${width}%`,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "0.5rem",
			}}
		>
			{children}
		</div>
	);
}

ButtonWrapper.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.number,
};

export default ButtonWrapper;
