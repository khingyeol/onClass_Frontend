import { createTheme } from '@mui/material/styles';
import { onClassColorTheme } from './onClassColorTheme';

const defaultTheme = createTheme();

declare module '@mui/material/styles' {
    interface TypographyVariants {
    description: React.CSSProperties;
    title3: React.CSSProperties;
    body3: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        description: React.CSSProperties;
        title3: React.CSSProperties;
        body3: React.CSSProperties;

    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        description: true;
        title3: true;
        body3: true;

    }
}  

export const AppThemes = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    description: 'p',
                    title3: 'p',
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
                fontSize: '24px',
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
                fontSize: '13.5px',
            }
        },
        body2: {
            fontSize: '20px',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '18px',
            }
        },
        body3: {
            fontSize: '20px',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '15px',
            } 
        },
        description: {
            fontSize: '16px',
            lineHeight: 1.5,
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '13.5px',
                lineHeight: 1.2,
            }
        },
        title3: {
            fontSize: '19px',
            fontWeight: 'bold',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '15px',
                fontWeight: 'bold',    
            }
        }
    }
});