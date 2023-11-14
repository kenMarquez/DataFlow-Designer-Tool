interface Theme {
    name: string;
    headerBackground: string;
    contentBackground: string;
    textColor: string;
    borderColor: string;
    inputTextColor: string;
}

export const themes : Record<string, Theme> = {
    default: {
        name: 'Classic',
        headerBackground: '#343A40', // Gris oscuro
        contentBackground: '#FAFAFA', // Gris claro
        textColor: '#000000', // Negro
        borderColor: '#E1E1E1', // Gris muy claro
        inputTextColor: '#000000' // Negro
    },
    theme1: {
        name: 'Arctic Blue',
        headerBackground: '#005f73', // Azul oscuro
        contentBackground: '#e0fbfc', // Azul claro
        textColor: '#000000', // Azul marino
        borderColor: '#3d5a80', // Azul medio
        inputTextColor: '#000000', // Negro
    },
    theme2: {
        name: 'Sunset Dunes',
        headerBackground: '#ffbf69', // Naranja
        contentBackground: '#fff1e6', // Naranja claro
        textColor: '#495041', // Marrón claro
        borderColor: '#ddbea9', // Beige
        inputTextColor: '#6b705c', // Verde oliva
    },
    theme3: {
        name: 'Maritime Voyage',
        headerBackground: '#003049', // Azul profundo
        contentBackground: '#f0efeb', // Blanco apagado
        textColor: '#264653', // Rojo
        borderColor: '#2a9d8f', // Verde turquesa
        inputTextColor: '#264653', // Azul petróleo
    },
    theme4: {
        name: 'Urban Twilight',
        headerBackground: '#2b2d42', // Azul noche
        contentBackground: '#edf2f4', // Gris claro
        textColor: '#d90429', // Gris azulado
        borderColor: '#ef233c', // Rojo coral
        inputTextColor: '#d90429', // Rojo brillante
    },
    theme5: {
        name: 'Mystic Garden',
        headerBackground: '#4a4e69', // Morado oscuro
        contentBackground: '#f2e9e4', // Rosa pálido
        textColor: '#22223b', // Rosa polvo
        borderColor: '#9a8c98', // Morado claro
        inputTextColor: '#22223b', // Casi negro
    }
};

// Color mapping for different data types
export const colorByType = {
    string: '#28A745', // Green for strings
    number: '#007BFF', // Blue for numbers
    boolean: '#FFC107', // Yellow for booleans
    date: '#DC3545', // Red for dates
    object: '#6610F2', // Purple for objects
    array: '#17A2B8', // Cyan for arrays
    function: '#FD7E14', // Orange for functions
    undefined: '#6C757D', // Grey for undefined
    null: '#343A40', // Black for null
};