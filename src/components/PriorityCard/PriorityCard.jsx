import { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import styles from "./PriorityCard.module.scss";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Task from "../Task/Task";

export default function PriorityCardLink({ cardsData }) {
	const [cardsDataState, setCardsDataState] = useState(cardsData);
	const [viewedCardId, setViewedCardId] = useState(false);
	const [cardHeigthVh, setCardHeigthVh] = useState(null);
	const cardContainerRefs = useRef([]);

	useEffect(() => {
		const updateCardHeight = () => {
			if (window.innerHeight >= 800) {
				setCardHeigthVh(true);
			} else {
				setCardHeigthVh(false);
			}
		};

		updateCardHeight();

		window.addEventListener("resize", updateCardHeight);

		return () => {
			window.removeEventListener("resize", updateCardHeight);
		};
	}, []);

	useEffect(() => {
		setCardsDataState(cardsData);
	}, [cardsData]);

	const handleCardClick = (e, cardId) => {
		const currentRef = cardContainerRefs.current[cardId];

		if (currentRef) {
			const hasCheckbox =
				currentRef.querySelector(`input[type="checkbox"]`) !== null;
			hasCheckbox && e.stopPropagation();
		}
	};

	return (
		<>
			<div className={`${styles.priorityCardWrapper}`}>
				{cardsDataState.map((card) => {
					return (
						<Fragment key={card.id}>
							<Link
								to={`/priorityPage?id=${encodeURIComponent(
									card.id
								)}`}
							>
								<div
									className={`${styles.cardContainer}`}
									ref={(e) =>
										(cardContainerRefs.current[card.id] = e)
									}
									onClick={(e) => handleCardClick(e, card.id)}
									onMouseEnter={() => {
										setViewedCardId(card.id);
									}}
									onTouchStart={() => {
										setViewedCardId(card.id);
									}}
									onMouseLeave={() => setViewedCardId(false)}
									onTouchEnd={() => setViewedCardId(false)}
								>
									{/* CONTENT div */}
									<div
										className={`${styles.priorityCard} primaryFont`}
										id={card?.name}
										style={{
											height: `${
												cardHeigthVh
													? card?.styles?.heightVh
													: card?.styles?.height
											}`,
											backgroundColor: `${card?.styles?.backgroundColor}`,
										}}
									>
										<Task
											taskArr={card.content}
											cardId={card.id}
										/>
									</div>

									{/* card ribbon */}
									<div
										className={`${styles.cardBottomRibbon} flex `}
										style={{
											backgroundColor: `${card?.styles?.ribbonBg}`,
										}}
									>
										{/* heading */}
										<p
											className={`${styles.cardHeading} primaryFontSemiBold`}
											style={{
												backgroundColor: `${card?.styles?.buttonBg}`,
												color: `${card?.styles.fontColor}`,
											}}
										>
											{card?.heading}
										</p>

										<div
											className={`${styles.cardEditBtn} flex`}
											style={{
												backgroundColor: `${card?.styles?.buttonBg}`,
											}}
										>
											{viewedCardId === card.id ? (
												<FaArrowRightLong
													fill={`${
														card?.styles
															?.fontColor ||
														"#1e1e1e"
													} `}
													className="iconSizeVerySmall"
												/>
											) : (
												<FaArrowRightLong
													fill={`${
														card?.styles
															?.fontColor ||
														"#1e1e1e"
													} `}
													className="iconSizeSmall"
												/>
											)}
										</div>
									</div>
								</div>
							</Link>
							{/* ADD TASKS BTN */}
						</Fragment>
					);
				})}
			</div>
		</>
	);
}

PriorityCardLink.propTypes = {
	cardsData: PropTypes.array.isRequired,
};
