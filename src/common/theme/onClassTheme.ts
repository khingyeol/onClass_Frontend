import { createTheme } from '@mui/material/styles';
import { onClassColorTheme } from './onClassColorTheme';

const defaultTheme = createTheme();

declare module '@mui/material/styles' {
    interface TypographyVariants {
    description: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        description: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        description: true;
    }
}  

export const AppThemes = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    description: 'p',
                }
            }
        }
    },
    typography: {
        allVariants: {
            fontFamily: 'FC-Subject',
            color: onClassColorTheme.black,
        },
        h1: {
            fontSize: '32px',
            fontWeight: 'bold',
            fontFamily: 'FC-Subject',
            color: onClassColorTheme.black,
        },
        h2: {
            fontSize: '30px',
            fontWeight: 'bold',
            fontFamily: 'FC-Subject',
            color: onClassColorTheme.black,
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '27px',
                fontWeight: 'bold',    
            }
        },
        h3: {
            fontSize: '22px',
            fontWeight: 'bold',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '20px',
                fontWeight: 'bold',    
            }
        },
        h4: {
            fontSize: '18px',
            fontWeight: 'bold',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '16.2px',
                fontWeight: 'bold',    
            }
        },
        body1: {
            fontSize: '18px',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '16px',
            }
        },
        description: {
            fontSize: '16px',
            lineHeight: 1.5,
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '14px',
                lineHeight: 1.5,
            }
        }
    }
});