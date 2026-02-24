import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddBookScreen from './screens/AddBookScreen';
import ChooseAddScreen from './screens/ChooseAddScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import LibraryScreen from './screens/LibraryScreen';
import SearchBookScreen from './screens/SearchBookScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

export default function App() {

  const [books,setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const savedBooks = await loadBooksFromStorage();
      setBooks(savedBooks);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    saveBooksToStorage(books);
  }, [books]);

  const saveBooksToStorage = async (booksArray) => {
    try{
      await AsyncStorage.setItem('@myBooks', JSON.stringify(booksArray));
    } catch(e){
      console.log('Error saving books', e);
    }
  };

  const loadBooksFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@myBooks');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
      console.log('Error loading books', e);
      return [];
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#608274'
          },
          headerTintColor: '#D1C78A',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen name="Library">
          {props => <LibraryScreen {...props} books={books} setBooks={setBooks} />}
        </Stack.Screen>
        <Stack.Screen name="Add Book">
          {props => <AddBookScreen {...props} setBooks={setBooks} />}
        </Stack.Screen>
        <Stack.Screen name="Book Details">
          {props => <BookDetailsScreen {...props} setBooks={setBooks} />}
        </Stack.Screen>
        <Stack.Screen name="Choose">
          {props => <ChooseAddScreen {...props}/>}
        </Stack.Screen>
        <Stack.Screen name="Search Book">
          {props => <SearchBookScreen {...props} setBooks={setBooks} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

//Primary Color #608274
//Secondary Color #D1C78A
//Accent Color #141414
//Custom White #F3F1E2