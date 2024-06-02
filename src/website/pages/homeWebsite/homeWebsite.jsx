import { Link } from "react-router-dom";
import Button from "../../../components/Buttons/Button";
import styles from "./homeWebsite.module.scss";
import NavbarWebsite from "../../components/NavbarWebsite/NavbarWebsite";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";

export default function HomeWebsite() {
	const heroImagePath = "/assets/website/images/phone-slant.png";

	const [showNav, setShowNav] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// LOADING
	useEffect(() => {
		const firstVisit = localStorage.getItem("firstVisit");

		if (!firstVisit) {
			setTimeout(() => {
				setIsLoading(false);
				localStorage.setItem("firstVisit", "true");
			}, 3500);
		} else {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setShowNav(true);
		}, 2000);
	}, []);

	return isLoading ? (
		<Loading />
	) : (
		<div>
			<section className={`${styles.heroWrapper} flex column`}>
				<header className={`${styles.heroHeader} heroHeader navOnly`}>
					{showNav && <NavbarWebsite />}
				</header>

				<div className={`${styles.hero} flex column`}>
					<div className={`${styles.heroImageWrapper}`}>
						<img
							className={`${styles.heroImage}`}
							src={heroImagePath}
							alt="Phone displaying the home screen of the Four Priority app with a list of tasks"
						/>
					</div>
					<div className="heroNavWrapper"></div>
					<h1 className={`${styles.heroText} primaryFontMedium`}>
						This is not a normal To-Do app
					</h1>
				</div>
				<Link to={"/app"}>
					<Button
						padding="36"
						type="rect"
						variant="secondary"
						text={"Go To App"}
					/>
				</Link>
			</section>
		</div>
	);
}
