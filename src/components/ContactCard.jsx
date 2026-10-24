import { View, Text, StyleSheet } from 'react-native';

export default function ContactCard({ nombre, apellido, edad, telefono, correo, temaOscuro }) {
  return (
    <View style={[ styles.card, { backgroundColor: temaOscuro ? '#303030' : '#ded0b9' } ]}>
      <Text style={[styles.nameText, { color: temaOscuro ? '#ffffff' : '#342601' }]}>{nombre} {apellido}</Text>
      <Text style={[styles.infoText, { color: temaOscuro ? '#dddddd' : '#342601' }]}>Edad: {edad}</Text>
      <Text style={[styles.infoText, { color: temaOscuro ? '#dddddd' : '#342601' }]}>Tel: {telefono}</Text>
      <Text style={[styles.infoText, { color: temaOscuro ? '#dddddd' : '#342601' }]}>Correo: {correo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    width: '100%',
    borderWidth: 1,
    borderColor: '#87693c',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#342601',
  },
});