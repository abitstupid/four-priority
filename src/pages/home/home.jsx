import BottomNav from "../../components/BottomNav/BottomNav";
import TopNav from "../../components/TopNav/TopNav";
import data from "./../../data.json";

export default function Home() {
	const HOME_CARD_ID = data.cardIds.HOME_CARD_ID;
	return (
		<>
			<TopNav cardId={HOME_CARD_ID} />
			<BottomNav />
		</>
	);
}
