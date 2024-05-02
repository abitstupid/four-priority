import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "./PriorityCard.module.scss";
import { Link } from "react-router-dom";

export default function PriorityCardLink({ cardsData }) {
	const [cardsDataState, setCardsDataState] = useState(cardsData);

	useEffect(() => {
		setCardsDataState(cardsData);
	}, [cardsData]);

	return (
		<>
			<div className={`${styles.priorityCardWrapper}`}>
				{cardsDataState.map((card) => {
					return (
						<Fragment key={card.id}>
							<Link
								to={`/editor?content=${encodeURIComponent(
									JSON.stringify(card)
								)}&id=${card.id}`}
							>
								<div
									className={`${styles.cardContainer}`}
									style={{ position: "relative" }}
								>
									<div
										className={`${styles.priorityCard}`}
										id={card?.name}
										style={{
											height: `${card?.styles?.height}`,
										}}
										dangerouslySetInnerHTML={{
											__html: card?.content,
										}}
									></div>
									<p className={`${styles.cardHeading}`}>
										{card?.heading}
									</p>
								</div>
							</Link>
						</Fragment>
					);
				})}
			</div>
		</>
	);
}

PriorityCardLink.propTypes = {
	cardsData: PropTypes.array,
};
