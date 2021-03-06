import sinon from 'sinon';
import {mount, shallow} from 'enzyme';
import React from 'react';

import Scroller, {ScrollerBase} from '../Scroller';

describe('Scroller', () => {
	let contents;

	beforeEach(() => {
		contents = (
			<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt. Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
			</div>
		);
	});

	afterEach(() => {
		contents = null;
	});

	describe('Scrollbar visibility', () => {
		it('should render both horizontal and vertical scrollbars when \'horizontalScrollbar\' and \'verticalScrollbar\' are "visible"', () => {
			const subject = mount(
				<Scroller
					horizontalScrollbar="visible"
					verticalScrollbar="visible"
				>
					{contents}
				</Scroller>
			);

			const expected = 2;
			const actual = subject.find('Scrollbar').length;

			expect(actual).to.equal(expected);
		});

		it('should render only vertical scrollbar when \'verticalScrollbar\' is "visible" and \'horizontalScrollbar\' is "hidden"', () => {
			const subject = mount(
				<Scroller
					horizontalScrollbar="hidden"
					verticalScrollbar="visible"
				>
					{contents}
				</Scroller>
			);

			const expected = 1;
			const actual = subject.find('Scrollbar').length;

			expect(actual).to.equal(expected);
		});

		it('should not render any scrollbar when when \'horizontalScrollbar\' and \'verticalScrollbar\' are "hidden"', () => {
			const subject = mount(
				<Scroller
					horizontalScrollbar="hidden"
					verticalScrollbar="hidden"
				>
					{contents}
				</Scroller>
			);

			const expected = 0;
			const actual = subject.find('Scrollbar').length;

			expect(actual).to.equal(expected);
		});
	});

	describe('Scrollbar accessibility', () => {
		it('should set "aria-label" to previous scroll button in the horizontal scroll bar', function () {
			const label = 'custom button aria label';
			const subject = mount(
				<Scroller
					horizontalScrollbar="visible"
					scrollLeftAriaLabel={label}
					verticalScrollbar="visible"
				>
					{contents}
				</Scroller>
			);

			const expected = label;
			const actual = subject.find('ScrollButton').at(2).prop('aria-label');

			expect(actual).to.equal(expected);
		});

		it('should set "aria-label" to next scroll button in the horizontal scroll bar', function () {
			const label = 'custom button aria label';
			const subject = mount(
				<Scroller
					horizontalScrollbar="visible"
					scrollRightAriaLabel={label}
					verticalScrollbar="visible"
				>
					{contents}
				</Scroller>
			);

			const expected = label;
			const actual = subject.find('ScrollButton').at(3).prop('aria-label');

			expect(actual).to.equal(expected);
		});

		it('should set "aria-label" to previous scroll button in the vertical scroll bar', function () {
			const label = 'custom button aria label';
			const subject = mount(
				<Scroller
					horizontalScrollbar="visible"
					verticalScrollbar="visible"
					scrollUpAriaLabel={label}
				>
					{contents}
				</Scroller>
			);

			const expected = label;
			const actual = subject.find('ScrollButton').at(0).prop('aria-label');

			expect(actual).to.equal(expected);
		});

		it('should set "aria-label" to next scroll button in the vertical scroll bar', function () {
			const label = 'custom button aria label';
			const subject = mount(
				<Scroller
					horizontalScrollbar="visible"
					verticalScrollbar="visible"
					scrollDownAriaLabel={label}
				>
					{contents}
				</Scroller>
			);

			const expected = label;
			const actual = subject.find('ScrollButton').at(1).prop('aria-label');

			expect(actual).to.equal(expected);
		});
	});

	describe('ScrollerBase API', () => {
		it('should call onUpdate when Scroller updates', function () {
			const handleUpdate = sinon.spy();
			const subject = shallow(
				<ScrollerBase
					onUpdate={handleUpdate}
				>
					{contents}
				</ScrollerBase>
			);

			subject.setProps({children: ''});

			const expected = true;
			const actual = handleUpdate.calledOnce;

			expect(expected).to.equal(actual);
		});
	});
});
