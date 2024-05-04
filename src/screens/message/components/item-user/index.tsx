import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from './styles';

let onValueChange: any;

const ItemUserChannel = (props: any) => {
  // const [userChat, setUserChat] = useState({ isOnline: 0 });
  // const getInfoUser = async (id: string) => {
  //   onValueChange = database().ref(`${appString.USERS}/${id}`)
  //     .on('value', snapshot => {
  //       if (snapshot && snapshot.val()?.isOnline) {
  //         setUserChat({ isOnline: snapshot.val().isOnline })
  //       }
  //     });ß
  // }

  // useEffect(() => {
  //   // getInfoUser(props.item.id);
  //   return () => {
  //     database().ref(`${appString.USERS}/${props.item.id}`)
  //       .off('value', onValueChange)
  //   }
  // }, []);

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => props.onHandlePress(props.item)}>
      <View style={{ display: 'flex', flex: 1 }}>
        <View style={styles.itemLeft}>
          {props.item.photoUrl ? (<Avatar
            size={65}
            avatarStyle={styles.tinyLogo}
            source={{ uri: `data:image/*;base64,${props.item.photoUrl}` }}
          />) : (<View style={styles.textLogo}><Text style={{ color: 'white', fontWeight: 'bold' }}>{getInitials(props.item.nickName)}</Text></View>)
          }

        </View>
        {/* {userChat.isOnline ? (<View style={styles.active}></View>) : (null)} */}
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.txtName}>{capitalizeFirstLetter(props?.item?.nickName || "")}</Text>
        <Text style={{ color: 'gray', fontSize: 12 }} numberOfLines={1}>{capitalizeFirstLetter(props?.item?.studentFullName || "")}</Text>
        <Text style={{ color: 'gray', fontSize: 12 }} numberOfLines={1}>{props?.item?.className || ""}</Text>
       
      </View>
    </TouchableOpacity>
  );
};

export default ItemUserChannel;

function capitalizeFirstLetter(string: string) {
  return string.replace(/[^\s]+/g, function (str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
  });
}
function getInitials(str: string) {
  let names = str.split(' '),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};