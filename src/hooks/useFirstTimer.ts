import { useMutation } from '@tanstack/react-query';

import {
    submitFirstTimer,
} from '../api/firstTimerApi';

export const useFirstTimer =
    () => {

        return useMutation({

            mutationFn:
                submitFirstTimer,

        });

    };