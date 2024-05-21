import PropTypes from "prop-types";
import styles from "./CustomSelect.module.scss";
import { Fragment, useEffect, useRef, useState } from "react";

export default function CustomSelect({ locationId, value, onChange, options }) {
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);

	const customSelectContainerRef = useRef(null);

	// OPTIONS RENDERED BASED ON DIFFERENT PAGE IDs
	const filteredOptions = options.filter(
		(option) => option.id === locationId
	);

	// IF NO OPTIONID MATCHES LOCATION ID RENDER ALL OPTION (eg. HOME)
	const optionsToRender =
		filteredOptions.length > 0 ? filteredOptions : options;

	function selectOption(option) {
		if (option !== value) onChange(option);
	}

	function isSelectedOption(option) {
		return option === value;
	}

	useEffect(() => {
		if (isOpen) setHighlightedIndex(null);
	}, [isOpen]);

	useEffect(() => {
		const containerRef = customSelectContainerRef.current;

		const handleKeyboardEvents = (e) => {
			if (e.target != containerRef) return;
			switch (e.code) {
				case "Enter":
				case "Space": {
					setIsOpen((prev) => !prev);
					if (isOpen) selectOption(options[highlightedIndex]);
					break;
				}
				case "ArrowUp":
				case "ArrowDown": {
					if (!isOpen) {
						setIsOpen(true);
						break;
					}
					const newHighlightedVal =
						highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);

					if (
						newHighlightedVal >= 0 &&
						newHighlightedVal < options.length
					) {
						setHighlightedIndex(newHighlightedVal);
					}
					break;
				}

				case "Escape": {
					setIsOpen(false);
					break;
				}
			}
		};

		containerRef.addEventListener("keydown", handleKeyboardEvents);

		return () => {
			containerRef.removeEventListener("keydown", handleKeyboardEvents);
		};
	}, [isOpen, options, highlightedIndex]);

	return (
		// SELECT CONTAINER
		<div
			tabIndex={0}
			role="combobox"
			aria-labelledby="select button"
			aria-haspopup="listbox"
			aria-expanded={isOpen}
			aria-controls={`${styles.options}`}
			ref={customSelectContainerRef}
			className={`${styles.customSelectContainer} fontPrimary`}
			onClick={() => setIsOpen((prev) => !prev)}
			onBlur={() => setIsOpen(false)}
		>
			{/* DISPLAY VALUE */}
			<span
				className={`${styles.value}`}
				aria-live="polite"
			>
				{value.label}
			</span>

			{/* DIVIDER */}
			<div className={`${styles.divider}`}></div>
			{/* CARET */}
			<div
				className={`${styles.caret} ${isOpen ? styles.rotate : ""} `}
			></div>
			{/* OPTIONS */}
			<ul
				className={`${styles.options} ${isOpen ? styles.show : ""} `}
				role="listbox"
			>
				{optionsToRender.map((option) => (
					<Fragment key={option.id}>
						<li
							role="option"
							className={`${styles.option} ${
								isSelectedOption(option) ? styles.selected : ""
							} ${
								option.id === highlightedIndex
									? styles.highlighted
									: ""
							}`}
							onClick={(e) => {
								e.stopPropagation();
								selectOption(option);
								setIsOpen(false);
							}}
							onMouseEnter={() => setHighlightedIndex(option.id)}
						>
							{option.label}
						</li>
					</Fragment>
				))}
			</ul>
		</div>
	);
}

CustomSelect.propTypes = {
	locationId: PropTypes.number.isRequired,
	value: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
};
