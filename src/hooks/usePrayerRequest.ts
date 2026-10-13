import { useMutation } from '@tanstack/react-query';

import {
    submitPrayerRequest,
} from '../api/prayerRequestApi';

export const usePrayerRequest =
    () => {

        return useMutation({

            mutationFn:
                submitPrayerRequest,

        });

    };