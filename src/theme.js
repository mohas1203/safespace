import { makeStyles, createMuiTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));


const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#0276aa',
        main: '#03a9f4',
        dark: '#0276aa',
        contrastText: '#fff',
      },
      secondary: {
        light: '#f73378',
        main: '#f50057',
        dark: '#ab003c',
        contrastText: '#fff',
      },
    },
});

export { useStyles, theme }