/**
 * @author xwcoder xwcoder@outlook.com
 */

this.Mix = {
    version : '1.0.0'
};

/**
 * @description 拷贝对象属性到另一对象. 浅拷贝
 * @param {Object} t Target
 * @param {Object} s Source
 * @param {Object} defaults Defaults object
 */
Mix.extend = function ( t, s, defaults ) {
    if ( defaults ) {
        Mix.extend( t, defaults );
    }

    if ( s && typeof s == 'object' ) {
        for ( var p in s ) {
            t[p] = s[p];
        }
    }

    return t;
};

( function ( window, undefined ) {
    var toString = Object.prototype.toString;  
    var slice = Array.prototype.slice;
    
    Mix.extend( Mix, {

        emptyFn : function () {
        },

        error : function ( msg ) {
            throw new Error( msg );
        },

        isArray : function ( a ) {
            return a && toString.call( a ) == '[object Array]';
        },

        isObject : function ( o ) {
            return o && toString.call( o ) == '[object Object]';
        },

        each : function ( list, fn ) {
            if ( !Mix.isArray( list ) && !Mix.isObject( list ) ) {
                Mix.error( '第一个参数必须是数组或对象' );
            }
            
            fn = fn || Mix.emptyFn;

            if ( Mix.isArray( list ) ) {
                for ( var i = 0, len = list.length; i < len; i++ ) {
                    fn.call( list[i], list[i], i );
                }
            } else if ( Mix.isObject( list ) ) {
                for ( var p in list ) {
                    fn.call( list[p], list[p], p );
                }
            }
        },

        namespace : function () {
            var args = slice.call( arguments );
            Mix.each( args, function ( index, item ) {
                var d = item.split( '.' ); 
                if ( typeof window[ d[0] ] == 'undefined' ) {
                    window[ d[0] ] = {};
                }
                var o = window[ d[0] ];
                for ( var i = 1, len = d.length; i < len; i++ ) {
                    o[ d[i] ] = o[ d[i] ] || {};
                }
            } );
        },
        
        inherit : function () {
            //TODO
        }
    } );
} )( this, this.undefined );
