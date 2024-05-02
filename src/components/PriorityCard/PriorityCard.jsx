import { Fragment, useRef, useState } from "react";

import TipTap from "./../TipTap/TipTap";
import styles from "./PriorityCard.module.scss";
import TopNav from "../TopNav/TopNav";

const PRIORTY_CARDS = [
	{ id: 0, name: "p1", type: 1, isActive: false },
	{ id: 1, name: "p2", type: 2, isActive: false },
	{ id: 2, name: "p3", type: 3, isActive: false },
	{ id: 3, name: "other", type: 4, isActive: false },
];

export default function PriorityCard() {
	const [isActiveArr, setIsActive] = useState(PRIORTY_CARDS);
	const [currentContent, setCurrentContent] = useState(null);
	const editorContentRef = useRef(null);

	function handleCardClick(id) {
		const udpatedIsActive = isActiveArr.map((state, idx) => {
			if (id === idx) {
				const newIsActive = {
					...state,
					isActive: !state.isActive,
				};
				return newIsActive;
			}
			return state;
		});

		setIsActive(udpatedIsActive);
	}

	function handleContentChanges(content) {
		setCurrentContent(content);
	}

	const priorityCards = isActiveArr.map((isActive) => {
		return (
			<Fragment key={isActive.id}>
				<div
					className={`${styles.priorityCard}`}
					id={isActive.name}
					onClick={() => handleCardClick(isActive.id)}
				>
					{}
				</div>

				{isActive.isActive && (
					<>
						<TopNav />
						<TipTap handleContentChanges={handleContentChanges} />

						<button
							className={`${styles.closeBtn}`}
							// onClick={() => setIsActive(false)}
						>
							Close
						</button>
					</>
				)}
			</Fragment>
		);
	});

	return (
		<>
			<div className={`${styles.priorityCardWrapper}`}>
				{priorityCards}
				<span
					ref={editorContentRef}
					style={{
						position: "fixed",
						zIndex: "99999",
						bottom: "300px",
						left: "12px",
					}}
					dangerouslySetInnerHTML={{ __html: currentContent }}
				></span>
			</div>
		</>
	);
}
