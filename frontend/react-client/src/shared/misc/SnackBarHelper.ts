import { enqueueSnackbar } from "notistack";

export const ShowSuccess = (value: string) => {
    enqueueSnackbar(value, {
        variant: 'success', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
        },
        autoHideDuration: 2000
    });
}

export const ShowFailure = (value: string) => {
    enqueueSnackbar(value, {
        variant: 'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
        },
        autoHideDuration: 2000
    });
}