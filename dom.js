/**
 * 基本dom操作
 */
Mix.namespace( 'Mix.dom' );

( function () {

    var dom = Mix.dom; 

    Mix.extend( Mix.dom, {
        
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
            } while ( el && el !.nodeType != 1 );

            return el;
        },

        /**
         * @description 获取el的第一个子节点，没有则返回null
         */
        firstChild : function ( el ) {
            el = el.firstChild;
            return el && el.nodeType != 1 ? dom.next( el ) : el;
        },
        
        lastChild : function ( el ) {
            el = el.lastChild;
            return el && el.nodeType != 1 ? dom.prev( el ) : el;
        }
    } );
} )();
