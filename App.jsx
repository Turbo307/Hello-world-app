import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import NewContactScreen from './src/screens/NewContactScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Importacion de la pantalla EditContactScreen
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditContactScreen from './src/screens/EditContactScreen';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function InicioStack({ contacts, temaOscuro, editarContacto }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: temaOscuro ? '#1c1c1c' : '#ffeccd',
        },
        headerTintColor: temaOscuro ? '#ffffff' : '#87693c',
      }}>
      <Stack.Screen name="ListaContactos" options={{ headerShown: false }}>
        {(props) => (
          <HomeScreen
            {...props}
            contacts={contacts}
            temaOscuro={temaOscuro}
          />
        )}
      </Stack.Screen>

    <Stack.Screen
      name="EditarContacto"
      options={{ title: 'Editar contacto' }}
    >
      {(props) => (
        <EditContactScreen
          {...props}
          editarContacto={editarContacto}
          temaOscuro={temaOscuro}
        />
      )}
    </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {

  // Aquí van nuestros estados
  const [contacts, setContacts] = useState([]);

  // para tema oscuro
  const [temaOscuro, setTemaOscuro] = useState(false);

  // Función para agregar contactos
  const agregarContacto = (nuevoContacto) => {
    setContacts((anteriores) => [...anteriores, nuevoContacto]);
  };

  // funcion para editar contactos
  const editarContacto = (contactoActualizado) => {
  setContacts((anteriores) =>
    anteriores.map((contacto) =>
      contacto.id === contactoActualizado.id
        ? contactoActualizado
        : contacto
    )
  );
};

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: temaOscuro ? '#1c1c1c' : '#ffeccd',
          },
          headerTintColor: temaOscuro ? '#ffffff' : '#87693c',

          tabBarStyle: {
            backgroundColor: temaOscuro ? '#1c1c1c' : '#ffeccd',
          },

          tabBarActiveTintColor: '#48ca64',
          tabBarInactiveTintColor: temaOscuro ? '#bbbbbb' : '#342601',

          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = 'home-outline';
            } else if (route.name === 'Nuevo contacto') {
              iconName = 'person-add-outline';
            } else {
              iconName = 'settings-outline';
            }

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Inicio" options={{ headerShown: false }}>
          {() => (
            <InicioStack
              contacts={contacts}
              temaOscuro={temaOscuro}
              editarContacto={editarContacto} 
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Nuevo contacto">
          {(props) => (
            <NewContactScreen
              {...props}
              agregarContacto={agregarContacto}
              temaOscuro={temaOscuro}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Configuración">
          {(props) => (
            <SettingsScreen
              {...props}
              temaOscuro={temaOscuro}
              setTemaOscuro={setTemaOscuro}
            />
          )}
        </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  );
}