import { ActionIcon, Container, Flex, Header, Text } from '@mantine/core'
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react'

interface IProps {
    theme: string,
    toggleColorScheme: Function
}
export default function CustomNavbar({ theme, toggleColorScheme }: IProps) {
    const dark = theme === 'dark'
    return <Header p="md" hidden={true} height={'4rem'}>
        <Container size={'lg'} h={"100%"}>
            <Flex justify={'space-between'} align={'center'} h={"100%"}>
                <Text fw={500}>IMAGE TO TEXT CONVERTER - OCR ONLINE</Text>
                <ActionIcon
                    variant="transparent"
                    color='gray'
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme">
                    {dark ? <IconSunFilled size="1.1rem" /> : <IconMoonFilled size="1.1rem" />}
                </ActionIcon>
            </Flex>
        </Container>
    </Header >
}