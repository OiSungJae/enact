import React from 'react';
import ExpandableList from '@enact/moonstone/ExpandableList';
import Changeable from '@enact/ui/Changeable';
import Scroller from '@enact/moonstone/Scroller';

const StatefullExpandableList = Changeable({change: 'onSelect', prop: 'selected'}, ExpandableList);

const itemData = [];
for (let i = 0; i < 100; i++) {
	itemData.push(`Item ${i}`);
}

import {storiesOf} from '@kadira/storybook';
import {withKnobs} from '@kadira/storybook-addon-knobs';

storiesOf('Scroller')
	.addDecorator(withKnobs)
	.addWithInfo(
		'With ExpandableList',
		() => (
			<Scroller
				style={{height: '600px'}}
			>
				<StatefullExpandableList
					closeOnSelect
					title="Expandable List in Scroller"
				>
					{itemData}
				</StatefullExpandableList>
			</Scroller>
		)
	);