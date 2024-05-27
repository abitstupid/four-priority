import { Fragment, useState } from "react";
import styles from "./NavbarWebsite.module.scss";
import data from "./../../../data.json";
import appImageStraight from "/assets/website/images/phone-straight.png";
import { Link } from "react-router-dom";
import Button from "../../../components/Buttons/Button";

export default function NavbarWebsite() {
	const DATA = data;

	const [showNav, setShowNav] = useState(false);

	return (
		<section className={`${styles.navbarWrapper} flex`}>
			<div
				className={`${styles.navButton} ${
					showNav ? styles.navButtonActive : ""
				}`}
				role="button"
				onClick={() => setShowNav((prev) => !prev)}
			></div>
			{showNav && (
				<div className={`${styles.navbarContentWrapper} flex`}>
					<nav
						className={`${styles.navbar} ${
							showNav ? styles.navbarActive : ""
						} flex`}
					>
						<div className={`${styles.appDisplay}`}>
							<img
								src={appImageStraight}
								alt="Phone displaying the home screen of the Four Priority app with a list of tasks"
							/>
							<Link to={"/app"}>
								<Button
									padding="36"
									type="rect"
									variant="secondary"
									text={"Go To App"}
									onClick={() => setShowNav(false)}
								/>
							</Link>
						</div>
						<div className={`${styles.navLinks} flex `}>
							<Link
								to="/"
								rel="noreferrer"
							>
								<div
									className={`${styles.homeBtn} flex column primaryFontBold`}
									onClick={() => setShowNav(false)}
								>
									<span>H</span>
									<span>O</span>
									<span>M</span>
									<span>E</span>
								</div>
							</Link>
							<div className={`${styles.navListWrapper} flex`}>
								<ul className={`${styles.navList} flex column`}>
									{DATA.website.nav.map((item) => {
										return (
											<Fragment key={item.id}>
												<Link
													to={item.route}
													rel="noreferrer"
												>
													<li
														onClick={() =>
															setShowNav(false)
														}
														className={`${styles.navListItem} flex`}
													>
														<span
															className={`${styles.bigText} primaryFontBold`}
														>
															{item.big}
														</span>{" "}
														<span
															className={`${styles.littleText} primaryFont`}
														>
															{item.small}
														</span>
													</li>
												</Link>
											</Fragment>
										);
									})}
								</ul>
							</div>
						</div>
					</nav>
				</div>
			)}
		</section>
	);
}
