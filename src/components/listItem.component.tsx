import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Avatar,
  ListItem as ListItemComponent,
  ListItemProps,
} from 'react-native-elements';

const ListItem = (props: ListItemProps) => {
  const leftAvatar = props.leftAvatar;
  const rightElement = props.rightElement;
  return (
    <ListItemComponent
      containerStyle={styles.containerStyle}
      contentContainerStyle={styles.contentContainerStyle}
      style={[styles.container, props.style]}
      {...props}>
      <Avatar rounded source={leftAvatar.source} size={leftAvatar.size} />
      <ListItemComponent.Content>
        <ListItemComponent.Title style={styles.titleStyle}>
          {props.title}
        </ListItemComponent.Title>
        <ListItemComponent.Subtitle style={styles.subtitleStyle}>
          {props.subtitle}
        </ListItemComponent.Subtitle>
      </ListItemComponent.Content>
      {rightElement}
    </ListItemComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  titleStyle: {
    color: '#8B1D1F',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitleStyle: {color: '#06313E', fontSize: 14, paddingTop: 5},
  containerStyle: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  contentContainerStyle: {
    paddingBottom: 10,
  },
});

export default ListItem;
