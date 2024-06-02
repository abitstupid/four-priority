import NavbarWebsite from "../../components/NavbarWebsite/NavbarWebsite";
import styles from "./whatWebsite.module.scss";
import Button from "../../../components/Buttons/Button";
import { Link } from "react-router-dom";

export default function WhatWebsite() {
	const straightPhoneImg = "/assets/website/images/phone-straight.png";

	return (
		<>
			<div className={`${styles.whatWrapper} flex column `}>
				<header className={`${styles.heroHeader} heroHeader`}>
					<h1 className={` websitePageHeading primaryFontBold`}>
						What{" "}
						<span className={`websitePageHeadingSpan primaryFont`}>
							is Four Priority ?
						</span>
					</h1>
					<NavbarWebsite />
				</header>

				<section className={`${styles.whatContent} flex`}>
					<div
						className={`${styles.whatTextWrapper} ${styles.whatTextWrapperLeft}`}
					>
						<p>
							4P is a{" "}
							<span className={`styleUnderline`}>HYBRID</span> to
							do app
						</p>
						<p>
							It lets you{" "}
							<span className={`styleBackground`}>organize</span>{" "}
							to-dos according to your priorities
						</p>
					</div>
					<div
						className={`${styles.whatImgWrapper} ${styles.whatImgWrapper}`}
					>
						<img
							className={`${styles.whatImg}`}
							src={straightPhoneImg}
							alt="Phone displaying the home screen of the Four Priority app with a list of tasks"
						/>
					</div>
					<div
						className={`${styles.whatTextWrapper} ${styles.whatTextWrapperRight}`}
					>
						<p>
							Desinged to{" "}
							<span className={`styleUnderline`}>increase</span>{" "}
							your{" "}
							<span className={`styleUnderline`}>
								productivity
							</span>
						</p>
						<p>
							Helps you{" "}
							<span className={`styleBackground`}>reduce</span>{" "}
							the{" "}
							<span className={`styleBackground`}>
								complexity
							</span>{" "}
							in your day-to-day tasks
						</p>
					</div>
				</section>
				<Link to={"/app"}>
					<Button
						padding="36"
						type="rect"
						variant="secondary"
						text={"Go To App"}
					/>
				</Link>
			</div>
		</>
	);
}
