import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "./PriorityCard.module.scss";
import { Link } from "react-router-dom";
import { MdOutlineModeEdit } from "react-icons/md";

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
										className={`${styles.priorityCard} primaryFont`}
										id={card?.name}
										style={{
											height: `${card?.styles?.height}`,
											backgroundColor: `${card?.styles?.backgroundColor}`,
										}}
										dangerouslySetInnerHTML={{
											__html: card?.content,
										}}
									></div>
									<p
										className={`${styles.cardHeading} primaryFontSemiBold`}
									>
										{card?.heading}
									</p>

									<span
										className={`${styles.cardEditBtn} btn ${
											card?.styles?.btnClass ||
											"btnSecondary"
										} `}
									>
										<MdOutlineModeEdit
											fill={`${
												card?.styles?.iconFill ||
												"#ffffff"
											}`}
											className="iconSizeSmall"
										/>
									</span>
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
