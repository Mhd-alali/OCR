import { useState } from 'react';
import { Text, Box, Select, ActionIcon, Flex, Tooltip, useMantineTheme } from '@mantine/core';
import { IconCopy, IconClipboard } from '@tabler/icons-react'
import { FileWithPath } from '@mantine/dropzone';
import { useEffect } from 'react';
import CustomDropZone from './Dropzone';
import data from '../../data/languages'
import { useClipboard } from '@mantine/hooks';

export default function Form() {
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState(null)
    const [languageCode, setLanguageCode] = useState<string | null>('eng');
    const [dir, setDir] = useState(data.find(v => v.value === languageCode)?.dir)
    const theme = useMantineTheme()

    const clipboad = useClipboard()

    const readTextFromFile = async () => {
        if (!files[0]) return

        const formdata = new FormData()
        formdata.append('image', files[0])
        formdata.append('languageCode', languageCode as string | Blob)
        setLoading(true)
        
        await fetch(`${import.meta.env.VITE_URL}/ocr`, {
            method: "POST",
            body: formdata
        }).then(res => {
            return res.json()
        }).then(({ data }) => {
            setText(data)
            setLoading(false)
        }).catch(error => {
            console.error(error)
            setLoading(false)
        })
    }

    useEffect(() => {
        readTextFromFile()
    }, [files])

    useEffect(() => {
        setDir(data.find(v => v.value === languageCode)?.dir)
    }, [languageCode])

    return (
        <form>
            <Box sx={{ position: "relative", maxWidth: "fit-content", marginInline: "auto" }}>
                <Select
                    label="Choose the language"
                    placeholder="Pick one"
                    data={data}

                    maxDropdownHeight={400}
                    nothingFound="Nobody here"
                    value={languageCode}
                    onChange={setLanguageCode}
                />
                <CustomDropZone onDrop={setFiles} loading={loading} />
            </Box>
            {text &&
                <Flex sx={{ borderRadius: "4px", border: "1px solid gray" }} bg={theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]} direction={'column'} align={"flex-end"} p={'.5rem'}>
                    <Tooltip withArrow
                        transitionProps={{ transition: 'pop', duration: 300 }}
                        label={clipboad.copied ? "Copied" : "Copy"}
                        color={clipboad.copied ? "green" : "gray"}
                        position={'left'}>
                        <ActionIcon onClick={() => clipboad.copy(text)}>
                            <IconClipboard size={'1.2rem'} />
                        </ActionIcon>
                    </Tooltip>
                    <Text dir={dir} >
                        {text}
                    </Text>
                </Flex>
            }
        </form>
    );
}