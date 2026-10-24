import { View, Text, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen({ temaOscuro, setTemaOscuro }) {
  return (
    <View style={[
        styles.container,
        { backgroundColor: temaOscuro ? '#1c1c1c' : '#ffeccd' }]}>

      <View style={styles.opcion}>
        <Text style={[styles.texto, { color: temaOscuro ? '#ffffff' : '#87693c' }]}>Tema oscuro</Text>

        <Switch
          value={temaOscuro}
          onValueChange={setTemaOscuro}
          trackColor={{ false: '#cccccc', true: '#48ca64' }}
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

  opcion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#87693c',
    borderRadius: 10,
  },

  texto: {
    fontSize: 18,
    color: '#87693c',
  },
});