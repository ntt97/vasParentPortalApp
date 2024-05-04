import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem as ListItemComponent, ListItemProps } from 'react-native-elements';

const ListItem = (props : ListItemProps) => {
    return (
        <ListItemComponent
            containerStyle={styles.containerStyle}
            contentContainerStyle={styles.contentContainerStyle}
            titleStyle={styles.titleStyle}
            subtitleStyle={styles.subtitleStyle}
            style={[styles.container, props.style]}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    titleStyle: {
        color: '#8B1D1F',
        fontSize: 18,
        fontWeight: 'bold'
    },
    subtitleStyle: { color: '#06313E', fontSize: 14, paddingTop: 5 },
    containerStyle: {
        paddingTop: 16,
        paddingBottom: 16,
    },
    contentContainerStyle: {
        paddingBottom: 10
    }
})

export default ListItem;