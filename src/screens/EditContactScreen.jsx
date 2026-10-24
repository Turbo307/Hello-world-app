import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function EditContactScreen({ route, navigation, editarContacto, temaOscuro }) {
  const { contacto } = route.params;

  const [nombre, setNombre] = useState(contacto.nombre);
  const [apellido, setApellido] = useState(contacto.apellido ?? '');
  const [edad, setEdad] = useState(contacto.edad ?? '');
  const [telefono, setTelefono] = useState(contacto.telefono ?? '');
  const [correo, setCorreo] = useState(contacto.correo ?? '');
  const [fechaNacimiento, setFechaNacimiento] = useState(contacto.fechaNacimiento ?? '');
  const [tipo, setTipo] = useState(contacto.tipo ?? '');

  const guardarCambios = () => {
    const contactoActualizado = {
      ...contacto,
      nombre,
      apellido,
      edad,
      telefono,
      correo,
      fechaNacimiento,
      tipo,
    };

    editarContacto(contactoActualizado);

    navigation.goBack();
  };

  const estiloInput = [
    styles.input,
    {
        color: temaOscuro ? '#ffffff' : '#342601',
        borderColor:  '#87693c',
    }
    ];

const colorPlaceholder = temaOscuro ? '#bbbbbb' : '#666666';

  return (
    <View style={[ styles.container, { backgroundColor: temaOscuro  ? '#1c1c1c' : '#ffeccd' }]}>

      <Text style={[styles.title, { color: temaOscuro ? '#ffffff' : '#87693c' }]}>
        Editar: {contacto.nombre} {contacto.apellido}
      </Text>

        <TextInput style={estiloInput} placeholder="Nombre" placeholderTextColor={colorPlaceholder} value={nombre} onChangeText={setNombre} />
        <TextInput style={estiloInput} placeholder="Apellido" placeholderTextColor={colorPlaceholder} value={apellido} onChangeText={setApellido} />
        <TextInput style={estiloInput} placeholder="Edad" placeholderTextColor={colorPlaceholder} keyboardType="numeric" value={edad} onChangeText={setEdad} />
        <TextInput style={estiloInput} placeholder="Teléfono" placeholderTextColor={colorPlaceholder} keyboardType="phone-pad" value={telefono} onChangeText={setTelefono} />
        <TextInput style={estiloInput} placeholder="Correo" placeholderTextColor={colorPlaceholder} keyboardType="email-address" value={correo} onChangeText={setCorreo} />
        <TextInput style={estiloInput} placeholder="Fecha de nacimiento" placeholderTextColor={colorPlaceholder} value={fechaNacimiento} onChangeText={setFechaNacimiento} />
        <TextInput style={estiloInput} placeholder="Tipo" placeholderTextColor={colorPlaceholder} value={tipo} onChangeText={setTipo} />

      <View style={styles.buttonContainer}>
        <Button
          title="Guardar cambios"
          onPress={guardarCambios}
          color="#48ca64"
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeccd',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#87693c',
    marginBottom: 15,
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
    marginTop: 20,
  },
});