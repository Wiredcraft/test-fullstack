import * as React from "react";
import "./toggle-show-button.css";

type InputProps = {
	show: boolean
	text: string;
	href?: string;
}

function ToggleShowButton(props: InputProps) {
	const { show, text, href } = props;

	if (show) {
		return (
			<a
				className="toggle-show-button"
				href={href}
			>{text}
			</a>
		)
	}

	return <></>
}

export default ToggleShowButton;