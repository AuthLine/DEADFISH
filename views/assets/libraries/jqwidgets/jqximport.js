
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
        const that = th