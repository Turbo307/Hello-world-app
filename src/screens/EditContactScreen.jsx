
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';

import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditContactScreen({
  route,
  navigation,
  temaOscuro
}) {

  const { contacto } = route.params;

  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
  const SERIAL_NUMBER = process.env.EXPO_PUBLIC_SERIAL_NUMBER;

  // estados del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [tipo, setTipo] = useState('');

  // estados de la pantalla
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  // selector de tiipos
  const [mostrarTipos, setMostrarTipos] = useState(false);
  const tiposContacto = ['Personal', 'Trabajo', 'Familia', 'Amigos'];

  // calendario
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  // consultar contacto individual
  useEffect(() => {

    let activo = true;

    const cargarContacto = async () => {

      try {
        setCargando(true);

        console.log('Consultando contacto:', contacto.id);

        const endpoint =
          BASE_URL + "/api/contacts/" + SERIAL_NUMBER + "/" + contacto.id + "/";

        const res = await fetch(endpoint);

        if (!res.ok) {
          throw new Error('No se pudo consultar el contacto');
        }

        const data = await res.json();

        console.log('Contacto recibido:', data);

        if (!activo) return;

        // precargar formulario
        setNombre(data.first_name ?? '');
        setApellido(data.last_name ?? '');
        setEdad(String(data.age ?? ''));
        setTelefono(String(data.phone ?? ''));
        setCorreo(data.email ?? '');
        setTipo(data.contact_type ?? '');

        // convertir fecha recibida a DD/MM/YYYY
        if (data.birth_date) {

          const partes = data.birth_date.split('-');

          let fechaFormateada = data.birth_date;

          if (partes.length === 3 && partes[0].length === 4) {
            fechaFormateada =
              `${partes[2]}/${partes[1]}/${partes[0]}`;
          }

          setFechaNacimiento(fechaFormateada);

          const [dia, mes, anio] = fechaFormateada.split('/');

          setFechaSeleccionada(
            new Date(Number(anio), Number(mes) - 1, Number(dia))
          );

        } else {
          setFechaNacimiento('');
          setFechaSeleccionada(new Date());
        }

      } catch (error) {
        console.error('Error al cargar contacto:', error);

        if (activo) {
          Alert.alert('Error', 'No se pudo cargar el contacto.');
        }

      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarContacto();

    return () => {
      activo = false;
    };

  }, [contacto.id]);

  //seleccionar fecha
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

  //actualizar contacto mediante PUT
  const guardarCambios = async () => {

    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !telefono.trim() ||
      !correo.trim()
    ) {
      Alert.alert('Error', 'Completa los campos obligatorios.');
      return;
    }

    if (guardando) return;

    // convertir fecha DD/MM/YYYY a YYYY-MM-DD
    const fechaAPI = fechaNacimiento
      ? fechaNacimiento.split('/').reverse().join('-')
      : null;

    const contactoActualizado = {
      first_name: nombre.trim(),
      last_name: apellido.trim(),
      age: Number(edad),
      phone: telefono.trim(),
      email: correo.trim(),
      birth_date: fechaAPI,
      contact_type: tipo
    };

    try {

      setGuardando(true);

      console.log('Actualizando contacto:', contacto.id);

      const endpoint =
        BASE_URL + "/api/contacts/" + SERIAL_NUMBER + "/" + contacto.id + "/";

      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactoActualizado)
      });

      const respuesta = await res.json();

      console.log('Respuesta PUT:', respuesta);

      if (!res.ok) {
        throw new Error('No se pudo actualizar el contacto');
      }

      Alert.alert(
        'Éxito',
        'Contacto actualizado correctamente.',
        [
          {
            text: 'Aceptar',
            onPress: () => navigation.goBack()
          }
        ]
      );

    } catch (error) {

      console.error('Error al actualizar contacto:', error);

      Alert.alert(
        'Error',
        'No se pudieron guardar los cambios.'
      );

    } finally {
      setGuardando(false);
    }
  };

  const estiloInput = [
    styles.input,
    {
      color: temaOscuro ? '#ffffff' : '#342601',
      borderColor: '#87693c',
      backgroundColor: temaOscuro ? '#333333' : 'transparent'
    }
  ];

  const colorPlaceholder = temaOscuro ? '#bbbbbb' : '#666666';

  // mostrar indicador mientras llega el GET
  if (cargando) {
    return (
      <View style={[
        styles.cargandoContainer,
        {
          backgroundColor: temaOscuro ? '#1c1c1c' : '#ffeccd'
        }
      ]}>
        <ActivityIndicator size="large" color="#48ca64" />
        <Text style={{
          color: temaOscuro ? '#ffffff' : '#342601',
          marginTop: 12
        }}>
          Cargando contacto...
        </Text>
      </View>
    );
  }

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
      keyboardShouldPersistTaps="handled"
    >

      <TextInput
        style={estiloInput}
        placeholder="Nombre"
        placeholderTextColor={colorPlaceholder}
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={estiloInput}
        placeholder="Apellido"
        placeholderTextColor={colorPlaceholder}
        value={apellido}
        onChangeText={setApellido}
      />

      <TextInput
        style={estiloInput}
        placeholder="Edad"
        placeholderTextColor={colorPlaceholder}
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
      />

      <TextInput
        style={estiloInput}
        placeholder="Teléfono"
        placeholderTextColor={colorPlaceholder}
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />

      <TextInput
        style={estiloInput}
        placeholder="Correo"
        placeholderTextColor={colorPlaceholder}
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />

      <Pressable
        style={estiloInput}
        onPress={() => setMostrarCalendario(true)}
      >
        <Text style={{
          color: fechaNacimiento ? (temaOscuro ? '#ffffff' : '#342601') : colorPlaceholder,
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
          color: tipo
            ? (temaOscuro ? '#ffffff' : '#342601')
            : colorPlaceholder,
          lineHeight: 48
        }}>
          {tipo || 'Seleccionar tipo de contacto'}
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
          {tiposContacto.map((opcion) => (
            <Pressable
              key={opcion}
              style={[
                styles.opcionTipo,
                {
                  backgroundColor: temaOscuro ? '#333333' : '#ffda44b1',
                  borderBottomColor: temaOscuro ? '#87693c' : '#91611a',
                },
              ]}
              onPress={() => {
                setTipo(opcion);
                setMostrarTipos(false);
              }}
            >
              <Text style={{
                color: temaOscuro ? '#ffffff' : '#342601'
              }}>
                {opcion}
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
            title="Guardar cambios"
            onPress={guardarCambios}
            color="#48ca64"
          />
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cargandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#ffeccd',
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginTop: 10,
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
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  opcionTipo: {
    padding: 14,
    borderBottomWidth: 0.5,
  },
});
