import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../style';

export const SortItemButton = ({ children, onPress }) => (
	<TouchableOpacity
		style={styles.sortItemButton}
		onPress={onPress}
	>
		{children}
	</TouchableOpacity>
);

SortItemButton.propTypes = {
	theme: PropTypes.string,
	children: PropTypes.node,
	onPress: PropTypes.func
};

export const SortItemContent = ({
	label, checked
}) => (
	<View style={styles.sortItemContainer}>
		{checked ? <MaterialCommunityIcons name={'checkbox-marked-outline'} size={24}/> :  <MaterialCommunityIcons name={'checkbox-blank-outline'} size={24}/>}
		<Text style={styles.sortItemText}>{label}</Text>
	</View>
);

SortItemContent.propTypes = {
	label: PropTypes.string,
	checked: PropTypes.bool
};
