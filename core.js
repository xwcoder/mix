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

        isNumber : function ( n ) {
            return n && toString.call( n ) == '[object Number]';
        }

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
        },

        /**
         * Check if two object(objA,objB) are equeals. like equals method in java.
         * @param {Object} 
         * @param {Object}  
         * @return {Boolean}
         */
        equals : function ( objA, objB ) {
            if ( typeof arguments[0] != typeof arguments[1] ) {
                return false;
            }
            if ( arguments[0] instanceof Array ) {
                if ( arguments[0].length != arguments[1].length ) {
                    return false;
                }
                var allElementsEqual = true;
                for ( var i = 0; i < arguments[0].length; ++i ) {
                    if ( typeof arguments[0][i] != typeof arguments[1][i] ) {
                        return false;
                    }
                    if ( typeof arguments[0][i] == 'number' && typeof arguments[1][i] == 'number' ) {
                        allElementsEqual = ( arguments[0][i] === arguments[1][i] );
                    } else {
                        allElementsEqual = arguments.callee( arguments[0][i], arguments[1][i] ); 
                    }
                }
                return allElementsEqual;
            }
        
            if ( arguments[0] instanceof Object && arguments[1] instanceof Object ) {
                var result = true;
                var attributeLengthA = 0;
                var attributeLengthB = 0;
                for ( var o in arguments[0] ) {
                    if ( typeof arguments[0][o] == 'number' || typeof arguments[0][o] == 'string') {
                        result = arguments[0][o] == arguments[1][o];
                         //result = eval( "arguments[0]['" + o + "'] == arguments[1]['" + o + "']" );
                    }else {
                        //if ( !arguments.callee(eval("arguments[0]['" + o + "']"), eval("arguments[1]['" + o + "']" ) ) ) {
                        if ( !arguments.callee( arguments[0][o], arguments[1][o] ) ) {
                            result = false;
                            return result;
                        }
                    }
                    ++attributeLengthA;
                }
                
                for ( o in arguments[1] ) {
                    ++attributeLengthB;
                }
                
                if ( attributeLengthA != attributeLengthB ) {
                     result = false;
                }
                return result;
            }
            return arguments[0] == arguments[1];
        },

        /**
         * A util method to deep clone a object.
         * @param {} obj The object to be cloned.
         * @param {String} preventName The property name do not to be cloned. 
         * @return {}
         */
        clone : function ( obj, preventName ) {
            if ( typeof obj == 'object' ) {
                var res = obj instanceof Array ? [] : {};
                for( var p in obj ) {
                    if ( p != preventName ) {
                        res[p] = arguments.callee( obj[p], preventName );
                    }
                }
                return res;
            } else if ( toString.call( obj ) === '[object Function]' ) {
                return ( new obj() ).constructor;			
            }
            return obj;
        }
    } );
} )( this, this.undefined );
