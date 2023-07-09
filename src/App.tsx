import { MantineProvider, Text, AppShell, Container, ColorScheme, Footer } from '@mantine/core';
import From from './components/Form';
import { useState } from 'react';
import Navbar from './components/Navbar';


export default function App() {
  const [theme, setTheme] = useState('dark')
  const toggleColorScheme = () => {
    if (theme === 'dark') setTheme('light')
    else setTheme('dark')
  }
  return (
    <MantineProvider theme={{ colorScheme: theme as ColorScheme }} withGlobalStyles withNormalizeCSS >
      <AppShell
        navbar={<Navbar theme={theme} toggleColorScheme={toggleColorScheme} />} padding="md"
        footer={<Footer height={'3rem'}><Text align='right' pt={'.5rem'} pr={'1rem'}>Created by Muhammed alali</Text></Footer>}
      >
        <Container size={'md'}>
          <From />
        </Container>
      </AppShell>
    </MantineProvider>
  );
}