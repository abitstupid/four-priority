import PropTypes from "prop-types";

function Input({ type = "checked", checked, onChange }) {
	return (
		<input
			type="checkbox"
			checked={checked}
			onChange={onChange}
		/>
	);
}

Input.propTypes = {
	type: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
};

export default Input;
