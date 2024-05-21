export function autoResizeTextarea() {
	const textareas = document.querySelectorAll("textarea");

	textareas.forEach((textarea) => {
		textarea.style.height = `${textarea.scrollHeight + 16}px`;
		textarea.style.overflowY = "hidden";

		textarea.addEventListener("input", handleInput);
	});

	function handleInput() {
		this.style.height = "auto";
		const maxHeight = window.innerHeight * 0.2;
		const newHeight = Math.min(this.scrollHeight, maxHeight);
		this.style.height = `${newHeight + 16}px`;
		this.style.overflowY = newHeight >= maxHeight ? "auto" : "hidden";
	}

	return () => {
		textareas.forEach((textarea) => {
			textarea.removeEventListener("input", handleInput);
		});
	};
}
