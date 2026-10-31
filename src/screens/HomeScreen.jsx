import {
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';

import ContactCard from '../components/ContactCard';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ temaOscuro, navigation }) {

  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
  const SERIAL_NUMBER =process.env.EXPO_PUBLIC_SERIAL_NUMBER;

  const [eliminandoId, setEliminandoId] = useState(null);

  // contactos recibidos de la API
  const [contacts, setContacts] = useState([]);

  // texto del buscador
  const [busqueda, setBusqueda] = useState('');

  // estado de carga y errores
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  
const eliminarContacto = (contacto) => {

  Alert.alert(
    'Eliminar contacto',
    `¿Estás seguro de que deseas eliminar a ${contacto.nombre} ${contacto.apellido}?`,
    [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {

          try {
            setEliminandoId(contacto.id);

            console.log('Eliminando contacto:', contacto.id);

            const endpoint =
              BASE_URL + "/api/contacts/" + SERIAL_NUMBER + "/" + contacto.id + "/";

            const res = await fetch(endpoint, {
              method: 'DELETE'
            });

            if (!res.ok) {
              const error = await res.text();
              console.error('Error de la API:', error);
              throw new Error('No se pudo eliminar el contacto');
            }

            console.log('Contacto eliminado correctamente');

            // actualizar la lista sin volver a consultar la API
            setContacts((contactosActuales) =>
              contactosActuales.filter(
                (item) => item.id !== contacto.id
              )
            );

            Alert.alert('Éxito', 'Contacto eliminado correctamente.');

          } catch (error) {
            console.error('Error al eliminar contacto:', error);

            Alert.alert(
              'Error',
              'No se pudo eliminar el contacto.'
            );

          } finally {
            setEliminandoId(null);
          }
        }
      }
    ]
  );
};

  // consultar la API cuando Inicio obtiene el enfoque
  useFocusEffect(
    useCallback(() => {

      let activo = true;

      const loadContacts = async () => {
        try {
          setCargando(true);
          setError('');

          console.log('Consultando contactos en la API...');

          const endpoint = BASE_URL + "/api/contacts/"+SERIAL_NUMBER+"/";

          const res = await fetch(endpoint);


          const contacts_arr = await res.json();

          const localContacts = contacts_arr.map((row) => ({
            id: row.id,
            nombre: row.first_name ?? '',
            apellido: row.last_name ?? '',
            edad: row.age ?? '',
            correo: row.email ?? '',
            telefono: String(row.phone ?? ''),
            fechaNacimiento: row.birth_date ?? '',
            tipo: row.contact_type ?? ''
          }));

          if (activo) {
            setContacts(localContacts);
            console.log('Contactos cargados:', localContacts.length);
          }

        } catch (error) {
          console.error('Error al cargar contactos:', error);

          if (activo) {
            setError('No se pudieron cargar los contactos.');
          }

        } finally {
          if (activo) {
            setCargando(false);
          }
        }
      };

      loadContacts();

      return () => {
        activo = false;
      };

    }, [])
  );

  const contactosFiltrados = contacts.filter((contacto) => {

    const texto = busqueda.toLowerCase().trim();

    return (
      contacto.nombre.toLowerCase().includes(texto) ||
      contacto.apellido.toLowerCase().includes(texto) ||
      contacto.telefono.includes(texto)
    );

  });

  return (
    <ScrollView
      style={{
        backgroundColor: temaOscuro ? '#1c1c1c' : '#ffeccd',
      }}
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: temaOscuro ? '#1c1c1c' : '#ffeccd',
        },
      ]}
    >

      <Image
        source={require('../assets/libro.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />

      <TextInput
        style={[
          styles.input,
          {
            color: temaOscuro ? '#ffeccdd6' : '#342601',
            backgroundColor: temaOscuro ? '#333333' : '#ffda4450',
          },
        ]}
        placeholder="Buscar contacto..."
        placeholderTextColor={temaOscuro ? '#ffeccdd6' : '#666666'}
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {cargando && (
        <ActivityIndicator
          size="large"
          color="#48ca64"
        />
      )}

      {!!error && (
        <Text style={{ color: '#e74c3c' }}>
          {error}
        </Text>
      )}

      {!cargando && !error && (
        <Text style={{ color: temaOscuro ? '#ffeccdd6' : '#342601' }}>
          Contactos encontrados: {contactosFiltrados.length}
        </Text>
      )}

      {contactosFiltrados.map((contacto) => (
        <Pressable
  key={contacto.id}
  style={{ width: '100%' }}

  // oque normal: editar
  onPress={() =>
    navigation.navigate('EditarContacto', { contacto })
  }

  // mantener presionado: eliminar
  onLongPress={() => eliminarContacto(contacto)}

  delayLongPress={500}

  disabled={eliminandoId === contacto.id}
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

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoImage: {
    width: 100,
    height: 80,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#87693c',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
});
