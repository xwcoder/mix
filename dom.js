/**
 * @description 基本dom操作，辅助函数
 */
Mix.namespace( 'Mix.dom' );

( function ( mix ) {

    var dom = Mix.dom; 
    var create = function ( el ) {
        if ( Object.prototype.toString.call( el ) == '[object String]' ) {
            el = document.createTextNode( el );
        }
        return el;
    };

    Mix.extend( Mix.dom, {
        
        /**
         * @description 创建元素
         */
        create : function ( tag, styles, attrs ) {
            var el = document.createElement( tag );
            styles && typeof styles == 'object' && mix.css.setStyle( el, styles );
            attrs && typeof attrs == 'object' && mix.dom.setAttrs( el, attrs );

            return el;
        },
        
        /**
         * @description 获取el的上一个兄弟节点，没有则返回null
         */
        prev : function ( el ) {
            do {
                el = el.previousSibling;
            } while ( el && el.nodeType != 1 );

            return el;
        },

        /**
         * @description 获取el的下一个兄弟节点，没有则返回null
         */
        next : function ( el ) {
            do {
                el = el.nextSibling;
            } while ( el && el.nodeType != 1 );

            return el;
        },

        /**
         * @description 获取el的第一个子节点，没有则返回null
         */
        firstChild : function ( el ) {
            el = el.firstChild;
            return el && el.nodeType != 1 ? dom.next( el ) : el;
        },
        
        /**
         * @description 获取el的最后一个子节点，没有则返回null
         */
        lastChild : function ( el ) {
            el = el.lastChild;
            return el && el.nodeType != 1 ? dom.prev( el ) : el;
        },
        
        /**
         * @description 根据id获得元素
         */
        getById : function ( id ) {
            return document.getElementById( id );
        },
        
        /**
         * @description 根据tagName获取元素，返回数组
         */
        getByTag : function ( tagName, el ) {
            var list = ( el || document ).getElementsByTagName( tagName || '*' ) || [];
            var h = [];
            for ( var i = 0; i < list.length; i++ ) {
                h.push( list[ i ] );
            }
            return h;
        },
        
        /**
         * @description 获得el下含有指定类名的元素
         */
        getByClassName : function ( className, el ) {
            var h = [];
            var list;
            var reg = new RegExp( '(^|\\s*)' + className + '(\\s*|$)' );

            if ( document.getElementsByClassName ) {
                list = (el || document).getElementsByClassName( className );
                for ( var i = 0, len = list.length; i < len; i++ ) {
                    h.push( list.item( i ) );
                }
            } else {
                list = dom.getByTag( null, el );
                for ( var i = 0, len = list.length; i < len; i++) {
                    reg.test( dom.attr( list[ i ], 'class') ) && h.push( list[ i ] );
                }
            }
            return h;
        },

        /**
         * @description 获取el下的文本内容
         */
        text : function ( el ) {
            var el = el.childNodes || el;   
            var t = '';
            
            for ( var i = 0, len = el.length; i < len; i++ ) {
                t += el[i].nodeType != 1 ? el[i].nodeValue : dom.text( el[i] );
            }

            return t;
        },
        
        /**
         * @description 设置/获取el的html内容
         */
        html : function ( el, html ) {
            if ( html ) {
                el.innerHTML = html;
            } else {
                return el.innerHTML;
            }
        },
        
        /**
         * @description 存取元素属性
         */
        attr : function ( el, name, value ) {
            var map = { 'class' : 'className', 'for' : 'htmlFor' };
            name = map[ name ] || name;

            if ( typeof value != 'undefined' ) {
                el[name] = value;
                
                el.setAttribute && el.setAttribute( name, value );
            } 

            return el[name] || el.getAttribute( name ) || '';
        },

        /**
         * @description 设置元素属性
         */
        setAttrs : function ( el, attrs ) {
            if ( attrs && typeof attrs == 'object' ) {
                var tp = this;
                mix.each( attrs, function ( value, name ) {
                    tp.attr( el, name, value ); 
                } );
            }
        },
        
        /**
         * @description 将child插入到parent的最后
         */
        append : function ( parent, child ) {
            parent.appendChild( create( child ) );
        },

        /**
         * @description 将node插入到before之前
         */
        before : function ( node, before ) {
            var parent = before.parentNode;
            parent.insertBefore( create( node ), before );
        },
        
        /**
         * @description 将node插入到after之后
         */
        after : function ( node, after ) {
            after.nextSibling ?  dom.before( node, after.nextSibling ) : append( after.parent, node );
        }
    } );
} )( Mix );
