import PriorityCardLink from "../../components/PriorityCard/PriorityCardLink";
import PropTypes from "prop-types";
// import styles from "./home.module.scss";
import BottomNav from "../../components/BottomNav/BottomNav";
import TopNav from "../../components/TopNav/TopNav";

export default function Home({ cardsData }) {
	const HOME_CARD_ID = 99;
	return (
		<>
			<TopNav cardId={HOME_CARD_ID} />
			{/* Bottom Nav */}
			<BottomNav />
			<PriorityCardLink cardsData={cardsData} />
		</>
	);
}

Home.propTypes = {
	cardsData: PropTypes.array,
};
