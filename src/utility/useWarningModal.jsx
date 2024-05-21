import { useState, useCallback } from "react";

export default function useWarningModal() {
	const [isVisible, setIsVisible] = useState(false);
	const [onCancel, setOnCancel] = useState(null);
	const [onContinue, setOnContinue] = useState(null);

	const showWarningModal = useCallback((onContinue, onCancel) => {
		setOnContinue(() => onContinue);
		setOnCancel(() => onCancel);
		setIsVisible(true);
	}, []);

	const hideWarningModal = useCallback(() => {
		setIsVisible(false);
		setOnCancel(null);
		setOnContinue(null);
	}, []);

	const handleCancel = useCallback(() => {
		if (onCancel) onCancel();
		hideWarningModal();
	}, [onCancel, hideWarningModal]);

	const handleContinue = useCallback(() => {
		if (onContinue) onContinue();
		hideWarningModal();
	}, [onContinue, hideWarningModal]);

	return {
		isVisible,
		showWarningModal,
		hideWarningModal,
		handleCancel,
		handleContinue,
	};
}
