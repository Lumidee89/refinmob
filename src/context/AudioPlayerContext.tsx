import React,
{
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react';

import {
    Audio,
} from 'expo-av';
import { assetUrl } from '../api/axios';

const AudioPlayerContext =
    createContext<any>(null);

export const AudioPlayerProvider = ({
    children,
}: any) => {

    const [sound, setSound] =
        useState<Audio.Sound | null>(
            null
        );

    const [currentSermon,
        setCurrentSermon] =
        useState<any>(null);

    const [isPlaying,
        setIsPlaying] =
        useState(false);

    const playSermon =
        async (sermon: any) => {

            try {

                if (sound) {

                    await sound.unloadAsync();

                }

                const {
                    sound: newSound,
                } =
                    await Audio.Sound.createAsync(
                        {
                            uri: assetUrl(sermon.audio_path)!,
                        }
                    );

                setSound(
                    newSound
                );

                setCurrentSermon(
                    sermon
                );

                await newSound.playAsync();

                setIsPlaying(
                    true
                );

            } catch (
                error
            ) {

                console.log(
                    error
                );

            }

        };

    const togglePlayback =
        async () => {

            if (!sound)
                return;

            const status =
                await sound.getStatusAsync();

            if (
                status.isLoaded &&
                status.isPlaying
            ) {

                await sound.pauseAsync();

                setIsPlaying(
                    false
                );

            } else {

                await sound.playAsync();

                setIsPlaying(
                    true
                );

            }

        };

    useEffect(() => {

        return () => {

            if (sound) {

                sound.unloadAsync();

            }

        };

    }, [sound]);

    return (

        <AudioPlayerContext.Provider
            value={{
                currentSermon,
                isPlaying,
                playSermon,
                togglePlayback,
            }}
        >

            {children}

        </AudioPlayerContext.Provider>

    );

};

export const useAudioPlayer =
    () =>
        useContext(
            AudioPlayerContext
        );
