import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';

import { useState } from 'react';

export default function NewContactScreen({ agregarContacto, navigation, temaOscuro }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const[telefono, setTelefono] = useState('');
  const[correo, setCorreo] = useState('');
  const[fechaNacimiento, setFechaNacimiento] = useState('');
  const[tipo, setTipo] = useState('');

  const guardarContacto = () => {
    const nuevoContacto = {
      id: Date.now().toString(),
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      telefono: telefono,
      correo: correo,
      fechaNacimiento: fechaNacimiento,
      tipo: tipo,
    };

    agregarContacto(nuevoContacto);

    navigation.navigate('Inicio');
  };

  const estiloInput = [
    styles.input,
    {
      color: temaOscuro ? '#ffffff' : '#342601',
    }
  ]

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

        <TextInput style={estiloInput} placeholder="Nombre" placeholderTextColor={temaOscuro ? '#bbbbbb' : '#666666'} value={nombre} onChangeText={setNombre} />
        <TextInput style={estiloInput} placeholder="Apellido" placeholderTextColor={temaOscuro ? '#bbbbbb' : '#666666'} value={apellido} onChangeText={setApellido} />
        <TextInput style={estiloInput} placeholder="Edad" placeholderTextColor={temaOscuro ? '#bbbbbb' : '#666666'} keyboardType="numeric" value={edad} onChangeText={setEdad} />
        <TextInput style={estiloInput} placeholder="Tel" placeholderTextColor={temaOscuro ? '#bbbbbb' : '#666666'} keyboardType="phone-pad" value={telefono} onChangeText={setTelefono} />
        <TextInput style={estiloInput} placeholder="Correo" placeholderTextColor={temaOscuro ? '#bbbbbb' : '#666666'} keyboardType="email-address" value={correo} onChangeText={setCorreo} />
        <TextInput style={estiloInput} placeholder="Fecha de Nacimiento" placeholderTextColor={temaOscuro ? '#bbbbbb' : '#666666'} value={fechaNacimiento} onChangeText={setFechaNacimiento} />
        <TextInput style={estiloInput} placeholder="Tipo" placeholderTextColor={temaOscuro ? '#bbbbbb' : '#666666'} value={tipo} onChangeText={setTipo} />

      <View style={styles.buttonContainer}>
        <Button
          title="Guardar"
          onPress={guardarContacto}
          color="#48ca64"
        />
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
});