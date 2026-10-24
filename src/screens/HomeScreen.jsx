import { View, Text, StyleSheet, Pressable } from 'react-native';
import ContactCard from '../components/ContactCard';

export default function HomeScreen({ contacts, temaOscuro, navigation }) {
  return (
    <View style={[
      styles.container,
      { backgroundColor: temaOscuro ? '#1c1c1c' : '#ffeccd' }
    ]}>
      <Text style={[styles.title, { color: temaOscuro ? '#ffffff' : '#87693c' }]}>
        Mis Contactos
      </Text>
      <Text style={{ color: temaOscuro ? '#ffffff' : '#342601' }}>: {contacts.length}</Text>
        {contacts.map((contacto) => (
          <Pressable
            key={contacto.id}
            style={{ width: '100%' }}
            onPress={() => navigation.navigate('EditarContacto', { contacto })}
          >
            <ContactCard
              nombre={contacto.nombre}
              apellido={contacto.apellido}
              edad={contacto.edad}
              telefono={contacto.telefono}
              correo={contacto.correo}
              temaOscuro={temaOscuro}
            />
          </Pressable>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeccd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#87693c',
  },
});