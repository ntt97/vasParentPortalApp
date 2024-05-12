import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, ListItemProps, Avatar} from 'react-native-elements';
import {ViewVertical} from 'components/viewBox.component';
import {PROFILE_DEFAULT} from 'assets';
import BaseService from 'services/';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'constants/colors';
import Text from '@components/text.component';
import {strings} from 'utils/i18n';
import NavigationActionsService from 'utils/navigation';
import {STUDENT_PROFILE, STUDENT_INFORMATION} from 'constants/index';

const AsyncListItem = ({item, index}: any) => {
  const [base, setBase] = useState('');

  useEffect(() => {
    getAvatar();
  }, [item.studentId]);

  const getAvatar = async () => {
    if (item.student && item.student.avatar) {
      const base = await BaseService.instance.user.getAvatar(
        item.student.avatar,
      );
      setBase(base);
    }
  };

  const leftElement = (item: any) => {
    return (
      <ViewVertical>
        <Avatar
          size={60}
          rounded
          source={
            item && item.avatar
              ? {uri: `data:image/*;base64,${base}`}
              : PROFILE_DEFAULT
          }
        />
        <Icon
          color={item.status ? colors.active : colors.inactive}
          name="brightness-1"
          size={20}
          style={styles.icon}
        />
      </ViewVertical>
    );
  };

  const rightElement = (status: boolean) => {
    return status ? (
      <Text style={styles.active}>{strings('studentList_labelActive')}</Text>
    ) : (
      <Text style={styles.inactive}>
        {strings('studentList_labelInActive')}
      </Text>
    );
  };

  return (
    <ListItem
      key={index}
      bottomDivider
      onPress={() => {
        NavigationActionsService.push(STUDENT_INFORMATION, {
          studentId: item.studentId,
          studentName: item.student.fullname,
        });
      }}>
      {leftElement(item.student)}
      <ListItem.Content>
        <ListItem.Title>{item.student.fullname}</ListItem.Title>
        <ListItem.Subtitle>
          {item.student.gradeClass ? item.student.gradeClass.name : ''}
        </ListItem.Subtitle>
      </ListItem.Content>
      {rightElement(item.student.status)}
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  drawerIcon: {top: 8, width: 20, height: 20},
  icon: {
    position: 'absolute',
    bottom: -3,
    right: -3,
  },
  active: {
    fontSize: 14,
    color: colors.active,
  },
  inactive: {
    fontSize: 14,
    color: colors.inactive,
  },
});

export default AsyncListItem;
