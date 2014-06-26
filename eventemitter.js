( function ( mix ) {

    mix.EventEmitter = function () {
        this.__events = {};
    };

    mix.extend( mix.EventEmitter.prototype, {

        addEventListener : function ( type, handler, one ) {
            if ( !type || !handler ) {
                return;
            }

            this.__events[ type ] = this.__events[ type ] || [];
            var events = this.__events[ type ];
            
            if ( !events.some( function ( _handler ) { return _handler.h == handler; } ) ) {
                this.__events[ type ].push( { h : handler, one : one } );
            }
        },

        removeEventListener : function ( type, handler ) {
            if ( !type || !handler ) {
                return;
            }
            var handlers = this.__events[ type ] || [];
            handlers.forEach( function ( _handler, index ) {
                if ( handler == _handler.h ) {
                    handlers.splice( index, 1 );
                }
            } );
        },

        trigger : function ( type ) {

            var handlers = this.__events[ type ] || [];
            var args = [].slice.call( arguments );

            var h;
            var removeIndex = [];

            handlers.forEach( function ( handler, index, handlers ) {
                h = handler.h;

                if ( util.isFunction( h ) ) {
                    h.apply( this, args );
                } else if ( util.isObject( h ) 
                         && util.isFunction( h.handleEvent ) ) {
                    h.handleEvent.apply( h, args );
                }

                if ( handler.one ) {
                    removeIndex.push( index );
                }

                //if ( handler.one ) {
                //    handlers.splice( index, 1 );
                //}

            } );

            if ( removeIndex.length ) {
                handlers = handlers.filter( function ( handler, index ) {
                    return removeIndex.indexOf( index ) == -1;
                } );

                this._events[ type ] = handlers ;
            }
        },

        emit : function ( type, data ) {
            this.trigger( type, data );
            //this.trigger.call( this, [].slice.call( arguments ) );
        },

        on : function ( type, handler, one ) {
            this.addEventListener( type, handler, one );
        },
        
        one : function ( type, handler ) {
            this.on( type, handler, true );
        }
    } );
} )( Mix );
