import React from 'react';
import {mount} from 'enzyme';
import Uppercase from '../Uppercase';
import {updateLocale} from '../../locale';

describe('Uppercase', () => {

	// Suite-wide setup

	it('should uppercase content when it contains a single string child', function () {
		const Component = (props) => (
			<div>{props.children}</div>
		);
		const Wrapped = Uppercase(Component);
		const subject = mount(
			<Wrapped>uppercase</Wrapped>
		);

		const expected = 'UPPERCASE';
		const actual = subject.text();

		expect(actual).to.equal(expected);
	});

	it('should not uppercase content when casing is "preserve"', function () {
		const Component = (props) => (
			<div>{props.children}</div>
		);
		const Wrapped = Uppercase(Component);
		const subject = mount(
			<Wrapped casing="preserve">uppercase</Wrapped>
		);

		const expected = 'uppercase';
		const actual = subject.text();

		expect(actual).to.equal(expected);
	});

	it('should uppercase the first letter of each word when casing is "word"', function () {
		const Component = (props) => (
			<div>{props.children}</div>
		);
		const Wrapped = Uppercase(Component);
		const subject = mount(
			<Wrapped casing="word">uppercase uppercase uppercase</Wrapped>
		);

		const expected = 'Uppercase Uppercase Uppercase';
		const actual = subject.text();

		expect(actual).to.equal(expected);
	});

	it('should uppercase the first letter of the first word when casing is "sentence"', function () {
		const Component = (props) => (
			<div>{props.children}</div>
		);
		const Wrapped = Uppercase(Component);
		const subject = mount(
			<Wrapped casing="sentence">uppercase uppercase uppercase</Wrapped>
		);

		const expected = 'Uppercase uppercase uppercase';
		const actual = subject.text();

		expect(actual).to.equal(expected);
	});

	it('should uppercase content when it contains multiple children', function () {
		const Component = (props) => (
			<div>{props.children}</div>
		);
		const Wrapped = Uppercase(Component);
		const subject = mount(
			<Wrapped>
				{[
					'uppercase',
					'uppercase'
				]}
			</Wrapped>
		);

		const expected = 'UPPERCASEUPPERCASE';
		const actual = subject.text();

		expect(actual).to.equal(expected);
	});

	it('should not uppercase content when it contains a single non-string child', function () {
		const Component = (props) => (
			<div>{props.children}</div>
		);
		const Wrapped = Uppercase(Component);
		const subject = mount(
			<Wrapped>
				<span>uppercase</span>
			</Wrapped>
		);

		const expected = 'uppercase';
		const actual = subject.text();

		expect(actual).to.equal(expected);
	});

	it('should uppercase non-latin locales correctly', function () {
		// This is difficult to truly unit test because we need a character set we know ilib
		// uppercases correctly but String.prototype.toUpperCase doesn't.

		updateLocale('fr-FR');

		const Component = (props) => (
			<div>{props.children}</div>
		);
		const Wrapped = Uppercase(Component);
		const subject = mount(
			<Wrapped>àçèìñòù</Wrapped>
		);

		const expected = 'ÀÇÈÌÑÒÙ';
		const actual = subject.text();

		updateLocale();

		expect(actual).to.equal(expected);
	});

});
