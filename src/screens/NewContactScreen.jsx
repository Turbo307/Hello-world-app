
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';

export default function NewContactScreen({ navigation, temaOscuro }) {

  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
  const SERIAL_NUMBER = process.env.EXPO_PUBLIC_SERIAL_NUMBER;

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const [tipoDeContacto, setTipoDeContacto] = useState('');
  const [mostrarTipos, setMostrarTipos] = useState(false);
  const tiposContacto = ['Personal', 'Trabajo', 'Familia', 'Amigos'];

  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  // Estado para controlar el envío
  const [guardando, setGuardando] = useState(false);

  // Limpiar formulario al entrar a la pantalla
  useFocusEffect(
    useCallback(() => {
      setNombre('');
      setApellido('');
      setEdad('');
      setTelefono('');
      setCorreo('');
      setFechaNacimiento('');
      setTipoDeContacto('');
      setFechaSeleccionada(new Date());
      setMostrarCalendario(false);
      setMostrarTipos(false);
    }, [])
  );

  const seleccionarFecha = (event, fecha) => {
    setMostrarCalendario(false);

    if (event.type === 'set' && fecha) {
      setFechaSeleccionada(fecha);

      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const anio = fecha.getFullYear();

      setFechaNacimiento(`${dia}/${mes}/${anio}`);
    }
  };

  // crear contacto usnd la API
  const guardarContacto = async () => {

    if (!nombre.trim() || !apellido.trim() || !telefono.trim() || !correo.trim()) {
      Alert.alert('Error', 'Completa los campos obligatorios.');
      return;
    }

    if (guardando) return;


    const fechaAPI = fechaNacimiento
      ? fechaNacimiento.split('/').reverse().join('-')
      : null;

    // datos pal servidor
    const nuevoContacto = {
      first_name: nombre.trim(),
      last_name: apellido.trim(),
      age: Number(edad),
      phone: telefono.trim(),
      email: correo.trim(),
      birth_date: fechaAPI,
      contact_type: tipoDeContacto
    };

    try {
      setGuardando(true);

      console.log('Registrando nuevo contacto...');

      const endpoint = BASE_URL + "/api/contacts/" + SERIAL_NUMBER + "/";

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoContacto)
      });

      const respuesta = await res.json();

      console.log('Respuesta de la API:', respuesta);

      if (!res.ok) {
        Alert.alert(
          'Error',
          'No se pudo registrar el contacto. Revisa los datos.'
        );
        return;
      }

      Alert.alert('Éxito', 'Contacto registrado correctamente.');

      navigation.navigate('Inicio', {
        screen: 'ListaContactos'
      });

    } catch (error) {
      console.error('Error al registrar contacto:', error);

      Alert.alert(
        'Error',
        'No fue posible conectar con el servidor.'
      );

    } finally {
      setGuardando(false);
    }
  };

  const estiloInput = [
    styles.input,
    {
      color: temaOscuro ? '#ffffff' : '#342601',
    },
  ];

  return (
    <ScrollView contentContainerStyle={[
      styles.container,
      {
        backgroundColor: temaOscuro ? '#1c1c1c' : '#ffeccd'
      }
    ]}>

      <Image
        source={require('../assets/libro.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />

      <TextInput
        style={estiloInput}
        placeholder="Nombre"
        placeholderTextColor={temaOscuro ? '#bbbbbb' : '#666666'}
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={estiloInput}
        placeholder="Apellido"
        placeholderTextColor={temaOscuro ? '#bbbbbb' : '#666666'}
        value={apellido}
        onChangeText={setApellido}
      />

      <TextInput
        style={estiloInput}
        placeholder="Edad"
        placeholderTextColor={temaOscuro ? '#bbbbbb' : '#666666'}
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
      />

      <TextInput
        style={estiloInput}
        placeholder="Tel"
        placeholderTextColor={temaOscuro ? '#bbbbbb' : '#666666'}
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />

      <TextInput
        style={estiloInput}
        placeholder="Correo"
        placeholderTextColor={temaOscuro ? '#bbbbbb' : '#666666'}
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />

      <Pressable
        style={estiloInput}
        onPress={() => setMostrarCalendario(true)}
      >
        <Text style={{
          color: fechaNacimiento
            ? (temaOscuro ? '#ffffff' : '#342601')
            : (temaOscuro ? '#bbbbbb' : '#666666'),
          lineHeight: 48
        }}>
          {fechaNacimiento || 'Fecha de nacimiento'}
        </Text>
      </Pressable>

      {mostrarCalendario && (
        <DateTimePicker
          value={fechaSeleccionada}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={seleccionarFecha}
          themeVariant={temaOscuro ? 'dark' : 'light'}
        />
      )}

      <Pressable
        style={estiloInput}
        onPress={() => setMostrarTipos(!mostrarTipos)}
      >
        <Text style={{
          color: tipoDeContacto
            ? (temaOscuro ? '#ffffff' : '#342601')
            : (temaOscuro ? '#bbbbbb' : '#666666'),
          lineHeight: 48
        }}>
          {tipoDeContacto || 'Seleccionar tipo de contacto'}
        </Text>
      </Pressable>

      {mostrarTipos && (
        <View style={[
          styles.listaTipos,
          {
            backgroundColor: temaOscuro ? '#333333' : '#ffffff',
            borderColor: temaOscuro ? '#87693c' : '#91611a',
          },
        ]}>
          {tiposContacto.map((tipo) => (
            <Pressable
              key={tipo}
              style={[
                styles.opcionTipo,
                {
                  backgroundColor: temaOscuro ? '#333333' : '#ffda44b1',
                  borderBottomColor: temaOscuro ? '#87693c' : '#91611a',
                },
              ]}
              onPress={() => {
                setTipoDeContacto(tipo);
                setMostrarTipos(false);
              }}
            >
              <Text style={{
                color: temaOscuro ? '#ffffff' : '#342601',
              }}>
                {tipo}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      <View style={styles.buttonContainer}>
        {guardando ? (
          <ActivityIndicator size="large" color="#48ca64" />
        ) : (
          <Button
            title="Guardar"
            onPress={guardarContacto}
            color="#48ca64"
          />
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffeccdd6',
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
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderColor: '#87693c',
  },
  buttonContainer: {
    width: '50%',
    marginTop: 8,
    marginBottom: 24,
  },
  listaTipos: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ffeccdd6',
    borderRadius: 6,
    marginBottom: 10,
    overflow: 'hidden',
  },
  opcionTipo: {
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#91611a',
  },
});
