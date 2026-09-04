const lightMode = () => {
    const workspace = Blockly;
    workspace.Colours.RootBlock = {
        colour: '#8B5CF6', // Purple primary
        colourSecondary: '#7C3AED', // Darker purple
        colourTertiary: '#DDD6FE', // Light purple
    };

    workspace.Colours.Base = {
        colour: '#A78BFA', // Medium purple
        colourSecondary: '#C4B5FD', // Light purple
        colourTertiary: '#8B5CF6', // Purple primary
    };

    workspace.Colours.Special1 = {
        colour: '#9333EA', // Vibrant purple
        colourSecondary: '#A855F7', // Light vibrant purple
        colourTertiary: '#DDD6FE', // Very light purple
    };

    workspace.Colours.Special2 = {
        colour: '#7C3AED', // Dark purple
        colourSecondary: '#8B5CF6', // Purple primary
        colourTertiary: '#EDE9FE', // Lightest purple
    };

    workspace.Colours.Special3 = {
        colour: '#6D28D9', // Deep purple
        colourSecondary: '#7C3AED', // Dark purple
        colourTertiary: '#C4B5FD', // Light purple
    };

    workspace.Colours.Special4 = {
        colour: '#5B21B6', // Darkest purple
        colourSecondary: '#6D28D9', // Deep purple
        colourTertiary: '#DDD6FE', // Light purple
    };
};

export const setColors = () => lightMode();
