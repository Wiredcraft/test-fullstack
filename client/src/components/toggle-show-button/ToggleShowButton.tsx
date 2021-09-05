import * as React from "react";
import "./toggle-show-button.css";

type InputProps = {
	show: boolean
	text: string;
	href?: string;
	onClick?: Function;
};

function ToggleShowButton(props: InputProps) {
	const { show, text, href, onClick = () => null } = props;

	if (show) {
		return (
			<a
				className="toggle-show-button"
				href={href}
				onClick={() => onClick()}
			>{text}
			</a>
		);
	}

	return <></>;
}

export default ToggleShowButton;