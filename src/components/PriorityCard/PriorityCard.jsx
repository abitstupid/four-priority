import { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import styles from "./PriorityCard.module.scss";
import { Link } from "react-router-dom";
import { AiOutlineFullscreen } from "react-icons/ai";
import Button from "../Buttons/Button";
import Task from "../Task/Task";

export default function PriorityCardLink({ cardsData }) {
	const [cardsDataState, setCardsDataState] = useState(cardsData);
	const [viewedCardId, setViewedCardId] = useState(false);
	const cardContainerRefs = useRef([]);

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
											height: `${card?.styles?.height}`,
											backgroundColor: `${card?.styles?.backgroundColor}`,
										}}
									>
										<Task
											taskArr={card.content}
											cardId={card.id}
										/>
									</div>
									{/* heading */}
									<p
										className={`${styles.cardHeading} primaryFontSemiBold`}
									>
										{card?.heading}
									</p>

									<span className={`${styles.cardEditBtn}`}>
										<Button
											variant={card?.styles?.btnVariant}
											type="squareSmall"
										>
											{viewedCardId === card.id ? (
												<AiOutlineFullscreen
													fill={`${
														card?.styles
															?.iconFill ||
														"#1e1e1e"
													} `}
													className="iconSizeVerySmall"
												/>
											) : (
												<AiOutlineFullscreen
													fill={`${
														card?.styles
															?.iconFill ||
														"#1e1e1e"
													} `}
													className="iconSizeSmall"
												/>
											)}
										</Button>
									</span>
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
