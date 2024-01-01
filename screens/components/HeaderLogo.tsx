import {View, Image, Text} from 'react-native';

function HeaderLogo() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
      <Image
        style={{width: 30, height: 30}}
        source={require('./favicon.png')}
      />
      <Text style={{color: 'white', padding: 5, fontSize: 22}}>Test App</Text>
    </View>
  );
}

export default HeaderLogo;
