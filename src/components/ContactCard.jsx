import { View, Text, StyleSheet } from 'react-native';

export default function ContactCard({ nombre, apellido, edad, telefono, correo }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nameText}>{nombre} {apellido}</Text>
      <Text style={styles.infoText}>Edad: {edad}</Text>
      <Text style={styles.infoText}>Tel: {telefono}</Text>
      <Text style={styles.infoText}>Correo: {correo}</Text>
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
    borderColor: '#867760',
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