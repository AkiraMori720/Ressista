import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import colors from '../../Assets/Colors/colors';
import MapView, {Marker} from 'react-native-maps';

class SetLocationScreen extends React.Component{
    static navigationOptions = {
        title : "Set Location"
    };

    constructor(props) {
        super(props);
        let position = props.route.params.position??{};
        this.state = {
            region: {
                ...position
            },
            coordinate: {
                latitude: position?.latitude,
                longitude: position?.longitude
            }
        }
    }

    onRegionChange = (region) => {
        console.log('region', region);
    }

    render() {
        const { coordinate, region } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.app_background}
                    translucent={false}
                />
                <MapView
                    region={region}
                    onRegionChange={this.onRegionChange}
                >
                    <Marker
                        draggable
                        coordinate={coordinate}
                        onDragEnd={(e) => this.setState({ coordinate: e.nativeEvent.coordinate })}
                        />
                </MapView>
            </View>
        );
    }
}

export default SetLocationScreen;
