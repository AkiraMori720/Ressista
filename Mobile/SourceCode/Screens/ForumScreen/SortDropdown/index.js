import React from 'react';
import {
	TouchableWithoutFeedback,View
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../style';
import { SortItemButton, SortItemContent } from './Item';
import {FILTER_BOOKMARKED_BY_ME, FILTER_POSTED_BY_ME} from '../ForumScreen';

class Sort extends React.Component {
	static propTypes = {
		filters: PropTypes.array,
		close: PropTypes.func,
		onChangeFilters: PropTypes.func,
	}

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState){
		return true;
	}

	toggleCheckFilter = (filter) => {
		return () => {
			const { filters, onChangeFilters } = this.props;

			let newFilters = filters;
			if(filters.includes(filter)){
				newFilters = filters.filter(item => item !== filter);
			} else {
				newFilters.push(filter);
			}

			onChangeFilters(newFilters);
		}
	};


	close = () => {
		const { close } = this.props;
		close();
	}

	render() {
		const {
			filters
		} = this.props;

		return (
			<>
				<TouchableWithoutFeedback onPress={this.close}>
					<View style={[styles.backdrop, { opacity: 0 }]} />
				</TouchableWithoutFeedback>
				<View
					style={[
						styles.dropdownContainer,
					]}
				>
					<SortItemButton onPress={this.toggleCheckFilter(FILTER_POSTED_BY_ME)}>
						<SortItemContent
							label='Posted by me'
							checked={filters.includes(FILTER_POSTED_BY_ME)}
						/>
					</SortItemButton>
					<SortItemButton onPress={this.toggleCheckFilter(FILTER_BOOKMARKED_BY_ME)}>
						<SortItemContent
							label='Bookmarked by me'
							checked={filters.includes(FILTER_BOOKMARKED_BY_ME)}
						/>
					</SortItemButton>
				</View>
			</>
		);
	}
}

export default Sort;
