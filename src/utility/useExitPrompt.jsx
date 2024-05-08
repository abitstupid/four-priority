import { useEffect, useState } from "react";

const initBeforeUnload = (showExitPrompt) => {
	window.onbeforeunload = (event) => {
		const e = event || window.event;

		if (showExitPrompt) {
			e.preventDefault();
			if (e) {
				e.returnValue = "";
			}
			return "";
		}
	};
};

export default function useExitPrompt(bool) {
	const [showExitPrompt, setShowExitPrompt] = useState(bool);

	window.onload = function () {
		initBeforeUnload(showExitPrompt);
	};

	useEffect(() => {
		initBeforeUnload(showExitPrompt);
	}, [showExitPrompt]);

	return [showExitPrompt, setShowExitPrompt];
}
