/**
 * @description 基本样式操作，辅助函数
 */

( function ( mix ) {
    Mix.namespace( 'Mix.css' );
    var css = Mix.css; 

    mix.extend( css, {
        /**
         * @description 将形如z-index的样式名称传换成zIndex
         */
        styleName : function ( s ) {
            s = s.toLowerCase().split( '-' );
            var attr = s[0];
            for ( var i = 1, len = s.length; i < len; i++ ) {
                attr = attr + s[i].replace(/\b(\w)|\s+(\w)/g, function( a ) { return a.toUpperCase(); } );
            }
            return attr;
        },
        
        /**
         * @description 获得元素el的样式值, 如height
         */
        getStyle : function ( el, name ) {
            name = name.toLowerCase();
            var cName = css.styleName( name );
            var style = null;
            if ( el.style[ cName ] ) {
                style = el.style[ cName ];
            } else if ( el.currentStyle ) {
                style = el.currentStyle[ cName ];
            } else if ( document.defaultView && document.defaultView.getComputedStyle ) {
                style = document.defaultView.getComputedStyle( el, null );
                if ( style ) {
                    style = style.getPropertyValue( name );
                }
            }
            return style;
        },
        
        /**
         * @description 设置元素el的样式
         * @return {Object} 旧样式信息
         */
        setStyle : function () {

            if ( arguments.length <= 1 ) {
                return;
            }
            var el = arguments[ 0 ];
            var styles = arguments[ 1 ];
            var old = {};
            if ( typeof styles === 'object' ) {
                for( var p in styles ) {
                    old[ p ] = css.getStyle( p );
                    if ( p.toLowerCase() == 'opacity' ) {
                        css.opacity( el, styles[ p ] );
                    } else {
                        el.style[ css.styleName( p ) ] = styles[ p ];
                    }
                }
            } else {
                old[ arguments[ 1 ] ] = css.getStyle( arguments[ 1 ] );
                if ( arguments[ 1 ].toLowerCase() == 'opacity' ) {
                    css.opacity( el, arguments[ 2 ] );
                } else {
                    el.style[ css.styleName( arguments[ 1 ] ) ] = arguments[ 2 ];
                }
            }
        },
        
        /**
         * @description 获得元素el在文档中的位置信息
         * @return {Object} { top : 10, left : 20 }
         */
        offset : function ( el ) {
            var left = function ( el ) {
                return el.offsetParent ? el.offsetLeft + arguments.callee( el.offsetParent ) : el.offsetLeft;  
            } ( el );

            var top = function ( el ) {
                return el.offsetParent ? el.offsetTop + arguments.callee( el.offsetParent ) : el.offsetTop;  
            } ( el );
            return { left : left, top : top };
        },

        /**
         * @description 获得元素el相对视窗的位置信息
         * @return {Object} { top : 10, left : 20 }
         */
        pos : function ( el ) {
            var left = el.getBoundingClientRect().left;
        　　var top = el.getBoundingClientRect().top;
            if ( mix.isIE6 || mix.isIE7 ) {
                left -= 2;
                top -= 2;
            }
            return { left : left, top : top };
        },
        
        /**
         * @description 获得元素el相对父元素的位置信息
         * @return {Object} { top : 10, left : 20 }
         */
        offsetToParent : function ( el ) {
            var left, top;
            if ( el.parentNode == el.offsetParent ) {
                left = el.offsetLeft;
                top = el.offsetTop;
            } else {
                var oft = css.offset( el );
                var ofp = css.offset( el.parentNode );
                left = oft.left - ofp.left;
                top = oft.top - ofp.top;
            }
            return { left : left, top : top };
        },

        /**
         * @description 设置或获得元素的高度
         */
        height : function () {
            var args = Array.prototype.slice( arguments );
            if ( args.length < 1 ) {
                return;
            }
            
            var el = args[ 0 ];
            if ( args.length == 1 ) {
                if ( css.getStyle( el, 'display' ) != 'none' ) {
                    return el.offsetHeight || parseInt( css.getStyle( el, 'height' ) );
                }
                //处理display为none的情况
                var old = css.setStyle( el, {
                    display : '',
                    visibility: 'hidden',
                    position : 'absolute'
                } );
                
                var h = el.clientHeight || parseInt( css.getStyle( el, 'height' ) );
                css.setStyle( el, old );

                return h;

            } else {
                var h = '' + args[ 1 ];
                if ( h.indexOf( 'px' ) == -1 ) {
                    h += 'px';
                }
                css.setStyle( el, 'height', h );
            }
        },
        
        /**
         * @description 设置或获得元素的宽度
         */
        width : function () {
            var args = Array.prototype.slice( arguments );
            if ( args.length < 1 ) {
                return;
            }
            
            var el = args[ 0 ];
            if ( args.length == 1 ) {
                if ( css.getStyle( el, 'display' ) != 'none' ) {
                    return el.offsetWidth || parseInt( css.getStyle( el, 'width' ) );
                }
                //处理display为none的情况
                var old = css.setStyle( el, {
                    display : '',
                    visibility: 'hidden',
                    position : 'absolute'
                } );
                
                var w = el.clientWidth || parseInt( css.getStyle( el, 'width' ) );
                css.setStyle( el, old );

                return w;

            } else {
                var w = '' + args[ 1 ];
                if ( w.indexOf( 'px' ) == -1 ) {
                    w += 'px';
                }
                css.setStyle( el, 'width', w );
            }
        },

        hide : function ( el ) {
            var curr = css.getStyle( el, 'display' );
            if ( curr != 'none' ) {
                el._display = curr;
            }
            css.setStyle( el, 'display', 'none' );
        },
        
        show : function ( el ) {
            css.setStyle( el, 'display', el._display || '' );
        },

        opacity : function ( el, opacity ) {
            if ( mix .isIE ) {
                el.style.filters = 'alpha(opacity=' + ( opacity * 100 ) + ')';
            } else {
                el.style[ 'opacity' ] = opacity;
            }
        },

        winHeight : function () {
            var de = document.documentElement;
            return window.innerHeight || ( de && de.clientHeight ) || document.body.clientHeight;
        },

        winWidth : function () {
            var de = document.documentElement;
            return window.innerWidth || ( de && de.clientWidth ) || document.body.clientWidth;
        },

        pageHeight : function () {
            var h;
            if ( document.documentElement ) {
                h = Math.max( document.documentElement.scrollHeight, document.documentElement.clientHeight );
            } else { 
                h = Math.max( document.body.scrollHeight, document.body.clientHeight );
            }    

            return h;
        },

        pageWidth : function () {
            var w;
            if ( document.documentElement ) {
                w = Math.max( document.documentElement.scrollWidth, document.documentElement.clientWidth );
            } else { 
                w = Math.max( document.body.scrollWidth, document.body.clientWidth );
            }    
            return w;
        },

        /**
         * @description 页面滚动条横向滚动的距离
         */
        scrollX : function () {
            var de = document.documentElement;
            return window.pageXOffset || ( de && de.scrollLeft ) || document.body.scrollLeft;
        },

        /**
         * @description 页面滚动条纵向滚动的距离
         */
        scrollY : function () {
            var de = document.documentElement;
            return window.pageYOffset || ( de && de.scrollTop ) || document.body.scrollTop;
        },

        hasClass : function ( el, c ) {

            var classStr = el.className;

            if ( !classStr || !c ) {
                return false;
            }

            if ( classStr == c ) {
                return true;
            }
            
            return classStr.search( new RegExp( '\\b' + c + '\\b' ) ) != -1;
        },

        addClass : function ( el, c ) {
            
            if ( this.hasClass( el, c ) ) {
                return;
            }

            if ( el.className ) {
                c = ' ' + c;
            }
            
            el.className = el.className + c;
        },

        removeClass : function ( el, c ) {

            if ( el.className && c ) {
                el.className = el.className.replace( new RegExp( '\\b' + c + '\\b','g' ),'' );
            }
        }
    } );
} )( Mix );
