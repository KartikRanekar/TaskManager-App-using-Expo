import { View } from 'react-native';

const Spacer = ({ children, style }) => (
  <View style={[{ marginVertical: 10 }, style]}>{children}</View>
);

export default Spacer;