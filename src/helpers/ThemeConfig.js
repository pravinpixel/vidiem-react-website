import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const ThemeConfig = createTheme({
    palette: {
        primary: {
            main: '#E31E24',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    }
});

export default ThemeConfig;
