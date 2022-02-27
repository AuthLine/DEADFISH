
/* tslint:disable */
/* eslint-disable */
(function ($) {
    class DataAdapter {
    constructor ( config ) {
        if ( !config ) {
            config = {};
        }

        const that = Object.assign( this, config );

        const generateKey = function () {
            const S4 = function () {
                return ( ( ( 1 + Math.random() ) * 0x10000 ) | 0 ).toString( 16 ).substring( 1 );
            };
            return S4();
        };

        that.key = generateKey();

        that.boundSource = [];
        that.dataItemById = [];

        if ( that.allowAdd === undefined ) {
            that.allowAdd = true;
        }

        if ( that.allowRemove === undefined ) {
            that.allowRemove = true;
        }

        if ( that.allowUpdate === undefined ) {
            that.allowUpdate = true;
        }

        if ( config.observable === undefined ) {
            that.observable = true;
        }


        if ( !config.dataSource ) {
            that.dataSource = [];
        }

        if ( !config.dataFields ) {
            that.dataFields = [];
        }
        else {
            /* if (config.dataSource && config.dataSource.length > 0) {
                 const keys = Object.keys(config.dataSource[0]);

                 //     that.dataFields = [];

                 for (let i = 0; i < keys.length; i++) {

                 }
             }
             */
        }

        if ( !config.dataSourceType ) {
            that.dataSourceType = 'array';
        }

        if ( !config.id ) {
            that.id = null;
        }

        if ( !config.autoFetch ) {
            that.autoFetch = true;
        }

        if ( config.dataFields ) {
            that.dataFields = config.dataFields;
        }

        Object.defineProperty( that, 'groupBy', {
            configurable: false,
            enumerable: true,
            get() {
                if ( !that._groupBy ) {
                    return [];
                }

                return that._groupBy;
            },
            set( value ) {
                const updateGrouping = () => {
                    that.boundHierarchy = null;
                    that.refreshHierarchy();

                    if ( that.onGroup ) {
                        that.onGroup();
                    }
                }

                that._groupBy = [].concat(value);
              
                if ( that.isInitialized ) {
                    updateGrouping();
                }
            }
        } );

        if ( !config.groupBy ) {
            that.groupBy = [];
        }
        else {
            if ( config.groupBy.toArray ) {
                that.groupBy = config.groupBy.toArray();
            }
            else {
                that.groupBy = config.groupBy;
            }
        }

        if ( config && config.autoBind !== false ) {
            that.dataBind();
        }

        that.isInitialized = true;
    }

    get dataFields() {
        const that = this;

        return that._dataFields;
    }

    set dataFields( value ) {
        const that = this;

        that._dataFields = that._getDataFieldObjects( value );

        return that._dataFields;
    }

    _getDataFieldObjects( dataFields ) {
        //const that = this;

        let dataFieldObjects = [];

        if ( typeof dataFields === 'number' ) {
            const charCode = 'A'.charCodeAt( 0 );
            let prefix = '';
            let index = 0;

            for ( let i = 0; i < dataFields; i++ ) {
                const letter = String.fromCharCode( charCode + index );

                index++;

                const label = prefix + letter;

                dataFieldObjects.push( { name: label, dataType: 'string' } )

                if ( index >= 26 ) {
                    index = 0;
                    prefix += 'A';
                }
            }
        }
        else if ( dataFields.length > 0 ) {
            for ( let i = 0; i < dataFields.length; i++ ) {
                const dataField = dataFields[ i ];

                if ( typeof dataField === 'string' ) {
                    const dataFieldParts = dataField.split( ':' );
                    const name = dataFieldParts[ 0 ].trim();
                    const dataType = dataFieldParts.length > 1 ? dataFieldParts[ 1 ].trim() : 'string';

                    dataFieldObjects.push( { name: name, dataType: dataType } );
                }
                else {
                    dataFieldObjects.push( dataField );
                }
            }
        }

        return dataFieldObjects;
    }

    get dataSource() {
        const that = this;

        if ( !that._dataSource ) {
            that._dataSource = [];
        }

        return that._dataSource;
    }

    set dataSource( value ) {
        const that = this;

        that._dataSource = value;

        if ( that.isInitialized ) {
            that.boundSource = false === that.observable ? [] : new JQX.ObservableArray();
            that.dataItemById = [];
            that.bindingCompleted = false;
            that.dataBind();
        }
    }

    get canNotify() {
        const that = this;

        if ( that._canNotify === undefined ) {
            that._canNotify = true;
        }

        return that._canNotify;
    }

    set canNotify( value ) {
        const that = this;

        that._canNotify = value;
    }

    _notify( changeArgs ) {
        const that = this;

        if ( !that.canNotify ) {
            return;
        }

        if ( that.notifyFn ) {
            that.notifyFn( changeArgs );
        }
    }

    notify( notifyFn ) {
        const that = this;

        if ( notifyFn ) {
            that.notifyFn = notifyFn;
        }
    }

    toArray() {
        const that = this;

        return that.boundSource.toArray();
    }

    dataBind() {
        const that = this;

        that.clear();

        const completed = () => {
       

            that._onBindingComplete();
        }

        if ( typeof that.dataSource === 'string' && ( that.dataSource.indexOf( '.json' ) >= 0 ) ) {
            that.url = that.dataSource;
            that.dataSourceType = 'json';

            new Ajax( that, ( data/*, status*/ ) => {
                that.dataSource = data;

                that._bindToJSON();
            } );
        }
        else if ( typeof that.dataSource === 'string' && ( that.dataSource.indexOf( '.xlsx' ) >= 0 ) ) {
            that.url = that.dataSource;
            that.dataSourceType = 'xlsx';

            new Ajax( that, ( data/*, status*/ ) => {
                if ( !data[ 0 ] ) {
                    data = [];
                    that._bindToArray();
                    completed();
                    return;
                }

                const keys = Object.keys( data[ 0 ] );
                const dataFieldMap = {};
                const dataRows = [];

                if ( that.exportHeader !== false ) {
                    let index = 0;

                    for ( let key in keys ) {
                        const name = keys[ key ];

                        dataFieldMap[ name ] = that.dataFields[ index++ ].name;
                    }

                    for ( let i = 1; i < data.length; i++ ) {
                        const row = data[ i ];
                        const dataRow = {};

                        for ( let key in keys ) {
                            const name = keys[ key ];

                            dataRow[ dataFieldMap[ name ] ] = row[ name ];
                        }

                        dataRows.push( dataRow );
                    }

                    that.dataSource = dataRows;
                }

                that._bindToArray();
                completed();
            } );
        }
        else if ( typeof that.dataSource === 'string' && ( that.dataSource.indexOf( '.csv' ) >= 0 ) ) {
            that.dataSourceType = 'csv';

            new Ajax( that, (/*data, status*/ ) => {
                that._bindToArray();
            } );
        }
        else if ( typeof that.dataSource === 'string' && ( that.dataSource.indexOf( '.tsv' ) >= 0 ) ) {
            that.dataSourceType = 'tsv';

            new Ajax( that, (/*data, status*/ ) => {
            } );
        }
        else if ( that.dataSourceType === 'array' ) {
            that._bindToArray();
            completed();
        }
        else if ( that.dataSourceType === 'json' ) {
            that._bindToJSON();
            completed();
        }
    }

    _onBindingComplete() {
        const that = this;

        that._buildHierarchy();

        if ( that.onBindingComplete ) {
            that.onBindingComplete( { data: that.boundSource } );
        }

        if ( that._notify ) {
            that._notify( { action: 'bindingComplete', data: that.boundSource } );
        }

        that.bindingCompleted = true;
    }

    refreshHierarchy() {
        const that = this;

        that._buildHierarchy();
    }

    find() {
        const that = this;

        return that.boundSource.find.apply( that.boundSource, arguments );
    }

    onVirtualDataSourceRequested( requestCallback, details ) {
        const that = this;

        let first = details ? details.first : Infinity;
        let last = details ? details.last : Infinity;
        let row = details ? details.row : null;

        if ( undefined === first ) {
            first = Infinity;
        }

        if ( undefined === last ) {
            last = Infinity;
        }

        that.virtualFirstIndex = first;
        that.virtualLastIndex = last;

        if ( that.virtualDataSource ) {
            const getDataSource = function ( ExcelAdapterSettings ) {
                if ( ExcelAdapterSettings.virtualDataSourceLength !== undefined ) {
                    that.virtualDataSourceLength = ExcelAdapterSettings.virtualDataSourceLength;
                }

                new JQX.ExcelAdapter(
                    {
                        dataSource: ExcelAdapterSettings.dataSource,
                        dataFields: ExcelAdapterSettings.dataFields || that.dataFields,
                        data: details,
                        onBindingComplete( event ) {

                            if ( that.virtualDataSourceOnExpand && row ) {
                                if ( event.data && event.data.length > 0 ) {
                                    that.add( event.data, row.$.id );
                                }
                                else {
                                    row.leaf = true;
                                }

                                if ( that.onFilter ) {
                                    that.onFilter()
                                }

                                requestCallback();

                                return;
                            }

                            if ( first === Infinity ) {
                                that.add( event.data );
                            }
                            else {
                                let items = [];
                                let indexes = [];

                                for ( let i = 0; i < event.data.length; i++ ) {
                                    const item = event.data[ i ];

                                    if ( first + i <= last ) {
                                        items.push( item );
                                        indexes.push( first + i );
                                    }
                                }

                                that.update( indexes, items );
                            }


                            if ( that.onFilter ) {
                                that.onFilter()
                            }

                            requestCallback();
                        }
                    } );
            }

            let hasCache = false;

            const isEmpty = ( obj ) => Object.entries( obj ).length === 0 && ( obj.constructor === Object || obj.constructor === Array );
            const canCache = isEmpty( details.sorting ) && isEmpty( details.filtering ) && isEmpty( details.grouping ) && !details.row && ( details.action !== 'filter' && details.action !== 'sort' && details.action !== 'group' );

            if ( that.virtualDataSourceCache && first !== Infinity && canCache ) {
                let cachedCount = 0;

                for ( let i = first; i < last; i++ ) {
                    if ( !that[ i ].$.isEmpty ) {
                        cachedCount++;
                    }
                }

                if ( cachedCount === last - first ) {
                    hasCache = true;
                }
            }

            if ( hasCache ) {
                requestCallback();
            }
            else {
                if ( details.action === 'expand' ) {
                    that.virtualDataSourceOnExpand( getDataSource, {
                        first: first,
                        last: last,
                        row: details.row,
                        sorting: details.sorting,
                        filtering: details.filtering,
                        grouping: details.grouping,
                        action: details.action
                    } );
                }
                else {
                    that.virtualDataSource( getDataSource, {
                        first: first,
                        last: last,
                        sorting: details.sorting,
                        filtering: details.filtering,
                        filterOperator: details.filterOperator || 'and',
                        grouping: details.grouping,
                        action: details.action
                    } );
                }
            }
        }
        else {
            requestCallback();
        }
    }

    add( item, parentId ) {
        const that = this;

        if ( !item ) {
            return;
        }

        let result = true;

        const addItem = function ( item ) {
            const itemObject = that._getDataItem( item, that.boundSource.length );

            that[ that.boundSource.length ] = itemObject;
            that.dataItemById[ itemObject.$.id ] = itemObject;

            const pushResult = that.boundSource.push( itemObject );

            if ( parentId !== undefined ) {
                itemObject.$.parentId = parentId;
            }

            if ( !pushResult ) {
                result = false;
            }

            return itemObject;
        }

        if ( item.length ) {
            let itemObjects = [];

            for ( let i = 0; i < item.length; i++ ) {
                const itemObject = addItem( item[ i ] );

                itemObjects.push( itemObject );
            }

            that._notify( { action: 'add', data: itemObjects } );
        }
        else {
            const itemObject = addItem( item );

            that._notify( { action: 'add', data: itemObject } );
        }

        that.refreshHierarchy();

        return result;
    }

    refreshIndexes() {
        const that = this;

        for (let i = 0; i < that.boundSource.length; i++) {
            that[i] = that.boundSource[i];
            that[i].$.index = i;
            that.dataItemById[that[i].$.id] = that[i];
        }

        let i = that.boundSource.length;

        while (that[i]) {
            delete that[i];
            i++;
        }
    }

    removeLast() {
        const that = this;

        delete that[that.boundSource.length - 1];
        const result = that.boundSource.pop();
        delete that.dataItemById[result.$.id];

        that._notify({ action: 'removeLast', data: result });

        that.refreshHierarchy();

        return result;
    }

    removeAt(index) {
        const that = this;

        const item = that.boundSource[index];

        if (!item) {
            throw new Error('Invalid Item Index');
        }

        that.boundSource.splice(index, 1);
        delete that.dataItemById[item.$.id];
        that.refreshIndexes();

        that._notify({ action: 'remove', index: index, data: item });

        that.refreshHierarchy();
    }

    update( index, dataSourceItem ) {
        const that = this;

        if ( JQX.Utilities.Types.isArray( index ) && JQX.Utilities.Types.isArray( dataSourceItem ) ) {
            if ( index.length === 0 && dataSourceItem.length === 0 ) {
                that.refreshHierarchy();
                return;
            }
        }

        if ( dataSourceItem.length && index.length ) {
            let itemObjects = [];

            for ( let i = 0; i < index.length; i++ ) {
                const itemObject = that._getDataItem( dataSourceItem[ i ], index[ i ] );
                const currentIndex = index[ i ];

                itemObjects.push( itemObject );

                that.boundSource[ currentIndex ] = itemObject;
                that[ currentIndex ] = that.boundSource[ currentIndex ];
                that.dataItemById[ itemObject.$.id ] = that[ currentIndex ];
            }

            that._notify( { action: 'update', index: index, data: itemObjects } );

            that.refreshHierarchy();

            return;
        }

        const itemObject = that._getDataItem( dataSourceItem, index );

        that.boundSource[ index ] = itemObject;
        that[ index ] = that.boundSource[ index ];
        that.dataItemById[ itemObject.$.id ] = that[ index ];

        that._notify( { action: 'update', index: index, data: itemObject } );

        that.refreshHierarchy();

        return itemObject;
    }

    insert( index, item ) {
        const that = this;

        item = that._getDataItem( item, index );

        const result = that.boundSource.splice( index, 0, item );

        that.refreshIndexes();

        that._notify( { action: 'insert', index: index, data: item } );

        that.refreshHierarchy();

        return result;
    }

    move( from, to ) {
        if ( to > from && to - from === 1 || from === to ) {
            return;
        }

        const that = this,
            recordToMove = that.boundSource.splice( from, 1 )[ 0 ];

        if ( to > from ) {
            to--;
            that.boundSource.splice( to, 0, recordToMove );
        }
        else {
            that.boundSource.splice( to, 0, recordToMove );
        }

        that.refreshIndexes();

        that._notify( { action: 'move', index: to, data: that.boundSource[ to ] } );

        that.refreshHierarchy();
    }

    indexOf( item ) {
        const that = this;
        const index = that.boundSource.indexOf( item );

        return index;
    }

    get length() {
        const that = this;

        if ( that.virtualDataSourceLength !== undefined ) {
            return that.virtualDataSourceLength;
        }

        if ( that.dataSourceLength ) {
            return that.dataSourceLength;
        }

        if ( typeof ( that.dataSource ) === 'number' ) {
            return that.dataSource;
        }

        if ( that.bindingCompleted ) {
            return that.boundSource.length;
        }

        if ( that.dataSource && typeof that.dataSource !== 'string' && that.dataSource.length ) {
            return that.dataSource.length;
        }

        return that.boundSource.length;
    }

    clear() {
        const that = this;

        if ( !that.isInitialized ) {
            that._cachedValues = [];
            that.dataItemById = [];
            return;
        }

        for ( let i = 0; i < that.boundSource.length; i++ ) {
            delete that[ i ];
        }

        that._cachedValues = [];
        that.boundSource = that.observable ? new JQX.ObservableArray() : [];
        that.dataItemById = [];
        that.refreshHierarchy();
    }

    _getId( id, item, index ) {
        if ( id !== null && id.name !== undefined ) {
            if ( id.name && item.getAttribute ) {
                let result = item.getAttribute( id.name );
                if ( result !== null && result.toString().length > 0 ) {
                    return result;
                }
                else if ( id.map ) {
                    try {
                        let result = item.getAttribute( id.map );
                        if ( result !== null && result.toString().length > 0 ) {
                            return result;
                        }
                    }
                    catch ( error ) {
                        return index;
                    }
                }
                return;
            }
        }

        if ( id ) {
            if ( id.toString().length > 0 && item.getAttribute ) {
                let result = item.getAttribute( id );
                if ( result !== null && result.toString().length > 0 ) {
                    return result.trim().split( ' ' ).join( '' ).replace( /([ #;?%&,.+*~\':'!^$[\]()=>|\/@])/g, '' );
                }
                else {
                    let splitMap = id.split( this.mapChar );
                    if ( splitMap.length > 1 ) {
                        let d = item;
                        for ( let p = 0; p < splitMap.length; p++ ) {
                            if ( d !== undefined ) {
                                d = d[ splitMap[ p ] ];
                            }
                        }
                        if ( d !== undefined ) {
                            return d;
                        }
                    }
                    else {
                        if ( item[ id ] !== undefined ) {
                            return item[ id ];
                        }
                    }
                }
            }
        }

        return index;
    }

    _buildHierarchy() {
        const that = this;

        if ( !that.reservedNames ) {
            that.reservedNames = {
                leaf: 'leaf',
                parent: 'parent',
                expanded: 'expanded',
                checked: 'checked',
                selected: 'selected',
                level: 'level',
                icon: 'icon',
                data: 'data'
            }
        }
        else {
            const names = that.reservedNames;

            if ( !names.leaf ) {
                names.leaf = 'leaf';
            }
            if ( !names.parent ) {
                names.parent = 'parent';
            }
            if ( !names.expanded ) {
                names.expanded = 'expanded';
            }
            if ( !names.checked ) {
                names.checked = 'checked';
            }
            if ( !names.selected ) {
                names.selected = 'selected';
            }
            if ( !names.level ) {
                names.level = 'level';
            }
            if ( !names.data ) {
                names.data = 'data';
            }

        }

        const names = that.reservedNames;

        if ( that.childrenDataField ) {
            const hierarchy = [];

            for ( let i = 0; i < that.boundSource.length; i++ ) {
                const item = Object.assign( {}, that.boundSource[ i ] );

                if ( !item ) {
                    continue;
                }

                hierarchy.push( item );

                const addItems = function ( item ) {
                    const splitMap = that.childrenDataField.split( that.mapChar );
                    let children = null;

                    if ( splitMap.length > 1 ) {
                        let data = item;

                        for ( let p = 0; p < splitMap.length; p++ ) {
                            if ( data !== undefined ) {
                                data = data[ splitMap[ p ] ];
                            }
                        }

                        children = data;
                    }
                    else {
                        children = item[ 'children' ];
                    }

                    item[ 'children' ] = children;

                    if ( item[ 'children' ] === null || item[ 'children' ] === undefined || ( item[ 'children' ] && item[ 'children' ].length === 0 ) ) {
                        item[ names.leaf ] = true;
                    }
                }

                addItems( item );
                item[ names.level ] = 0;

                if ( !item.$ ) {
                    item.$ = {};
                }

                item[ names.parent ] = null;
                item[ names.data ] = item;

                if ( item[ names.expanded ] === undefined ) {
                    item[ names.expanded ] = false;
                }

                const drillThrough = function ( parent, children ) {
                    if ( !children ) {
                        parent[ 'children' ] = new Array();
                        return;
                    }

                    for ( let i = 0; i < children.length; i++ ) {
                        let item = that._getDataItem( children[ i ], i );

                        if ( !item ) {
                            continue;
                        }

                        addItems( item );
                        item[ names.level ] = parent[ names.level ] + 1;
                        item[ names.parent ] = parent;
                        item[ names.data ] = item;

                        if ( parent ) {
                            parent[ 'children' ][ i ] = item;
                        }


                        if ( item[ names.expanded ] === undefined ) {
                            item[ names.expanded ] = false;
                        }

                        drillThrough( item, item[ 'children' ] );
                    }
                }

                drillThrough( item, item[ 'children' ] );
            }


            that.boundHierarchy = hierarchy;

            if ( !that._boundSourceUpdate ) {
                for ( let i = 0; i < that.boundHierarchy.length; i++ ) {
                    const item = that.boundHierarchy[ i ];

                    if ( item.children ) {
                        const drillThrough = function ( item ) {
                            if ( !that.dataItemById[ item.$.id ] ) {
                                that.boundSource.canNotify = false;
                                that.dataItemById[ item.$.id ] = item;
                                that[ that.boundSource.length ] = item;
                                that.boundSource.push( item );
                                that.boundSource.canNotify = true;
                            }

                            if ( item.children ) {
                                for ( let i = 0; i < item.children.length; i++ ) {
                                    const child = item.children[ i ];

                                    if ( child.children ) {
                                        drillThrough( child );
                                    }
                                }
                            }
                        }

                        drillThrough( item );
                    }
                }

                that._boundSourceUpdate = true;
            }
        }

        if ( that.xmlRoot && that.dataSourceType === 'xml' ) {
            that.boundHierarchy = this._getHierarchy( 'uid', '_parentuid', 'children', null, that.boundSource );
        }

        if ( that.keyDataField && that.parentDataField ) {
            that.boundHierarchy = this._getHierarchy( that.keyDataField, that.parentDataField, 'children', null, that.boundSource );
        }

        if ( that.groupBy && that.groupBy.length > 0 ) {
            that.boundHierarchy = this._getGroupHierarchy( that.groupBy, 'children', 'label', null, 'data', null, 'parent', that.boundSource );
        }

        if ( that.virtualDataSourceOnExpand ) {
            that.boundHierarchy = this._