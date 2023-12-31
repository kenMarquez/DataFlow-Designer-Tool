import {contrastColor} from "./utils";
import {colorByType, themes} from "./theme";
import {addColumnIcon, deleteIcon, getDeleteIcon} from "./icons";

const {widget} = figma;
const {useSyncedState, usePropertyMenu, AutoLayout, Input, SVG} = widget;


function Widget() {
    const defaultColumn = {name: '', type: '', description: ''};
    // State for table structure with name and columns
    const [table, setTable] = useSyncedState('tables', {
        name: '',
        columns: [defaultColumn],
    });


    // State for widget size and theme
    const [size, setSize] = useSyncedState('size', 'medium');
    const [currentTheme, setCurrentTheme] = useSyncedState('currentTheme', 'default');


    // Property menu setup for widget customization
    usePropertyMenu([
        // Dropdown for selecting widget size
        {
            itemType: 'dropdown',
            propertyName: 'size',
            tooltip: 'Size',
            options: [
                {option: 'small', label: 'Small'},
                {option: 'medium', label: 'Medium'},
                {option: 'large', label: 'Large'},
                {option: 'xlarge', label: 'Extra Large'},
                {option: 'xxlarge', label: 'XX Large'},
            ],
            selectedOption: size,
        },
        {itemType: 'separator'},
        // Color selector for header
        {
            itemType: 'dropdown',
            propertyName: 'theme',
            tooltip: 'Theme',
            options: Object.keys(themes).map(key => ({
                option: key,
                label: themes[key].name
            })),
            selectedOption: currentTheme,
        },
        {itemType: 'separator'},
        // Action for adding a new column
        {
            itemType: 'action',
            propertyName: 'addColumn',
            tooltip: 'Add Column',
            icon: addColumnIcon,
        },
    ], ({propertyName, propertyValue}) => {
        // Handling property menu actions
        switch (propertyName) {
            case 'addColumn':
                addColumn();
                break;
            case 'size':
                setSize(propertyValue);
                break;
            case 'theme':
                setCurrentTheme(propertyValue);
                break;
        }
    });

    // Function to add a new column
    const addColumn = () => {
        setTable({
            ...table,
            columns: [...table.columns, {name: '', type: '', description: ''}]
        });
    };

    // Function to remove a column
    const removeColumn = (index) => {
        setTable({
            ...table,
            columns: table.columns.filter((_, i) => i !== index)
        });
    };

    // Functions to update column attributes
    const changeColumnName = (index, name) => {
        setTable({
            ...table,
            columns: table.columns.map((column, i) => i === index ? {...column, name} : column)
        });
    };

    const changeColumnType = (index, type) => {
        setTable({
            ...table,
            columns: table.columns.map((column, i) => i === index ? {...column, type} : column)
        });
    };

    const changeColumnDescription = (index, description) => {
        setTable({
            ...table,
            columns: table.columns.map((column, i) => i === index ? {...column, description} : column)
        });
    };

    const changeTableName = (name) => {
        setTable({...table, name});
    };


    // Style settings for different widget sizes
    const sizeStyles = {
        // Styles for 'small' size
        small: {
            widget: {width: 650, height: 'hug-contents'},
            text: {fontFamily: 'IBM Plex Mono', fontSize: 20, fontWeight: 'normal'},
            rowHeight: 50,
            typeWidth: 120,
            fieldWidth: 220,
            padding: 30
        },
        // Styles for 'medium' size
        medium: {
            widget: {width: 1000, height: 'hug-contents'},
            text: {fontFamily: 'IBM Plex Mono', fontSize: 27, fontWeight: 'normal'},
            rowHeight: 60,
            typeWidth: 170,
            fieldWidth: 380,
            padding: 40
        },
        large: {
            widget: {width: 1500, height: 'hug-contents'},
            text: {fontFamily: 'IBM Plex Mono', fontSize: 35, fontWeight: 'normal'},
            rowHeight: 75,
            typeWidth: 260,
            fieldWidth: 540,
            padding: 50
        },
        xlarge: {
            widget: {width: 2000, height: 'hug-contents'},
            text: {fontFamily: 'IBM Plex Mono', fontSize: 50, fontWeight: 'normal'},
            rowHeight: 85,
            typeWidth: 300,
            fieldWidth: 660,
            padding: 70
        },
        xxlarge: {
            widget: {width: 2800, height: 'hug-contents'},
            text: {fontFamily: 'IBM Plex Mono', fontSize: 70, fontWeight: 'normal'},
            rowHeight: 100,
            typeWidth: 400,
            fieldWidth: 750,
            padding: 90
        },
    };

    const currentStyle = sizeStyles[size];
    const theme = themes[currentTheme];

    // Function to get color based on data type
    const getColorForType = (type) => {
        const typeInLowerCase = type.toLowerCase();
        return colorByType[typeInLowerCase] || theme.textColor; // Default color if not found
    };

    // Widget layout rendering
    return (
        <AutoLayout direction={'vertical'} cornerRadius={10} width={currentStyle.widget.width}
                    height={currentStyle.widget.height} stroke="#E1E1E1" strokeWidth={2}>
            <AutoLayout direction={'horizontal'} padding={currentStyle.padding} fill={theme.headerBackground}
                        horizontalAlignItems={'start'} verticalAlignItems={'center'} width={'fill-parent'}>
                <Input
                    placeholder='Table Name'
                    value={table.name}
                    fontFamily={currentStyle.text.fontFamily}
                    fontSize={currentStyle.text.fontSize * 1.3}
                    fontWeight={'semi-bold'}
                    fill={contrastColor(theme.headerBackground)}
                    width={'fill-parent'}
                    onTextEditEnd={({characters}) => changeTableName(characters)}/>
            </AutoLayout>
            <AutoLayout direction='vertical' width={'fill-parent'}>
                {table.columns.map((column, index) => (
                    <AutoLayout key={index}
                                direction='horizontal'
                                fill={theme.contentBackground}
                                spacing={currentStyle.padding}
                                width={'fill-parent'}
                                padding={currentStyle.padding}
                                verticalAlignItems={'center'}
                                stroke={'#DDDDDD'}
                                strokeWidth={3}
                                strokeAlign={'inside'}>
                        <Input placeholder='Field'
                               value={column.name}
                               fontFamily={currentStyle.text.fontFamily}
                               fontSize={currentStyle.text.fontSize}
                               fontWeight={currentStyle.text.fontWeight}
                               width={currentStyle.fieldWidth}
                               fill={theme.textColor}
                               onTextEditEnd={({characters}) => changeColumnName(index, characters)}/>
                        <Input placeholder='Type' value={column.type}
                               fontFamily={currentStyle.text.fontFamily}
                               fontSize={currentStyle.text.fontSize}
                               fontWeight={currentStyle.text.fontWeight}
                               width={currentStyle.typeWidth}
                               fill={getColorForType(column.type)}
                               onTextEditEnd={({characters}) => changeColumnType(index, characters)}/>
                        <Input placeholder='Description' value={column.description}
                               fontFamily={currentStyle.text.fontFamily}
                               fontSize={currentStyle.text.fontSize * 0.8}
                               fontWeight={currentStyle.text.fontWeight}
                               width={'fill-parent'}
                               fill={theme.textColor}
                               onTextEditEnd={({characters}) => changeColumnDescription(index, characters)}/>
                        <SVG
                            src={getDeleteIcon(size)}
                            onClick={() => removeColumn(index)}
                        />
                    </AutoLayout>
                ) as FigmaVirtualNode<any> | FigmaDeclarativeChildren<any>[] | string | false)}
            </AutoLayout>
        </AutoLayout>
    );
}

widget.register(Widget);