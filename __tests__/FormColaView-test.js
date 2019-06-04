/**
 * @format
 */

import 'react-native';

import React from 'react';
import FormColaView from '../src/components/FormColaView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Se renderiza correctamente el formulario donde se pedirá la cola', () => {

  	var ColaData = renderer.create(<FormColaView />).toJSON()
	expect(ColaData).toMatchSnapshot();
});

test('verificación del envío de datos del formulario para pedir cola', () => {
	let DataPost = renderer.create(<FormColaView />).getInstance();

	expect(DataPost.submit()).toEqual(true)
})
