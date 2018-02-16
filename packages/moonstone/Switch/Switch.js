/**
 * Provides Moonstone-themed pill-shaped toggle switch component with interactive togglable
 * capabilities.
 *
 * @example
 * <Switch />
 *
 * @module moonstone/Switch
 * @exports Switch
 * @exports SwitchBase
 */

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import ToggleIcon from '../ToggleIcon';

import componentCss from './Switch.less';

/**
 * Renders the base level DOM structure of the component.
 *
 * @class Switch
 * @memberof moonstone/Switch
 * @extends moonstone/ToggleIcon.ToggleIcon
 * @ui
 * @public
 */
const SwitchBase = kind({
	name: 'Switch',

	propTypes: /** @lends moonstone/Switch.Switch.prototype */ {
		/**
		 * Sets whether this control is animated during change.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool
	},

	defaultProps: {
		noAnimation: false
	},

	styles: {
		css: componentCss
	},

	computed: {
		className: ({noAnimation, styler}) => styler.append({
			animated: !noAnimation
		})
	},

	render: (props) => {
		delete props.noAnimation;

		return (
			<ToggleIcon
				{...props}
				css={props.css}
			>
				circle
			</ToggleIcon>
		);
	}
});

export default SwitchBase;
export {
	SwitchBase as Switch,
	SwitchBase
};
