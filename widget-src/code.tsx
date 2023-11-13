const {widget} = figma
const {colorMapToOptions, useSyncedState, usePropertyMenu, AutoLayout, Input} = widget

function Widget() {
    const [table, setTable] = useSyncedState('tables', {
        name: '',
        columns: [],
    });

    const [size, setSize] = useSyncedState('size', 'medium'); // Estado para el tamaño
    const [headerColor, setHeaderColor] = useSyncedState('headerColor', '#2CD997'); // Estado para el color del encabezado

    const addColumnIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="4" width="4" height="16" fill="#333" /><rect x="4" y="10" width="16" height="4" fill="#333" /></svg>`;

    usePropertyMenu([
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
        {
            itemType: 'separator',
        },
        {
            itemType: 'color-selector',
            tooltip: 'Header Color',
            propertyName: 'headerColor',
            options: [
                ...colorMapToOptions(figma.constants.colors.figJamBase),
                {option: '#f5427b', tooltip: 'Hot Pink'}
            ],
            selectedOption: headerColor,
        },
        {
            itemType: 'separator',
        },
        {
            itemType: 'action',
            propertyName: 'addColumn',
            tooltip: 'Add Column',
            icon: addColumnIcon,
        },
    ], ({propertyName, propertyValue}) => {
        if (propertyName === 'addColumn') {
            addColumn();
        } else if (propertyName === 'size') {
            setSize(propertyValue);
        }
        if (propertyName === 'headerColor') {
            setHeaderColor(propertyValue);
        }
    });

    const addColumn = () => {
        setTable({
            ...table,
            columns: [...table.columns, {name: '', type: '', description: ''}]
        });
    };

    const removeColumn = (index) => {
        setTable({
            ...table,
            columns: table.columns.filter((_, i) => i !== index)
        });
    };

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
        setTable({
            ...table,
            name,
        });
    };

    const fieldWidthPercentage = 0.3; // 50% del espacio disponible
    const typeWidthPercentage = 0.3; // 25% del espacio disponible
    const descriptionWidthPercentage = 0.4; // 25% del espacio disponible

    const sizeStyles = {
        small: {
            widget: { width: 600, height: 'hug-contents' },
            text: { fontFamily: 'IBM Plex Mono', fontSize: 20, fontWeight: 'normal' },
            rowHeight: 50,
            typeWidth: 120,
            fieldWidth: 280,
            padding: 30
        },
        medium: {
            widget: { width: 1000, height: 'hug-contents' },
            text: { fontFamily: 'IBM Plex Mono', fontSize: 27, fontWeight: 'normal' },
            rowHeight: 60,
            typeWidth: 170,
            fieldWidth: 380,
            padding: 40
        },
        large: {
            widget: { width: 1500, height: 'hug-contents' },
            text: { fontFamily: 'IBM Plex Mono', fontSize: 35, fontWeight: 'normal' },
            rowHeight: 75,
            typeWidth: 260,
            fieldWidth: 540,
            padding: 50
        },
        xlarge: {
            widget: { width: 2000, height: 'hug-contents' },
            text: { fontFamily: 'IBM Plex Mono', fontSize: 50, fontWeight: 'normal' },
            rowHeight: 85,
            typeWidth: 300,
            fieldWidth: 660,
            padding: 70
        },
        xxlarge: {
            widget: { width: 2800, height: 'hug-contents' },
            text: { fontFamily: 'IBM Plex Mono', fontSize: 70, fontWeight: 'normal' },
            rowHeight: 100,
            typeWidth: 400,
            fieldWidth: 750,
            padding: 90
        },
    };

    const currentStyle = sizeStyles[size];


    return (
        <AutoLayout direction={'vertical'} cornerRadius={10} width={currentStyle.widget.width} height={currentStyle.widget.height} stroke="#E1E1E1" strokeWidth={2}>
            <AutoLayout direction={'horizontal'} padding={currentStyle.padding} fill={headerColor} horizontalAlignItems={'start'} verticalAlignItems={'center'} width={'fill-parent'}>
                <Input
                    placeholder='Table Name'
                    value={table.name}
                    fontFamily={currentStyle.text.fontFamily}
                    fontSize={currentStyle.text.fontSize * 1.3}
                    fontWeight={'semi-bold'} fill={'#FFFFFF'}
                    width={'fill-parent'}
                    onTextEditEnd={({characters}) => changeTableName(characters)} />
            </AutoLayout>
            <AutoLayout direction='vertical' width={'fill-parent'}>
                {table.columns.map((column, index) => (
                    <AutoLayout key={index}
                                direction='horizontal'
                                fill="#FAFAFA"
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
                               fill={'#000000'}
                               onTextEditEnd={({characters}) => changeColumnName(index, characters)}/>
                        <Input placeholder='Type' value={column.type} fontFamily={currentStyle.text.fontFamily}
                               fontSize={currentStyle.text.fontSize}
                               fontWeight={currentStyle.text.fontWeight} width={currentStyle.typeWidth} fill={'#F17400'}
                               onTextEditEnd={({characters}) => changeColumnType(index, characters)}/>
                        <Input placeholder='Description' value={column.description}
                               fontFamily={currentStyle.text.fontFamily}
                               fontSize={currentStyle.text.fontSize}
                               fontWeight={currentStyle.text.fontWeight}
                               width={'fill-parent'}
                               fill={'#000000'}
                               onTextEditEnd={({characters}) => changeColumnDescription(index, characters)}/>
                    </AutoLayout>
                ) as FigmaVirtualNode<any> | FigmaDeclarativeChildren<any>[] | string | false)}
            </AutoLayout>
        </AutoLayout>
    )
}

widget.register(Widget)