import { useLockBodyScroll } from "@uidotdev/usehooks";
import styles from "./Loading.module.scss";

export default function Loading() {
	useLockBodyScroll();
	return (
		<>
			<div
				role="loading"
				className={`${styles.loadingWrapper} center`}
				tabIndex={-1}
			>
				<div className={`${styles.loading} center`}>
					<div className={`${styles.loadingInnerYellow}`}></div>
					<div className={`${styles.appTitle} displayFont`}>
						four priority
					</div>
				</div>
			</div>
		</>
	);
}
