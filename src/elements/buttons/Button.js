import PropTypes from "prop-types"

import PrimaryButton from "./variants/PrimaryButton"
import PrimaryTextButton from "./variants/PrimaryTextButton"
import SecondaryButton from "./variants/SecondaryButton"
import SelectableButton from "./variants/SelectableButton"
import RemoveButton from "./variants/RemoveButton"
import TertiaryButton from "./variants/TertiaryButton"

const Button = ({ variant, ...props }) => {
	switch (variant) {
		case "primary":
			return <PrimaryButton {...props} />
		case "secondary":
			return <SecondaryButton {...props} />
		case "tertiary":
			return <TertiaryButton {...props} />
		case "primaryText":
			return <PrimaryTextButton {...props} />
		case "selectable":
			return <SelectableButton {...props} />
		case "remove":
			return <RemoveButton {...props} />
		default:
			return null
	}
}

Button.propTypes = {
	layout: PropTypes.oneOf([
		"primary",
		"primaryText",
		"secondary",
		"selectable",
		"remove",
	]),
	rounded: PropTypes.oneOf(["sm", "md", "lg", "full"]),
	disabled: PropTypes.bool,
}

export default Button
