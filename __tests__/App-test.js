/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Se renderiza correctamente el App.js', () => {
  	const FirstComponent = renderer.create(<App />).toJSON();
	expect(FirstComponent).toMatchSnapshot();
});

