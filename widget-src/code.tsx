const {widget} = figma
const {colorMapToOptions, useSyncedState, usePropertyMenu, AutoLayout, Input} = widget

function Widget() {
    const [table, setTable] = useSyncedState('tables', {
        name: '',
        columns: [],
    });

    const [size, setSize] = useSyncedState('size', 'medium'); // Estado para el tamaño
    const [headerColor, setHeaderColor] = useSyncedState('headerColor', '#2CD997'); // Estado para el color del encabezado


    usePropertyMenu([
        {
            itemType: 'action',
            propertyName: 'addColumn',
            tooltip: 'Add Column',
        },
        {
            itemType: 'separator',
        },
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
            itemType: 'color-selector',
            tooltip: 'Header Color',
            propertyName: 'headerColor',
            options: [
                ...colorMapToOptions(figma.constants.colors.figJamBase),
                {option: '#f5427b', tooltip: 'Hot Pink'}
            ],
            selectedOption: headerColor,
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


    const sizeStyles = {
        small: {
            widget: {width: 300, height: 'hug-contents'},
            text: {fontFamily: 'IBM Plex Mono', fontSize: 12, fontWeight: 'normal'},
            rowHeight: 40,
            typeWidth: 100
        },
        medium: {
            widget: {width: 500, height: 'hug-contents'},
            text: {fontFamily: 'IBM Plex Mono', fontSize: 16, fontWeight: 'normal'},
            rowHeight: 50,
            typeWidth: 125
        },
        large: {
            widget: {width: 900, height: 'hug-contents'},
            text: {fontFamily: 'IBM Plex Mono', fontSize: 22, fontWeight: 'normal'},
            rowHeight: 60,
            typeWidth: 150
        },
        xlarge: {
            widget: {width: 1500, height: 'hug-contents'},
            text: {fontFamily: 'IBM Plex Mono', fontSize: 30, fontWeight: 'normal'},
            rowHeight: 75,
            typeWidth: 220
        },
        xxlarge: {
            widget: {width: 3000, height: 'hug-contents'},
            text: {fontFamily: 'IBM Plex Mono', fontSize: 50, fontWeight: 'normal'},
            rowHeight: 90,
            typeWidth: 280
        },
    };

    const currentStyle = sizeStyles[size];

    return (
        <AutoLayout direction={'vertical'} cornerRadius={{topLeft: 5, topRight: 5}} width={currentStyle.widget.width}
                    height={currentStyle.widget.height}>
            <AutoLayout direction={'horizontal'} padding={{horizontal: 10, vertical: 7}} fill={headerColor}
                        horizontalAlignItems={'start'} verticalAlignItems={'center'} width={'fill-parent'}
                        height={currentStyle.rowHeight}
            >
                <Input placeholder='Table Name' value={table.name} fontFamily={currentStyle.text.fontFamily}
                       fontSize={currentStyle.text.fontSize}
                       fontWeight={'semi-bold'} lineHeight={'130%'}
                       fill={'#FFFFFF'} onTextEditEnd={({characters}) => changeTableName(characters)}/>
            </AutoLayout>
            <AutoLayout direction='vertical' width={'fill-parent'} stroke={'#CCCCCC'} strokeWidth={1}
                        strokeAlign={'inside'}>
                {table.columns.map((column, index) => (
                    <AutoLayout direction='horizontal' key={index} fill={'#FFFFFF'} spacing={15} width={'fill-parent'}
                                padding={{horizontal: 10, vertical: 7}} verticalAlignItems={'center'}
                                stroke={'#CCCCCC'} strokeWidth={1} strokeAlign={'center'}
                    >
                        <Input placeholder='Field' value={column.name} fontFamily={currentStyle.text.fontFamily}
                               fontSize={currentStyle.text.fontSize}
                               fontWeight={currentStyle.text.fontWeight} width={'fill-parent'} fill={'#000000'}
                               onTextEditEnd={({characters}) => changeColumnName(index, characters)}/>
                        <Input placeholder='Type' value={column.type} fontFamily={currentStyle.text.fontFamily}
                               fontSize={currentStyle.text.fontSize}
                               fontWeight={currentStyle.text.fontWeight} width={currentStyle.typeWidth} fill={'#F17400'}
                               onTextEditEnd={({characters}) => changeColumnType(index, characters)}/>
                        <Input placeholder='Description' value={column.description}
                               fontFamily={currentStyle.text.fontFamily}
                               fontSize={currentStyle.text.fontSize}
                               fontWeight={currentStyle.text.fontWeight} width={'fill-parent'} fill={'#000000'}
                               onTextEditEnd={({characters}) => changeColumnDescription(index, characters)}/>
                    </AutoLayout>
                ) as FigmaVirtualNode<any> | FigmaDeclarativeChildren<any>[] | string | false)}
            </AutoLayout>
        </AutoLayout>
    )
}

widget.register(Widget)