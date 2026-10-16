import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image } from 'react-native';
import ContactCard from './src/components/ContactCard';

export default function App() {
  const contacts = [
    {
      nombre: "Cesar",
      apellido: "H",
      edad: "29",
      telefono: "6649191123",
      correo: "Cesar@gmail.com"
    },
    {
      nombre: "Leonidas",
      apellido: "G",
      edad: "20",
      telefono: "664654321",
      correo: "Leonidas@gmail.com"
    },
        {
      nombre: "Maurelio",
      apellido: "M",
      edad: "22",
      telefono: "664004321",
      correo: "Maurelio@gmail.com"
    }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('./src/assets/libro.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
      
      <TextInput style={styles.input} placeholder="Nombre" />
      <TextInput style={styles.input} placeholder="Apellido" />
      <TextInput style={styles.input} placeholder="Edad" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Tel" keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Correo" keyboardType="email-address" />

      <View style={styles.buttonContainer}>
        <Button 
          title="Guardar" 
          onPress={() => console.log('Guardando...')}
          color="#48ca64"
        />
      </View>
      

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
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
  listContainer: {
    width: '100%',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});