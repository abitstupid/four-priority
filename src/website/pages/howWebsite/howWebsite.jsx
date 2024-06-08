import { Link } from "react-router-dom";
import NavbarWebsite from "../../components/NavbarWebsite/NavbarWebsite";
import "./../../../styles/scss/website.scss";
import styles from "./howWebsite.module.scss";
import Button from "../../../components/Buttons/Button";
import Task from "../../../components/Task/Task";

export default function HowWebsite() {
	const howImage = "/assets/website/images/phone-straight.png";
	const WEBSITE_CARD_ID = 89;
	const tasks = {
		p1: [
			{
				id: 0,
				taskName:
					"Write 1 - 2 (max) Tasks in Priority 1 and do not move to Priority 2 unless 80% of Priority 1 is resolved",
			},
		],
		p2: [
			{
				id: 1,
				taskName:
					"Write 1 - 2 (max) Tasks in Priority 2 and do not move to Priority 3 unless 100% of Priority 2 is resolved",
			},
		],
		p3: [
			{
				id: 2,
				taskName:
					"Write 1 (max) Tasks in Priority 3 and do not move to Others unless 100% of Priority 3 is resolved",
			},
		],
		other: [
			{
				id: 3,
				taskName:
					"Write small tasks here are not important but needed to be done nevertheless.",
			},
		],
	};
	return (
		<>
			<main className={`${styles.howWrapper} flex column`}>
				<header className={`${styles.heroHeader} heroHeader`}>
					<h1 className={`websitePageHeading primaryFontBold`}>
						How{" "}
						<span className={`websitePageHeadingSpan primaryFont`}>
							to use Four Priority ?
						</span>
					</h1>
					<NavbarWebsite />
				</header>

				<section className={`${styles.howContent} flex`}>
					<div className={`${styles.howImgWrapper} flex column`}>
						<img
							className={`${styles.howImg}`}
							src={howImage}
							alt="Phone displaying the home screen of the Four Priority app with a list of tasks."
						/>
						<Link to={"/todo"}>
							<Button
								padding="36"
								type="rect"
								variant="secondary"
								text={"Go To App"}
							/>
						</Link>
					</div>
					<div className={`${styles.howTextWrapper} flex`}>
						<div className={`${styles.priorityCardHowWrapper}`}>
							<div
								className={`${styles.priorityCardHow} ${styles.priorityCardHow1}`}
							>
								<Task
									taskArr={tasks.p1}
									cardId={WEBSITE_CARD_ID}
									showButtons={false}
								/>
							</div>
						</div>
						<div className={`${styles.priorityCardHowWrapper} `}>
							<div
								className={`${styles.priorityCardHow} ${styles.priorityCardHow2}`}
							>
								<Task
									taskArr={tasks.p2}
									cardId={WEBSITE_CARD_ID}
									showButtons={false}
								/>
							</div>
						</div>
						<div className={`${styles.priorityCardHowWrapper}`}>
							<div
								className={`${styles.priorityCardHow} ${styles.priorityCardHow3}`}
							>
								<Task
									taskArr={tasks.p3}
									cardId={WEBSITE_CARD_ID}
									showButtons={false}
								/>
							</div>
						</div>
						<div className={`${styles.priorityCardHowWrapper}`}>
							<div
								className={`${styles.priorityCardHow} ${styles.priorityCardHow4}`}
							>
								<Task
									taskArr={tasks.other}
									cardId={WEBSITE_CARD_ID}
									showButtons={false}
								/>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
