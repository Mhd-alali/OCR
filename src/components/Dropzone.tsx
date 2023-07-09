import { useRef } from 'react';
import { Text, Group, createStyles, rem } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconFileUpload, IconX, IconDownload } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        marginBlock: rem(30),
        marginInline: "auto",
        width: "90%",
        borderWidth: rem(2),
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
        borderStyle: "solid",
        borderRadius: rem(7),
        padding: rem(20)
    },

    dropzone: {
        borderWidth: rem(2),
        paddingBottom: rem(50),
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },
}));

interface iProps {
    onDrop: (files: FileWithPath[]) => void,
    loading: boolean
}

export default function CustomDropZone({ onDrop, loading }: iProps) {
    const { classes, theme } = useStyles();
    const openRef = useRef<() => void>(null);

    return (
        <div className={classes.wrapper}>
            <Dropzone
                openRef={openRef}
                onDrop={onDrop}
                className={classes.dropzone}
                radius="md"
                accept={IMAGE_MIME_TYPE}
                maxSize={30 * 1024 ** 2}
                loading={loading}
            >
                <div style={{ pointerEvents: 'none' }}>
                    <Group position="center">
                        <Dropzone.Accept>
                            <IconDownload
                                size={rem(50)}
                                color={theme.colors[theme.primaryColor][6]}
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconFileUpload
                                size={rem(50)}
                                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                                stroke={1.5}
                            />
                        </Dropzone.Idle>
                    </Group>

                    <Text ta="center" fw={700} fz="lg" mt="xl">
                        <Dropzone.Accept>Drop files here</Dropzone.Accept>
                        <Dropzone.Reject>File is not an image format</Dropzone.Reject>
                        <Dropzone.Idle>Upload image</Dropzone.Idle>
                    </Text>
                    <Text ta="center" fz="sm" mt="xs" c="dimmed">
                        Drag and drop files here to upload. We can accept any image files that areare less than 30mb in size.
                    </Text>
                </div>
            </Dropzone>
        </div>
    );
}