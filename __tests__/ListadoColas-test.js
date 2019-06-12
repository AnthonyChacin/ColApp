import 'react-native';

import React from 'react';
import ListadoColas from '../src/components/ListadoColas';

test('verificación de colas obtenidas', () => {
	let DataGet = renderer.create(<ListadoColas />).getInstance();

	expect(DataGet._getColas()).toEqual(true)
})