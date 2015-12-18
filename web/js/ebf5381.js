/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-2-4
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// The deferred used on DOM ready
	readyList,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// Support: IE<9
	// For `typeof node.method` instead of `node.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.9.1",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler
	completed = function( event ) {

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support, all, a,
		input, select, fragment,
		opt, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Support tests won't run in some limited or non-browser environments
	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !all || !a || !all.length ) {
		return {};
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";
	support = {
		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
		checkOn: !!input.value,

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Tests for enctype support on a form (#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: document.compatMode === "CSS1Compat",

		// Will be defined later
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP), test/csp.php
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== core_strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			if ( support.inlineBlockNeedsLayout ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})();

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, ret,
		internalKey = jQuery.expando,
		getByName = typeof name === "string",

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			elem[ internalKey ] = id = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		cache[ id ] = {};

		// Avoids exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		if ( !isNode ) {
			cache[ id ].toJSON = jQuery.noop;
		}
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( getByName ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var i, l, thisCache,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			for ( i = 0, l = name.length; i < l; i++ ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		// Do not set data on non-element because it will not be cleared (#8335).
		if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
			return false;
		}

		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				// Try to fetch any internally stored data first
				return elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
			}

			this.each(function() {
				jQuery.data( this, key, value );
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		hooks.cur = fn;
		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var ret, hooks, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, notxml, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && notxml && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && notxml && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			// In IE9+, Flash objects don't have .getAttribute (#12945)
			// Support: IE9+
			if ( typeof elem.getAttribute !== core_strundefined ) {
				ret =  elem.getAttribute( name );
			}

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( rboolean.test( name ) ) {
					// Set corresponding property to false for boolean attributes
					// Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
					if ( !getSetAttribute && ruseDefault.test( name ) ) {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					} else {
						elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		var
			// Use .prop to determine if this attribute is understood as boolean
			prop = jQuery.prop( elem, name ),

			// Fetch it accordingly
			attr = typeof prop === "boolean" && elem.getAttribute( name ),
			detail = typeof prop === "boolean" ?

				getSetInput && getSetAttribute ?
					attr != null :
					// oldIE fabricates an empty string for missing boolean attributes
					// and conflates checked/selected into attroperties
					ruseDefault.test( name ) ?
						elem[ jQuery.camelCase( "default-" + name ) ] :
						!!attr :

				// fetch an attribute node for properties not recognized as boolean
				elem.getAttributeNode( name );

		return detail && detail.value !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// fix oldIE value attroperty
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return jQuery.nodeName( elem, "input" ) ?

				// Ignore the value *property* by using defaultValue
				elem.defaultValue :

				ret && ret.specified ? ret.value : undefined;
		},
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ( name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret == null ? undefined : ret;
			}
		});
	});

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		event.isTrigger = true;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur != this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			}
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== document.activeElement && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === document.activeElement && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === core_strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var i,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	hasDuplicate,
	outermostContext,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsXML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,
	sortOrder,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	support = {},
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Array methods
	arr = [],
	pop = arr.pop,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},


	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rsibling = /[\x20\t\r\n\f]*[+~]/,

	rnative = /^[^{]+\{\s*\[native code/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,
	rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
	funescape = function( _, escaped ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		return high !== high ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Use a stripped-down slice if we can't use a native one
try {
	slice.call( preferredDoc.documentElement.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		while ( (elem = this[i++]) ) {
			results.push( elem );
		}
		return results;
	};
}

/**
 * For feature detection
 * @param {Function} fn The function to test for native support
 */
function isNative( fn ) {
	return rnative.test( fn + "" );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var cache,
		keys = [];

	return (cache = function( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	});
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return fn( div );
	} catch (e) {
		return false;
	} finally {
		// release memory in IE
		div = null;
	}
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !documentIsXML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getByClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && !rbuggyQSA.test(selector) ) {
			old = true;
			nid = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results, slice.call( newContext.querySelectorAll(
						newSelector
					), 0 ) );
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsXML = isXML( doc );

	// Check if getElementsByTagName("*") returns only elements
	support.tagNameNoComments = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if attributes should be retrieved by attribute nodes
	support.attributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	});

	// Check if getElementsByClassName can be trusted
	support.getByClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	});

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	support.getByName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = doc.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			doc.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			doc.getElementsByName( expando + 0 ).length;
		support.getIdNotName = !doc.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

	// IE6/7 return modified attributes
	Expr.attrHandle = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}) ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		};

	// ID find and filter
	if ( support.getIdNotName ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );

				return m ?
					m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
						[m] :
						undefined :
					[];
			}
		};
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.tagNameNoComments ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Name
	Expr.find["NAME"] = support.getByName && function( tag, context ) {
		if ( typeof context.getElementsByName !== strundefined ) {
			return context.getElementsByName( name );
		}
	};

	// Class
	Expr.find["CLASS"] = support.getByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && !documentIsXML ) {
			return context.getElementsByClassName( className );
		}
	};

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21),
	// no need to also add to buggyMatches since matches checks buggyQSA
	// A support test would require too much code (would include document ready)
	rbuggyQSA = [ ":focus" ];

	if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE8 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<input type='hidden' i=''/>";
			if ( div.querySelectorAll("[i^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = isNative( (matches = docElem.matchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.webkitMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = new RegExp( rbuggyMatches.join("|") );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		var compare;

		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b )) ) {
			if ( compare & 1 || a.parentNode && a.parentNode.nodeType === 11 ) {
				if ( a === doc || contains( preferredDoc, a ) ) {
					return -1;
				}
				if ( b === doc || contains( preferredDoc, b ) ) {
					return 1;
				}
				return 0;
			}
			return compare & 4 ? -1 : 1;
		}

		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	// Always assume the presence of duplicates if sort doesn't
	// pass them to our comparison function (as in Google Chrome).
	hasDuplicate = false;
	[0, 0].sort( sortOrder );
	support.detectDuplicates = hasDuplicate;

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	// rbuggyQSA always contains :focus, so no need for an existence check
	if ( support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr) ) {
		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	var val;

	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( !documentIsXML ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( documentIsXML || support.attributes ) {
		return elem.getAttribute( name );
	}
	return ( (val = elem.getAttributeNode( name )) || elem.getAttribute( name ) ) && elem[ name ] === true ?
		name :
		val && val.specified ? val.value : null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		i = 1,
		j = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && ( ~b.sourceIndex || MAX_NEGATIVE ) - ( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[4] ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}

			nodeName = nodeName.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifider
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsXML ?
						elem.getAttribute("xml:lang") || elem.getAttribute("lang") :
						elem.lang) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector( tokens.slice( 0, i - 1 ) ).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && !documentIsXML &&
					Expr.relative[ tokens[1].type ] ) {

				context = Expr.find["ID"]( token.matches[0].replace( runescape, funescape ), context )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, slice.call( seed, 0 ) );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		documentIsXML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Easy API for creating new setFilters
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Initialize with the default document
setDocument();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, ret, self,
			len = this.length;

		if ( typeof selector !== "string" ) {
			self = this;
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		ret = [];
		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, this[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = ( this.selector ? this.selector + " " : "" ) + selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true) );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length > 0 ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		var isFunc = jQuery.isFunction( value );

		// Make sure that the elements are removed from the DOM before they are inserted
		// this can help fix replacing a parent with child elements
		if ( !isFunc && typeof value !== "string" ) {
			value = jQuery( value ).not( this ).detach();
		}

		return this.domManip( [ value ], true, function( elem ) {
			var next = this.nextSibling,
				parent = this.parentNode;

			if ( parent ) {
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		});
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, table ? self.html() : undefined );
				}
				self.domManip( args, table, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						node,
						i
					);
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery.ajax({
									url: node.src,
									type: "GET",
									dataType: "script",
									async: false,
									global: false,
									"throws": true
								});
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	var attr = elem.getAttributeNode("type");
	elem.type = ( attr && attr.specified ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== core_strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	}
});
var iframe, getStyles, curCSS,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var len, styles,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		var bool = typeof state === "boolean";

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
			(!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.hover = function( fnOver, fnOut ) {
	return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
};
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 ) {
					isSuccess = true;
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					isSuccess = true;
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	}
});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {
	var conv2, current, conv, tmp,
		converters = {},
		i = 0,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ];

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, responseHeaders, statusText, responses;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var value, name, index, easing, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/*jshint validthis:true */
	var prop, index, length,
		value, dataShow, toggle,
		tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( "hidden" in dataShow ) {
			hidden = dataShow.hidden;
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );
				doAnimation.finish = function() {
					anim.stop( true );
				};
				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.cur && hooks.cur.finish ) {
				hooks.cur.finish.call( this );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.documentElement;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.documentElement;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// })();
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );
/* jQuery.qrcode 0.12.0 - http://larsjung.de/jquery-qrcode/ - uses //github.com/kazuhikoarase/qrcode-generator (MIT) */
(function (qrcode) {
    'use strict';

    var $ = jQuery;

    // Wrapper for the original QR code generator.
    function QRCode(text, level, version, quiet) {

        var qr = qrcode(version, level);
        qr.addData(text);
        qr.make();

        quiet = quiet || 0;

        var qrModuleCount = qr.getModuleCount();
        var quietModuleCount = qr.getModuleCount() + 2 * quiet;

        function isDark(row, col) {

            row -= quiet;
            col -= quiet;

            if (row < 0 || row >= qrModuleCount || col < 0 || col >= qrModuleCount) {
                return false;
            }

            return qr.isDark(row, col);
        }

        var addBlank = function (l, t, r, b) {

            var prevIsDark = this.isDark;
            var moduleSize = 1 / quietModuleCount;

            this.isDark = function (row, col) {

                var ml = col * moduleSize;
                var mt = row * moduleSize;
                var mr = ml + moduleSize;
                var mb = mt + moduleSize;

                return prevIsDark(row, col) && (l > mr || ml > r || t > mb || mt > b);
            };
        };

        this.text = text;
        this.level = level;
        this.version = version;
        this.moduleCount = quietModuleCount;
        this.isDark = isDark;
        this.addBlank = addBlank;
    }

    // Check if canvas is available in the browser (as Modernizr does)
    var hasCanvas = (function () {

        var elem = document.createElement('canvas');
        return Boolean(elem.getContext && elem.getContext('2d'));
    }());
    var hasArcTo = Object.prototype.toString.call(window.opera) !== '[object Opera]';

    // Returns a minimal QR code for the given text starting with version `minVersion`.
    // Returns `undefined` if `text` is too long to be encoded in `maxVersion`.
    function createQRCode(text, level, minVersion, maxVersion, quiet) {

        minVersion = Math.max(1, minVersion || 1);
        maxVersion = Math.min(40, maxVersion || 40);
        for (var version = minVersion; version <= maxVersion; version += 1) {
            try {
                return new QRCode(text, level, version, quiet);
            } catch (err) {}
        }
    }

    function drawBackgroundLabel(qr, context, settings) {

        var size = settings.size;
        var font = 'bold ' + (settings.mSize * size) + 'px ' + settings.fontname;
        var ctx = $('<canvas/>')[0].getContext('2d');

        ctx.font = font;

        var w = ctx.measureText(settings.label).width;
        var sh = settings.mSize;
        var sw = w / size;
        var sl = (1 - sw) * settings.mPosX;
        var st = (1 - sh) * settings.mPosY;
        var sr = sl + sw;
        var sb = st + sh;
        var pad = 0.01;

        if (settings.mode === 1) {
            // Strip
            qr.addBlank(0, st - pad, size, sb + pad);
        } else {
            // Box
            qr.addBlank(sl - pad, st - pad, sr + pad, sb + pad);
        }

        context.fillStyle = settings.fontcolor;
        context.font = font;
        context.fillText(settings.label, sl * size, st * size + 0.75 * settings.mSize * size);
    }

    function drawBackgroundImage(qr, context, settings) {

        var size = settings.size;
        var w = settings.image.naturalWidth || 1;
        var h = settings.image.naturalHeight || 1;
        var sh = settings.mSize;
        var sw = sh * w / h;
        var sl = (1 - sw) * settings.mPosX;
        var st = (1 - sh) * settings.mPosY;
        var sr = sl + sw;
        var sb = st + sh;
        var pad = 0.01;

        if (settings.mode === 3) {
            // Strip
            qr.addBlank(0, st - pad, size, sb + pad);
        } else {
            // Box
            qr.addBlank(sl - pad, st - pad, sr + pad, sb + pad);
        }

        context.drawImage(settings.image, sl * size, st * size, sw * size, sh * size);
    }

    function drawBackground(qr, context, settings) {

        if ($(settings.background).is('img')) {
            context.drawImage(settings.background, 0, 0, settings.size, settings.size);
        } else if (settings.background) {
            context.fillStyle = settings.background;
            context.fillRect(settings.left, settings.top, settings.size, settings.size);
        }

        var mode = settings.mode;
        if (mode === 1 || mode === 2) {
            drawBackgroundLabel(qr, context, settings);
        } else if (mode === 3 || mode === 4) {
            drawBackgroundImage(qr, context, settings);
        }
    }

    function drawModuleDefault(qr, context, settings, left, top, width, row, col) {

        if (qr.isDark(row, col)) {
            context.rect(left, top, width, width);
        }
    }

    function drawModuleRoundedDark(ctx, l, t, r, b, rad, nw, ne, se, sw) {

        if (nw) {
            ctx.moveTo(l + rad, t);
        } else {
            ctx.moveTo(l, t);
        }

        if (ne) {
            ctx.lineTo(r - rad, t);
            ctx.arcTo(r, t, r, b, rad);
        } else {
            ctx.lineTo(r, t);
        }

        if (se) {
            ctx.lineTo(r, b - rad);
            ctx.arcTo(r, b, l, b, rad);
        } else {
            ctx.lineTo(r, b);
        }

        if (sw) {
            ctx.lineTo(l + rad, b);
            ctx.arcTo(l, b, l, t, rad);
        } else {
            ctx.lineTo(l, b);
        }

        if (nw) {
            ctx.lineTo(l, t + rad);
            ctx.arcTo(l, t, r, t, rad);
        } else {
            ctx.lineTo(l, t);
        }
    }

    function drawModuleRoundendLight(ctx, l, t, r, b, rad, nw, ne, se, sw) {

        if (nw) {
            ctx.moveTo(l + rad, t);
            ctx.lineTo(l, t);
            ctx.lineTo(l, t + rad);
            ctx.arcTo(l, t, l + rad, t, rad);
        }

        if (ne) {
            ctx.moveTo(r - rad, t);
            ctx.lineTo(r, t);
            ctx.lineTo(r, t + rad);
            ctx.arcTo(r, t, r - rad, t, rad);
        }

        if (se) {
            ctx.moveTo(r - rad, b);
            ctx.lineTo(r, b);
            ctx.lineTo(r, b - rad);
            ctx.arcTo(r, b, r - rad, b, rad);
        }

        if (sw) {
            ctx.moveTo(l + rad, b);
            ctx.lineTo(l, b);
            ctx.lineTo(l, b - rad);
            ctx.arcTo(l, b, l + rad, b, rad);
        }
    }

    function drawModuleRounded(qr, context, settings, left, top, width, row, col) {

        var isDark = qr.isDark;
        var right = left + width;
        var bottom = top + width;
        var radius = settings.radius * width;
        var rowT = row - 1;
        var rowB = row + 1;
        var colL = col - 1;
        var colR = col + 1;
        var center = isDark(row, col);
        var northwest = isDark(rowT, colL);
        var north = isDark(rowT, col);
        var northeast = isDark(rowT, colR);
        var east = isDark(row, colR);
        var southeast = isDark(rowB, colR);
        var south = isDark(rowB, col);
        var southwest = isDark(rowB, colL);
        var west = isDark(row, colL);

        if (center) {
            drawModuleRoundedDark(context, left, top, right, bottom, radius, !north && !west, !north && !east, !south && !east, !south && !west);
        } else {
            drawModuleRoundendLight(context, left, top, right, bottom, radius, north && west && northwest, north && east && northeast, south && east && southeast, south && west && southwest);
        }
    }

    function drawModules(qr, context, settings) {

        var moduleCount = qr.moduleCount;
        var moduleSize = settings.size / moduleCount;
        var fn = drawModuleDefault;
        var row;
        var col;

        if (hasArcTo && settings.radius > 0 && settings.radius <= 0.5) {
            fn = drawModuleRounded;
        }

        context.beginPath();
        for (row = 0; row < moduleCount; row += 1) {
            for (col = 0; col < moduleCount; col += 1) {

                var l = settings.left + col * moduleSize;
                var t = settings.top + row * moduleSize;
                var w = moduleSize;

                fn(qr, context, settings, l, t, w, row, col);
            }
        }
        if ($(settings.fill).is('img')) {
            context.strokeStyle = 'rgba(0,0,0,0.5)';
            context.lineWidth = 2;
            context.stroke();
            var prev = context.globalCompositeOperation;
            context.globalCompositeOperation = 'destination-out';
            context.fill();
            context.globalCompositeOperation = prev;

            context.clip();
            context.drawImage(settings.fill, 0, 0, settings.size, settings.size);
            context.restore();
        } else {
            context.fillStyle = settings.fill;
            context.fill();
        }
    }

    // Draws QR code to the given `canvas` and returns it.
    function drawOnCanvas(canvas, settings) {

        var qr = createQRCode(settings.text, settings.ecLevel, settings.minVersion, settings.maxVersion, settings.quiet);
        if (!qr) {
            return null;
        }

        var $canvas = $(canvas).data('qrcode', qr);
        var context = $canvas[0].getContext('2d');

        drawBackground(qr, context, settings);
        drawModules(qr, context, settings);

        return $canvas;
    }

    // Returns a `canvas` element representing the QR code for the given settings.
    function createCanvas(settings) {

        var $canvas = $('<canvas/>').attr('width', settings.size).attr('height', settings.size);
        return drawOnCanvas($canvas, settings);
    }

    // Returns an `image` element representing the QR code for the given settings.
    function createImage(settings) {

        return $('<img/>').attr('src', createCanvas(settings)[0].toDataURL('image/png'));
    }

    // Returns a `div` element representing the QR code for the given settings.
    function createDiv(settings) {

        var qr = createQRCode(settings.text, settings.ecLevel, settings.minVersion, settings.maxVersion, settings.quiet);
        if (!qr) {
            return null;
        }

        // some shortcuts to improve compression
        var settings_size = settings.size;
        var settings_bgColor = settings.background;
        var math_floor = Math.floor;

        var moduleCount = qr.moduleCount;
        var moduleSize = math_floor(settings_size / moduleCount);
        var offset = math_floor(0.5 * (settings_size - moduleSize * moduleCount));

        var row;
        var col;

        var containerCSS = {
            position: 'relative',
            left: 0,
            top: 0,
            padding: 0,
            margin: 0,
            width: settings_size,
            height: settings_size
        };
        var darkCSS = {
            position: 'absolute',
            padding: 0,
            margin: 0,
            width: moduleSize,
            height: moduleSize,
            'background-color': settings.fill
        };

        var $div = $('<div/>').data('qrcode', qr).css(containerCSS);

        if (settings_bgColor) {
            $div.css('background-color', settings_bgColor);
        }

        for (row = 0; row < moduleCount; row += 1) {
            for (col = 0; col < moduleCount; col += 1) {
                if (qr.isDark(row, col)) {
                    $('<div/>')
                        .css(darkCSS)
                        .css({
                            left: offset + col * moduleSize,
                            top: offset + row * moduleSize
                        })
                        .appendTo($div);
                }
            }
        }

        return $div;
    }

    function createHTML(settings) {

        if (hasCanvas && settings.render === 'canvas') {
            return createCanvas(settings);
        } else if (hasCanvas && settings.render === 'image') {
            return createImage(settings);
        }

        return createDiv(settings);
    }

    // Plugin
    // ======

    // Default settings
    // ----------------
    var defaults = {

        // render method: `'canvas'`, `'image'` or `'div'`
        render: 'canvas',

        // version range somewhere in 1 .. 40
        minVersion: 1,
        maxVersion: 40,

        // error correction level: `'L'`, `'M'`, `'Q'` or `'H'`
        ecLevel: 'L',

        // offset in pixel if drawn onto existing canvas
        left: 0,
        top: 0,

        // size in pixel
        size: 200,

        // code color or image element
        fill: '#000',

        // background color or image element, `null` for transparent background
        background: null,

        // content
        text: 'no text',

        // corner radius relative to module width: 0.0 .. 0.5
        radius: 0,

        // quiet zone in modules
        quiet: 0,

        // modes
        // 0: normal
        // 1: label strip
        // 2: label box
        // 3: image strip
        // 4: image box
        mode: 0,

        mSize: 0.1,
        mPosX: 0.5,
        mPosY: 0.5,

        label: 'no label',
        fontname: 'sans',
        fontcolor: '#000',

        image: null
    };

    // Register the plugin
    // -------------------
    $.fn.qrcode = function (options) {

        var settings = $.extend({}, defaults, options);

        return this.each(function () {

            if (this.nodeName.toLowerCase() === 'canvas') {
                drawOnCanvas(this, settings);
            } else {
                $(this).append(createHTML(settings));
            }
        });
    };
}(function () {

    // `qrcode` is the single public function defined by the `QR Code Generator`
    //---------------------------------------------------------------------
    //
    // QR Code Generator for JavaScript
    //
    // Copyright (c) 2009 Kazuhiko Arase
    //
    // URL: http://www.d-project.com/
    //
    // Licensed under the MIT license:
    //  http://www.opensource.org/licenses/mit-license.php
    //
    // The word 'QR Code' is registered trademark of
    // DENSO WAVE INCORPORATED
    //  http://www.denso-wave.com/qrcode/faqpatent-e.html
    //
    //---------------------------------------------------------------------

    var qrcode = function() {

        //---------------------------------------------------------------------
        // qrcode
        //---------------------------------------------------------------------

        /**
         * qrcode
         * @param typeNumber 1 to 40
         * @param errorCorrectLevel 'L','M','Q','H'
         */
        var qrcode = function(typeNumber, errorCorrectLevel) {

            var PAD0 = 0xEC;
            var PAD1 = 0x11;

            var _typeNumber = typeNumber;
            var _errorCorrectLevel = QRErrorCorrectLevel[errorCorrectLevel];
            var _modules = null;
            var _moduleCount = 0;
            var _dataCache = null;
            var _dataList = new Array();

            var _this = {};

            var makeImpl = function(test, maskPattern) {

                _moduleCount = _typeNumber * 4 + 17;
                _modules = function(moduleCount) {
                    var modules = new Array(moduleCount);
                    for (var row = 0; row < moduleCount; row += 1) {
                        modules[row] = new Array(moduleCount);
                        for (var col = 0; col < moduleCount; col += 1) {
                            modules[row][col] = null;
                        }
                    }
                    return modules;
                }(_moduleCount);

                setupPositionProbePattern(0, 0);
                setupPositionProbePattern(_moduleCount - 7, 0);
                setupPositionProbePattern(0, _moduleCount - 7);
                setupPositionAdjustPattern();
                setupTimingPattern();
                setupTypeInfo(test, maskPattern);

                if (_typeNumber >= 7) {
                    setupTypeNumber(test);
                }

                if (_dataCache == null) {
                    _dataCache = createData(_typeNumber, _errorCorrectLevel, _dataList);
                }

                mapData(_dataCache, maskPattern);
            };

            var setupPositionProbePattern = function(row, col) {

                for (var r = -1; r <= 7; r += 1) {

                    if (row + r <= -1 || _moduleCount <= row + r) continue;

                    for (var c = -1; c <= 7; c += 1) {

                        if (col + c <= -1 || _moduleCount <= col + c) continue;

                        if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
                            || (0 <= c && c <= 6 && (r == 0 || r == 6) )
                            || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
                            _modules[row + r][col + c] = true;
                        } else {
                            _modules[row + r][col + c] = false;
                        }
                    }
                }
            };

            var getBestMaskPattern = function() {

                var minLostPoint = 0;
                var pattern = 0;

                for (var i = 0; i < 8; i += 1) {

                    makeImpl(true, i);

                    var lostPoint = QRUtil.getLostPoint(_this);

                    if (i == 0 || minLostPoint > lostPoint) {
                        minLostPoint = lostPoint;
                        pattern = i;
                    }
                }

                return pattern;
            };

            var setupTimingPattern = function() {

                for (var r = 8; r < _moduleCount - 8; r += 1) {
                    if (_modules[r][6] != null) {
                        continue;
                    }
                    _modules[r][6] = (r % 2 == 0);
                }

                for (var c = 8; c < _moduleCount - 8; c += 1) {
                    if (_modules[6][c] != null) {
                        continue;
                    }
                    _modules[6][c] = (c % 2 == 0);
                }
            };

            var setupPositionAdjustPattern = function() {

                var pos = QRUtil.getPatternPosition(_typeNumber);

                for (var i = 0; i < pos.length; i += 1) {

                    for (var j = 0; j < pos.length; j += 1) {

                        var row = pos[i];
                        var col = pos[j];

                        if (_modules[row][col] != null) {
                            continue;
                        }

                        for (var r = -2; r <= 2; r += 1) {

                            for (var c = -2; c <= 2; c += 1) {

                                if (r == -2 || r == 2 || c == -2 || c == 2
                                    || (r == 0 && c == 0) ) {
                                    _modules[row + r][col + c] = true;
                                } else {
                                    _modules[row + r][col + c] = false;
                                }
                            }
                        }
                    }
                }
            };

            var setupTypeNumber = function(test) {

                var bits = QRUtil.getBCHTypeNumber(_typeNumber);

                for (var i = 0; i < 18; i += 1) {
                    var mod = (!test && ( (bits >> i) & 1) == 1);
                    _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
                }

                for (var i = 0; i < 18; i += 1) {
                    var mod = (!test && ( (bits >> i) & 1) == 1);
                    _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
                }
            };

            var setupTypeInfo = function(test, maskPattern) {

                var data = (_errorCorrectLevel << 3) | maskPattern;
                var bits = QRUtil.getBCHTypeInfo(data);

                // vertical
                for (var i = 0; i < 15; i += 1) {

                    var mod = (!test && ( (bits >> i) & 1) == 1);

                    if (i < 6) {
                        _modules[i][8] = mod;
                    } else if (i < 8) {
                        _modules[i + 1][8] = mod;
                    } else {
                        _modules[_moduleCount - 15 + i][8] = mod;
                    }
                }

                // horizontal
                for (var i = 0; i < 15; i += 1) {

                    var mod = (!test && ( (bits >> i) & 1) == 1);

                    if (i < 8) {
                        _modules[8][_moduleCount - i - 1] = mod;
                    } else if (i < 9) {
                        _modules[8][15 - i - 1 + 1] = mod;
                    } else {
                        _modules[8][15 - i - 1] = mod;
                    }
                }

                // fixed module
                _modules[_moduleCount - 8][8] = (!test);
            };

            var mapData = function(data, maskPattern) {

                var inc = -1;
                var row = _moduleCount - 1;
                var bitIndex = 7;
                var byteIndex = 0;
                var maskFunc = QRUtil.getMaskFunction(maskPattern);

                for (var col = _moduleCount - 1; col > 0; col -= 2) {

                    if (col == 6) col -= 1;

                    while (true) {

                        for (var c = 0; c < 2; c += 1) {

                            if (_modules[row][col - c] == null) {

                                var dark = false;

                                if (byteIndex < data.length) {
                                    dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
                                }

                                var mask = maskFunc(row, col - c);

                                if (mask) {
                                    dark = !dark;
                                }

                                _modules[row][col - c] = dark;
                                bitIndex -= 1;

                                if (bitIndex == -1) {
                                    byteIndex += 1;
                                    bitIndex = 7;
                                }
                            }
                        }

                        row += inc;

                        if (row < 0 || _moduleCount <= row) {
                            row -= inc;
                            inc = -inc;
                            break;
                        }
                    }
                }
            };

            var createBytes = function(buffer, rsBlocks) {

                var offset = 0;

                var maxDcCount = 0;
                var maxEcCount = 0;

                var dcdata = new Array(rsBlocks.length);
                var ecdata = new Array(rsBlocks.length);

                for (var r = 0; r < rsBlocks.length; r += 1) {

                    var dcCount = rsBlocks[r].dataCount;
                    var ecCount = rsBlocks[r].totalCount - dcCount;

                    maxDcCount = Math.max(maxDcCount, dcCount);
                    maxEcCount = Math.max(maxEcCount, ecCount);

                    dcdata[r] = new Array(dcCount);

                    for (var i = 0; i < dcdata[r].length; i += 1) {
                        dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
                    }
                    offset += dcCount;

                    var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
                    var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);

                    var modPoly = rawPoly.mod(rsPoly);
                    ecdata[r] = new Array(rsPoly.getLength() - 1);
                    for (var i = 0; i < ecdata[r].length; i += 1) {
                        var modIndex = i + modPoly.getLength() - ecdata[r].length;
                        ecdata[r][i] = (modIndex >= 0)? modPoly.getAt(modIndex) : 0;
                    }
                }

                var totalCodeCount = 0;
                for (var i = 0; i < rsBlocks.length; i += 1) {
                    totalCodeCount += rsBlocks[i].totalCount;
                }

                var data = new Array(totalCodeCount);
                var index = 0;

                for (var i = 0; i < maxDcCount; i += 1) {
                    for (var r = 0; r < rsBlocks.length; r += 1) {
                        if (i < dcdata[r].length) {
                            data[index] = dcdata[r][i];
                            index += 1;
                        }
                    }
                }

                for (var i = 0; i < maxEcCount; i += 1) {
                    for (var r = 0; r < rsBlocks.length; r += 1) {
                        if (i < ecdata[r].length) {
                            data[index] = ecdata[r][i];
                            index += 1;
                        }
                    }
                }

                return data;
            };

            var createData = function(typeNumber, errorCorrectLevel, dataList) {

                var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

                var buffer = qrBitBuffer();

                for (var i = 0; i < dataList.length; i += 1) {
                    var data = dataList[i];
                    buffer.put(data.getMode(), 4);
                    buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
                    data.write(buffer);
                }

                // calc num max data.
                var totalDataCount = 0;
                for (var i = 0; i < rsBlocks.length; i += 1) {
                    totalDataCount += rsBlocks[i].dataCount;
                }

                if (buffer.getLengthInBits() > totalDataCount * 8) {
                    throw new Error('code length overflow. ('
                        + buffer.getLengthInBits()
                        + '>'
                        + totalDataCount * 8
                        + ')');
                }

                // end code
                if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
                    buffer.put(0, 4);
                }

                // padding
                while (buffer.getLengthInBits() % 8 != 0) {
                    buffer.putBit(false);
                }

                // padding
                while (true) {

                    if (buffer.getLengthInBits() >= totalDataCount * 8) {
                        break;
                    }
                    buffer.put(PAD0, 8);

                    if (buffer.getLengthInBits() >= totalDataCount * 8) {
                        break;
                    }
                    buffer.put(PAD1, 8);
                }

                return createBytes(buffer, rsBlocks);
            };

            _this.addData = function(data) {
                var newData = qr8BitByte(data);
                _dataList.push(newData);
                _dataCache = null;
            };

            _this.isDark = function(row, col) {
                if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
                    throw new Error(row + ',' + col);
                }
                return _modules[row][col];
            };

            _this.getModuleCount = function() {
                return _moduleCount;
            };

            _this.make = function() {
                makeImpl(false, getBestMaskPattern() );
            };

            _this.createTableTag = function(cellSize, margin) {

                cellSize = cellSize || 2;
                margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

                var qrHtml = '';

                qrHtml += '<table style="';
                qrHtml += ' border-width: 0px; border-style: none;';
                qrHtml += ' border-collapse: collapse;';
                qrHtml += ' padding: 0px; margin: ' + margin + 'px;';
                qrHtml += '">';
                qrHtml += '<tbody>';

                for (var r = 0; r < _this.getModuleCount(); r += 1) {

                    qrHtml += '<tr>';

                    for (var c = 0; c < _this.getModuleCount(); c += 1) {
                        qrHtml += '<td style="';
                        qrHtml += ' border-width: 0px; border-style: none;';
                        qrHtml += ' border-collapse: collapse;';
                        qrHtml += ' padding: 0px; margin: 0px;';
                        qrHtml += ' width: ' + cellSize + 'px;';
                        qrHtml += ' height: ' + cellSize + 'px;';
                        qrHtml += ' background-color: ';
                        qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';
                        qrHtml += ';';
                        qrHtml += '"/>';
                    }

                    qrHtml += '</tr>';
                }

                qrHtml += '</tbody>';
                qrHtml += '</table>';

                return qrHtml;
            };

            _this.createImgTag = function(cellSize, margin) {

                cellSize = cellSize || 2;
                margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

                var size = _this.getModuleCount() * cellSize + margin * 2;
                var min = margin;
                var max = size - margin;

                return createImgTag(size, size, function(x, y) {
                    if (min <= x && x < max && min <= y && y < max) {
                        var c = Math.floor( (x - min) / cellSize);
                        var r = Math.floor( (y - min) / cellSize);
                        return _this.isDark(r, c)? 0 : 1;
                    } else {
                        return 1;
                    }
                } );
            };

            return _this;
        };

        //---------------------------------------------------------------------
        // qrcode.stringToBytes
        //---------------------------------------------------------------------

        qrcode.stringToBytes = function(s) {
            var bytes = new Array();
            for (var i = 0; i < s.length; i += 1) {
                var c = s.charCodeAt(i);
                bytes.push(c & 0xff);
            }
            return bytes;
        };

        //---------------------------------------------------------------------
        // qrcode.createStringToBytes
        //---------------------------------------------------------------------

        /**
         * @param unicodeData base64 string of byte array.
         * [16bit Unicode],[16bit Bytes], ...
         * @param numChars
         */
        qrcode.createStringToBytes = function(unicodeData, numChars) {

            // create conversion map.

            var unicodeMap = function() {

                var bin = base64DecodeInputStream(unicodeData);
                var read = function() {
                    var b = bin.read();
                    if (b == -1) throw new Error();
                    return b;
                };

                var count = 0;
                var unicodeMap = {};
                while (true) {
                    var b0 = bin.read();
                    if (b0 == -1) break;
                    var b1 = read();
                    var b2 = read();
                    var b3 = read();
                    var k = String.fromCharCode( (b0 << 8) | b1);
                    var v = (b2 << 8) | b3;
                    unicodeMap[k] = v;
                    count += 1;
                }
                if (count != numChars) {
                    throw new Error(count + ' != ' + numChars);
                }

                return unicodeMap;
            }();

            var unknownChar = '?'.charCodeAt(0);

            return function(s) {
                var bytes = new Array();
                for (var i = 0; i < s.length; i += 1) {
                    var c = s.charCodeAt(i);
                    if (c < 128) {
                        bytes.push(c);
                    } else {
                        var b = unicodeMap[s.charAt(i)];
                        if (typeof b == 'number') {
                            if ( (b & 0xff) == b) {
                                // 1byte
                                bytes.push(b);
                            } else {
                                // 2bytes
                                bytes.push(b >>> 8);
                                bytes.push(b & 0xff);
                            }
                        } else {
                            bytes.push(unknownChar);
                        }
                    }
                }
                return bytes;
            };
        };

        //---------------------------------------------------------------------
        // QRMode
        //---------------------------------------------------------------------

        var QRMode = {
            MODE_NUMBER :    1 << 0,
            MODE_ALPHA_NUM : 1 << 1,
            MODE_8BIT_BYTE : 1 << 2,
            MODE_KANJI :     1 << 3
        };

        //---------------------------------------------------------------------
        // QRErrorCorrectLevel
        //---------------------------------------------------------------------

        var QRErrorCorrectLevel = {
            L : 1,
            M : 0,
            Q : 3,
            H : 2
        };

        //---------------------------------------------------------------------
        // QRMaskPattern
        //---------------------------------------------------------------------

        var QRMaskPattern = {
            PATTERN000 : 0,
            PATTERN001 : 1,
            PATTERN010 : 2,
            PATTERN011 : 3,
            PATTERN100 : 4,
            PATTERN101 : 5,
            PATTERN110 : 6,
            PATTERN111 : 7
        };

        //---------------------------------------------------------------------
        // QRUtil
        //---------------------------------------------------------------------

        var QRUtil = function() {

            var PATTERN_POSITION_TABLE = [
                [],
                [6, 18],
                [6, 22],
                [6, 26],
                [6, 30],
                [6, 34],
                [6, 22, 38],
                [6, 24, 42],
                [6, 26, 46],
                [6, 28, 50],
                [6, 30, 54],
                [6, 32, 58],
                [6, 34, 62],
                [6, 26, 46, 66],
                [6, 26, 48, 70],
                [6, 26, 50, 74],
                [6, 30, 54, 78],
                [6, 30, 56, 82],
                [6, 30, 58, 86],
                [6, 34, 62, 90],
                [6, 28, 50, 72, 94],
                [6, 26, 50, 74, 98],
                [6, 30, 54, 78, 102],
                [6, 28, 54, 80, 106],
                [6, 32, 58, 84, 110],
                [6, 30, 58, 86, 114],
                [6, 34, 62, 90, 118],
                [6, 26, 50, 74, 98, 122],
                [6, 30, 54, 78, 102, 126],
                [6, 26, 52, 78, 104, 130],
                [6, 30, 56, 82, 108, 134],
                [6, 34, 60, 86, 112, 138],
                [6, 30, 58, 86, 114, 142],
                [6, 34, 62, 90, 118, 146],
                [6, 30, 54, 78, 102, 126, 150],
                [6, 24, 50, 76, 102, 128, 154],
                [6, 28, 54, 80, 106, 132, 158],
                [6, 32, 58, 84, 110, 136, 162],
                [6, 26, 54, 82, 110, 138, 166],
                [6, 30, 58, 86, 114, 142, 170]
            ];
            var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
            var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
            var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

            var _this = {};

            var getBCHDigit = function(data) {
                var digit = 0;
                while (data != 0) {
                    digit += 1;
                    data >>>= 1;
                }
                return digit;
            };

            _this.getBCHTypeInfo = function(data) {
                var d = data << 10;
                while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
                    d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );
                }
                return ( (data << 10) | d) ^ G15_MASK;
            };

            _this.getBCHTypeNumber = function(data) {
                var d = data << 12;
                while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
                    d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );
                }
                return (data << 12) | d;
            };

            _this.getPatternPosition = function(typeNumber) {
                return PATTERN_POSITION_TABLE[typeNumber - 1];
            };

            _this.getMaskFunction = function(maskPattern) {

                switch (maskPattern) {

                    case QRMaskPattern.PATTERN000 :
                        return function(i, j) { return (i + j) % 2 == 0; };
                    case QRMaskPattern.PATTERN001 :
                        return function(i, j) { return i % 2 == 0; };
                    case QRMaskPattern.PATTERN010 :
                        return function(i, j) { return j % 3 == 0; };
                    case QRMaskPattern.PATTERN011 :
                        return function(i, j) { return (i + j) % 3 == 0; };
                    case QRMaskPattern.PATTERN100 :
                        return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };
                    case QRMaskPattern.PATTERN101 :
                        return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };
                    case QRMaskPattern.PATTERN110 :
                        return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };
                    case QRMaskPattern.PATTERN111 :
                        return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };

                    default :
                        throw new Error('bad maskPattern:' + maskPattern);
                }
            };

            _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
                var a = qrPolynomial([1], 0);
                for (var i = 0; i < errorCorrectLength; i += 1) {
                    a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );
                }
                return a;
            };

            _this.getLengthInBits = function(mode, type) {

                if (1 <= type && type < 10) {

                    // 1 - 9

                    switch(mode) {
                        case QRMode.MODE_NUMBER    : return 10;
                        case QRMode.MODE_ALPHA_NUM : return 9;
                        case QRMode.MODE_8BIT_BYTE : return 8;
                        case QRMode.MODE_KANJI     : return 8;
                        default :
                            throw new Error('mode:' + mode);
                    }

                } else if (type < 27) {

                    // 10 - 26

                    switch(mode) {
                        case QRMode.MODE_NUMBER    : return 12;
                        case QRMode.MODE_ALPHA_NUM : return 11;
                        case QRMode.MODE_8BIT_BYTE : return 16;
                        case QRMode.MODE_KANJI     : return 10;
                        default :
                            throw new Error('mode:' + mode);
                    }

                } else if (type < 41) {

                    // 27 - 40

                    switch(mode) {
                        case QRMode.MODE_NUMBER    : return 14;
                        case QRMode.MODE_ALPHA_NUM : return 13;
                        case QRMode.MODE_8BIT_BYTE : return 16;
                        case QRMode.MODE_KANJI     : return 12;
                        default :
                            throw new Error('mode:' + mode);
                    }

                } else {
                    throw new Error('type:' + type);
                }
            };

            _this.getLostPoint = function(qrcode) {

                var moduleCount = qrcode.getModuleCount();

                var lostPoint = 0;

                // LEVEL1

                for (var row = 0; row < moduleCount; row += 1) {
                    for (var col = 0; col < moduleCount; col += 1) {

                        var sameCount = 0;
                        var dark = qrcode.isDark(row, col);

                        for (var r = -1; r <= 1; r += 1) {

                            if (row + r < 0 || moduleCount <= row + r) {
                                continue;
                            }

                            for (var c = -1; c <= 1; c += 1) {

                                if (col + c < 0 || moduleCount <= col + c) {
                                    continue;
                                }

                                if (r == 0 && c == 0) {
                                    continue;
                                }

                                if (dark == qrcode.isDark(row + r, col + c) ) {
                                    sameCount += 1;
                                }
                            }
                        }

                        if (sameCount > 5) {
                            lostPoint += (3 + sameCount - 5);
                        }
                    }
                };

                // LEVEL2

                for (var row = 0; row < moduleCount - 1; row += 1) {
                    for (var col = 0; col < moduleCount - 1; col += 1) {
                        var count = 0;
                        if (qrcode.isDark(row, col) ) count += 1;
                        if (qrcode.isDark(row + 1, col) ) count += 1;
                        if (qrcode.isDark(row, col + 1) ) count += 1;
                        if (qrcode.isDark(row + 1, col + 1) ) count += 1;
                        if (count == 0 || count == 4) {
                            lostPoint += 3;
                        }
                    }
                }

                // LEVEL3

                for (var row = 0; row < moduleCount; row += 1) {
                    for (var col = 0; col < moduleCount - 6; col += 1) {
                        if (qrcode.isDark(row, col)
                            && !qrcode.isDark(row, col + 1)
                            &&  qrcode.isDark(row, col + 2)
                            &&  qrcode.isDark(row, col + 3)
                            &&  qrcode.isDark(row, col + 4)
                            && !qrcode.isDark(row, col + 5)
                            &&  qrcode.isDark(row, col + 6) ) {
                            lostPoint += 40;
                        }
                    }
                }

                for (var col = 0; col < moduleCount; col += 1) {
                    for (var row = 0; row < moduleCount - 6; row += 1) {
                        if (qrcode.isDark(row, col)
                            && !qrcode.isDark(row + 1, col)
                            &&  qrcode.isDark(row + 2, col)
                            &&  qrcode.isDark(row + 3, col)
                            &&  qrcode.isDark(row + 4, col)
                            && !qrcode.isDark(row + 5, col)
                            &&  qrcode.isDark(row + 6, col) ) {
                            lostPoint += 40;
                        }
                    }
                }

                // LEVEL4

                var darkCount = 0;

                for (var col = 0; col < moduleCount; col += 1) {
                    for (var row = 0; row < moduleCount; row += 1) {
                        if (qrcode.isDark(row, col) ) {
                            darkCount += 1;
                        }
                    }
                }

                var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
                lostPoint += ratio * 10;

                return lostPoint;
            };

            return _this;
        }();

        //---------------------------------------------------------------------
        // QRMath
        //---------------------------------------------------------------------

        var QRMath = function() {

            var EXP_TABLE = new Array(256);
            var LOG_TABLE = new Array(256);

            // initialize tables
            for (var i = 0; i < 8; i += 1) {
                EXP_TABLE[i] = 1 << i;
            }
            for (var i = 8; i < 256; i += 1) {
                EXP_TABLE[i] = EXP_TABLE[i - 4]
                    ^ EXP_TABLE[i - 5]
                    ^ EXP_TABLE[i - 6]
                    ^ EXP_TABLE[i - 8];
            }
            for (var i = 0; i < 255; i += 1) {
                LOG_TABLE[EXP_TABLE[i] ] = i;
            }

            var _this = {};

            _this.glog = function(n) {

                if (n < 1) {
                    throw new Error('glog(' + n + ')');
                }

                return LOG_TABLE[n];
            };

            _this.gexp = function(n) {

                while (n < 0) {
                    n += 255;
                }

                while (n >= 256) {
                    n -= 255;
                }

                return EXP_TABLE[n];
            };

            return _this;
        }();

        //---------------------------------------------------------------------
        // qrPolynomial
        //---------------------------------------------------------------------

        function qrPolynomial(num, shift) {

            if (typeof num.length == 'undefined') {
                throw new Error(num.length + '/' + shift);
            }

            var _num = function() {
                var offset = 0;
                while (offset < num.length && num[offset] == 0) {
                    offset += 1;
                }
                var _num = new Array(num.length - offset + shift);
                for (var i = 0; i < num.length - offset; i += 1) {
                    _num[i] = num[i + offset];
                }
                return _num;
            }();

            var _this = {};

            _this.getAt = function(index) {
                return _num[index];
            };

            _this.getLength = function() {
                return _num.length;
            };

            _this.multiply = function(e) {

                var num = new Array(_this.getLength() + e.getLength() - 1);

                for (var i = 0; i < _this.getLength(); i += 1) {
                    for (var j = 0; j < e.getLength(); j += 1) {
                        num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i) ) + QRMath.glog(e.getAt(j) ) );
                    }
                }

                return qrPolynomial(num, 0);
            };

            _this.mod = function(e) {

                if (_this.getLength() - e.getLength() < 0) {
                    return _this;
                }

                var ratio = QRMath.glog(_this.getAt(0) ) - QRMath.glog(e.getAt(0) );

                var num = new Array(_this.getLength() );
                for (var i = 0; i < _this.getLength(); i += 1) {
                    num[i] = _this.getAt(i);
                }

                for (var i = 0; i < e.getLength(); i += 1) {
                    num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i) ) + ratio);
                }

                // recursive call
                return qrPolynomial(num, 0).mod(e);
            };

            return _this;
        };

        //---------------------------------------------------------------------
        // QRRSBlock
        //---------------------------------------------------------------------

        var QRRSBlock = function() {

            var RS_BLOCK_TABLE = [

                // L
                // M
                // Q
                // H

                // 1
                [1, 26, 19],
                [1, 26, 16],
                [1, 26, 13],
                [1, 26, 9],

                // 2
                [1, 44, 34],
                [1, 44, 28],
                [1, 44, 22],
                [1, 44, 16],

                // 3
                [1, 70, 55],
                [1, 70, 44],
                [2, 35, 17],
                [2, 35, 13],

                // 4
                [1, 100, 80],
                [2, 50, 32],
                [2, 50, 24],
                [4, 25, 9],

                // 5
                [1, 134, 108],
                [2, 67, 43],
                [2, 33, 15, 2, 34, 16],
                [2, 33, 11, 2, 34, 12],

                // 6
                [2, 86, 68],
                [4, 43, 27],
                [4, 43, 19],
                [4, 43, 15],

                // 7
                [2, 98, 78],
                [4, 49, 31],
                [2, 32, 14, 4, 33, 15],
                [4, 39, 13, 1, 40, 14],

                // 8
                [2, 121, 97],
                [2, 60, 38, 2, 61, 39],
                [4, 40, 18, 2, 41, 19],
                [4, 40, 14, 2, 41, 15],

                // 9
                [2, 146, 116],
                [3, 58, 36, 2, 59, 37],
                [4, 36, 16, 4, 37, 17],
                [4, 36, 12, 4, 37, 13],

                // 10
                [2, 86, 68, 2, 87, 69],
                [4, 69, 43, 1, 70, 44],
                [6, 43, 19, 2, 44, 20],
                [6, 43, 15, 2, 44, 16],

                // 11
                [4, 101, 81],
                [1, 80, 50, 4, 81, 51],
                [4, 50, 22, 4, 51, 23],
                [3, 36, 12, 8, 37, 13],

                // 12
                [2, 116, 92, 2, 117, 93],
                [6, 58, 36, 2, 59, 37],
                [4, 46, 20, 6, 47, 21],
                [7, 42, 14, 4, 43, 15],

                // 13
                [4, 133, 107],
                [8, 59, 37, 1, 60, 38],
                [8, 44, 20, 4, 45, 21],
                [12, 33, 11, 4, 34, 12],

                // 14
                [3, 145, 115, 1, 146, 116],
                [4, 64, 40, 5, 65, 41],
                [11, 36, 16, 5, 37, 17],
                [11, 36, 12, 5, 37, 13],

                // 15
                [5, 109, 87, 1, 110, 88],
                [5, 65, 41, 5, 66, 42],
                [5, 54, 24, 7, 55, 25],
                [11, 36, 12, 7, 37, 13],

                // 16
                [5, 122, 98, 1, 123, 99],
                [7, 73, 45, 3, 74, 46],
                [15, 43, 19, 2, 44, 20],
                [3, 45, 15, 13, 46, 16],

                // 17
                [1, 135, 107, 5, 136, 108],
                [10, 74, 46, 1, 75, 47],
                [1, 50, 22, 15, 51, 23],
                [2, 42, 14, 17, 43, 15],

                // 18
                [5, 150, 120, 1, 151, 121],
                [9, 69, 43, 4, 70, 44],
                [17, 50, 22, 1, 51, 23],
                [2, 42, 14, 19, 43, 15],

                // 19
                [3, 141, 113, 4, 142, 114],
                [3, 70, 44, 11, 71, 45],
                [17, 47, 21, 4, 48, 22],
                [9, 39, 13, 16, 40, 14],

                // 20
                [3, 135, 107, 5, 136, 108],
                [3, 67, 41, 13, 68, 42],
                [15, 54, 24, 5, 55, 25],
                [15, 43, 15, 10, 44, 16],

                // 21
                [4, 144, 116, 4, 145, 117],
                [17, 68, 42],
                [17, 50, 22, 6, 51, 23],
                [19, 46, 16, 6, 47, 17],

                // 22
                [2, 139, 111, 7, 140, 112],
                [17, 74, 46],
                [7, 54, 24, 16, 55, 25],
                [34, 37, 13],

                // 23
                [4, 151, 121, 5, 152, 122],
                [4, 75, 47, 14, 76, 48],
                [11, 54, 24, 14, 55, 25],
                [16, 45, 15, 14, 46, 16],

                // 24
                [6, 147, 117, 4, 148, 118],
                [6, 73, 45, 14, 74, 46],
                [11, 54, 24, 16, 55, 25],
                [30, 46, 16, 2, 47, 17],

                // 25
                [8, 132, 106, 4, 133, 107],
                [8, 75, 47, 13, 76, 48],
                [7, 54, 24, 22, 55, 25],
                [22, 45, 15, 13, 46, 16],

                // 26
                [10, 142, 114, 2, 143, 115],
                [19, 74, 46, 4, 75, 47],
                [28, 50, 22, 6, 51, 23],
                [33, 46, 16, 4, 47, 17],

                // 27
                [8, 152, 122, 4, 153, 123],
                [22, 73, 45, 3, 74, 46],
                [8, 53, 23, 26, 54, 24],
                [12, 45, 15, 28, 46, 16],

                // 28
                [3, 147, 117, 10, 148, 118],
                [3, 73, 45, 23, 74, 46],
                [4, 54, 24, 31, 55, 25],
                [11, 45, 15, 31, 46, 16],

                // 29
                [7, 146, 116, 7, 147, 117],
                [21, 73, 45, 7, 74, 46],
                [1, 53, 23, 37, 54, 24],
                [19, 45, 15, 26, 46, 16],

                // 30
                [5, 145, 115, 10, 146, 116],
                [19, 75, 47, 10, 76, 48],
                [15, 54, 24, 25, 55, 25],
                [23, 45, 15, 25, 46, 16],

                // 31
                [13, 145, 115, 3, 146, 116],
                [2, 74, 46, 29, 75, 47],
                [42, 54, 24, 1, 55, 25],
                [23, 45, 15, 28, 46, 16],

                // 32
                [17, 145, 115],
                [10, 74, 46, 23, 75, 47],
                [10, 54, 24, 35, 55, 25],
                [19, 45, 15, 35, 46, 16],

                // 33
                [17, 145, 115, 1, 146, 116],
                [14, 74, 46, 21, 75, 47],
                [29, 54, 24, 19, 55, 25],
                [11, 45, 15, 46, 46, 16],

                // 34
                [13, 145, 115, 6, 146, 116],
                [14, 74, 46, 23, 75, 47],
                [44, 54, 24, 7, 55, 25],
                [59, 46, 16, 1, 47, 17],

                // 35
                [12, 151, 121, 7, 152, 122],
                [12, 75, 47, 26, 76, 48],
                [39, 54, 24, 14, 55, 25],
                [22, 45, 15, 41, 46, 16],

                // 36
                [6, 151, 121, 14, 152, 122],
                [6, 75, 47, 34, 76, 48],
                [46, 54, 24, 10, 55, 25],
                [2, 45, 15, 64, 46, 16],

                // 37
                [17, 152, 122, 4, 153, 123],
                [29, 74, 46, 14, 75, 47],
                [49, 54, 24, 10, 55, 25],
                [24, 45, 15, 46, 46, 16],

                // 38
                [4, 152, 122, 18, 153, 123],
                [13, 74, 46, 32, 75, 47],
                [48, 54, 24, 14, 55, 25],
                [42, 45, 15, 32, 46, 16],

                // 39
                [20, 147, 117, 4, 148, 118],
                [40, 75, 47, 7, 76, 48],
                [43, 54, 24, 22, 55, 25],
                [10, 45, 15, 67, 46, 16],

                // 40
                [19, 148, 118, 6, 149, 119],
                [18, 75, 47, 31, 76, 48],
                [34, 54, 24, 34, 55, 25],
                [20, 45, 15, 61, 46, 16]
            ];

            var qrRSBlock = function(totalCount, dataCount) {
                var _this = {};
                _this.totalCount = totalCount;
                _this.dataCount = dataCount;
                return _this;
            };

            var _this = {};

            var getRsBlockTable = function(typeNumber, errorCorrectLevel) {

                switch(errorCorrectLevel) {
                    case QRErrorCorrectLevel.L :
                        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
                    case QRErrorCorrectLevel.M :
                        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
                    case QRErrorCorrectLevel.Q :
                        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
                    case QRErrorCorrectLevel.H :
                        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
                    default :
                        return undefined;
                }
            };

            _this.getRSBlocks = function(typeNumber, errorCorrectLevel) {

                var rsBlock = getRsBlockTable(typeNumber, errorCorrectLevel);

                if (typeof rsBlock == 'undefined') {
                    throw new Error('bad rs block @ typeNumber:' + typeNumber +
                        '/errorCorrectLevel:' + errorCorrectLevel);
                }

                var length = rsBlock.length / 3;

                var list = new Array();

                for (var i = 0; i < length; i += 1) {

                    var count = rsBlock[i * 3 + 0];
                    var totalCount = rsBlock[i * 3 + 1];
                    var dataCount = rsBlock[i * 3 + 2];

                    for (var j = 0; j < count; j += 1) {
                        list.push(qrRSBlock(totalCount, dataCount) );
                    }
                }

                return list;
            };

            return _this;
        }();

        //---------------------------------------------------------------------
        // qrBitBuffer
        //---------------------------------------------------------------------

        var qrBitBuffer = function() {

            var _buffer = new Array();
            var _length = 0;

            var _this = {};

            _this.getBuffer = function() {
                return _buffer;
            };

            _this.getAt = function(index) {
                var bufIndex = Math.floor(index / 8);
                return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
            };

            _this.put = function(num, length) {
                for (var i = 0; i < length; i += 1) {
                    _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
                }
            };

            _this.getLengthInBits = function() {
                return _length;
            };

            _this.putBit = function(bit) {

                var bufIndex = Math.floor(_length / 8);
                if (_buffer.length <= bufIndex) {
                    _buffer.push(0);
                }

                if (bit) {
                    _buffer[bufIndex] |= (0x80 >>> (_length % 8) );
                }

                _length += 1;
            };

            return _this;
        };

        //---------------------------------------------------------------------
        // qr8BitByte
        //---------------------------------------------------------------------

        var qr8BitByte = function(data) {

            var _mode = QRMode.MODE_8BIT_BYTE;
            var _data = data;
            var _bytes = qrcode.stringToBytes(data);

            var _this = {};

            _this.getMode = function() {
                return _mode;
            };

            _this.getLength = function(buffer) {
                return _bytes.length;
            };

            _this.write = function(buffer) {
                for (var i = 0; i < _bytes.length; i += 1) {
                    buffer.put(_bytes[i], 8);
                }
            };

            return _this;
        };

        //=====================================================================
        // GIF Support etc.
        //

        //---------------------------------------------------------------------
        // byteArrayOutputStream
        //---------------------------------------------------------------------

        var byteArrayOutputStream = function() {

            var _bytes = new Array();

            var _this = {};

            _this.writeByte = function(b) {
                _bytes.push(b & 0xff);
            };

            _this.writeShort = function(i) {
                _this.writeByte(i);
                _this.writeByte(i >>> 8);
            };

            _this.writeBytes = function(b, off, len) {
                off = off || 0;
                len = len || b.length;
                for (var i = 0; i < len; i += 1) {
                    _this.writeByte(b[i + off]);
                }
            };

            _this.writeString = function(s) {
                for (var i = 0; i < s.length; i += 1) {
                    _this.writeByte(s.charCodeAt(i) );
                }
            };

            _this.toByteArray = function() {
                return _bytes;
            };

            _this.toString = function() {
                var s = '';
                s += '[';
                for (var i = 0; i < _bytes.length; i += 1) {
                    if (i > 0) {
                        s += ',';
                    }
                    s += _bytes[i];
                }
                s += ']';
                return s;
            };

            return _this;
        };

        //---------------------------------------------------------------------
        // base64EncodeOutputStream
        //---------------------------------------------------------------------

        var base64EncodeOutputStream = function() {

            var _buffer = 0;
            var _buflen = 0;
            var _length = 0;
            var _base64 = '';

            var _this = {};

            var writeEncoded = function(b) {
                _base64 += String.fromCharCode(encode(b & 0x3f) );
            };

            var encode = function(n) {
                if (n < 0) {
                    // error.
                } else if (n < 26) {
                    return 0x41 + n;
                } else if (n < 52) {
                    return 0x61 + (n - 26);
                } else if (n < 62) {
                    return 0x30 + (n - 52);
                } else if (n == 62) {
                    return 0x2b;
                } else if (n == 63) {
                    return 0x2f;
                }
                throw new Error('n:' + n);
            };

            _this.writeByte = function(n) {

                _buffer = (_buffer << 8) | (n & 0xff);
                _buflen += 8;
                _length += 1;

                while (_buflen >= 6) {
                    writeEncoded(_buffer >>> (_buflen - 6) );
                    _buflen -= 6;
                }
            };

            _this.flush = function() {

                if (_buflen > 0) {
                    writeEncoded(_buffer << (6 - _buflen) );
                    _buffer = 0;
                    _buflen = 0;
                }

                if (_length % 3 != 0) {
                    // padding
                    var padlen = 3 - _length % 3;
                    for (var i = 0; i < padlen; i += 1) {
                        _base64 += '=';
                    }
                }
            };

            _this.toString = function() {
                return _base64;
            };

            return _this;
        };

        //---------------------------------------------------------------------
        // base64DecodeInputStream
        //---------------------------------------------------------------------

        var base64DecodeInputStream = function(str) {

            var _str = str;
            var _pos = 0;
            var _buffer = 0;
            var _buflen = 0;

            var _this = {};

            _this.read = function() {

                while (_buflen < 8) {

                    if (_pos >= _str.length) {
                        if (_buflen == 0) {
                            return -1;
                        }
                        throw new Error('unexpected end of file./' + _buflen);
                    }

                    var c = _str.charAt(_pos);
                    _pos += 1;

                    if (c == '=') {
                        _buflen = 0;
                        return -1;
                    } else if (c.match(/^\s$/) ) {
                        // ignore if whitespace.
                        continue;
                    }

                    _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );
                    _buflen += 6;
                }

                var n = (_buffer >>> (_buflen - 8) ) & 0xff;
                _buflen -= 8;
                return n;
            };

            var decode = function(c) {
                if (0x41 <= c && c <= 0x5a) {
                    return c - 0x41;
                } else if (0x61 <= c && c <= 0x7a) {
                    return c - 0x61 + 26;
                } else if (0x30 <= c && c <= 0x39) {
                    return c - 0x30 + 52;
                } else if (c == 0x2b) {
                    return 62;
                } else if (c == 0x2f) {
                    return 63;
                } else {
                    throw new Error('c:' + c);
                }
            };

            return _this;
        };

        //---------------------------------------------------------------------
        // gifImage (B/W)
        //---------------------------------------------------------------------

        var gifImage = function(width, height) {

            var _width = width;
            var _height = height;
            var _data = new Array(width * height);

            var _this = {};

            _this.setPixel = function(x, y, pixel) {
                _data[y * _width + x] = pixel;
            };

            _this.write = function(out) {

                //---------------------------------
                // GIF Signature

                out.writeString('GIF87a');

                //---------------------------------
                // Screen Descriptor

                out.writeShort(_width);
                out.writeShort(_height);

                out.writeByte(0x80); // 2bit
                out.writeByte(0);
                out.writeByte(0);

                //---------------------------------
                // Global Color Map

                // black
                out.writeByte(0x00);
                out.writeByte(0x00);
                out.writeByte(0x00);

                // white
                out.writeByte(0xff);
                out.writeByte(0xff);
                out.writeByte(0xff);

                //---------------------------------
                // Image Descriptor

                out.writeString(',');
                out.writeShort(0);
                out.writeShort(0);
                out.writeShort(_width);
                out.writeShort(_height);
                out.writeByte(0);

                //---------------------------------
                // Local Color Map

                //---------------------------------
                // Raster Data

                var lzwMinCodeSize = 2;
                var raster = getLZWRaster(lzwMinCodeSize);

                out.writeByte(lzwMinCodeSize);

                var offset = 0;

                while (raster.length - offset > 255) {
                    out.writeByte(255);
                    out.writeBytes(raster, offset, 255);
                    offset += 255;
                }

                out.writeByte(raster.length - offset);
                out.writeBytes(raster, offset, raster.length - offset);
                out.writeByte(0x00);

                //---------------------------------
                // GIF Terminator
                out.writeString(';');
            };

            var bitOutputStream = function(out) {

                var _out = out;
                var _bitLength = 0;
                var _bitBuffer = 0;

                var _this = {};

                _this.write = function(data, length) {

                    if ( (data >>> length) != 0) {
                        throw new Error('length over');
                    }

                    while (_bitLength + length >= 8) {
                        _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );
                        length -= (8 - _bitLength);
                        data >>>= (8 - _bitLength);
                        _bitBuffer = 0;
                        _bitLength = 0;
                    }

                    _bitBuffer = (data << _bitLength) | _bitBuffer;
                    _bitLength = _bitLength + length;
                };

                _this.flush = function() {
                    if (_bitLength > 0) {
                        _out.writeByte(_bitBuffer);
                    }
                };

                return _this;
            };

            var getLZWRaster = function(lzwMinCodeSize) {

                var clearCode = 1 << lzwMinCodeSize;
                var endCode = (1 << lzwMinCodeSize) + 1;
                var bitLength = lzwMinCodeSize + 1;

                // Setup LZWTable
                var table = lzwTable();

                for (var i = 0; i < clearCode; i += 1) {
                    table.add(String.fromCharCode(i) );
                }
                table.add(String.fromCharCode(clearCode) );
                table.add(String.fromCharCode(endCode) );

                var byteOut = byteArrayOutputStream();
                var bitOut = bitOutputStream(byteOut);

                // clear code
                bitOut.write(clearCode, bitLength);

                var dataIndex = 0;

                var s = String.fromCharCode(_data[dataIndex]);
                dataIndex += 1;

                while (dataIndex < _data.length) {

                    var c = String.fromCharCode(_data[dataIndex]);
                    dataIndex += 1;

                    if (table.contains(s + c) ) {

                        s = s + c;

                    } else {

                        bitOut.write(table.indexOf(s), bitLength);

                        if (table.size() < 0xfff) {

                            if (table.size() == (1 << bitLength) ) {
                                bitLength += 1;
                            }

                            table.add(s + c);
                        }

                        s = c;
                    }
                }

                bitOut.write(table.indexOf(s), bitLength);

                // end code
                bitOut.write(endCode, bitLength);

                bitOut.flush();

                return byteOut.toByteArray();
            };

            var lzwTable = function() {

                var _map = {};
                var _size = 0;

                var _this = {};

                _this.add = function(key) {
                    if (_this.contains(key) ) {
                        throw new Error('dup key:' + key);
                    }
                    _map[key] = _size;
                    _size += 1;
                };

                _this.size = function() {
                    return _size;
                };

                _this.indexOf = function(key) {
                    return _map[key];
                };

                _this.contains = function(key) {
                    return typeof _map[key] != 'undefined';
                };

                return _this;
            };

            return _this;
        };

        var createImgTag = function(width, height, getPixel, alt) {

            var gif = gifImage(width, height);
            for (var y = 0; y < height; y += 1) {
                for (var x = 0; x < width; x += 1) {
                    gif.setPixel(x, y, getPixel(x, y) );
                }
            }

            var b = byteArrayOutputStream();
            gif.write(b);

            var base64 = base64EncodeOutputStream();
            var bytes = b.toByteArray();
            for (var i = 0; i < bytes.length; i += 1) {
                base64.writeByte(bytes[i]);
            }
            base64.flush();

            var img = '';
            img += '<img';
            img += '\u0020src="';
            img += 'data:image/gif;base64,';
            img += base64;
            img += '"';
            img += '\u0020width="';
            img += width;
            img += '"';
            img += '\u0020height="';
            img += height;
            img += '"';
            if (alt) {
                img += '\u0020alt="';
                img += alt;
                img += '"';
            }
            img += '/>';

            return img;
        };

        //---------------------------------------------------------------------
        // returns qrcode function.

        return qrcode;
    }();

    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            define([], factory);
        } else if (typeof exports === 'object') {
            module.exports = factory();
        }
    }(function () {
        return qrcode;
    }));
    //---------------------------------------------------------------------
    //
    // QR Code Generator for JavaScript UTF8 Support (optional)
    //
    // Copyright (c) 2011 Kazuhiko Arase
    //
    // URL: http://www.d-project.com/
    //
    // Licensed under the MIT license:
    //  http://www.opensource.org/licenses/mit-license.php
    //
    // The word 'QR Code' is registered trademark of
    // DENSO WAVE INCORPORATED
    //  http://www.denso-wave.com/qrcode/faqpatent-e.html
    //
    //---------------------------------------------------------------------

    !function(qrcode) {

        //---------------------------------------------------------------------
        // overwrite qrcode.stringToBytes
        //---------------------------------------------------------------------

        qrcode.stringToBytes = function(s) {
            // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
            function toUTF8Array(str) {
                var utf8 = [];
                for (var i=0; i < str.length; i++) {
                    var charcode = str.charCodeAt(i);
                    if (charcode < 0x80) utf8.push(charcode);
                    else if (charcode < 0x800) {
                        utf8.push(0xc0 | (charcode >> 6),
                            0x80 | (charcode & 0x3f));
                    }
                    else if (charcode < 0xd800 || charcode >= 0xe000) {
                        utf8.push(0xe0 | (charcode >> 12),
                            0x80 | ((charcode>>6) & 0x3f),
                            0x80 | (charcode & 0x3f));
                    }
                    // surrogate pair
                    else {
                        i++;
                        // UTF-16 encodes 0x10000-0x10FFFF by
                        // subtracting 0x10000 and splitting the
                        // 20 bits of 0x0-0xFFFFF into two halves
                        charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                            | (str.charCodeAt(i) & 0x3ff));
                        utf8.push(0xf0 | (charcode >>18),
                            0x80 | ((charcode>>12) & 0x3f),
                            0x80 | ((charcode>>6) & 0x3f),
                            0x80 | (charcode & 0x3f));
                    }
                }
                return utf8;
            }
            return toUTF8Array(s);
        };

    }(qrcode);

    return qrcode;
}()));
/*
 CanvasJS HTML5 & JavaScript Charts - v1.8.0 Beta 4 - http://canvasjs.com/ 
 Copyright 2013 fenopix
*/
(function(){function O(a,b){a.prototype=Aa(b.prototype);a.prototype.constructor=a;a.base=b.prototype}function Aa(a){function b(){}b.prototype=a;return new b}function sa(a,b,c){"millisecond"===c?a.setMilliseconds(a.getMilliseconds()+1*b):"second"===c?a.setSeconds(a.getSeconds()+1*b):"minute"===c?a.setMinutes(a.getMinutes()+1*b):"hour"===c?a.setHours(a.getHours()+1*b):"day"===c?a.setDate(a.getDate()+1*b):"week"===c?a.setDate(a.getDate()+7*b):"month"===c?a.setMonth(a.getMonth()+1*b):"year"===c&&a.setFullYear(a.getFullYear()+
1*b);return a}function L(a,b){var c=!1;0>a&&(c=!0,a*=-1);a=""+a;for(b=b?b:1;a.length<b;)a="0"+a;return c?"-"+a:a}function Z(a){if(!a)return a;a=a.replace(/^\s\s*/,"");for(var b=/\s/,c=a.length;b.test(a.charAt(--c)););return a.slice(0,c+1)}function Ba(a){a.roundRect=function(a,c,d,e,f,g,k,p){k&&(this.fillStyle=k);p&&(this.strokeStyle=p);"undefined"===typeof f&&(f=5);this.lineWidth=g;this.beginPath();this.moveTo(a+f,c);this.lineTo(a+d-f,c);this.quadraticCurveTo(a+d,c,a+d,c+f);this.lineTo(a+d,c+e-f);
this.quadraticCurveTo(a+d,c+e,a+d-f,c+e);this.lineTo(a+f,c+e);this.quadraticCurveTo(a,c+e,a,c+e-f);this.lineTo(a,c+f);this.quadraticCurveTo(a,c,a+f,c);this.closePath();k&&this.fill();p&&0<g&&this.stroke()}}function ta(a,b){return a-b}function Ca(a,b){return a.x-b.x}function B(a){var b=((a&16711680)>>16).toString(16),c=((a&65280)>>8).toString(16);a=((a&255)>>0).toString(16);b=2>b.length?"0"+b:b;c=2>c.length?"0"+c:c;a=2>a.length?"0"+a:a;return"#"+b+c+a}function Da(a,b){var c=this.length>>>0,d=Number(b)||
0,d=0>d?Math.ceil(d):Math.floor(d);for(0>d&&(d+=c);d<c;d++)if(d in this&&this[d]===a)return d;return-1}function da(a,b,c){c=c||"normal";var d=a+"_"+b+"_"+c,e=ua[d];if(isNaN(e)){try{a="position:absolute; left:0px; top:-20000px; padding:0px;margin:0px;border:none;white-space:pre;line-height:normal;font-family:"+a+"; font-size:"+b+"px; font-weight:"+c+";";if(!T){var f=document.body;T=document.createElement("span");T.innerHTML="";var g=document.createTextNode("Mpgyi");T.appendChild(g);f.appendChild(T)}T.style.display=
"";T.setAttribute("style",a);e=Math.round(T.offsetHeight);T.style.display="none"}catch(k){e=Math.ceil(1.1*b)}e=Math.max(e,b);ua[d]=e}return e}function M(a,b){var c=[];lineDashTypeMap={solid:[],shortDash:[3,1],shortDot:[1,1],shortDashDot:[3,1,1,1],shortDashDotDot:[3,1,1,1,1,1],dot:[1,2],dash:[4,2],dashDot:[4,2,1,2],longDash:[8,2],longDashDot:[8,2,1,2],longDashDotDot:[8,2,1,2,1,2]};if(c=lineDashTypeMap[a||"solid"])for(var d=0;d<c.length;d++)c[d]*=b;else c=[];return c}function F(a,b,c,d){if(a.addEventListener)a.addEventListener(b,
c,d||!1);else if(a.attachEvent)a.attachEvent("on"+b,function(b){b=b||window.event;b.preventDefault=b.preventDefault||function(){b.returnValue=!1};b.stopPropagation=b.stopPropagation||function(){b.cancelBubble=!0};c.call(a,b)});else return!1}function va(a,b,c){a*=J;b*=J;a=c.getImageData(a,b,2,2).data;b=!0;for(c=0;4>c;c++)if(a[c]!==a[c+4]|a[c]!==a[c+8]|a[c]!==a[c+12]){b=!1;break}return b?a[0]<<16|a[1]<<8|a[2]:0}function N(a,b,c){return a in b?b[a]:c[a]}function ea(a,b,c){if(t&&wa){var d=a.getContext("2d");
fa=d.webkitBackingStorePixelRatio||d.mozBackingStorePixelRatio||d.msBackingStorePixelRatio||d.oBackingStorePixelRatio||d.backingStorePixelRatio||1;J=na/fa;a.width=b*J;a.height=c*J;na!==fa&&(a.style.width=b+"px",a.style.height=c+"px",d.scale(J,J))}else a.width=b,a.height=c}function U(a,b){var c=document.createElement("canvas");c.setAttribute("class","canvasjs-chart-canvas");ea(c,a,b);t||"undefined"===typeof G_vmlCanvasManager||G_vmlCanvasManager.initElement(c);return c}function xa(a,b,c){if(a&&b&&
c){c=c+"."+("jpeg"===b?"jpg":b);var d="image/"+b;a=a.toDataURL(d);var e=!1,f=document.createElement("a");f.download=c;f.href=a;f.target="_blank";if("undefined"!==typeof Blob&&new Blob){for(var g=a.replace(/^data:[a-z/]*;base64,/,""),g=atob(g),k=new ArrayBuffer(g.length),p=new Uint8Array(k),h=0;h<g.length;h++)p[h]=g.charCodeAt(h);b=new Blob([k],{type:"image/"+b});try{window.navigator.msSaveBlob(b,c),e=!0}catch(l){f.dataset.downloadurl=[d,f.download,f.href].join(":"),f.href=window.URL.createObjectURL(b)}}if(!e)try{event=
document.createEvent("MouseEvents"),event.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),f.dispatchEvent?f.dispatchEvent(event):f.fireEvent&&f.fireEvent("onclick")}catch(n){b=window.open(),b.document.write("<img src='"+a+"'></img><div>Please right click on the image and save it to your device</div>"),b.document.close()}}}function P(a,b,c){b.getAttribute("state")!==c&&(b.setAttribute("state",c),b.setAttribute("type","button"),b.style.position="relative",b.style.margin="0px 0px 0px 0px",
b.style.padding="3px 4px 0px 4px",b.style.cssFloat="left",b.setAttribute("title",a._cultureInfo[c+"Text"]),b.innerHTML="<img style='height:16px;' src='"+Ea[c].image+"' alt='"+a._cultureInfo[c+"Text"]+"' />")}function ga(){for(var a=null,b=0;b<arguments.length;b++)a=arguments[b],a.style&&(a.style.display="inline")}function R(){for(var a=null,b=0;b<arguments.length;b++)(a=arguments[b])&&a.style&&(a.style.display="none")}function G(a,b,c,d){this._defaultsKey=a;this.parent=d;this._eventListeners=[];d=
{};c&&(X[c]&&X[c][a])&&(d=X[c][a]);this._options=b?b:{};this.setOptions(this._options,d)}function u(a,b,c){this._publicChartReference=c;b=b||{};u.base.constructor.call(this,"Chart",b,b.theme?b.theme:"theme1");var d=this;this._containerId=a;this._objectsInitialized=!1;this.overlaidCanvasCtx=this.ctx=null;this._indexLabels=[];this._panTimerId=0;this._lastTouchEventType="";this._lastTouchData=null;this.isAnimating=!1;this.renderCount=0;this.panEnabled=this.disableToolTip=this.animatedRender=!1;this._defaultCursor=
"default";this.plotArea={canvas:null,ctx:null,x1:0,y1:0,x2:0,y2:0,width:0,height:0};this._dataInRenderedOrder=[];(this._container="string"===typeof this._containerId?document.getElementById(this._containerId):this._containerId)?(this._container.innerHTML="",b=a=0,a=this._options.width?this.width:0<this._container.clientWidth?this._container.clientWidth:this.width,b=this._options.height?this.height:0<this._container.clientHeight?this._container.clientHeight:this.height,this.width=a,this.height=b,this.x1=
this.y1=0,this.x2=this.width,this.y2=this.height,this._selectedColorSet="undefined"!==typeof V[this.colorSet]?V[this.colorSet]:V.colorSet1,this._canvasJSContainer=document.createElement("div"),this._canvasJSContainer.setAttribute("class","canvasjs-chart-container"),this._canvasJSContainer.style.position="relative",this._canvasJSContainer.style.textAlign="left",this._canvasJSContainer.style.cursor="auto",t||(this._canvasJSContainer.style.height="0px"),this._container.appendChild(this._canvasJSContainer),
this.canvas=U(a,b),this.canvas.style.position="absolute",this.canvas.getContext&&(this._canvasJSContainer.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.ctx.textBaseline="top",Ba(this.ctx),t?this.plotArea.ctx=this.ctx:(this.plotArea.canvas=U(a,b),this.plotArea.canvas.style.position="absolute",this.plotArea.canvas.setAttribute("class","plotAreaCanvas"),this._canvasJSContainer.appendChild(this.plotArea.canvas),this.plotArea.ctx=this.plotArea.canvas.getContext("2d")),this.overlaidCanvas=
U(a,b),this.overlaidCanvas.style.position="absolute",this._canvasJSContainer.appendChild(this.overlaidCanvas),this.overlaidCanvasCtx=this.overlaidCanvas.getContext("2d"),this.overlaidCanvasCtx.textBaseline="top",this._eventManager=new $(this),F(window,"resize",function(){d._updateSize()&&d.render()}),this._toolBar=document.createElement("div"),this._toolBar.setAttribute("class","canvasjs-chart-toolbar"),this._toolBar.style.cssText="position: absolute; right: 1px; top: 1px;",this._canvasJSContainer.appendChild(this._toolBar),
this.bounds={x1:0,y1:0,x2:this.width,y2:this.height},F(this.overlaidCanvas,"click",function(a){d._mouseEventHandler(a)}),F(this.overlaidCanvas,"mousemove",function(a){d._mouseEventHandler(a)}),F(this.overlaidCanvas,"mouseup",function(a){d._mouseEventHandler(a)}),F(this.overlaidCanvas,"mousedown",function(a){d._mouseEventHandler(a);R(d._dropdownMenu)}),F(this.overlaidCanvas,"mouseout",function(a){d._mouseEventHandler(a)}),F(this.overlaidCanvas,window.navigator.msPointerEnabled?"MSPointerDown":"touchstart",
function(a){d._touchEventHandler(a)}),F(this.overlaidCanvas,window.navigator.msPointerEnabled?"MSPointerMove":"touchmove",function(a){d._touchEventHandler(a)}),F(this.overlaidCanvas,window.navigator.msPointerEnabled?"MSPointerUp":"touchend",function(a){d._touchEventHandler(a)}),F(this.overlaidCanvas,window.navigator.msPointerEnabled?"MSPointerCancel":"touchcancel",function(a){d._touchEventHandler(a)}),this._creditLink||(this._creditLink=document.createElement("a"),this._creditLink.setAttribute("class",
"canvasjs-chart-credit"),this._creditLink.setAttribute("style","outline:none;margin:0px;position:absolute;right:3px;top:"+(this.height-14)+"px;color:dimgrey;text-decoration:none;font-size:10px;font-family:Lucida Grande, Lucida Sans Unicode, Arial, sans-serif"),this._creditLink.setAttribute("tabIndex",-1),this._creditLink.setAttribute("target","_blank")),this._toolTip=new Q(this,this._options.toolTip,this.theme),this.axisY2=this.axisY=this.axisX=this.data=null,this.sessionVariables={axisX:{},axisY:{},
axisY2:{}})):window.console&&window.console.log('CanvasJS Error: Chart Container with id "'+this._containerId+'" was not found')}function ha(a,b){for(var c=[],d=0;d<a.length;d++)if(0==d)c.push(a[0]);else{var e,f,g;g=d-1;e=0===g?0:g-1;f=g===a.length-1?g:g+1;c[c.length]={x:a[g].x+(a[f].x-a[e].x)/b/3,y:a[g].y+(a[f].y-a[e].y)/b/3};g=d;e=0===g?0:g-1;f=g===a.length-1?g:g+1;c[c.length]={x:a[g].x-(a[f].x-a[e].x)/b/3,y:a[g].y-(a[f].y-a[e].y)/b/3};c[c.length]=a[d]}return c}function ya(a,b){if(null===a||"undefined"===
typeof a)return b;var c=parseFloat(a.toString())*(0<=a.toString().indexOf("%")?b/100:1);return!isNaN(c)&&c<=b&&0<=c?c:b}function Y(a,b,c,d,e){"undefined"===typeof e&&(e=0);this._padding=e;this._x1=a;this._y1=b;this._x2=c;this._y2=d;this._rightOccupied=this._leftOccupied=this._bottomOccupied=this._topOccupied=this._padding}function H(a,b){H.base.constructor.call(this,"TextBlock",b);this.ctx=a;this._isDirty=!0;this._wrappedText=null;this._lineHeight=da(this.fontFamily,this.fontSize,this.fontWeight)}
function aa(a,b){aa.base.constructor.call(this,"Title",b,a.theme);this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx;"undefined"===typeof this._options.fontSize&&(this.fontSize=this.chart.getAutoFontSize(this.fontSize));this.height=this.width=null;this.bounds={x1:null,y1:null,x2:null,y2:null}}function ia(a,b){ia.base.constructor.call(this,"Subtitle",b,a.theme);this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx;"undefined"===typeof this._options.fontSize&&(this.fontSize=this.chart.getAutoFontSize(this.fontSize));
this.height=this.width=null;this.bounds={x1:null,y1:null,x2:null,y2:null}}function ja(a,b,c){ja.base.constructor.call(this,"Legend",b,c);this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx;this.ghostCtx=this.chart._eventManager.ghostCtx;this.items=[];this.height=this.width=0;this.orientation=null;this.dataSeries=[];this.bounds={x1:null,y1:null,x2:null,y2:null};"undefined"===typeof this._options.fontSize&&(this.fontSize=this.chart.getAutoFontSize(this.fontSize));this.lineHeight=da(this.fontFamily,
this.fontSize,this.fontWeight);this.horizontalSpacing=this.fontSize}function oa(a,b){oa.base.constructor.call(this,b);this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx}function S(a,b,c,d,e){S.base.constructor.call(this,"DataSeries",b,c);this.chart=a;this.canvas=a.canvas;this._ctx=a.canvas.ctx;this.index=d;this.noDataPointsInPlotArea=0;this.id=e;this.chart._eventManager.objectMap[e]={id:e,objectType:"dataSeries",dataSeriesIndex:d};this.dataPointIds=[];this.plotUnit=[];this.axisY=this.axisX=
null;null===this.fillOpacity&&(this.type.match(/area/i)?this.fillOpacity=0.7:this.fillOpacity=1);this.axisPlacement=this.getDefaultAxisPlacement();"undefined"===typeof this._options.indexLabelFontSize&&(this.indexLabelFontSize=this.chart.getAutoFontSize(this.indexLabelFontSize))}function C(a,b,c,d){C.base.constructor.call(this,"Axis",b,a.theme);this.chart=a;this.canvas=a.canvas;this.ctx=a.ctx;this.intervalStartPosition=this.maxHeight=this.maxWidth=0;this.labels=[];this._labels=null;this.dataInfo=
{min:Infinity,max:-Infinity,viewPortMin:Infinity,viewPortMax:-Infinity,minDiff:Infinity};"axisX"===c?(this.sessionVariables=this.chart.sessionVariables[c],this._options.interval||(this.intervalType=null)):this.sessionVariables="left"===d||"top"===d?this.chart.sessionVariables.axisY:this.chart.sessionVariables.axisY2;"undefined"===typeof this._options.titleFontSize&&(this.titleFontSize=this.chart.getAutoFontSize(this.titleFontSize));"undefined"===typeof this._options.labelFontSize&&(this.labelFontSize=
this.chart.getAutoFontSize(this.labelFontSize));this.type=c;"axisX"!==c||b&&"undefined"!==typeof b.gridThickness||(this.gridThickness=0);this._position=d;this.lineCoordinates={x1:null,y1:null,x2:null,y2:null,width:null};this.labelAngle=(this.labelAngle%360+360)%360;90<this.labelAngle&&270>=this.labelAngle?this.labelAngle-=180:180<this.labelAngle&&270>=this.labelAngle?this.labelAngle-=180:270<this.labelAngle&&360>=this.labelAngle&&(this.labelAngle-=360);if(this._options.stripLines&&0<this._options.stripLines.length)for(this.stripLines=
[],b=0;b<this._options.stripLines.length;b++)this.stripLines.push(new ka(this.chart,this._options.stripLines[b],a.theme,++this.chart._eventManager.lastObjectId,this));this._titleTextBlock=null;this.hasOptionChanged("viewportMinimum")&&null===this.viewportMinimum&&(this._options.viewportMinimum=void 0,this.sessionVariables.viewportMinimum=null);this.hasOptionChanged("viewportMinimum")||isNaN(this.sessionVariables.newViewportMinimum)||null===this.sessionVariables.newViewportMinimum?this.sessionVariables.newViewportMinimum=
null:this.viewportMinimum=this.sessionVariables.newViewportMinimum;this.hasOptionChanged("viewportMaximum")&&null===this.viewportMaximum&&(this._options.viewportMaximum=void 0,this.sessionVariables.viewportMaximum=null);this.hasOptionChanged("viewportMaximum")||isNaN(this.sessionVariables.newViewportMaximum)||null===this.sessionVariables.newViewportMaximum?this.sessionVariables.newViewportMaximum=null:this.viewportMaximum=this.sessionVariables.newViewportMaximum;null!==this.minimum&&null!==this.viewportMinimum&&
(this.viewportMinimum=Math.max(this.viewportMinimum,this.minimum));null!==this.maximum&&null!==this.viewportMaximum&&(this.viewportMaximum=Math.min(this.viewportMaximum,this.maximum));this.trackChanges("viewportMinimum");this.trackChanges("viewportMaximum")}function ka(a,b,c,d,e){ka.base.constructor.call(this,"StripLine",b,c,e);this.id=d;this.chart=a;this.ctx=this.chart.ctx;this.label=this.label;this._thicknessType="pixel";null!==this.startValue&&null!==this.endValue&&(this.value=((this.startValue.getTime?
this.startValue.getTime():this.startValue)+(this.endValue.getTime?this.endValue.getTime():this.endValue))/2,this.thickness=Math.max(this.endValue-this.startValue),this._thicknessType="value")}function Q(a,b,c){Q.base.constructor.call(this,"ToolTip",b,c);this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx;this.currentDataPointIndex=this.currentSeriesIndex=-1;this._timerId=0;this._prevY=this._prevX=NaN;this._initialize()}function $(a){this.chart=a;this.lastObjectId=0;this.objectMap=[];this.rectangularRegionEventSubscriptions=
[];this.previousDataPointEventObject=null;this.ghostCanvas=U(this.chart.width,this.chart.height);this.ghostCtx=this.ghostCanvas.getContext("2d");this.mouseoveredObjectMaps=[]}function ba(a){var b;a&&ca[a]&&(b=ca[a]);ba.base.constructor.call(this,"CultureInfo",b)}function pa(a){this.chart=a;this.ctx=this.chart.plotArea.ctx;this.animations=[];this.animationRequestId=null}var t=!!document.createElement("canvas").getContext,la={Chart:{width:500,height:400,zoomEnabled:!1,zoomType:"x",backgroundColor:"white",
theme:"theme1",animationEnabled:!1,animationDuration:1200,dataPointWidth:null,dataPointMinWidth:null,dataPointMaxWidth:null,colorSet:"colorSet1",culture:"en",creditText:"CanvasJS.com",interactivityEnabled:!0,exportEnabled:!1,exportFileName:"Chart",rangeChanging:null,rangeChanged:null},Title:{padding:0,text:null,verticalAlign:"top",horizontalAlign:"center",fontSize:20,fontFamily:"Calibri",fontWeight:"normal",fontColor:"black",fontStyle:"normal",borderThickness:0,borderColor:"black",cornerRadius:0,
backgroundColor:null,margin:5,wrap:!0,maxWidth:null,dockInsidePlotArea:!1},Subtitle:{padding:0,text:null,verticalAlign:"top",horizontalAlign:"center",fontSize:14,fontFamily:"Calibri",fontWeight:"normal",fontColor:"black",fontStyle:"normal",borderThickness:0,borderColor:"black",cornerRadius:0,backgroundColor:null,margin:2,wrap:!0,maxWidth:null,dockInsidePlotArea:!1},Legend:{name:null,verticalAlign:"center",horizontalAlign:"right",fontSize:14,fontFamily:"calibri",fontWeight:"normal",fontColor:"black",
fontStyle:"normal",cursor:null,itemmouseover:null,itemmouseout:null,itemmousemove:null,itemclick:null,dockInsidePlotArea:!1,reversed:!1,maxWidth:null,maxHeight:null,itemMaxWidth:null,itemWidth:null,itemWrap:!0,itemTextFormatter:null},ToolTip:{enabled:!0,shared:!1,animationEnabled:!0,content:null,contentFormatter:null,reversed:!1,backgroundColor:null,borderColor:null,borderThickness:2,cornerRadius:5,fontSize:14,fontColor:"#000000",fontFamily:"Calibri, Arial, Georgia, serif;",fontWeight:"normal",fontStyle:"italic"},
Axis:{minimum:null,maximum:null,viewportMinimum:null,viewportMaximum:null,interval:null,intervalType:null,title:null,titleFontColor:"black",titleFontSize:20,titleFontFamily:"arial",titleFontWeight:"normal",titleFontStyle:"normal",labelAngle:0,labelFontFamily:"arial",labelFontColor:"black",labelFontSize:12,labelFontWeight:"normal",labelFontStyle:"normal",labelAutoFit:!1,labelWrap:!0,labelMaxWidth:null,labelFormatter:null,prefix:"",suffix:"",includeZero:!0,tickLength:5,tickColor:"black",tickThickness:1,
lineColor:"black",lineThickness:1,lineDashType:"solid",gridColor:"A0A0A0",gridThickness:0,gridDashType:"solid",interlacedColor:null,valueFormatString:null,margin:2,stripLines:[]},StripLine:{value:null,startValue:null,endValue:null,color:"orange",opacity:null,thickness:2,lineDashType:"solid",label:"",labelBackgroundColor:"#EEEEEE",labelFontFamily:"arial",labelFontColor:"orange",labelFontSize:12,labelFontWeight:"normal",labelFontStyle:"normal",labelFormatter:null,showOnTop:!1},DataSeries:{name:null,
dataPoints:null,label:"",bevelEnabled:!1,highlightEnabled:!0,cursor:null,indexLabel:"",indexLabelPlacement:"auto",indexLabelOrientation:"horizontal",indexLabelFontColor:"black",indexLabelFontSize:12,indexLabelFontStyle:"normal",indexLabelFontFamily:"Arial",indexLabelFontWeight:"normal",indexLabelBackgroundColor:null,indexLabelLineColor:null,indexLabelLineThickness:1,indexLabelLineDashType:"solid",indexLabelMaxWidth:null,indexLabelWrap:!0,indexLabelFormatter:null,lineThickness:2,lineDashType:"solid",
color:null,risingColor:"white",fillOpacity:null,startAngle:0,radius:null,innerRadius:null,type:"column",xValueType:"number",axisYType:"primary",xValueFormatString:null,yValueFormatString:null,zValueFormatString:null,percentFormatString:null,showInLegend:null,legendMarkerType:null,legendMarkerColor:null,legendText:null,legendMarkerBorderColor:null,legendMarkerBorderThickness:null,markerType:"circle",markerColor:null,markerSize:null,markerBorderColor:null,markerBorderThickness:null,mouseover:null,mouseout:null,
mousemove:null,click:null,toolTipContent:null,visible:!0},TextBlock:{x:0,y:0,width:null,height:null,maxWidth:null,maxHeight:null,padding:0,angle:0,text:"",horizontalAlign:"center",fontSize:12,fontFamily:"calibri",fontWeight:"normal",fontColor:"black",fontStyle:"normal",borderThickness:0,borderColor:"black",cornerRadius:0,backgroundColor:null,textBaseline:"top"},CultureInfo:{decimalSeparator:".",digitGroupSeparator:",",zoomText:"Zoom",panText:"Pan",resetText:"Reset",menuText:"More Options",saveJPGText:"Save as JPG",
savePNGText:"Save as PNG",days:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),shortDays:"Sun Mon Tue Wed Thu Fri Sat".split(" "),months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")}},ca={en:{}},V={colorSet1:"#369EAD #C24642 #7F6084 #86B402 #A2D1CF #C8B631 #6DBCEB #52514E #4F81BC #A064A1 #F79647".split(" "),colorSet2:"#4F81BC #C0504E #9BBB58 #23BFAA #8064A1 #4AACC5 #F79647 #33558B".split(" "),
colorSet3:"#8CA1BC #36845C #017E82 #8CB9D0 #708C98 #94838D #F08891 #0366A7 #008276 #EE7757 #E5BA3A #F2990B #03557B #782970".split(" ")},X={theme1:{Chart:{colorSet:"colorSet1"},Title:{fontFamily:t?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",fontSize:33,fontColor:"#3A3A3A",fontWeight:"bold",verticalAlign:"top",margin:5},Subtitle:{fontFamily:t?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",fontSize:16,fontColor:"#3A3A3A",fontWeight:"bold",verticalAlign:"top",
margin:5},Axis:{titleFontSize:26,titleFontColor:"#666666",titleFontFamily:t?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",labelFontFamily:t?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",labelFontSize:18,labelFontColor:"grey",tickColor:"#BBBBBB",tickThickness:2,gridThickness:2,gridColor:"#BBBBBB",lineThickness:2,lineColor:"#BBBBBB"},Legend:{verticalAlign:"bottom",horizontalAlign:"center",fontFamily:t?"monospace, sans-serif,arial black":"calibri"},DataSeries:{indexLabelFontColor:"grey",
indexLabelFontFamily:t?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",indexLabelFontSize:18,indexLabelLineThickness:1}},theme2:{Chart:{colorSet:"colorSet2"},Title:{fontFamily:"impact, charcoal, arial black, sans-serif",fontSize:32,fontColor:"#333333",verticalAlign:"top",margin:5},Subtitle:{fontFamily:"impact, charcoal, arial black, sans-serif",fontSize:14,fontColor:"#333333",verticalAlign:"top",margin:5},Axis:{titleFontSize:22,titleFontColor:"rgb(98,98,98)",titleFontFamily:t?"monospace, sans-serif,arial black":
"arial",titleFontWeight:"bold",labelFontFamily:t?"monospace, Courier New, Courier":"arial",labelFontSize:16,labelFontColor:"grey",labelFontWeight:"bold",tickColor:"grey",tickThickness:2,gridThickness:2,gridColor:"grey",lineColor:"grey",lineThickness:0},Legend:{verticalAlign:"bottom",horizontalAlign:"center",fontFamily:t?"monospace, sans-serif,arial black":"arial"},DataSeries:{indexLabelFontColor:"grey",indexLabelFontFamily:t?"Courier New, Courier, monospace":"arial",indexLabelFontWeight:"bold",indexLabelFontSize:18,
indexLabelLineThickness:1}},theme3:{Chart:{colorSet:"colorSet1"},Title:{fontFamily:t?"Candara, Optima, Trebuchet MS, Helvetica Neue, Helvetica, Trebuchet MS, serif":"calibri",fontSize:32,fontColor:"#3A3A3A",fontWeight:"bold",verticalAlign:"top",margin:5},Subtitle:{fontFamily:t?"Candara, Optima, Trebuchet MS, Helvetica Neue, Helvetica, Trebuchet MS, serif":"calibri",fontSize:16,fontColor:"#3A3A3A",fontWeight:"bold",verticalAlign:"top",margin:5},Axis:{titleFontSize:22,titleFontColor:"rgb(98,98,98)",
titleFontFamily:t?"Verdana, Geneva, Calibri, sans-serif":"calibri",labelFontFamily:t?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",labelFontSize:18,labelFontColor:"grey",tickColor:"grey",tickThickness:2,gridThickness:2,gridColor:"grey",lineThickness:2,lineColor:"grey"},Legend:{verticalAlign:"bottom",horizontalAlign:"center",fontFamily:t?"monospace, sans-serif,arial black":"calibri"},DataSeries:{bevelEnabled:!0,indexLabelFontColor:"grey",indexLabelFontFamily:t?"Candara, Optima, Calibri, Verdana, Geneva, sans-serif":
"calibri",indexLabelFontSize:18,indexLabelLineColor:"lightgrey",indexLabelLineThickness:2}}},D={numberDuration:1,yearDuration:314496E5,monthDuration:2592E6,weekDuration:6048E5,dayDuration:864E5,hourDuration:36E5,minuteDuration:6E4,secondDuration:1E3,millisecondDuration:1,dayOfWeekFromInt:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")},ua={},T=null,qa=function(){var a=/D{1,4}|M{1,4}|Y{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|f{1,3}|t{1,2}|T{1,2}|K|z{1,3}|"[^"]*"|'[^']*'/g,b="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
c="Sun Mon Tue Wed Thu Fri Sat".split(" "),d="January February March April May June July August September October November December".split(" "),e="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),f=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,g=/[^-+\dA-Z]/g;return function(k,p,h){var l=h?h.days:b,n=h?h.months:d,m=h?h.shortDays:c,q=h?h.shortMonths:e;h="";var r=!1;k=k&&k.getTime?k:k?new Date(k):new Date;
if(isNaN(k))throw SyntaxError("invalid date");"UTC:"===p.slice(0,4)&&(p=p.slice(4),r=!0);h=r?"getUTC":"get";var s=k[h+"Date"](),w=k[h+"Day"](),v=k[h+"Month"](),x=k[h+"FullYear"](),t=k[h+"Hours"](),y=k[h+"Minutes"](),z=k[h+"Seconds"](),u=k[h+"Milliseconds"](),A=r?0:k.getTimezoneOffset();return h=p.replace(a,function(a){switch(a){case "D":return s;case "DD":return L(s,2);case "DDD":return m[w];case "DDDD":return l[w];case "M":return v+1;case "MM":return L(v+1,2);case "MMM":return q[v];case "MMMM":return n[v];
case "Y":return parseInt(String(x).slice(-2));case "YY":return L(String(x).slice(-2),2);case "YYY":return L(String(x).slice(-3),3);case "YYYY":return L(x,4);case "h":return t%12||12;case "hh":return L(t%12||12,2);case "H":return t;case "HH":return L(t,2);case "m":return y;case "mm":return L(y,2);case "s":return z;case "ss":return L(z,2);case "f":return String(u).slice(0,1);case "ff":return L(String(u).slice(0,2),2);case "fff":return L(String(u).slice(0,3),3);case "t":return 12>t?"a":"p";case "tt":return 12>
t?"am":"pm";case "T":return 12>t?"A":"P";case "TT":return 12>t?"AM":"PM";case "K":return r?"UTC":(String(k).match(f)||[""]).pop().replace(g,"");case "z":return(0<A?"-":"+")+Math.floor(Math.abs(A)/60);case "zz":return(0<A?"-":"+")+L(Math.floor(Math.abs(A)/60),2);case "zzz":return(0<A?"-":"+")+L(Math.floor(Math.abs(A)/60),2)+L(Math.abs(A)%60,2);default:return a.slice(1,a.length-1)}})}}(),W=function(a,b,c){if(null===a)return"";a=Number(a);var d=0>a?!0:!1;d&&(a*=-1);var e=c?c.decimalSeparator:".",f=c?
c.digitGroupSeparator:",",g="";b=String(b);var g=1,k=c="",p=-1,h=[],l=[],n=0,m=0,q=0,r=!1,s=0,k=b.match(/"[^"]*"|'[^']*'|[eE][+-]*[0]+|[,]+[.]|\u2030|./g);b=null;for(var w=0;k&&w<k.length;w++)if(b=k[w],"."===b&&0>p)p=w;else{if("%"===b)g*=100;else if("\u2030"===b){g*=1E3;continue}else if(","===b[0]&&"."===b[b.length-1]){g/=Math.pow(1E3,b.length-1);p=w+b.length-1;continue}else"E"!==b[0]&&"e"!==b[0]||"0"!==b[b.length-1]||(r=!0);0>p?(h.push(b),"#"===b||"0"===b?n++:","===b&&q++):(l.push(b),"#"!==b&&"0"!==
b||m++)}r&&(b=Math.floor(a),s=(0===b?"":String(b)).length-n,g/=Math.pow(10,s));0>p&&(p=w);g=(a*g).toFixed(m);b=g.split(".");g=(b[0]+"").split("");a=(b[1]+"").split("");g&&"0"===g[0]&&g.shift();for(w=r=k=m=p=0;0<h.length;)if(b=h.pop(),"#"===b||"0"===b)if(p++,p===n){var v=g,g=[];if("0"===b)for(b=n-m-(v?v.length:0);0<b;)v.unshift("0"),b--;for(;0<v.length;)c=v.pop()+c,w++,0===w%r&&(k===q&&0<v.length)&&(c=f+c);d&&(c="-"+c)}else 0<g.length?(c=g.pop()+c,m++,w++):"0"===b&&(c="0"+c,m++,w++),0===w%r&&(k===
q&&0<g.length)&&(c=f+c);else"E"!==b[0]&&"e"!==b[0]||"0"!==b[b.length-1]||!/[eE][+-]*[0]+/.test(b)?","===b?(k++,r=w,w=0,0<g.length&&(c=f+c)):c=1<b.length&&('"'===b[0]&&'"'===b[b.length-1]||"'"===b[0]&&"'"===b[b.length-1])?b.slice(1,b.length-1)+c:b+c:(b=0>s?b.replace("+","").replace("-",""):b.replace("-",""),c+=b.replace(/[0]+/,function(a){return L(s,a.length)}));d="";for(f=!1;0<l.length;)b=l.shift(),"#"===b||"0"===b?0<a.length&&0!==Number(a.join(""))?(d+=a.shift(),f=!0):"0"===b&&(d+="0",f=!0):1<b.length&&
('"'===b[0]&&'"'===b[b.length-1]||"'"===b[0]&&"'"===b[b.length-1])?d+=b.slice(1,b.length-1):"E"!==b[0]&&"e"!==b[0]||"0"!==b[b.length-1]||!/[eE][+-]*[0]+/.test(b)?d+=b:(b=0>s?b.replace("+","").replace("-",""):b.replace("-",""),d+=b.replace(/[0]+/,function(a){return L(s,a.length)}));return c+((f?e:"")+d)},ma=function(a){var b=0,c=0;a=a||window.event;a.offsetX||0===a.offsetX?(b=a.offsetX,c=a.offsetY):a.layerX||0==a.layerX?(b=a.layerX,c=a.layerY):(b=a.pageX-a.target.offsetLeft,c=a.pageY-a.target.offsetTop);
return{x:b,y:c}},wa=!0,na=window.devicePixelRatio||1,fa=1,J=wa?na/fa:1,Ea={reset:{image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAKRSURBVEiJrdY/iF1FFMfxzwnZrGISUSR/JLGIhoh/QiRNBLWxMLIWEkwbgiAoFgoW2mhlY6dgpY2IlRBRxBSKhSAKIklWJRYuMZKAhiyopAiaTY7FvRtmZ+/ed9/zHRjezLw5v/O9d86cuZGZpmURAfdn5o9DfdZNLXpjz+LziPgyIl6MiG0jPTJzZBuyDrP4BVm0P/AKbljTb4ToY/gGewYA7KyCl+1b3DUYANvwbiHw0gCAGRzBOzjTAXEOu0cC4Ch+r5x/HrpdrcZmvIDFSucMtnYCYC++6HmNDw8FKDT34ETrf639/azOr5vwRk/g5fbeuABtgC04XWk9VQLciMP4EH/3AFzErRNC7MXlQmsesSoHsGPE23hmEoBW+61K66HMXFmIMvN8myilXS36R01ub+KfYvw43ZXwYDX+AHP4BAci4pFJomfmr/ihmNofESsBImJGk7mlncrM45n5JPbhz0kAWpsv+juxaX21YIPmVJS2uNzJMS6ZNexC0d+I7fUWXLFyz2kSZlpWPvASlmqAf/FXNXf3FAF2F/1LuFifAlionB6dRuSI2IwHi6lzmXmp6xR8XY0fiIh7psAwh+3FuDkRHQVjl+a8lkXjo0kLUKH7XaV5oO86PmZ1FTzyP4K/XGl9v/zwfbW7BriiuETGCP5ch9bc9f97HF/vcFzCa5gdEPgWq+t/4v0V63oE1uF4h0DiFJ7HnSWMppDdh1dxtsPvJ2wcBNAKbsJXa0Ck5opdaBPsRNu/usba09i1KsaAVzmLt3sghrRjuK1Tf4xkegInxwy8gKf7dKMVH2QRsV5zXR/Cftyu+aKaKbbkQrsdH+PTzLzcqzkOQAVzM+7FHdiqqe2/YT4zF/t8S/sPmawyvC974vcAAAAASUVORK5CYII="},
pan:{image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAJVSURBVFiFvZe7a1RBGMV/x2hWI4JpfKCIiSBKOoOCkID/wP4BFqIIFkE02ChIiC8QDKlSiI3YqRBsBVGwUNAUdiIEUgjiAzQIIsuKJsfizsXr5t7d+8jmwLDfzHz3nLOzc7+ZxTZlGyDgZiWOCuJ9wH2gCUyuqQFgF/AGcKJNrYkBYBj40CIet+muGQi/96kM4WS7C/Tm5VUg7whJg8BkEGkCR4BDYfodsADUgP6wErO5iCtswsuJb32hdbXy8qzL5TIdmzJinHdZoZIBZcSFkGlAKs1Z3YCketZcBtouuaQNkrblMiBpBrhme7mAgU4wMCvpcFsDkq4C54DFVRTH9h+i6vlE0r5UA5ImgCuh28jB28iIs7BIVCOeStoZD64P4uPAjUTygKSx2FsK2TIwkugfk9Qkfd/E+yMWHQCeSRqx/R3gOp3LazfaS2C4B5gHDgD7U9x3E3uAH7KNpC3AHHAwTL4FHgM9GQ8vAaPA0dB/Abxqk2/gBLA9MXba9r1k/d4LfA3JtwueBeM58ucS+edXnAW23wP10N3advEi9CXizTnyN4bPS7Zn4sH/dq3t18AY4e1YLYSy3g/csj2VnFshZPuOpOeSKHCodUINuGj7YetE6je1PV9QoNPJ9StNHKodx7nRbiWrGHBGXAi5DUiqtQwtpcWK0Jubt8CltA5MEV1IfwO7+VffPwGfia5m34CT4bXujIIX0Qna1/cGMNqV/wUJE2czxD8CQ4X5Sl7Jz7SILwCDpbjKPBRMHAd+EtX4HWV5Spdc2w8kDQGPbH8py/MXMygM69/FKz4AAAAASUVORK5CYII="},
zoom:{image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAMqSURBVFiFvdfbj91TFMDxz57U6GUEMS1aYzyMtCSSDhWjCZMInpAI3khE/QHtgzdRkXgSCS8SES9epKLi0oRKNETjRahREq2KS1stdRujtDPtbA97n5zdn9+5zJxTK9k5v3POXmt991p7r71+IcaoGwkhTOIebMRqzOBTvIG3Y4zTXRmqSoyx5cAKbMJOHMFJnMZ8/jyFaXyMR7G6nb1aH22cP4BvcBxziG3GKfyTIR9D6BYg1KUghPBCDveFlb/24Av8iuUYw41YVsz5G7uxKcZ4aMEpwGt5NY3V/YbHsQ6rcAHOw/kYxigewr5CZw4fYGxBKcCLOFEYehXrMdRhr5yLETxVScsOLOkKAPfn1TYMPIvLFrShUlS2FDZm8XRHACzFAWl3R2xbqPMCYhmeLCAOYEMngAczbcTvuHYxzguIy/FesR9e6gSwU/OoPYHBHgHgviIKX2Flq7k34KhmcVnbi/PC8JX4MgMcxb118wZwdz5aISscqx7VRcox7MrPQ7i+btIAJrAkf9+bI9EPmZY2IAxiTSuAldLq4Y9+AcSUh78KP0tbAcwU35cXMD1JCIFUoGiehlqAz6TNB1f1C0DK+0h+nsNPrQC2a4bqGmlD9kOGcWt+Po6pVgDvSxfJaSkFd4UQBvoAsBYbCoB3a2flM7slA0R8iyt6rAFDeDPbm8eOTpVwGD9qVq7nLbIaZnmksPU1JtsCZMXNmpdRxFasWITzh6Xj3LCzra1OxcD2QjHiGVzdpfORnMqZio2PcF23ABdJF1Np4BPptlyPi6WzPYBzpJZtHe7A6xW9cnyP8TqA//SEIYRL8Bxul7rihvwgtVn78WcGGZXa9HGd5TDujDHuOePXNiHdKjWgZX/YbsxLx/ktqbjVzTlcjUSnvI5JrdlUVp6WesZZ6R1hRrpq9+EVTGS9jTjYAuKIouGpbcurEkIYxC051KNSamazsc+xK8b4S0VnEi/j0hqTP+M27O258egQwZuzs7pI7Mf4WQXIEDc5s9sux+5+1Py2EmP8UOq6GvWhIScxfdYjUERiAt9Jd84J6a16zf8JEKT3yCm8g1UxRv8CC4pyRhzR1uUAAAAASUVORK5CYII="},
menu:{image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMTUvMTTPsvU0AAAAP0lEQVRIie2SMQoAIBDDUvH/X667g8sJJ9KOhYYOkW0qGaU1MPdC0vGSbV19EACo3YMPAFH5BUBUjsqfAPpVXtNgGDfxEDCtAAAAAElFTkSuQmCC"}};G.prototype.setOptions=function(a,b){if(la[this._defaultsKey]){var c=la[this._defaultsKey],d;for(d in c)c.hasOwnProperty(d)&&(this[d]=a&&d in a?a[d]:b&&d in
b?b[d]:c[d])}};G.prototype.updateOption=function(a){var b=la[this._defaultsKey],c=this._options.theme?this._options.theme:this.chart&&this.chart._options.theme?this.chart._options.theme:"theme1",d={},e=this[a];c&&(X[c]&&X[c][this._defaultsKey])&&(d=X[c][this._defaultsKey]);a in b&&(e=a in this._options?this._options[a]:d&&a in d?d[a]:b[a]);if(e===this[a])return!1;this[a]=e;return!0};G.prototype.trackChanges=function(a){if(!this.sessionVariables)throw"Session Variable Store not set";this.sessionVariables[a]=
this._options[a]};G.prototype.isBeingTracked=function(a){this._options._oldOptions||(this._options._oldOptions={});return this._options._oldOptions[a]?!0:!1};G.prototype.hasOptionChanged=function(a){if(!this.sessionVariables)throw"Session Variable Store not set";return this.sessionVariables[a]!==this._options[a]};G.prototype.addEventListener=function(a,b,c){a&&b&&(this._eventListeners[a]=this._eventListeners[a]||[],this._eventListeners[a].push({context:c||this,eventHandler:b}))};G.prototype.removeEventListener=
function(a,b){if(a&&b&&this._eventListeners[a])for(var c=this._eventListeners[a],d=0;d<c.length;d++)if(c[d].eventHandler===b){c[d].splice(d,1);break}};G.prototype.removeAllEventListeners=function(){this._eventListeners=[]};G.prototype.dispatchEvent=function(a,b,c){if(a&&this._eventListeners[a]){b=b||{};for(var d=this._eventListeners[a],e=0;e<d.length;e++)d[e].eventHandler.call(d[e].context,b)}"function"===typeof this[a]&&this[a].call(c||this.chart._publicChartReference,b)};O(u,G);u.prototype._updateOptions=
function(){var a=this;this.updateOption("width");this.updateOption("height");this.updateOption("dataPointWidth");this.updateOption("dataPointMinWidth");this.updateOption("dataPointMaxWidth");this.updateOption("interactivityEnabled");this.updateOption("theme");this.updateOption("colorSet")&&(this._selectedColorSet="undefined"!==typeof V[this.colorSet]?V[this.colorSet]:V.colorSet1);this.updateOption("backgroundColor");this.backgroundColor||(this.backgroundColor="rgba(0,0,0,0)");this.updateOption("culture");
this._cultureInfo=new ba(this._options.culture);this.updateOption("animationEnabled");this.animationEnabled=this.animationEnabled&&t;this.updateOption("animationDuration");this.updateOption("rangeChanging");this.updateOption("rangeChanged");this.updateOption("exportEnabled");this.updateOption("exportFileName");this.updateOption("zoomType");this._options.zoomEnabled?(this._zoomButton||(R(this._zoomButton=document.createElement("button")),P(this,this._zoomButton,"pan"),this._toolBar.appendChild(this._zoomButton),
F(this._zoomButton,"click",function(){a.zoomEnabled?(a.zoomEnabled=!1,a.panEnabled=!0,P(a,a._zoomButton,"zoom")):(a.zoomEnabled=!0,a.panEnabled=!1,P(a,a._zoomButton,"pan"));a.render()})),this._resetButton||(R(this._resetButton=document.createElement("button")),P(this,this._resetButton,"reset"),this._toolBar.appendChild(this._resetButton),F(this._resetButton,"click",function(){a._toolTip.hide();a.zoomEnabled||a.panEnabled?(a.zoomEnabled=!0,a.panEnabled=!1,P(a,a._zoomButton,"pan"),a._defaultCursor=
"default",a.overlaidCanvas.style.cursor=a._defaultCursor):(a.zoomEnabled=!1,a.panEnabled=!1);a.sessionVariables.axisX&&(a.sessionVariables.axisX.newViewportMinimum=null,a.sessionVariables.axisX.newViewportMaximum=null);a.sessionVariables.axisY&&(a.sessionVariables.axisY.newViewportMinimum=null,a.sessionVariables.axisY.newViewportMaximum=null);a.sessionVariables.axisY2&&(a.sessionVariables.axisY2.newViewportMinimum=null,a.sessionVariables.axisY2.newViewportMaximum=null);a.resetOverlayedCanvas();R(a._zoomButton,
a._resetButton);a._dispatchRangeEvent("rangeChanging","reset");a.render();a._dispatchRangeEvent("rangeChanged","reset")}),this.overlaidCanvas.style.cursor=a._defaultCursor),this.zoomEnabled||this.panEnabled||(this._zoomButton?(a._zoomButton.getAttribute("state")===a._cultureInfo.zoomText?(this.panEnabled=!0,this.zoomEnabled=!1):(this.zoomEnabled=!0,this.panEnabled=!1),ga(a._zoomButton,a._resetButton)):(this.zoomEnabled=!0,this.panEnabled=!1))):this.panEnabled=this.zoomEnabled=!1;this._menuButton?
this.exportEnabled?ga(this._menuButton):R(this._menuButton):this.exportEnabled&&t&&(this._menuButton=document.createElement("button"),P(this,this._menuButton,"menu"),this._toolBar.appendChild(this._menuButton),F(this._menuButton,"click",function(){"none"!==a._dropdownMenu.style.display||a._dropDownCloseTime&&500>=(new Date).getTime()-a._dropDownCloseTime.getTime()||(a._dropdownMenu.style.display="block",a._menuButton.blur(),a._dropdownMenu.focus())},!0));if(!this._dropdownMenu&&this.exportEnabled&&
t){this._dropdownMenu=document.createElement("div");this._dropdownMenu.setAttribute("tabindex",-1);this._dropdownMenu.style.cssText="position: absolute; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: pointer;right: 1px;top: 25px;min-width: 120px;outline: 0;border: 1px solid silver;font-size: 14px;font-family: Calibri, Verdana, sans-serif;padding: 5px 0px 5px 0px;text-align: left;background-color: #fff;line-height: 20px;box-shadow: 2px 2px 10px #888888;";
a._dropdownMenu.style.display="none";this._toolBar.appendChild(this._dropdownMenu);F(this._dropdownMenu,"blur",function(){R(a._dropdownMenu);a._dropDownCloseTime=new Date},!0);var b=document.createElement("div");b.style.cssText="padding: 2px 15px 2px 10px";b.innerHTML=this._cultureInfo.saveJPGText;this._dropdownMenu.appendChild(b);F(b,"mouseover",function(){this.style.backgroundColor="#EEEEEE"},!0);F(b,"mouseout",function(){this.style.backgroundColor="transparent"},!0);F(b,"click",function(){xa(a.canvas,
"jpg",a.exportFileName);R(a._dropdownMenu)},!0);b=document.createElement("div");b.style.cssText="padding: 2px 15px 2px 10px";b.innerHTML=this._cultureInfo.savePNGText;this._dropdownMenu.appendChild(b);F(b,"mouseover",function(){this.style.backgroundColor="#EEEEEE"},!0);F(b,"mouseout",function(){this.style.backgroundColor="transparent"},!0);F(b,"click",function(){xa(a.canvas,"png",a.exportFileName);R(a._dropdownMenu)},!0)}"none"!==this._toolBar.style.display&&this._zoomButton&&(this.panEnabled?P(a,
a._zoomButton,"zoom"):P(a,a._zoomButton,"pan"),a._resetButton.getAttribute("state")!==a._cultureInfo.resetText&&P(a,a._resetButton,"reset"));if("undefined"===typeof la.Chart.creditHref)this.creditHref="http://canvasjs.com/",this.creditText="CanvasJS.com";else var c=this.updateOption("creditText"),d=this.updateOption("creditHref");if(0===this.renderCount||c||d)this._creditLink.setAttribute("href",this.creditHref),this._creditLink.innerHTML=this.creditText;this.creditHref&&this.creditText?this._creditLink.parentElement||
this._canvasJSContainer.appendChild(this._creditLink):this._creditLink.parentElement&&this._canvasJSContainer.removeChild(this._creditLink);this._options.toolTip&&this._toolTip._options!==this._options.toolTip&&(this._toolTip._options=this._options.toolTip);for(var e in this._toolTip._options)this._toolTip._options.hasOwnProperty(e)&&this._toolTip.updateOption(e)};u.prototype._updateSize=function(){var a=0,b=0;this._options.width?a=this.width:this.width=a=0<this._container.clientWidth?this._container.clientWidth:
this.width;this._options.height?b=this.height:this.height=b=0<this._container.clientHeight?this._container.clientHeight:this.height;return this.canvas.width!==a*J||this.canvas.height!==b*J?(ea(this.canvas,a,b),ea(this.overlaidCanvas,a,b),ea(this._eventManager.ghostCanvas,a,b),!0):!1};u.prototype._initialize=function(){this._animator?this._animator.cancelAllAnimations():this._animator=new pa(this);this.removeAllEventListeners();this.disableToolTip=!1;this._axes=[];this.pieDoughnutClickHandler=null;
this.animationRequestId&&this.cancelRequestAnimFrame.call(window,this.animationRequestId);this._updateOptions();this.animatedRender=t&&this.animationEnabled&&0===this.renderCount;this._updateSize();this.clearCanvas();this.ctx.beginPath();this.axisY2=this.axisY=this.axisX=null;this._indexLabels=[];this._dataInRenderedOrder=[];this._events=[];this._eventManager&&this._eventManager.reset();this.plotInfo={axisPlacement:null,axisXValueType:null,plotTypes:[]};this.layoutManager=new Y(0,0,this.width,this.height,
2);this.plotArea.layoutManager&&this.plotArea.layoutManager.reset();this.data=[];for(var a=0,b=0;b<this._options.data.length;b++)if(a++,!this._options.data[b].type||0<=u._supportedChartTypes.indexOf(this._options.data[b].type)){var c=new S(this,this._options.data[b],this.theme,a-1,++this._eventManager.lastObjectId);null===c.name&&(c.name="DataSeries "+a);null===c.color?1<this._options.data.length?(c._colorSet=[this._selectedColorSet[c.index%this._selectedColorSet.length]],c.color=this._selectedColorSet[c.index%
this._selectedColorSet.length]):c._colorSet="line"===c.type||"stepLine"===c.type||"spline"===c.type||"area"===c.type||"stepArea"===c.type||"splineArea"===c.type||"stackedArea"===c.type||"stackedArea100"===c.type||"rangeArea"===c.type||"rangeSplineArea"===c.type||"candlestick"===c.type||"ohlc"===c.type?[this._selectedColorSet[0]]:this._selectedColorSet:c._colorSet=[c.color];null===c.markerSize&&(("line"===c.type||"stepLine"===c.type||"spline"===c.type)&&c.dataPoints&&c.dataPoints.length<this.width/
16||"scatter"===c.type)&&(c.markerSize=8);"bubble"!==c.type&&"scatter"!==c.type||!c.dataPoints||c.dataPoints.sort(Ca);this.data.push(c);var d=c.axisPlacement,e;"normal"===d?"xySwapped"===this.plotInfo.axisPlacement?e='You cannot combine "'+c.type+'" with bar chart':"none"===this.plotInfo.axisPlacement?e='You cannot combine "'+c.type+'" with pie chart':null===this.plotInfo.axisPlacement&&(this.plotInfo.axisPlacement="normal"):"xySwapped"===d?"normal"===this.plotInfo.axisPlacement?e='You cannot combine "'+
c.type+'" with line, area, column or pie chart':"none"===this.plotInfo.axisPlacement?e='You cannot combine "'+c.type+'" with pie chart':null===this.plotInfo.axisPlacement&&(this.plotInfo.axisPlacement="xySwapped"):"none"==d&&("normal"===this.plotInfo.axisPlacement?e='You cannot combine "'+c.type+'" with line, area, column or bar chart':"xySwapped"===this.plotInfo.axisPlacement?e='You cannot combine "'+c.type+'" with bar chart':null===this.plotInfo.axisPlacement&&(this.plotInfo.axisPlacement="none"));
if(e&&window.console){window.console.log(e);return}}this._objectsInitialized=!0};u._supportedChartTypes=function(a){a.indexOf||(a.indexOf=Da);return a}("line stepLine spline column area stepArea splineArea bar bubble scatter stackedColumn stackedColumn100 stackedBar stackedBar100 stackedArea stackedArea100 candlestick ohlc rangeColumn rangeBar rangeArea rangeSplineArea pie doughnut funnel".split(" "));u.prototype.render=function(a){a&&(this._options=a);this._initialize();var b=[];for(a=0;a<this.data.length;a++)if("normal"===
this.plotInfo.axisPlacement||"xySwapped"===this.plotInfo.axisPlacement)this.data[a].axisYType&&"primary"!==this.data[a].axisYType?"secondary"===this.data[a].axisYType&&(this.axisY2||("normal"===this.plotInfo.axisPlacement?this._axes.push(this.axisY2=new C(this,this._options.axisY2,"axisY","right")):"xySwapped"===this.plotInfo.axisPlacement&&this._axes.push(this.axisY2=new C(this,this._options.axisY2,"axisY","top"))),this.data[a].axisY=this.axisY2):(this.axisY||("normal"===this.plotInfo.axisPlacement?
this._axes.push(this.axisY=new C(this,this._options.axisY,"axisY","left")):"xySwapped"===this.plotInfo.axisPlacement&&this._axes.push(this.axisY=new C(this,this._options.axisY,"axisY","bottom"))),this.data[a].axisY=this.axisY),this.axisX||("normal"===this.plotInfo.axisPlacement?this._axes.push(this.axisX=new C(this,this._options.axisX,"axisX","bottom")):"xySwapped"===this.plotInfo.axisPlacement&&this._axes.push(this.axisX=new C(this,this._options.axisX,"axisX","left"))),this.data[a].axisX=this.axisX;
this.axisY&&this.axisY2&&(0<this.axisY.gridThickness&&"undefined"===typeof this.axisY2._options.gridThickness?this.axisY2.gridThickness=0:0<this.axisY2.gridThickness&&"undefined"===typeof this.axisY._options.gridThickness&&(this.axisY.gridThickness=0));var c=!1;if(0<this._axes.length&&(this.zoomEnabled||this.panEnabled))for(a=0;a<this._axes.length;a++)if(null!==this._axes[a].viewportMinimum||null!==this._axes[a].viewportMaximum){c=!0;break}c?ga(this._zoomButton,this._resetButton):R(this._zoomButton,
this._resetButton);this._processData();this._options.title&&(this._title=new aa(this,this._options.title),this._title.dockInsidePlotArea?b.push(this._title):this._title.render());if(this._options.subtitles)for(a=0;a<this._options.subtitles.length;a++)this.subtitles=[],c=new ia(this,this._options.subtitles[a]),this.subtitles.push(c),c.dockInsidePlotArea?b.push(c):c.render();this.legend=new ja(this,this._options.legend,this.theme);for(a=0;a<this.data.length;a++)(this.data[a].showInLegend||"pie"===this.data[a].type||
"doughnut"===this.data[a].type)&&this.legend.dataSeries.push(this.data[a]);this.legend.dockInsidePlotArea?b.push(this.legend):this.legend.render();if("normal"===this.plotInfo.axisPlacement||"xySwapped"===this.plotInfo.axisPlacement)C.setLayoutAndRender(this.axisX,this.axisY,this.axisY2,this.plotInfo.axisPlacement,this.layoutManager.getFreeSpace());else if("none"===this.plotInfo.axisPlacement)this.preparePlotArea();else return;for(a=0;a<b.length;a++)b[a].render();var d=[];if(this.animatedRender){var e=
U(this.width,this.height);e.getContext("2d").drawImage(this.canvas,0,0,this.width,this.height)}for(a=0;a<this.plotInfo.plotTypes.length;a++)for(b=this.plotInfo.plotTypes[a],c=0;c<b.plotUnits.length;c++){var f=b.plotUnits[c],g=null;f.targetCanvas=null;this.animatedRender&&(f.targetCanvas=U(this.width,this.height),f.targetCanvasCtx=f.targetCanvas.getContext("2d"));"line"===f.type?g=this.renderLine(f):"stepLine"===f.type?g=this.renderStepLine(f):"spline"===f.type?g=this.renderSpline(f):"column"===f.type?
g=this.renderColumn(f):"bar"===f.type?g=this.renderBar(f):"area"===f.type?g=this.renderArea(f):"stepArea"===f.type?g=this.renderStepArea(f):"splineArea"===f.type?g=this.renderSplineArea(f):"stackedColumn"===f.type?g=this.renderStackedColumn(f):"stackedColumn100"===f.type?g=this.renderStackedColumn100(f):"stackedBar"===f.type?g=this.renderStackedBar(f):"stackedBar100"===f.type?g=this.renderStackedBar100(f):"stackedArea"===f.type?g=this.renderStackedArea(f):"stackedArea100"===f.type?g=this.renderStackedArea100(f):
"bubble"===f.type?g=g=this.renderBubble(f):"scatter"===f.type?g=this.renderScatter(f):"pie"===f.type?this.renderPie(f):"doughnut"===f.type?this.renderPie(f):"candlestick"===f.type?g=this.renderCandlestick(f):"ohlc"===f.type?g=this.renderCandlestick(f):"rangeColumn"===f.type?g=this.renderRangeColumn(f):"rangeBar"===f.type?g=this.renderRangeBar(f):"rangeArea"===f.type?g=this.renderRangeArea(f):"rangeSplineArea"===f.type&&(g=this.renderRangeSplineArea(f));for(var k=0;k<f.dataSeriesIndexes.length;k++)this._dataInRenderedOrder.push(this.data[f.dataSeriesIndexes[k]]);
this.animatedRender&&g&&d.push(g)}this.animatedRender&&0<this._indexLabels.length&&(a=U(this.width,this.height).getContext("2d"),d.push(this.renderIndexLabels(a)));var p=this;0<d.length?(p.disableToolTip=!0,p._animator.animate(200,p.animationDuration,function(a){p.ctx.clearRect(0,0,p.width,p.height);p.ctx.drawImage(e,0,0,Math.floor(p.width*J),Math.floor(p.height*J),0,0,p.width,p.height);for(var c=0;c<d.length;c++)g=d[c],1>a&&"undefined"!==typeof g.startTimePercent?a>=g.startTimePercent&&g.animationCallback(g.easingFunction(a-
g.startTimePercent,0,1,1-g.startTimePercent),g):g.animationCallback(g.easingFunction(a,0,1,1),g);p.dispatchEvent("dataAnimationIterationEnd",{chart:p})},function(){d=[];for(var a=0;a<p.plotInfo.plotTypes.length;a++)for(var c=p.plotInfo.plotTypes[a],b=0;b<c.plotUnits.length;b++)c.plotUnits[b].targetCanvas=null;e=null;p.disableToolTip=!1})):(0<p._indexLabels.length&&p.renderIndexLabels(),p.dispatchEvent("dataAnimationIterationEnd",{chart:p}));this.attachPlotAreaEventHandlers();this.zoomEnabled||(this.panEnabled||
!this._zoomButton||"none"===this._zoomButton.style.display)||R(this._zoomButton,this._resetButton);this._toolTip._updateToolTip();this.renderCount++};u.prototype.attachPlotAreaEventHandlers=function(){this.attachEvent({context:this,chart:this,mousedown:this._plotAreaMouseDown,mouseup:this._plotAreaMouseUp,mousemove:this._plotAreaMouseMove,cursor:this.zoomEnabled?"col-resize":"move",cursor:this.panEnabled?"move":"default",capture:!0,bounds:this.plotArea})};u.prototype.categoriseDataSeries=function(){for(var a=
"",b=0;b<this.data.length;b++)if(a=this.data[b],a.dataPoints&&(0!==a.dataPoints.length&&a.visible)&&0<=u._supportedChartTypes.indexOf(a.type)){for(var c=null,d=!1,e=null,f=!1,g=0;g<this.plotInfo.plotTypes.length;g++)if(this.plotInfo.plotTypes[g].type===a.type){d=!0;c=this.plotInfo.plotTypes[g];break}d||(c={type:a.type,totalDataSeries:0,plotUnits:[]},this.plotInfo.plotTypes.push(c));for(g=0;g<c.plotUnits.length;g++)if(c.plotUnits[g].axisYType===a.axisYType){f=!0;e=c.plotUnits[g];break}f||(e={type:a.type,
previousDataSeriesCount:0,index:c.plotUnits.length,plotType:c,axisYType:a.axisYType,axisY:"primary"===a.axisYType?this.axisY:this.axisY2,axisX:this.axisX,dataSeriesIndexes:[],yTotals:[]},c.plotUnits.push(e));c.totalDataSeries++;e.dataSeriesIndexes.push(b);a.plotUnit=e}for(b=0;b<this.plotInfo.plotTypes.length;b++)for(c=this.plotInfo.plotTypes[b],g=a=0;g<c.plotUnits.length;g++)c.plotUnits[g].previousDataSeriesCount=a,a+=c.plotUnits[g].dataSeriesIndexes.length};u.prototype.assignIdToDataPoints=function(){for(var a=
0;a<this.data.length;a++){var b=this.data[a];if(b.dataPoints)for(var c=b.dataPoints.length,d=0;d<c;d++)b.dataPointIds[d]=++this._eventManager.lastObjectId}};u.prototype._processData=function(){this.assignIdToDataPoints();this.categoriseDataSeries();for(var a=0;a<this.plotInfo.plotTypes.length;a++)for(var b=this.plotInfo.plotTypes[a],c=0;c<b.plotUnits.length;c++){var d=b.plotUnits[c];"line"===d.type||"stepLine"===d.type||"spline"===d.type||"column"===d.type||"area"===d.type||"stepArea"===d.type||"splineArea"===
d.type||"bar"===d.type||"bubble"===d.type||"scatter"===d.type?this._processMultiseriesPlotUnit(d):"stackedColumn"===d.type||"stackedBar"===d.type||"stackedArea"===d.type?this._processStackedPlotUnit(d):"stackedColumn100"===d.type||"stackedBar100"===d.type||"stackedArea100"===d.type?this._processStacked100PlotUnit(d):"candlestick"!==d.type&&"ohlc"!==d.type&&"rangeColumn"!==d.type&&"rangeBar"!==d.type&&"rangeArea"!==d.type&&"rangeSplineArea"!==d.type||this._processMultiYPlotUnit(d)}};u.prototype._processMultiseriesPlotUnit=
function(a){if(a.dataSeriesIndexes&&!(1>a.dataSeriesIndexes.length))for(var b=a.axisY.dataInfo,c=a.axisX.dataInfo,d,e,f=!1,g=0;g<a.dataSeriesIndexes.length;g++){var k=this.data[a.dataSeriesIndexes[g]],p=0,h=!1,l=!1;if("normal"===k.axisPlacement||"xySwapped"===k.axisPlacement)var n=this.sessionVariables.axisX.newViewportMinimum?this.sessionVariables.axisX.newViewportMinimum:this._options.axisX&&this._options.axisX.viewportMinimum?this._options.axisX.viewportMinimum:this._options.axisX&&this._options.axisX.minimum?
this._options.axisX.minimum:-Infinity,m=this.sessionVariables.axisX.newViewportMaximum?this.sessionVariables.axisX.newViewportMaximum:this._options.axisX&&this._options.axisX.viewportMaximum?this._options.axisX.viewportMaximum:this._options.axisX&&this._options.axisX.maximum?this._options.axisX.maximum:Infinity;if(k.dataPoints[p].x&&k.dataPoints[p].x.getTime||"dateTime"===k.xValueType)f=!0;for(p=0;p<k.dataPoints.length;p++){"undefined"===typeof k.dataPoints[p].x&&(k.dataPoints[p].x=p);k.dataPoints[p].x.getTime?
(f=!0,d=k.dataPoints[p].x.getTime()):d=k.dataPoints[p].x;e=k.dataPoints[p].y;d<c.min&&(c.min=d);d>c.max&&(c.max=d);e<b.min&&(b.min=e);e>b.max&&(b.max=e);if(0<p){var q=d-k.dataPoints[p-1].x;0>q&&(q*=-1);c.minDiff>q&&0!==q&&(c.minDiff=q);null!==e&&null!==k.dataPoints[p-1].y&&(q=e-k.dataPoints[p-1].y,0>q&&(q*=-1),b.minDiff>q&&0!==q&&(b.minDiff=q))}if(!(d<n)||h){if(!h&&(h=!0,0<p)){p-=2;continue}if(d>m&&!l)l=!0;else if(d>m&&l)continue;k.dataPoints[p].label&&(a.axisX.labels[d]=k.dataPoints[p].label);d<
c.viewPortMin&&(c.viewPortMin=d);d>c.viewPortMax&&(c.viewPortMax=d);null!==e&&(e<b.viewPortMin&&(b.viewPortMin=e),e>b.viewPortMax&&(b.viewPortMax=e))}}this.plotInfo.axisXValueType=k.xValueType=f?"dateTime":"number"}};u.prototype._processStackedPlotUnit=function(a){if(a.dataSeriesIndexes&&!(1>a.dataSeriesIndexes.length)){for(var b=a.axisY.dataInfo,c=a.axisX.dataInfo,d,e,f=!1,g=[],k=[],p=0;p<a.dataSeriesIndexes.length;p++){var h=this.data[a.dataSeriesIndexes[p]],l=0,n=!1,m=!1;if("normal"===h.axisPlacement||
"xySwapped"===h.axisPlacement)var q=this.sessionVariables.axisX.newViewportMinimum?this.sessionVariables.axisX.newViewportMinimum:this._options.axisX&&this._options.axisX.viewportMinimum?this._options.axisX.viewportMinimum:this._options.axisX&&this._options.axisX.minimum?this._options.axisX.minimum:-Infinity,r=this.sessionVariables.axisX.newViewportMaximum?this.sessionVariables.axisX.newViewportMaximum:this._options.axisX&&this._options.axisX.viewportMaximum?this._options.axisX.viewportMaximum:this._options.axisX&&
this._options.axisX.maximum?this._options.axisX.maximum:Infinity;if(h.dataPoints[l].x&&h.dataPoints[l].x.getTime||"dateTime"===h.xValueType)f=!0;for(l=0;l<h.dataPoints.length;l++){"undefined"===typeof h.dataPoints[l].x&&(h.dataPoints[l].x=l);h.dataPoints[l].x.getTime?(f=!0,d=h.dataPoints[l].x.getTime()):d=h.dataPoints[l].x;e=h.dataPoints[l].y;d<c.min&&(c.min=d);d>c.max&&(c.max=d);if(0<l){var s=d-h.dataPoints[l-1].x;0>s&&(s*=-1);c.minDiff>s&&0!==s&&(c.minDiff=s);null!==e&&null!==h.dataPoints[l-1].y&&
(s=e-h.dataPoints[l-1].y,0>s&&(s*=-1),b.minDiff>s&&0!==s&&(b.minDiff=s))}if(!(d<q)||n){if(!n&&(n=!0,0<l)){l-=2;continue}if(d>r&&!m)m=!0;else if(d>r&&m)continue;h.dataPoints[l].label&&(a.axisX.labels[d]=h.dataPoints[l].label);d<c.viewPortMin&&(c.viewPortMin=d);d>c.viewPortMax&&(c.viewPortMax=d);null!==e&&(a.yTotals[d]=(a.yTotals[d]?a.yTotals[d]:0)+Math.abs(e),0<=e?g[d]=g[d]?g[d]+e:e:k[d]=k[d]?k[d]+e:e)}}this.plotInfo.axisXValueType=h.xValueType=f?"dateTime":"number"}for(l in g)g.hasOwnProperty(l)&&
!isNaN(l)&&(a=g[l],a<b.min&&(b.min=a),a>b.max&&(b.max=a),l<c.viewPortMin||l>c.viewPortMax||(a<b.viewPortMin&&(b.viewPortMin=a),a>b.viewPortMax&&(b.viewPortMax=a)));for(l in k)k.hasOwnProperty(l)&&!isNaN(l)&&(a=k[l],a<b.min&&(b.min=a),a>b.max&&(b.max=a),l<c.viewPortMin||l>c.viewPortMax||(a<b.viewPortMin&&(b.viewPortMin=a),a>b.viewPortMax&&(b.viewPortMax=a)))}};u.prototype._processStacked100PlotUnit=function(a){if(a.dataSeriesIndexes&&!(1>a.dataSeriesIndexes.length)){for(var b=a.axisY.dataInfo,c=a.axisX.dataInfo,
d,e,f=!1,g=!1,k=!1,p=[],h=0;h<a.dataSeriesIndexes.length;h++){var l=this.data[a.dataSeriesIndexes[h]],n=0,m=!1,q=!1;if("normal"===l.axisPlacement||"xySwapped"===l.axisPlacement)var r=this.sessionVariables.axisX.newViewportMinimum?this.sessionVariables.axisX.newViewportMinimum:this._options.axisX&&this._options.axisX.viewportMinimum?this._options.axisX.viewportMinimum:this._options.axisX&&this._options.axisX.minimum?this._options.axisX.minimum:-Infinity,s=this.sessionVariables.axisX.newViewportMaximum?
this.sessionVariables.axisX.newViewportMaximum:this._options.axisX&&this._options.axisX.viewportMaximum?this._options.axisX.viewportMaximum:this._options.axisX&&this._options.axisX.maximum?this._options.axisX.maximum:Infinity;if(l.dataPoints[n].x&&l.dataPoints[n].x.getTime||"dateTime"===l.xValueType)f=!0;for(n=0;n<l.dataPoints.length;n++){"undefined"===typeof l.dataPoints[n].x&&(l.dataPoints[n].x=n);l.dataPoints[n].x.getTime?(f=!0,d=l.dataPoints[n].x.getTime()):d=l.dataPoints[n].x;e=l.dataPoints[n].y;
d<c.min&&(c.min=d);d>c.max&&(c.max=d);if(0<n){var w=d-l.dataPoints[n-1].x;0>w&&(w*=-1);c.minDiff>w&&0!==w&&(c.minDiff=w);null!==e&&null!==l.dataPoints[n-1].y&&(w=e-l.dataPoints[n-1].y,0>w&&(w*=-1),b.minDiff>w&&0!==w&&(b.minDiff=w))}if(!(d<r)||m){if(!m&&(m=!0,0<n)){n-=2;continue}if(d>s&&!q)q=!0;else if(d>s&&q)continue;l.dataPoints[n].label&&(a.axisX.labels[d]=l.dataPoints[n].label);d<c.viewPortMin&&(c.viewPortMin=d);d>c.viewPortMax&&(c.viewPortMax=d);null!==e&&(a.yTotals[d]=(a.yTotals[d]?a.yTotals[d]:
0)+Math.abs(e),0<=e?g=!0:k=!0,p[d]=p[d]?p[d]+Math.abs(e):Math.abs(e))}}this.plotInfo.axisXValueType=l.xValueType=f?"dateTime":"number"}g&&!k?(b.max=99,b.min=1):g&&k?(b.max=99,b.min=-99):!g&&k&&(b.max=-1,b.min=-99);b.viewPortMin=b.min;b.viewPortMax=b.max;a.dataPointYSums=p}};u.prototype._processMultiYPlotUnit=function(a){if(a.dataSeriesIndexes&&!(1>a.dataSeriesIndexes.length))for(var b=a.axisY.dataInfo,c=a.axisX.dataInfo,d,e,f,g,k=!1,p=0;p<a.dataSeriesIndexes.length;p++){var h=this.data[a.dataSeriesIndexes[p]],
l=0,n=!1,m=!1;if("normal"===h.axisPlacement||"xySwapped"===h.axisPlacement)var q=this.sessionVariables.axisX.newViewportMinimum?this.sessionVariables.axisX.newViewportMinimum:this._options.axisX&&this._options.axisX.viewportMinimum?this._options.axisX.viewportMinimum:this._options.axisX&&this._options.axisX.minimum?this._options.axisX.minimum:-Infinity,r=this.sessionVariables.axisX.newViewportMaximum?this.sessionVariables.axisX.newViewportMaximum:this._options.axisX&&this._options.axisX.viewportMaximum?
this._options.axisX.viewportMaximum:this._options.axisX&&this._options.axisX.maximum?this._options.axisX.maximum:Infinity;if(h.dataPoints[l].x&&h.dataPoints[l].x.getTime||"dateTime"===h.xValueType)k=!0;for(l=0;l<h.dataPoints.length;l++){"undefined"===typeof h.dataPoints[l].x&&(h.dataPoints[l].x=l);h.dataPoints[l].x.getTime?(k=!0,d=h.dataPoints[l].x.getTime()):d=h.dataPoints[l].x;(e=h.dataPoints[l].y)&&e.length&&(f=Math.min.apply(null,e),g=Math.max.apply(null,e));d<c.min&&(c.min=d);d>c.max&&(c.max=
d);f<b.min&&(b.min=f);g>b.max&&(b.max=g);if(0<l){var s=d-h.dataPoints[l-1].x;0>s&&(s*=-1);c.minDiff>s&&0!==s&&(c.minDiff=s);null!==e[0]&&null!==h.dataPoints[l-1].y[0]&&(s=e[0]-h.dataPoints[l-1].y[0],0>s&&(s*=-1),b.minDiff>s&&0!==s&&(b.minDiff=s))}if(!(d<q)||n){if(!n&&(n=!0,0<l)){l-=2;continue}if(d>r&&!m)m=!0;else if(d>r&&m)continue;h.dataPoints[l].label&&(a.axisX.labels[d]=h.dataPoints[l].label);d<c.viewPortMin&&(c.viewPortMin=d);d>c.viewPortMax&&(c.viewPortMax=d);null!==e&&(f<b.viewPortMin&&(b.viewPortMin=
f),g>b.viewPortMax&&(b.viewPortMax=g))}}this.plotInfo.axisXValueType=h.xValueType=k?"dateTime":"number"}};u.prototype.getDataPointAtXY=function(a,b,c){c=c||!1;for(var d=[],e=this._dataInRenderedOrder.length-1;0<=e;e--){var f=null;(f=this._dataInRenderedOrder[e].getDataPointAtXY(a,b,c))&&d.push(f)}a=null;b=!1;for(c=0;c<d.length;c++)if("line"===d[c].dataSeries.type||"stepLine"===d[c].dataSeries.type||"area"===d[c].dataSeries.type||"stepArea"===d[c].dataSeries.type)if(e=N("markerSize",d[c].dataPoint,
d[c].dataSeries)||8,d[c].distance<=e/2){b=!0;break}for(c=0;c<d.length;c++)b&&"line"!==d[c].dataSeries.type&&"stepLine"!==d[c].dataSeries.type&&"area"!==d[c].dataSeries.type&&"stepArea"!==d[c].dataSeries.type||(a?d[c].distance<=a.distance&&(a=d[c]):a=d[c]);return a};u.prototype.getObjectAtXY=function(a,b,c){var d=null;if(c=this.getDataPointAtXY(a,b,c||!1))d=c.dataSeries.dataPointIds[c.dataPointIndex];else if(t)d=va(a,b,this._eventManager.ghostCtx);else for(c=0;c<this.legend.items.length;c++){var e=
this.legend.items[c];a>=e.x1&&(a<=e.x2&&b>=e.y1&&b<=e.y2)&&(d=e.id)}return d};u.prototype.getAutoFontSize=function(a,b,c){a/=400;return Math.round(Math.min(this.width,this.height)*a)};u.prototype.resetOverlayedCanvas=function(){this.overlaidCanvasCtx.clearRect(0,0,this.width,this.height)};u.prototype.clearCanvas=function(){this.ctx.clearRect(0,0,this.width,this.height);this.backgroundColor&&(this.ctx.fillStyle=this.backgroundColor,this.ctx.fillRect(0,0,this.width,this.height))};u.prototype.attachEvent=
function(a){this._events.push(a)};u.prototype._touchEventHandler=function(a){if(a.changedTouches&&this.interactivityEnabled){var b=[],c=a.changedTouches,d=c?c[0]:a,e=null;switch(a.type){case "touchstart":case "MSPointerDown":b=["mousemove","mousedown"];this._lastTouchData=ma(d);this._lastTouchData.time=new Date;break;case "touchmove":case "MSPointerMove":b=["mousemove"];break;case "touchend":case "MSPointerUp":b="touchstart"===this._lastTouchEventType||"MSPointerDown"===this._lastTouchEventType?["mouseup",
"click"]:["mouseup"];break;default:return}if(!(c&&1<c.length)){e=ma(d);e.time=new Date;try{var f=e.y-this._lastTouchData.y,g=e.time-this._lastTouchData.time;if(15<Math.abs(f)&&(this._lastTouchData.scroll||200>g)){this._lastTouchData.scroll=!0;var k=window.parent||window;k&&k.scrollBy&&k.scrollBy(0,-f)}}catch(p){}this._lastTouchEventType=a.type;if(this._lastTouchData.scroll&&this.zoomEnabled)this.isDrag&&this.resetOverlayedCanvas(),this.isDrag=!1;else for(c=0;c<b.length;c++)e=b[c],f=document.createEvent("MouseEvent"),
f.initMouseEvent(e,!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null),d.target.dispatchEvent(f),a.preventManipulation&&a.preventManipulation(),a.preventDefault&&a.preventDefault()}}};u.prototype._dispatchRangeEvent=function(a,b){var c={};c.chart=this._publicChartReference;c.type=a;c.trigger=b;var d=[];this.axisX&&d.push("axisX");this.axisY&&d.push("axisY");this.axisY2&&d.push("axisY2");for(var e=0;e<d.length;e++)c[d[e]]={viewportMinimum:this[d[e]].sessionVariables.newViewportMinimum,
viewportMaximum:this[d[e]].sessionVariables.newViewportMaximum};this.dispatchEvent(a,c,this._publicChartReference)};u.prototype._mouseEventHandler=function(a){if(this.interactivityEnabled)if(this._ignoreNextEvent)this._ignoreNextEvent=!1;else{a.preventManipulation&&a.preventManipulation();a.preventDefault&&a.preventDefault();"undefined"===typeof a.target&&a.srcElement&&(a.target=a.srcElement);var b=ma(a),c=a.type,d,e;a.which?e=3==a.which:a.button&&(e=2==a.button);if(!e){if(u.capturedEventParam)d=
u.capturedEventParam,"mouseup"===c&&(u.capturedEventParam=null,d.chart.overlaidCanvas.releaseCapture?d.chart.overlaidCanvas.releaseCapture():document.body.removeEventListener("mouseup",d.chart._mouseEventHandler,!1)),d.hasOwnProperty(c)&&d[c].call(d.context,b.x,b.y);else if(this._events){for(e=0;e<this._events.length;e++)if(this._events[e].hasOwnProperty(c)){d=this._events[e];var f=d.bounds;if(b.x>=f.x1&&b.x<=f.x2&&b.y>=f.y1&&b.y<=f.y2){d[c].call(d.context,b.x,b.y);"mousedown"===c&&!0===d.capture?
(u.capturedEventParam=d,this.overlaidCanvas.setCapture?this.overlaidCanvas.setCapture():document.body.addEventListener("mouseup",this._mouseEventHandler,!1)):"mouseup"===c&&(d.chart.overlaidCanvas.releaseCapture?d.chart.overlaidCanvas.releaseCapture():document.body.removeEventListener("mouseup",this._mouseEventHandler,!1));break}else d=null}a.target.style.cursor=d&&d.cursor?d.cursor:this._defaultCursor}this._toolTip&&this._toolTip.enabled&&(c=this.plotArea,(b.x<c.x1||b.x>c.x2||b.y<c.y1||b.y>c.y2)&&
this._toolTip.hide());this.isDrag&&this.zoomEnabled||!this._eventManager||this._eventManager.mouseEventHandler(a)}}};u.prototype._plotAreaMouseDown=function(a,b){this.isDrag=!0;this.dragStartPoint={x:a,y:b}};u.prototype._plotAreaMouseUp=function(a,b){if(("normal"===this.plotInfo.axisPlacement||"xySwapped"===this.plotInfo.axisPlacement)&&this.isDrag){var c=b-this.dragStartPoint.y,d=a-this.dragStartPoint.x,e=0<=this.zoomType.indexOf("x"),f=0<=this.zoomType.indexOf("y"),g=!1;this.resetOverlayedCanvas();
if("xySwapped"===this.plotInfo.axisPlacement)var k=f,f=e,e=k;if(this.panEnabled||this.zoomEnabled){if(this.panEnabled)for(e=f=0;e<this._axes.length;e++)c=this._axes[e],c.viewportMinimum<c.minimum?(f=c.minimum-c.viewportMinimum,c.sessionVariables.newViewportMinimum=c.viewportMinimum+f,c.sessionVariables.newViewportMaximum=c.viewportMaximum+f,g=!0):c.viewportMaximum>c.maximum&&(f=c.viewportMaximum-c.maximum,c.sessionVariables.newViewportMinimum=c.viewportMinimum-f,c.sessionVariables.newViewportMaximum=
c.viewportMaximum-f,g=!0);else if((!e||2<Math.abs(d))&&(!f||2<Math.abs(c))&&this.zoomEnabled){if(!this.dragStartPoint)return;c=e?this.dragStartPoint.x:this.plotArea.x1;d=f?this.dragStartPoint.y:this.plotArea.y1;e=e?a:this.plotArea.x2;f=f?b:this.plotArea.y2;2<Math.abs(c-e)&&2<Math.abs(d-f)&&this._zoomPanToSelectedRegion(c,d,e,f)&&(g=!0)}g&&(this._ignoreNextEvent=!0,this._dispatchRangeEvent("rangeChanging","zoom"),this.render(),this._dispatchRangeEvent("rangeChanged","zoom"),g&&(this.zoomEnabled&&"none"===
this._zoomButton.style.display)&&(ga(this._zoomButton,this._resetButton),P(this,this._zoomButton,"pan"),P(this,this._resetButton,"reset")))}}this.isDrag=!1};u.prototype._plotAreaMouseMove=function(a,b){if(this.isDrag&&"none"!==this.plotInfo.axisPlacement){var c=0,d=0,e=c=null,e=0<=this.zoomType.indexOf("x"),f=0<=this.zoomType.indexOf("y");"xySwapped"===this.plotInfo.axisPlacement&&(c=f,f=e,e=c);c=this.dragStartPoint.x-a;d=this.dragStartPoint.y-b;2<Math.abs(c)&&8>Math.abs(c)&&(this.panEnabled||this.zoomEnabled)?
this._toolTip.hide():this.panEnabled||this.zoomEnabled||this._toolTip.mouseMoveHandler(a,b);(!e||2<Math.abs(c)||!f||2<Math.abs(d))&&(this.panEnabled||this.zoomEnabled)&&(this.panEnabled?(e={x1:e?this.plotArea.x1+c:this.plotArea.x1,y1:f?this.plotArea.y1+d:this.plotArea.y1,x2:e?this.plotArea.x2+c:this.plotArea.x2,y2:f?this.plotArea.y2+d:this.plotArea.y2},this._zoomPanToSelectedRegion(e.x1,e.y1,e.x2,e.y2,!0)&&(this._dispatchRangeEvent("rangeChanging","pan"),this.render(),this._dispatchRangeEvent("rangeChanged",
"pan"),this.dragStartPoint.x=a,this.dragStartPoint.y=b)):this.zoomEnabled&&(this.resetOverlayedCanvas(),c=this.overlaidCanvasCtx.globalAlpha,this.overlaidCanvasCtx.globalAlpha=0.7,this.overlaidCanvasCtx.fillStyle="#A0ABB8",this.overlaidCanvasCtx.fillRect(e?this.dragStartPoint.x:this.plotArea.x1,f?this.dragStartPoint.y:this.plotArea.y1,e?a-this.dragStartPoint.x:this.plotArea.x2-this.plotArea.x1,f?b-this.dragStartPoint.y:this.plotArea.y2-this.plotArea.y1),this.overlaidCanvasCtx.globalAlpha=c))}else this._toolTip.mouseMoveHandler(a,
b)};u.prototype._zoomPanToSelectedRegion=function(a,b,c,d,e){e=e||!1;var f=0<=this.zoomType.indexOf("x"),g=0<=this.zoomType.indexOf("y"),k=!1,p=[],h=[];this.axisX&&f&&p.push(this.axisX);this.axisY&&g&&p.push(this.axisY);this.axisY2&&g&&p.push(this.axisY2);f=[];for(g=0;g<p.length;g++){var l=p[g],n=l.convertPixelToValue({x:a,y:b}),m=l.convertPixelToValue({x:c,y:d});if(n>m)var q=m,m=n,n=q;if(isFinite(l.dataInfo.minDiff))if(!(Math.abs(m-n)<3*Math.abs(l.dataInfo.minDiff)||n<l.minimum||m>l.maximum))h.push(l),
f.push({val1:n,val2:m}),k=!0;else if(!e){k=!1;break}}if(k)for(g=0;g<h.length;g++)l=h[g],a=f[g],l.setViewPortRange(a.val1,a.val2);return k};u.prototype.preparePlotArea=function(){var a=this.plotArea,b=this.axisY?this.axisY:this.axisY2;!t&&(0<a.x1||0<a.y1)&&a.ctx.translate(a.x1,a.y1);this.axisX&&b?(a.x1=this.axisX.lineCoordinates.x1<this.axisX.lineCoordinates.x2?this.axisX.lineCoordinates.x1:b.lineCoordinates.x1,a.y1=this.axisX.lineCoordinates.y1<b.lineCoordinates.y1?this.axisX.lineCoordinates.y1:b.lineCoordinates.y1,
a.x2=this.axisX.lineCoordinates.x2>b.lineCoordinates.x2?this.axisX.lineCoordinates.x2:b.lineCoordinates.x2,a.y2=this.axisX.lineCoordinates.y2>this.axisX.lineCoordinates.y1?this.axisX.lineCoordinates.y2:b.lineCoordinates.y2,a.width=a.x2-a.x1,a.height=a.y2-a.y1):(b=this.layoutManager.getFreeSpace(),a.x1=b.x1,a.x2=b.x2,a.y1=b.y1,a.y2=b.y2,a.width=b.width,a.height=b.height);t||(a.canvas.width=a.width,a.canvas.height=a.height,a.canvas.style.left=a.x1+"px",a.canvas.style.top=a.y1+"px",(0<a.x1||0<a.y1)&&
a.ctx.translate(-a.x1,-a.y1));a.layoutManager=new Y(a.x1,a.y1,a.x2,a.y2,2)};u.prototype.getPixelCoordinatesOnPlotArea=function(a,b){return{x:this.axisX.getPixelCoordinatesOnAxis(a).x,y:this.axisY.getPixelCoordinatesOnAxis(b).y}};u.prototype.renderIndexLabels=function(a){a=a||this.plotArea.ctx;for(var b=this.plotArea,c=0,d=0,e=0,f=0,g=0,k=d=f=e=0,p=0;p<this._indexLabels.length;p++){var h=this._indexLabels[p],g=h.chartType.toLowerCase(),l,n,m=N("indexLabelFontColor",h.dataPoint,h.dataSeries),k=N("indexLabelFontSize",
h.dataPoint,h.dataSeries);l=N("indexLabelFontFamily",h.dataPoint,h.dataSeries);n=N("indexLabelFontStyle",h.dataPoint,h.dataSeries);var f=N("indexLabelFontWeight",h.dataPoint,h.dataSeries),d=N("indexLabelBackgroundColor",h.dataPoint,h.dataSeries),e=N("indexLabelMaxWidth",h.dataPoint,h.dataSeries),q=N("indexLabelWrap",h.dataPoint,h.dataSeries),r={percent:null,total:null},s=null;if(0<=h.dataSeries.type.indexOf("stacked")||"pie"===h.dataSeries.type||"doughnut"===h.dataSeries.type)r=this.getPercentAndTotal(h.dataSeries,
h.dataPoint);if(h.dataSeries.indexLabelFormatter||h.dataPoint.indexLabelFormatter)s={chart:this._options,dataSeries:h.dataSeries,dataPoint:h.dataPoint,index:h.indexKeyword,total:r.total,percent:r.percent};var w=h.dataPoint.indexLabelFormatter?h.dataPoint.indexLabelFormatter(s):h.dataPoint.indexLabel?this.replaceKeywordsWithValue(h.dataPoint.indexLabel,h.dataPoint,h.dataSeries,null,h.indexKeyword):h.dataSeries.indexLabelFormatter?h.dataSeries.indexLabelFormatter(s):h.dataSeries.indexLabel?this.replaceKeywordsWithValue(h.dataSeries.indexLabel,
h.dataPoint,h.dataSeries,null,h.indexKeyword):null;if(null!==w&&""!==w){var c=N("indexLabelPlacement",h.dataPoint,h.dataSeries),r=N("indexLabelOrientation",h.dataPoint,h.dataSeries),s=h.direction,v=h.dataSeries.axisX,x=h.dataSeries.axisY,m=new H(a,{x:0,y:0,maxWidth:e?e:0.5*this.width,maxHeight:q?5*k:1.5*k,angle:"horizontal"===r?0:-90,text:w,padding:0,backgroundColor:d,horizontalAlign:"left",fontSize:k,fontFamily:l,fontWeight:f,fontColor:m,fontStyle:n,textBaseline:"top"});m.measureText();if(0<=g.indexOf("line")||
0<=g.indexOf("area")||0<=g.indexOf("bubble")||0<=g.indexOf("scatter")){if(h.dataPoint.x<v.viewportMinimum||h.dataPoint.x>v.viewportMaximum||h.dataPoint.y<x.viewportMinimum||h.dataPoint.y>x.viewportMaximum)continue}else if(h.dataPoint.x<v.viewportMinimum||h.dataPoint.x>v.viewportMaximum)continue;e=f=2;"horizontal"===r?(d=m.width,k=m.height):(k=m.width,d=m.height);if("normal"===this.plotInfo.axisPlacement){if(0<=g.indexOf("line")||0<=g.indexOf("area"))c="auto",f=4;else if(0<=g.indexOf("stacked"))"auto"===
c&&(c="inside");else if("bubble"===g||"scatter"===g)c="inside";l=h.point.x-d/2;"inside"!==c?(d=b.y1,e=b.y2,0<s?(n=h.point.y-k-f,n<d&&(n="auto"===c?Math.max(h.point.y,d)+f:d+f)):(n=h.point.y+f,n>e-k-f&&(n="auto"===c?Math.min(h.point.y,e)-k-f:e-k-f))):(d=Math.max(h.bounds.y1,b.y1),e=Math.min(h.bounds.y2,b.y2),c=0<=g.indexOf("range")?0<s?Math.max(h.bounds.y1,b.y1)+k/2+f:Math.min(h.bounds.y2,b.y2)-k/2-f:(Math.max(h.bounds.y1,b.y1)+Math.min(h.bounds.y2,b.y2))/2,0<s?(n=Math.max(h.point.y,c)-k/2,n<d&&("bubble"===
g||"scatter"===g)&&(n=Math.max(h.point.y-k-f,b.y1+f))):(n=Math.min(h.point.y,c)-k/2,n>e-k-f&&("bubble"===g||"scatter"===g)&&(n=Math.min(h.point.y+f,b.y2-k-f))),n=Math.min(n,e-k))}else 0<=g.indexOf("line")||0<=g.indexOf("area")||0<=g.indexOf("scatter")?(c="auto",e=4):0<=g.indexOf("stacked")?"auto"===c&&(c="inside"):"bubble"===g&&(c="inside"),n=h.point.y-k/2,"inside"!==c?(f=b.x1,g=b.x2,0>s?(l=h.point.x-d-e,l<f&&(l="auto"===c?Math.max(h.point.x,f)+e:f+e)):(l=h.point.x+e,l>g-d-e&&(l="auto"===c?Math.min(h.point.x,
g)-d-e:g-d-e))):(f=Math.max(h.bounds.x1,b.x1),Math.min(h.bounds.x2,b.x2),c=0<=g.indexOf("range")?0>s?Math.max(h.bounds.x1,b.x1)+d/2+e:Math.min(h.bounds.x2,b.x2)-d/2-e:(Math.max(h.bounds.x1,b.x1)+Math.min(h.bounds.x2,b.x2))/2,l=0>s?Math.max(h.point.x,c)-d/2:Math.min(h.point.x,c)-d/2,l=Math.max(l,f));"vertical"===r&&(n+=k);m.x=l;m.y=n;m.render(!0)}}return{source:a,dest:this.plotArea.ctx,animationCallback:A.fadeInAnimation,easingFunction:A.easing.easeInQuad,animationBase:0,startTimePercent:0.7}};u.prototype.renderLine=
function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=this._eventManager.ghostCtx;b.save();var d=this.plotArea;b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();for(var d=[],e=0;e<a.dataSeriesIndexes.length;e++){var f=a.dataSeriesIndexes[e],g=this.data[f];b.lineWidth=g.lineThickness;var k=g.dataPoints;b.setLineDash&&b.setLineDash(M(g.lineDashType,g.lineThickness));var p=g.id;this._eventManager.objectMap[p]={objectType:"dataSeries",dataSeriesIndex:f};
p=B(p);c.strokeStyle=p;c.lineWidth=0<g.lineThickness?Math.max(g.lineThickness,4):0;p=g._colorSet[0];b.strokeStyle=p;var h=!0,l=0,n,m;b.beginPath();if(0<k.length){for(var q=!1,l=0;l<k.length;l++)if(n=k[l].x.getTime?k[l].x.getTime():k[l].x,!(n<a.axisX.dataInfo.viewPortMin||n>a.axisX.dataInfo.viewPortMax))if("number"!==typeof k[l].y)0<l&&(b.stroke(),t&&c.stroke()),q=!0;else{n=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(n-a.axisX.conversionParameters.minimum)+0.5<<
0;m=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(k[l].y-a.axisY.conversionParameters.minimum)+0.5<<0;var r=g.dataPointIds[l];this._eventManager.objectMap[r]={id:r,objectType:"dataPoint",dataSeriesIndex:f,dataPointIndex:l,x1:n,y1:m};h||q?(b.beginPath(),b.moveTo(n,m),t&&(c.beginPath(),c.moveTo(n,m)),q=h=!1):(b.lineTo(n,m),t&&c.lineTo(n,m),0==l%500&&(b.stroke(),b.beginPath(),b.moveTo(n,m),t&&(c.stroke(),c.beginPath(),c.moveTo(n,m))));if(0<k[l].markerSize||0<g.markerSize){var s=
g.getMarkerProperties(l,n,m,b);d.push(s);r=B(r);t&&d.push({x:n,y:m,ctx:c,type:s.type,size:s.size,color:r,borderColor:r,borderThickness:s.borderThickness})}(k[l].indexLabel||g.indexLabel||k[l].indexLabelFormatter||g.indexLabelFormatter)&&this._indexLabels.push({chartType:"line",dataPoint:k[l],dataSeries:g,point:{x:n,y:m},direction:0<=k[l].y?1:-1,color:p})}b.stroke();t&&c.stroke()}}K.drawMarkers(d);b.restore();b.beginPath();t&&c.beginPath();return{source:b,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,
easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderStepLine=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=this._eventManager.ghostCtx;b.save();var d=this.plotArea;b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();for(var d=[],e=0;e<a.dataSeriesIndexes.length;e++){var f=a.dataSeriesIndexes[e],g=this.data[f];b.lineWidth=g.lineThickness;var k=g.dataPoints;b.setLineDash&&b.setLineDash(M(g.lineDashType,g.lineThickness));var p=
g.id;this._eventManager.objectMap[p]={objectType:"dataSeries",dataSeriesIndex:f};p=B(p);c.strokeStyle=p;c.lineWidth=0<g.lineThickness?Math.max(g.lineThickness,4):0;p=g._colorSet[0];b.strokeStyle=p;var h=!0,l=0,n,m;b.beginPath();if(0<k.length){for(var q=!1,l=0;l<k.length;l++)if(n=k[l].getTime?k[l].x.getTime():k[l].x,!(n<a.axisX.dataInfo.viewPortMin||n>a.axisX.dataInfo.viewPortMax))if("number"!==typeof k[l].y)0<l&&(b.stroke(),t&&c.stroke()),q=!0;else{var r=m;n=a.axisX.conversionParameters.reference+
a.axisX.conversionParameters.pixelPerUnit*(n-a.axisX.conversionParameters.minimum)+0.5<<0;m=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(k[l].y-a.axisY.conversionParameters.minimum)+0.5<<0;var s=g.dataPointIds[l];this._eventManager.objectMap[s]={id:s,objectType:"dataPoint",dataSeriesIndex:f,dataPointIndex:l,x1:n,y1:m};h||q?(b.beginPath(),b.moveTo(n,m),t&&(c.beginPath(),c.moveTo(n,m)),q=h=!1):(b.lineTo(n,r),t&&c.lineTo(n,r),b.lineTo(n,m),t&&c.lineTo(n,m),0==l%500&&
(b.stroke(),b.beginPath(),b.moveTo(n,m),t&&(c.stroke(),c.beginPath(),c.moveTo(n,m))));if(0<k[l].markerSize||0<g.markerSize)r=g.getMarkerProperties(l,n,m,b),d.push(r),s=B(s),t&&d.push({x:n,y:m,ctx:c,type:r.type,size:r.size,color:s,borderColor:s,borderThickness:r.borderThickness});(k[l].indexLabel||g.indexLabel||k[l].indexLabelFormatter||g.indexLabelFormatter)&&this._indexLabels.push({chartType:"stepLine",dataPoint:k[l],dataSeries:g,point:{x:n,y:m},direction:0<=k[l].y?1:-1,color:p})}b.stroke();t&&c.stroke()}}K.drawMarkers(d);
b.restore();b.beginPath();t&&c.beginPath();return{source:b,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderSpline=function(a){function b(a){a=ha(a,2);if(0<a.length){c.beginPath();t&&d.beginPath();c.moveTo(a[0].x,a[0].y);t&&d.moveTo(a[0].x,a[0].y);for(var b=0;b<a.length-3;b+=3)c.bezierCurveTo(a[b+1].x,a[b+1].y,a[b+2].x,a[b+2].y,a[b+3].x,a[b+3].y),t&&d.bezierCurveTo(a[b+1].x,a[b+1].y,a[b+2].x,a[b+2].y,a[b+3].x,a[b+3].y),0<
b&&0===b%3E3&&(c.stroke(),c.beginPath(),c.moveTo(a[b+3].x,a[b+3].y),t&&(d.stroke(),d.beginPath(),d.moveTo(a[b+3].x,a[b+3].y)));c.stroke();t&&d.stroke()}}var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx;c.save();var e=this.plotArea;c.beginPath();c.rect(e.x1,e.y1,e.width,e.height);c.clip();for(var e=[],f=0;f<a.dataSeriesIndexes.length;f++){var g=a.dataSeriesIndexes[f],k=this.data[g];c.lineWidth=k.lineThickness;var p=k.dataPoints;c.setLineDash&&
c.setLineDash(M(k.lineDashType,k.lineThickness));var h=k.id;this._eventManager.objectMap[h]={objectType:"dataSeries",dataSeriesIndex:g};h=B(h);d.strokeStyle=h;d.lineWidth=0<k.lineThickness?Math.max(k.lineThickness,4):0;h=k._colorSet[0];c.strokeStyle=h;var l=0,n,m,q=[];c.beginPath();if(0<p.length)for(l=0;l<p.length;l++)if(n=p[l].getTime?p[l].x.getTime():p[l].x,!(n<a.axisX.dataInfo.viewPortMin||n>a.axisX.dataInfo.viewPortMax))if("number"!==typeof p[l].y)0<l&&(b(q),q=[]);else{n=a.axisX.conversionParameters.reference+
a.axisX.conversionParameters.pixelPerUnit*(n-a.axisX.conversionParameters.minimum)+0.5<<0;m=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(p[l].y-a.axisY.conversionParameters.minimum)+0.5<<0;var r=k.dataPointIds[l];this._eventManager.objectMap[r]={id:r,objectType:"dataPoint",dataSeriesIndex:g,dataPointIndex:l,x1:n,y1:m};q[q.length]={x:n,y:m};if(0<p[l].markerSize||0<k.markerSize){var s=k.getMarkerProperties(l,n,m,c);e.push(s);r=B(r);t&&e.push({x:n,y:m,ctx:d,type:s.type,
size:s.size,color:r,borderColor:r,borderThickness:s.borderThickness})}(p[l].indexLabel||k.indexLabel||p[l].indexLabelFormatter||k.indexLabelFormatter)&&this._indexLabels.push({chartType:"spline",dataPoint:p[l],dataSeries:k,point:{x:n,y:m},direction:0<=p[l].y?1:-1,color:h})}b(q)}K.drawMarkers(e);c.restore();c.beginPath();t&&d.beginPath();return{source:c,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};var I=function(a,b,c,d,e,f,g,k,p,h,l,n,
m){"undefined"===typeof m&&(m=1);g=g||0;k=k||"black";var q=15<d-b&&15<e-c?8:0.35*Math.min(d-b,e-c);a.beginPath();a.moveTo(b,c);a.save();a.fillStyle=f;a.globalAlpha=m;a.fillRect(b,c,d-b,e-c);a.globalAlpha=1;0<g&&(m=0===g%2?0:0.5,a.beginPath(),a.lineWidth=g,a.strokeStyle=k,a.moveTo(b,c),a.rect(b-m,c-m,d-b+2*m,e-c+2*m),a.stroke());a.restore();!0===p&&(a.save(),a.beginPath(),a.moveTo(b,c),a.lineTo(b+q,c+q),a.lineTo(d-q,c+q),a.lineTo(d,c),a.closePath(),g=a.createLinearGradient((d+b)/2,c+q,(d+b)/2,c),g.addColorStop(0,
f),g.addColorStop(1,"rgba(255, 255, 255, .4)"),a.fillStyle=g,a.fill(),a.restore());!0===h&&(a.save(),a.beginPath(),a.moveTo(b,e),a.lineTo(b+q,e-q),a.lineTo(d-q,e-q),a.lineTo(d,e),a.closePath(),g=a.createLinearGradient((d+b)/2,e-q,(d+b)/2,e),g.addColorStop(0,f),g.addColorStop(1,"rgba(255, 255, 255, .4)"),a.fillStyle=g,a.fill(),a.restore());!0===l&&(a.save(),a.beginPath(),a.moveTo(b,c),a.lineTo(b+q,c+q),a.lineTo(b+q,e-q),a.lineTo(b,e),a.closePath(),g=a.createLinearGradient(b+q,(e+c)/2,b,(e+c)/2),g.addColorStop(0,
f),g.addColorStop(1,"rgba(255, 255, 255, 0.1)"),a.fillStyle=g,a.fill(),a.restore());!0===n&&(a.save(),a.beginPath(),a.moveTo(d,c),a.lineTo(d-q,c+q),a.lineTo(d-q,e-q),a.lineTo(d,e),g=a.createLinearGradient(d-q,(e+c)/2,d,(e+c)/2),g.addColorStop(0,f),g.addColorStop(1,"rgba(255, 255, 255, 0.1)"),a.fillStyle=g,g.addColorStop(0,f),g.addColorStop(1,"rgba(255, 255, 255, 0.1)"),a.fillStyle=g,a.fill(),a.closePath(),a.restore())};u.prototype.renderColumn=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;
if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=0,f,g,k,p=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,e=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,h=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:Math.min(0.15*this.width,0.9*(this.plotArea.width/a.plotType.totalDataSeries))<<0,l=a.axisX.dataInfo.minDiff;isFinite(l)||
(l=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));l=this.dataPointWidth?this.dataPointWidth:0.9*(d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(l)/a.plotType.totalDataSeries)<<0;this.dataPointMaxWidth&&e>h&&(e=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,h));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&h<e)&&(h=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,e));l<e&&(l=e);l>h&&(l=h);b.save();t&&this._eventManager.ghostCtx.save();
b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(d=0;d<a.dataSeriesIndexes.length;d++){var h=a.dataSeriesIndexes[d],n=this.data[h],m=n.dataPoints;if(0<m.length)for(var q=5<l&&n.bevelEnabled?!0:!1,e=0;e<m.length;e++)if(m[e].getTime?k=m[e].x.getTime():k=m[e].x,!(k<a.axisX.dataInfo.viewPortMin||k>a.axisX.dataInfo.viewPortMax)&&"number"===typeof m[e].y){f=a.axisX.conversionParameters.reference+
a.axisX.conversionParameters.pixelPerUnit*(k-a.axisX.conversionParameters.minimum)+0.5<<0;g=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(m[e].y-a.axisY.conversionParameters.minimum)+0.5<<0;f=f-a.plotType.totalDataSeries*l/2+(a.previousDataSeriesCount+d)*l<<0;var r=f+l<<0,s;0<=m[e].y?s=p:(s=g,g=p);g>s&&(s=g=s);c=m[e].color?m[e].color:n._colorSet[e%n._colorSet.length];I(b,f,g,r,s,c,0,null,q&&0<=m[e].y,0>m[e].y&&q,!1,!1,n.fillOpacity);c=n.dataPointIds[e];this._eventManager.objectMap[c]=
{id:c,objectType:"dataPoint",dataSeriesIndex:h,dataPointIndex:e,x1:f,y1:g,x2:r,y2:s};c=B(c);t&&I(this._eventManager.ghostCtx,f,g,r,s,c,0,null,!1,!1,!1,!1);(m[e].indexLabel||n.indexLabel||m[e].indexLabelFormatter||n.indexLabelFormatter)&&this._indexLabels.push({chartType:"column",dataPoint:m[e],dataSeries:n,point:{x:f+(r-f)/2,y:0<=m[e].y?g:s},direction:0<=m[e].y?1:-1,bounds:{x1:f,y1:Math.min(g,s),x2:r,y2:Math.max(g,s)},color:c})}}b.restore();t&&this._eventManager.ghostCtx.restore();a=Math.min(p,a.axisY.boundingRect.y2);
return{source:b,dest:this.plotArea.ctx,animationCallback:A.yScaleAnimation,easingFunction:A.easing.easeOutQuart,animationBase:a}}};u.prototype.renderStackedColumn=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=[],f=[],g=0,k,p=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,g=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:
1,h=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.15*this.width<<0,l=a.axisX.dataInfo.minDiff;isFinite(l)||(l=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));l=this.dataPointWidth?this.dataPointWidth:0.9*(d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(l)/a.plotType.plotUnits.length)<<0;this.dataPointMaxWidth&&g>h&&(g=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,h));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&
h<g)&&(h=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,g));l<g&&(l=g);l>h&&(l=h);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(h=0;h<a.dataSeriesIndexes.length;h++){var n=a.dataSeriesIndexes[h],m=this.data[n],q=m.dataPoints;if(0<q.length){var r=5<l&&m.bevelEnabled?!0:!1;b.strokeStyle="#4572A7 ";for(g=0;g<q.length;g++)if(c=
q[g].x.getTime?q[g].x.getTime():q[g].x,!(c<a.axisX.dataInfo.viewPortMin||c>a.axisX.dataInfo.viewPortMax)&&"number"===typeof q[g].y){d=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(c-a.axisX.conversionParameters.minimum)+0.5<<0;k=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(q[g].y-a.axisY.conversionParameters.minimum);var s=d-a.plotType.plotUnits.length*l/2+a.index*l<<0,w=s+l<<0,v;if(0<=q[g].y){var x=e[c]?e[c]:0;k-=x;v=p-x;e[c]=
x+(v-k)}else x=f[c]?f[c]:0,v=k+x,k=p+x,f[c]=x+(v-k);c=q[g].color?q[g].color:m._colorSet[g%m._colorSet.length];I(b,s,k,w,v,c,0,null,r&&0<=q[g].y,0>q[g].y&&r,!1,!1,m.fillOpacity);c=m.dataPointIds[g];this._eventManager.objectMap[c]={id:c,objectType:"dataPoint",dataSeriesIndex:n,dataPointIndex:g,x1:s,y1:k,x2:w,y2:v};c=B(c);t&&I(this._eventManager.ghostCtx,s,k,w,v,c,0,null,!1,!1,!1,!1);(q[g].indexLabel||m.indexLabel||q[g].indexLabelFormatter||m.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedColumn",
dataPoint:q[g],dataSeries:m,point:{x:d,y:0<=q[g].y?k:v},direction:0<=q[g].y?1:-1,bounds:{x1:s,y1:Math.min(k,v),x2:w,y2:Math.max(k,v)},color:c})}}}b.restore();t&&this._eventManager.ghostCtx.restore();a=Math.min(p,a.axisY.boundingRect.y2);return{source:b,dest:this.plotArea.ctx,animationCallback:A.yScaleAnimation,easingFunction:A.easing.easeOutQuart,animationBase:a}}};u.prototype.renderStackedColumn100=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=
null,d=this.plotArea,e=[],f=[],g=0,k,p=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,g=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,h=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.15*this.width<<0,l=a.axisX.dataInfo.minDiff;isFinite(l)||(l=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));l=this.dataPointWidth?this.dataPointWidth:
0.9*(d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(l)/a.plotType.plotUnits.length)<<0;this.dataPointMaxWidth&&g>h&&(g=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,h));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&h<g)&&(h=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,g));l<g&&(l=g);l>h&&(l=h);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,
d.width,d.height),this._eventManager.ghostCtx.clip());for(h=0;h<a.dataSeriesIndexes.length;h++){var n=a.dataSeriesIndexes[h],m=this.data[n],q=m.dataPoints;if(0<q.length)for(var r=5<l&&m.bevelEnabled?!0:!1,g=0;g<q.length;g++)if(c=q[g].x.getTime?q[g].x.getTime():q[g].x,!(c<a.axisX.dataInfo.viewPortMin||c>a.axisX.dataInfo.viewPortMax)&&"number"===typeof q[g].y){d=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(c-a.axisX.conversionParameters.minimum)+0.5<<0;k=a.axisY.conversionParameters.reference+
a.axisY.conversionParameters.pixelPerUnit*((0!==a.dataPointYSums[c]?100*(q[g].y/a.dataPointYSums[c]):0)-a.axisY.conversionParameters.minimum);var s=d-a.plotType.plotUnits.length*l/2+a.index*l<<0,w=s+l<<0,v;if(0<=q[g].y){var x=e[c]?e[c]:0;k-=x;v=p-x;e[c]=x+(v-k)}else x=f[c]?f[c]:0,v=k+x,k=p+x,f[c]=x+(v-k);c=q[g].color?q[g].color:m._colorSet[g%m._colorSet.length];I(b,s,k,w,v,c,0,null,r&&0<=q[g].y,0>q[g].y&&r,!1,!1,m.fillOpacity);c=m.dataPointIds[g];this._eventManager.objectMap[c]={id:c,objectType:"dataPoint",
dataSeriesIndex:n,dataPointIndex:g,x1:s,y1:k,x2:w,y2:v};c=B(c);t&&I(this._eventManager.ghostCtx,s,k,w,v,c,0,null,!1,!1,!1,!1);(q[g].indexLabel||m.indexLabel||q[g].indexLabelFormatter||m.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedColumn100",dataPoint:q[g],dataSeries:m,point:{x:d,y:0<=q[g].y?k:v},direction:0<=q[g].y?1:-1,bounds:{x1:s,y1:Math.min(k,v),x2:w,y2:Math.max(k,v)},color:c})}}b.restore();t&&this._eventManager.ghostCtx.restore();a=Math.min(p,a.axisY.boundingRect.y2);return{source:b,
dest:this.plotArea.ctx,animationCallback:A.yScaleAnimation,easingFunction:A.easing.easeOutQuart,animationBase:a}}};u.prototype.renderBar=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=0,f,g,k,p=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,e=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,h=this.dataPointMaxWidth?
this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:Math.min(0.15*this.height,0.9*(this.plotArea.height/a.plotType.totalDataSeries))<<0,l=a.axisX.dataInfo.minDiff;isFinite(l)||(l=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));l=this.dataPointWidth?this.dataPointWidth:0.9*(d.height/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(l)/a.plotType.totalDataSeries)<<0;this.dataPointMaxWidth&&e>h&&(e=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,h));
!this.dataPointMaxWidth&&(this.dataPointMinWidth&&h<e)&&(h=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,e));l<e&&(l=e);l>h&&(l=h);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(d=0;d<a.dataSeriesIndexes.length;d++){var h=a.dataSeriesIndexes[d],n=this.data[h],m=n.dataPoints;if(0<m.length){var q=5<l&&n.bevelEnabled?!0:!1;b.strokeStyle=
"#4572A7 ";for(e=0;e<m.length;e++)if(m[e].getTime?k=m[e].x.getTime():k=m[e].x,!(k<a.axisX.dataInfo.viewPortMin||k>a.axisX.dataInfo.viewPortMax)&&"number"===typeof m[e].y){g=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(k-a.axisX.conversionParameters.minimum)+0.5<<0;f=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(m[e].y-a.axisY.conversionParameters.minimum)+0.5<<0;g=g-a.plotType.totalDataSeries*l/2+(a.previousDataSeriesCount+d)*
l<<0;var r=g+l<<0,s;0<=m[e].y?s=p:(s=f,f=p);c=m[e].color?m[e].color:n._colorSet[e%n._colorSet.length];I(b,s,g,f,r,c,0,null,q,!1,!1,!1,n.fillOpacity);c=n.dataPointIds[e];this._eventManager.objectMap[c]={id:c,objectType:"dataPoint",dataSeriesIndex:h,dataPointIndex:e,x1:s,y1:g,x2:f,y2:r};c=B(c);t&&I(this._eventManager.ghostCtx,s,g,f,r,c,0,null,!1,!1,!1,!1);(m[e].indexLabel||n.indexLabel||m[e].indexLabelFormatter||n.indexLabelFormatter)&&this._indexLabels.push({chartType:"bar",dataPoint:m[e],dataSeries:n,
point:{x:0<=m[e].y?f:s,y:g+(r-g)/2},direction:0<=m[e].y?1:-1,bounds:{x1:Math.min(s,f),y1:g,x2:Math.max(s,f),y2:r},color:c})}}}b.restore();t&&this._eventManager.ghostCtx.restore();a=Math.max(p,a.axisX.boundingRect.x2);return{source:b,dest:this.plotArea.ctx,animationCallback:A.xScaleAnimation,easingFunction:A.easing.easeOutQuart,animationBase:a}}};u.prototype.renderStackedBar=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=[],
f=[],g=0,k,p=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,g=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,h=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.15*this.height<<0,l=a.axisX.dataInfo.minDiff;isFinite(l)||(l=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));l=this.dataPointWidth?this.dataPointWidth:0.9*(d.height/Math.abs(a.axisX.viewportMaximum-
a.axisX.viewportMinimum)*Math.abs(l)/a.plotType.plotUnits.length)<<0;this.dataPointMaxWidth&&g>h&&(g=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,h));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&h<g)&&(h=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,g));l<g&&(l=g);l>h&&(l=h);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());
for(h=0;h<a.dataSeriesIndexes.length;h++){var n=a.dataSeriesIndexes[h],m=this.data[n],q=m.dataPoints;if(0<q.length){var r=5<l&&m.bevelEnabled?!0:!1;b.strokeStyle="#4572A7 ";for(g=0;g<q.length;g++)if(c=q[g].x.getTime?q[g].x.getTime():q[g].x,!(c<a.axisX.dataInfo.viewPortMin||c>a.axisX.dataInfo.viewPortMax)&&"number"===typeof q[g].y){d=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(c-a.axisX.conversionParameters.minimum)+0.5<<0;k=a.axisY.conversionParameters.reference+
a.axisY.conversionParameters.pixelPerUnit*(q[g].y-a.axisY.conversionParameters.minimum);var s=d-a.plotType.plotUnits.length*l/2+a.index*l<<0,w=s+l<<0,v;if(0<=q[g].y){var x=e[c]?e[c]:0;v=p+x;k+=x;e[c]=x+(k-v)}else x=f[c]?f[c]:0,v=k-x,k=p-x,f[c]=x+(k-v);c=q[g].color?q[g].color:m._colorSet[g%m._colorSet.length];I(b,v,s,k,w,c,0,null,r,!1,!1,!1,m.fillOpacity);c=m.dataPointIds[g];this._eventManager.objectMap[c]={id:c,objectType:"dataPoint",dataSeriesIndex:n,dataPointIndex:g,x1:v,y1:s,x2:k,y2:w};c=B(c);
t&&I(this._eventManager.ghostCtx,v,s,k,w,c,0,null,!1,!1,!1,!1);(q[g].indexLabel||m.indexLabel||q[g].indexLabelFormatter||m.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedBar",dataPoint:q[g],dataSeries:m,point:{x:0<=q[g].y?k:v,y:d},direction:0<=q[g].y?1:-1,bounds:{x1:Math.min(v,k),y1:s,x2:Math.max(v,k),y2:w},color:c})}}}b.restore();t&&this._eventManager.ghostCtx.restore();a=Math.max(p,a.axisX.boundingRect.x2);return{source:b,dest:this.plotArea.ctx,animationCallback:A.xScaleAnimation,
easingFunction:A.easing.easeOutQuart,animationBase:a}}};u.prototype.renderStackedBar100=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=[],f=[],g=0,k,p=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,g=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,h=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?
this.dataPointWidth:0.15*this.height<<0,l=a.axisX.dataInfo.minDiff;isFinite(l)||(l=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));l=this.dataPointWidth?this.dataPointWidth:0.9*(d.height/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(l)/a.plotType.plotUnits.length)<<0;this.dataPointMaxWidth&&g>h&&(g=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,h));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&h<g)&&(h=Math.max(this.dataPointWidth?this.dataPointWidth:
-Infinity,g));l<g&&(l=g);l>h&&(l=h);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(h=0;h<a.dataSeriesIndexes.length;h++){var n=a.dataSeriesIndexes[h],m=this.data[n],q=m.dataPoints;if(0<q.length){var r=5<l&&m.bevelEnabled?!0:!1;b.strokeStyle="#4572A7 ";for(g=0;g<q.length;g++)if(c=q[g].x.getTime?q[g].x.getTime():q[g].x,!(c<a.axisX.dataInfo.viewPortMin||
c>a.axisX.dataInfo.viewPortMax)&&"number"===typeof q[g].y){d=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(c-a.axisX.conversionParameters.minimum)+0.5<<0;k=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*((0!==a.dataPointYSums[c]?100*(q[g].y/a.dataPointYSums[c]):0)-a.axisY.conversionParameters.minimum);var s=d-a.plotType.plotUnits.length*l/2+a.index*l<<0,w=s+l<<0,v;if(0<=q[g].y){var x=e[c]?e[c]:0;v=p+x;k+=x;e[c]=x+(k-v)}else x=f[c]?
f[c]:0,v=k-x,k=p-x,f[c]=x+(k-v);c=q[g].color?q[g].color:m._colorSet[g%m._colorSet.length];I(b,v,s,k,w,c,0,null,r,!1,!1,!1,m.fillOpacity);c=m.dataPointIds[g];this._eventManager.objectMap[c]={id:c,objectType:"dataPoint",dataSeriesIndex:n,dataPointIndex:g,x1:v,y1:s,x2:k,y2:w};c=B(c);t&&I(this._eventManager.ghostCtx,v,s,k,w,c,0,null,!1,!1,!1,!1);(q[g].indexLabel||m.indexLabel||q[g].indexLabelFormatter||m.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedBar100",dataPoint:q[g],dataSeries:m,
point:{x:0<=q[g].y?k:v,y:d},direction:0<=q[g].y?1:-1,bounds:{x1:Math.min(v,k),y1:s,x2:Math.max(v,k),y2:w},color:c})}}}b.restore();t&&this._eventManager.ghostCtx.restore();a=Math.max(p,a.axisX.boundingRect.x2);return{source:b,dest:this.plotArea.ctx,animationCallback:A.xScaleAnimation,easingFunction:A.easing.easeOutQuart,animationBase:a}}};u.prototype.renderArea=function(a){function b(){x&&(0<h.lineThickness&&c.stroke(),0>=a.axisY.viewportMinimum&&0<=a.axisY.viewportMaximum?v=w:0>a.axisY.viewportMaximum?
v=f.y1:0<a.axisY.viewportMinimum&&(v=e.y2),c.lineTo(q,v),c.lineTo(x.x,v),c.closePath(),c.globalAlpha=h.fillOpacity,c.fill(),c.globalAlpha=1,t&&(d.lineTo(q,v),d.lineTo(x.x,v),d.closePath(),d.fill()),c.beginPath(),c.moveTo(q,r),d.beginPath(),d.moveTo(q,r),x={x:q,y:r})}var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,e=a.axisX.lineCoordinates,f=a.axisY.lineCoordinates,g=[],k=this.plotArea;c.save();t&&d.save();c.beginPath();c.rect(k.x1,
k.y1,k.width,k.height);c.clip();t&&(d.beginPath(),d.rect(k.x1,k.y1,k.width,k.height),d.clip());for(k=0;k<a.dataSeriesIndexes.length;k++){var p=a.dataSeriesIndexes[k],h=this.data[p],l=h.dataPoints,g=h.id;this._eventManager.objectMap[g]={objectType:"dataSeries",dataSeriesIndex:p};g=B(g);d.fillStyle=g;var g=[],n=!0,m=0,q,r,s,w=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)+0.5<<0,v,x=null;if(0<l.length){var E=h._colorSet[m%h._colorSet.length];
c.fillStyle=E;c.strokeStyle=E;c.lineWidth=h.lineThickness;c.setLineDash&&c.setLineDash(M(h.lineDashType,h.lineThickness));for(var y=!0;m<l.length;m++)if(s=l[m].x.getTime?l[m].x.getTime():l[m].x,!(s<a.axisX.dataInfo.viewPortMin||s>a.axisX.dataInfo.viewPortMax))if("number"!==typeof l[m].y)b(),y=!0;else{q=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(s-a.axisX.conversionParameters.minimum)+0.5<<0;r=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*
(l[m].y-a.axisY.conversionParameters.minimum)+0.5<<0;n||y?(c.beginPath(),c.moveTo(q,r),x={x:q,y:r},t&&(d.beginPath(),d.moveTo(q,r)),y=n=!1):(c.lineTo(q,r),t&&d.lineTo(q,r),0==m%250&&b());var z=h.dataPointIds[m];this._eventManager.objectMap[z]={id:z,objectType:"dataPoint",dataSeriesIndex:p,dataPointIndex:m,x1:q,y1:r};0!==l[m].markerSize&&(0<l[m].markerSize||0<h.markerSize)&&(s=h.getMarkerProperties(m,q,r,c),g.push(s),z=B(z),t&&g.push({x:q,y:r,ctx:d,type:s.type,size:s.size,color:z,borderColor:z,borderThickness:s.borderThickness}));
(l[m].indexLabel||h.indexLabel||l[m].indexLabelFormatter||h.indexLabelFormatter)&&this._indexLabels.push({chartType:"area",dataPoint:l[m],dataSeries:h,point:{x:q,y:r},direction:0<=l[m].y?1:-1,color:E})}b();K.drawMarkers(g)}}c.restore();t&&this._eventManager.ghostCtx.restore();return{source:c,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderSplineArea=function(a){function b(){var b=ha(v,2);if(0<b.length){c.beginPath();c.moveTo(b[0].x,
b[0].y);t&&(d.beginPath(),d.moveTo(b[0].x,b[0].y));for(var g=0;g<b.length-3;g+=3)c.bezierCurveTo(b[g+1].x,b[g+1].y,b[g+2].x,b[g+2].y,b[g+3].x,b[g+3].y),t&&d.bezierCurveTo(b[g+1].x,b[g+1].y,b[g+2].x,b[g+2].y,b[g+3].x,b[g+3].y);0<h.lineThickness&&c.stroke();0>=a.axisY.viewportMinimum&&0<=a.axisY.viewportMaximum?s=r:0>a.axisY.viewportMaximum?s=f.y1:0<a.axisY.viewportMinimum&&(s=e.y2);w={x:b[0].x,y:b[0].y};c.lineTo(b[b.length-1].x,s);c.lineTo(w.x,s);c.closePath();c.globalAlpha=h.fillOpacity;c.fill();
c.globalAlpha=1;t&&(d.lineTo(b[b.length-1].x,s),d.lineTo(w.x,s),d.closePath(),d.fill())}}var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,e=a.axisX.lineCoordinates,f=a.axisY.lineCoordinates,g=[],k=this.plotArea;c.save();t&&d.save();c.beginPath();c.rect(k.x1,k.y1,k.width,k.height);c.clip();t&&(d.beginPath(),d.rect(k.x1,k.y1,k.width,k.height),d.clip());for(k=0;k<a.dataSeriesIndexes.length;k++){var p=a.dataSeriesIndexes[k],h=this.data[p],
l=h.dataPoints,g=h.id;this._eventManager.objectMap[g]={objectType:"dataSeries",dataSeriesIndex:p};g=B(g);d.fillStyle=g;var g=[],n=0,m,q,r=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)+0.5<<0,s,w=null,v=[];if(0<l.length){color=h._colorSet[n%h._colorSet.length];c.fillStyle=color;c.strokeStyle=color;c.lineWidth=h.lineThickness;for(c.setLineDash&&c.setLineDash(M(h.lineDashType,h.lineThickness));n<l.length;n++)if(m=l[n].x.getTime?
l[n].x.getTime():l[n].x,!(m<a.axisX.dataInfo.viewPortMin||m>a.axisX.dataInfo.viewPortMax))if("number"!==typeof l[n].y)0<n&&(b(),v=[]);else{m=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(m-a.axisX.conversionParameters.minimum)+0.5<<0;q=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(l[n].y-a.axisY.conversionParameters.minimum)+0.5<<0;var x=h.dataPointIds[n];this._eventManager.objectMap[x]={id:x,objectType:"dataPoint",dataSeriesIndex:p,
dataPointIndex:n,x1:m,y1:q};v[v.length]={x:m,y:q};if(0!==l[n].markerSize&&(0<l[n].markerSize||0<h.markerSize)){var E=h.getMarkerProperties(n,m,q,c);g.push(E);x=B(x);t&&g.push({x:m,y:q,ctx:d,type:E.type,size:E.size,color:x,borderColor:x,borderThickness:E.borderThickness})}(l[n].indexLabel||h.indexLabel||l[n].indexLabelFormatter||h.indexLabelFormatter)&&this._indexLabels.push({chartType:"splineArea",dataPoint:l[n],dataSeries:h,point:{x:m,y:q},direction:0<=l[n].y?1:-1,color:color})}b();K.drawMarkers(g)}}c.restore();
t&&this._eventManager.ghostCtx.restore();return{source:c,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderStepArea=function(a){function b(){x&&(0<h.lineThickness&&c.stroke(),0>=a.axisY.viewportMinimum&&0<=a.axisY.viewportMaximum?v=w:0>a.axisY.viewportMaximum?v=f.y1:0<a.axisY.viewportMinimum&&(v=e.y2),c.lineTo(q,v),c.lineTo(x.x,v),c.closePath(),c.globalAlpha=h.fillOpacity,c.fill(),c.globalAlpha=1,t&&(d.lineTo(q,v),d.lineTo(x.x,
v),d.closePath(),d.fill()),c.beginPath(),c.moveTo(q,r),d.beginPath(),d.moveTo(q,r),x={x:q,y:r})}var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,e=a.axisX.lineCoordinates,f=a.axisY.lineCoordinates,g=[],k=this.plotArea;c.save();t&&d.save();c.beginPath();c.rect(k.x1,k.y1,k.width,k.height);c.clip();t&&(d.beginPath(),d.rect(k.x1,k.y1,k.width,k.height),d.clip());for(k=0;k<a.dataSeriesIndexes.length;k++){var p=a.dataSeriesIndexes[k],h=this.data[p],
l=h.dataPoints,g=h.id;this._eventManager.objectMap[g]={objectType:"dataSeries",dataSeriesIndex:p};g=B(g);d.fillStyle=g;var g=[],n=!0,m=0,q,r,s,w=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)+0.5<<0,v,x=null,E=!1;if(0<l.length){var y=h._colorSet[m%h._colorSet.length];c.fillStyle=y;c.strokeStyle=y;c.lineWidth=h.lineThickness;for(c.setLineDash&&c.setLineDash(M(h.lineDashType,h.lineThickness));m<l.length;m++)if(s=l[m].x.getTime?
l[m].x.getTime():l[m].x,!(s<a.axisX.dataInfo.viewPortMin||s>a.axisX.dataInfo.viewPortMax)){var z=r;"number"!==typeof l[m].y?(b(),E=!0):(q=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(s-a.axisX.conversionParameters.minimum)+0.5<<0,r=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(l[m].y-a.axisY.conversionParameters.minimum)+0.5<<0,n||E?(c.beginPath(),c.moveTo(q,r),x={x:q,y:r},t&&(d.beginPath(),d.moveTo(q,r)),E=n=!1):(c.lineTo(q,
z),t&&d.lineTo(q,z),c.lineTo(q,r),t&&d.lineTo(q,r),0==m%250&&b()),z=h.dataPointIds[m],this._eventManager.objectMap[z]={id:z,objectType:"dataPoint",dataSeriesIndex:p,dataPointIndex:m,x1:q,y1:r},0!==l[m].markerSize&&(0<l[m].markerSize||0<h.markerSize)&&(s=h.getMarkerProperties(m,q,r,c),g.push(s),z=B(z),t&&g.push({x:q,y:r,ctx:d,type:s.type,size:s.size,color:z,borderColor:z,borderThickness:s.borderThickness})),(l[m].indexLabel||h.indexLabel||l[m].indexLabelFormatter||h.indexLabelFormatter)&&this._indexLabels.push({chartType:"stepArea",
dataPoint:l[m],dataSeries:h,point:{x:q,y:r},direction:0<=l[m].y?1:-1,color:y}))}b();K.drawMarkers(g)}}c.restore();t&&this._eventManager.ghostCtx.restore();return{source:c,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderStackedArea=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=[],e=this.plotArea,f=[],g=[],k=0,p,h,l,n=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*
(0-a.axisY.conversionParameters.minimum)<<0,m=this._eventManager.ghostCtx;t&&m.beginPath();b.save();t&&m.save();b.beginPath();b.rect(e.x1,e.y1,e.width,e.height);b.clip();t&&(m.beginPath(),m.rect(e.x1,e.y1,e.width,e.height),m.clip());xValuePresent=[];for(e=0;e<a.dataSeriesIndexes.length;e++){var q=a.dataSeriesIndexes[e],r=this.data[q],s=r.dataPoints;r.dataPointIndexes=[];for(k=0;k<s.length;k++)q=s[k].x.getTime?s[k].x.getTime():s[k].x,r.dataPointIndexes[q]=k,xValuePresent[q]||(g.push(q),xValuePresent[q]=
!0);g.sort(ta)}for(e=0;e<a.dataSeriesIndexes.length;e++){var q=a.dataSeriesIndexes[e],r=this.data[q],s=r.dataPoints,w=!0,v=[],k=r.id;this._eventManager.objectMap[k]={objectType:"dataSeries",dataSeriesIndex:q};k=B(k);m.fillStyle=k;if(0<g.length){c=r._colorSet[0];b.fillStyle=c;b.strokeStyle=c;b.lineWidth=r.lineThickness;b.setLineDash&&b.setLineDash(M(r.lineDashType,r.lineThickness));for(k=0;k<g.length;k++){l=g[k];var x=null,x=0<=r.dataPointIndexes[l]?s[r.dataPointIndexes[l]]:{x:l,y:0};if(!(l<a.axisX.dataInfo.viewPortMin||
l>a.axisX.dataInfo.viewPortMax)&&"number"===typeof x.y){p=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(l-a.axisX.conversionParameters.minimum)+0.5<<0;h=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(x.y-a.axisY.conversionParameters.minimum);var E=f[l]?f[l]:0;h-=E;v.push({x:p,y:n-E});f[l]=n-h;if(w)b.beginPath(),b.moveTo(p,h),t&&(m.beginPath(),m.moveTo(p,h)),w=!1;else if(b.lineTo(p,h),t&&m.lineTo(p,h),0==k%250){for(0<r.lineThickness&&
b.stroke();0<v.length;){var y=v.pop();b.lineTo(y.x,y.y);t&&m.lineTo(y.x,y.y)}b.closePath();b.globalAlpha=r.fillOpacity;b.fill();b.globalAlpha=1;b.beginPath();b.moveTo(p,h);t&&(m.closePath(),m.fill(),m.beginPath(),m.moveTo(p,h));v.push({x:p,y:n-E})}if(0<=r.dataPointIndexes[l]){var z=r.dataPointIds[r.dataPointIndexes[l]];this._eventManager.objectMap[z]={id:z,objectType:"dataPoint",dataSeriesIndex:q,dataPointIndex:r.dataPointIndexes[l],x1:p,y1:h}}0<=r.dataPointIndexes[l]&&0!==x.markerSize&&(0<x.markerSize||
0<r.markerSize)&&(l=r.getMarkerProperties(k,p,h,b),d.push(l),markerColor=B(z),t&&d.push({x:p,y:h,ctx:m,type:l.type,size:l.size,color:markerColor,borderColor:markerColor,borderThickness:l.borderThickness}));(x.indexLabel||r.indexLabel||x.indexLabelFormatter||r.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedArea",dataPoint:x,dataSeries:r,point:{x:p,y:h},direction:0<=s[k].y?1:-1,color:c})}}for(0<r.lineThickness&&b.stroke();0<v.length;)y=v.pop(),b.lineTo(y.x,y.y),t&&m.lineTo(y.x,y.y);
b.closePath();b.globalAlpha=r.fillOpacity;b.fill();b.globalAlpha=1;b.beginPath();b.moveTo(p,h);t&&(m.closePath(),m.fill(),m.beginPath(),m.moveTo(p,h))}delete r.dataPointIndexes}K.drawMarkers(d);b.restore();t&&m.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderStackedArea100=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=[],
f=[],g=[],k=0,p,h,l,n=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(0-a.axisY.conversionParameters.minimum)<<0,m=this.dataPointMaxWidth?this.dataPointMaxWidth:0.15*this.width<<0,q=a.axisX.dataInfo.minDiff,q=0.9*d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(q)<<0,r=this._eventManager.ghostCtx;b.save();t&&r.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(r.beginPath(),r.rect(d.x1,d.y1,d.width,d.height),r.clip());xValuePresent=
[];for(d=0;d<a.dataSeriesIndexes.length;d++){var s=a.dataSeriesIndexes[d],w=this.data[s],v=w.dataPoints;w.dataPointIndexes=[];for(k=0;k<v.length;k++)s=v[k].x.getTime?v[k].x.getTime():v[k].x,w.dataPointIndexes[s]=k,xValuePresent[s]||(g.push(s),xValuePresent[s]=!0);g.sort(ta)}for(d=0;d<a.dataSeriesIndexes.length;d++){var s=a.dataSeriesIndexes[d],w=this.data[s],v=w.dataPoints,x=!0,c=w.id;this._eventManager.objectMap[c]={objectType:"dataSeries",dataSeriesIndex:s};c=B(c);r.fillStyle=c;1==v.length&&(q=
m);1>q?q=1:q>m&&(q=m);var E=[];if(0<g.length){c=w._colorSet[k%w._colorSet.length];b.fillStyle=c;b.strokeStyle=c;b.lineWidth=w.lineThickness;b.setLineDash&&b.setLineDash(M(w.lineDashType,w.lineThickness));for(k=0;k<g.length;k++){l=g[k];var y=null,y=0<=w.dataPointIndexes[l]?v[w.dataPointIndexes[l]]:{x:l,y:0};if(!(l<a.axisX.dataInfo.viewPortMin||l>a.axisX.dataInfo.viewPortMax)&&"number"===typeof y.y){h=0!==a.dataPointYSums[l]?100*(y.y/a.dataPointYSums[l]):0;p=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*
(l-a.axisX.conversionParameters.minimum)+0.5<<0;h=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(h-a.axisY.conversionParameters.minimum);var z=f[l]?f[l]:0;h-=z;E.push({x:p,y:n-z});f[l]=n-h;if(x)b.beginPath(),b.moveTo(p,h),t&&(r.beginPath(),r.moveTo(p,h)),x=!1;else if(b.lineTo(p,h),t&&r.lineTo(p,h),0==k%250){for(0<w.lineThickness&&b.stroke();0<E.length;){var u=E.pop();b.lineTo(u.x,u.y);t&&r.lineTo(u.x,u.y)}b.closePath();b.globalAlpha=w.fillOpacity;b.fill();b.globalAlpha=
1;b.beginPath();b.moveTo(p,h);t&&(r.closePath(),r.fill(),r.beginPath(),r.moveTo(p,h));E.push({x:p,y:n-z})}if(0<=w.dataPointIndexes[l]){var D=w.dataPointIds[w.dataPointIndexes[l]];this._eventManager.objectMap[D]={id:D,objectType:"dataPoint",dataSeriesIndex:s,dataPointIndex:w.dataPointIndexes[l],x1:p,y1:h}}0<=w.dataPointIndexes[l]&&0!==y.markerSize&&(0<y.markerSize||0<w.markerSize)&&(l=w.getMarkerProperties(k,p,h,b),e.push(l),markerColor=B(D),t&&e.push({x:p,y:h,ctx:r,type:l.type,size:l.size,color:markerColor,
borderColor:markerColor,borderThickness:l.borderThickness}));(y.indexLabel||w.indexLabel||y.indexLabelFormatter||w.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedArea100",dataPoint:y,dataSeries:w,point:{x:p,y:h},direction:0<=v[k].y?1:-1,color:c})}}for(0<w.lineThickness&&b.stroke();0<E.length;)u=E.pop(),b.lineTo(u.x,u.y),t&&r.lineTo(u.x,u.y);b.closePath();b.globalAlpha=w.fillOpacity;b.fill();b.globalAlpha=1;b.beginPath();b.moveTo(p,h);t&&(r.closePath(),r.fill(),r.beginPath(),r.moveTo(p,
h))}delete w.dataPointIndexes}K.drawMarkers(e);b.restore();t&&r.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderBubble=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx,c=a.dataSeriesIndexes.length;if(!(0>=c)){var d=this.plotArea,e=0,f,g,k=this.dataPointMaxWidth?this.dataPointMaxWidth:0.15*this.width<<0,e=a.axisX.dataInfo.minDiff,c=0.9*(d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*
Math.abs(e)/c)<<0;b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(var p=-Infinity,h=Infinity,l=0;l<a.dataSeriesIndexes.length;l++)for(var n=a.dataSeriesIndexes[l],m=this.data[n],q=m.dataPoints,r=0,e=0;e<q.length;e++)f=q[e].getTime?f=q[e].x.getTime():f=q[e].x,f<a.axisX.dataInfo.viewPortMin||f>a.axisX.dataInfo.viewPortMax||"undefined"===typeof q[e].z||
(r=q[e].z,r>p&&(p=r),r<h&&(h=r));for(var s=25*Math.PI,d=Math.max(Math.pow(0.25*Math.min(d.height,d.width)/2,2)*Math.PI,s),l=0;l<a.dataSeriesIndexes.length;l++)if(n=a.dataSeriesIndexes[l],m=this.data[n],q=m.dataPoints,1==q.length&&(c=k),1>c?c=1:c>k&&(c=k),0<q.length)for(b.strokeStyle="#4572A7 ",e=0;e<q.length;e++)if(f=q[e].getTime?f=q[e].x.getTime():f=q[e].x,!(f<a.axisX.dataInfo.viewPortMin||f>a.axisX.dataInfo.viewPortMax)&&"number"===typeof q[e].y){f=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*
(f-a.axisX.conversionParameters.minimum)+0.5<<0;g=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(q[e].y-a.axisY.conversionParameters.minimum)+0.5<<0;var r=q[e].z,w=2*Math.max(Math.sqrt((p===h?d/2:s+(d-s)/(p-h)*(r-h))/Math.PI)<<0,1),r=m.getMarkerProperties(e,b);r.size=w;b.globalAlpha=m.fillOpacity;K.drawMarker(f,g,b,r.type,r.size,r.color,r.borderColor,r.borderThickness);b.globalAlpha=1;var v=m.dataPointIds[e];this._eventManager.objectMap[v]={id:v,objectType:"dataPoint",
dataSeriesIndex:n,dataPointIndex:e,x1:f,y1:g,size:w};w=B(v);t&&K.drawMarker(f,g,this._eventManager.ghostCtx,r.type,r.size,w,w,r.borderThickness);(q[e].indexLabel||m.indexLabel||q[e].indexLabelFormatter||m.indexLabelFormatter)&&this._indexLabels.push({chartType:"bubble",dataPoint:q[e],dataSeries:m,point:{x:f,y:g},direction:1,bounds:{x1:f-r.size/2,y1:g-r.size/2,x2:f+r.size/2,y2:g+r.size/2},color:null})}b.restore();t&&this._eventManager.ghostCtx.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.fadeInAnimation,
easingFunction:A.easing.easeInQuad,animationBase:0}}};u.prototype.renderScatter=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx,c=a.dataSeriesIndexes.length;if(!(0>=c)){var d=this.plotArea,e=0,f,g,k=this.dataPointMaxWidth?this.dataPointMaxWidth:0.15*this.width<<0,e=a.axisX.dataInfo.minDiff,c=0.9*(d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(e)/c)<<0;b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,
d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(var p=0;p<a.dataSeriesIndexes.length;p++){var h=a.dataSeriesIndexes[p],l=this.data[h],n=l.dataPoints;1==n.length&&(c=k);1>c?c=1:c>k&&(c=k);if(0<n.length){b.strokeStyle="#4572A7 ";Math.pow(0.3*Math.min(d.height,d.width)/2,2);for(var m=0,q=0,e=0;e<n.length;e++)if(f=n[e].getTime?f=n[e].x.getTime():f=n[e].x,!(f<a.axisX.dataInfo.viewPortMin||f>a.axisX.dataInfo.viewPortMax)&&"number"===typeof n[e].y){f=a.axisX.conversionParameters.reference+
a.axisX.conversionParameters.pixelPerUnit*(f-a.axisX.conversionParameters.minimum)+0.5<<0;g=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(n[e].y-a.axisY.conversionParameters.minimum)+0.5<<0;var r=l.getMarkerProperties(e,f,g,b);b.globalAlpha=l.fillOpacity;K.drawMarker(r.x,r.y,r.ctx,r.type,r.size,r.color,r.borderColor,r.borderThickness);b.globalAlpha=1;Math.sqrt((m-f)*(m-f)+(q-g)*(q-g))<Math.min(r.size,5)&&n.length>Math.min(this.plotArea.width,this.plotArea.height)||
(m=l.dataPointIds[e],this._eventManager.objectMap[m]={id:m,objectType:"dataPoint",dataSeriesIndex:h,dataPointIndex:e,x1:f,y1:g},m=B(m),t&&K.drawMarker(r.x,r.y,this._eventManager.ghostCtx,r.type,r.size,m,m,r.borderThickness),(n[e].indexLabel||l.indexLabel||n[e].indexLabelFormatter||l.indexLabelFormatter)&&this._indexLabels.push({chartType:"scatter",dataPoint:n[e],dataSeries:l,point:{x:f,y:g},direction:1,bounds:{x1:f-r.size/2,y1:g-r.size/2,x2:f+r.size/2,y2:g+r.size/2},color:null}),m=f,q=g)}}}b.restore();
t&&this._eventManager.ghostCtx.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.fadeInAnimation,easingFunction:A.easing.easeInQuad,animationBase:0}}};u.prototype.renderCandlestick=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx,c=this._eventManager.ghostCtx;if(!(0>=a.dataSeriesIndexes.length)){var d=null,d=this.plotArea,e=0,f,g,k,p,h,l,e=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1;f=this.dataPointMaxWidth?this.dataPointMaxWidth:
this.dataPointWidth?this.dataPointWidth:0.015*this.width;var n=a.axisX.dataInfo.minDiff;isFinite(n)||(n=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));n=this.dataPointWidth?this.dataPointWidth:0.7*d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(n)<<0;this.dataPointMaxWidth&&e>f&&(e=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,f));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&f<e)&&(f=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,
e));n<e&&(n=e);n>f&&(n=f);b.save();t&&c.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(c.rect(d.x1,d.y1,d.width,d.height),c.clip());for(var m=0;m<a.dataSeriesIndexes.length;m++){var q=a.dataSeriesIndexes[m],r=this.data[q],s=r.dataPoints;if(0<s.length)for(var w=5<n&&r.bevelEnabled?!0:!1,e=0;e<s.length;e++)if(s[e].getTime?l=s[e].x.getTime():l=s[e].x,!(l<a.axisX.dataInfo.viewPortMin||l>a.axisX.dataInfo.viewPortMax)&&null!==s[e].y&&s[e].y.length&&"number"===typeof s[e].y[0]&&"number"===
typeof s[e].y[1]&&"number"===typeof s[e].y[2]&&"number"===typeof s[e].y[3]){f=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(l-a.axisX.conversionParameters.minimum)+0.5<<0;g=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(s[e].y[0]-a.axisY.conversionParameters.minimum)+0.5<<0;k=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(s[e].y[1]-a.axisY.conversionParameters.minimum)+0.5<<0;p=a.axisY.conversionParameters.reference+
a.axisY.conversionParameters.pixelPerUnit*(s[e].y[2]-a.axisY.conversionParameters.minimum)+0.5<<0;h=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(s[e].y[3]-a.axisY.conversionParameters.minimum)+0.5<<0;var v=f-n/2<<0,x=v+n<<0,d=s[e].color?s[e].color:r._colorSet[0],E=Math.round(Math.max(1,0.15*n)),u=0===E%2?0:0.5,z=r.dataPointIds[e];this._eventManager.objectMap[z]={id:z,objectType:"dataPoint",dataSeriesIndex:q,dataPointIndex:e,x1:v,y1:g,x2:x,y2:k,x3:f,y3:p,x4:f,y4:h,
borderThickness:E,color:d};b.strokeStyle=d;b.beginPath();b.lineWidth=E;c.lineWidth=Math.max(E,4);"candlestick"===r.type?(b.moveTo(f-u,k),b.lineTo(f-u,Math.min(g,h)),b.stroke(),b.moveTo(f-u,Math.max(g,h)),b.lineTo(f-u,p),b.stroke(),I(b,v,Math.min(g,h),x,Math.max(g,h),s[e].y[0]<=s[e].y[3]?r.risingColor:d,E,d,w,w,!1,!1,r.fillOpacity),t&&(d=B(z),c.strokeStyle=d,c.moveTo(f-u,k),c.lineTo(f-u,Math.min(g,h)),c.stroke(),c.moveTo(f-u,Math.max(g,h)),c.lineTo(f-u,p),c.stroke(),I(c,v,Math.min(g,h),x,Math.max(g,
h),d,0,null,!1,!1,!1,!1))):"ohlc"===r.type&&(b.moveTo(f-u,k),b.lineTo(f-u,p),b.stroke(),b.beginPath(),b.moveTo(f,g),b.lineTo(v,g),b.stroke(),b.beginPath(),b.moveTo(f,h),b.lineTo(x,h),b.stroke(),t&&(d=B(z),c.strokeStyle=d,c.moveTo(f-u,k),c.lineTo(f-u,p),c.stroke(),c.beginPath(),c.moveTo(f,g),c.lineTo(v,g),c.stroke(),c.beginPath(),c.moveTo(f,h),c.lineTo(x,h),c.stroke()));(s[e].indexLabel||r.indexLabel||s[e].indexLabelFormatter||r.indexLabelFormatter)&&this._indexLabels.push({chartType:r.type,dataPoint:s[e],
dataSeries:r,point:{x:v+(x-v)/2,y:k},direction:1,bounds:{x1:v,y1:Math.min(k,p),x2:x,y2:Math.max(k,p)},color:d})}}b.restore();t&&c.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.fadeInAnimation,easingFunction:A.easing.easeInQuad,animationBase:0}}};u.prototype.renderRangeColumn=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=0,f,g,e=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:
1;f=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.03*this.width;var k=a.axisX.dataInfo.minDiff;isFinite(k)||(k=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));k=this.dataPointWidth?this.dataPointWidth:0.9*(d.width/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(k)/a.plotType.totalDataSeries)<<0;this.dataPointMaxWidth&&e>f&&(e=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,f));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&
f<e)&&(f=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,e));k<e&&(k=e);k>f&&(k=f);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(var p=0;p<a.dataSeriesIndexes.length;p++){var h=a.dataSeriesIndexes[p],l=this.data[h],n=l.dataPoints;if(0<n.length)for(var m=5<k&&l.bevelEnabled?!0:!1,e=0;e<n.length;e++)if(n[e].getTime?g=n[e].x.getTime():
g=n[e].x,!(g<a.axisX.dataInfo.viewPortMin||g>a.axisX.dataInfo.viewPortMax)&&null!==n[e].y&&n[e].y.length&&"number"===typeof n[e].y[0]&&"number"===typeof n[e].y[1]){c=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(g-a.axisX.conversionParameters.minimum)+0.5<<0;d=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(n[e].y[0]-a.axisY.conversionParameters.minimum)+0.5<<0;f=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*
(n[e].y[1]-a.axisY.conversionParameters.minimum)+0.5<<0;var q=c-a.plotType.totalDataSeries*k/2+(a.previousDataSeriesCount+p)*k<<0,r=q+k<<0,c=n[e].color?n[e].color:l._colorSet[e%l._colorSet.length];if(d>f){var s=d,d=f;f=s}s=l.dataPointIds[e];this._eventManager.objectMap[s]={id:s,objectType:"dataPoint",dataSeriesIndex:h,dataPointIndex:e,x1:q,y1:d,x2:r,y2:f};I(b,q,d,r,f,c,0,c,m,m,!1,!1,l.fillOpacity);c=B(s);t&&I(this._eventManager.ghostCtx,q,d,r,f,c,0,null,!1,!1,!1,!1);if(n[e].indexLabel||l.indexLabel||
n[e].indexLabelFormatter||l.indexLabelFormatter)this._indexLabels.push({chartType:"rangeColumn",dataPoint:n[e],dataSeries:l,indexKeyword:0,point:{x:q+(r-q)/2,y:n[e].y[1]>=n[e].y[0]?f:d},direction:n[e].y[1]>=n[e].y[0]?-1:1,bounds:{x1:q,y1:Math.min(d,f),x2:r,y2:Math.max(d,f)},color:c}),this._indexLabels.push({chartType:"rangeColumn",dataPoint:n[e],dataSeries:l,indexKeyword:1,point:{x:q+(r-q)/2,y:n[e].y[1]>=n[e].y[0]?d:f},direction:n[e].y[1]>=n[e].y[0]?1:-1,bounds:{x1:q,y1:Math.min(d,f),x2:r,y2:Math.max(d,
f)},color:c})}}b.restore();t&&this._eventManager.ghostCtx.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.fadeInAnimation,easingFunction:A.easing.easeInQuad,animationBase:0}}};u.prototype.renderRangeBar=function(a){var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var c=null,d=this.plotArea,e=0,f,g,k,e=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1;f=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?
this.dataPointWidth:Math.min(0.15*this.height,0.9*(this.plotArea.height/a.plotType.totalDataSeries))<<0;var p=a.axisX.dataInfo.minDiff;isFinite(p)||(p=0.3*Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum));p=this.dataPointWidth?this.dataPointWidth:0.9*(d.height/Math.abs(a.axisX.viewportMaximum-a.axisX.viewportMinimum)*Math.abs(p)/a.plotType.totalDataSeries)<<0;this.dataPointMaxWidth&&e>f&&(e=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,f));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&
f<e)&&(f=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,e));p<e&&(p=e);p>f&&(p=f);b.save();t&&this._eventManager.ghostCtx.save();b.beginPath();b.rect(d.x1,d.y1,d.width,d.height);b.clip();t&&(this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(var h=0;h<a.dataSeriesIndexes.length;h++){var l=a.dataSeriesIndexes[h],n=this.data[l],m=n.dataPoints;if(0<m.length){var q=5<p&&n.bevelEnabled?!0:!1;b.strokeStyle="#4572A7 ";for(e=0;e<m.length;e++)if(m[e].getTime?
k=m[e].x.getTime():k=m[e].x,!(k<a.axisX.dataInfo.viewPortMin||k>a.axisX.dataInfo.viewPortMax)&&null!==m[e].y&&m[e].y.length&&"number"===typeof m[e].y[0]&&"number"===typeof m[e].y[1]){d=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(m[e].y[0]-a.axisY.conversionParameters.minimum)+0.5<<0;f=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(m[e].y[1]-a.axisY.conversionParameters.minimum)+0.5<<0;g=a.axisX.conversionParameters.reference+
a.axisX.conversionParameters.pixelPerUnit*(k-a.axisX.conversionParameters.minimum)+0.5<<0;g=g-a.plotType.totalDataSeries*p/2+(a.previousDataSeriesCount+h)*p<<0;var r=g+p<<0;d>f&&(c=d,d=f,f=c);c=m[e].color?m[e].color:n._colorSet[e%n._colorSet.length];I(b,d,g,f,r,c,0,null,q,!1,!1,!1,n.fillOpacity);c=n.dataPointIds[e];this._eventManager.objectMap[c]={id:c,objectType:"dataPoint",dataSeriesIndex:l,dataPointIndex:e,x1:d,y1:g,x2:f,y2:r};c=B(c);t&&I(this._eventManager.ghostCtx,d,g,f,r,c,0,null,!1,!1,!1,!1);
if(m[e].indexLabel||n.indexLabel||m[e].indexLabelFormatter||n.indexLabelFormatter)this._indexLabels.push({chartType:"rangeBar",dataPoint:m[e],dataSeries:n,indexKeyword:0,point:{x:m[e].y[1]>=m[e].y[0]?d:f,y:g+(r-g)/2},direction:m[e].y[1]>=m[e].y[0]?-1:1,bounds:{x1:Math.min(d,f),y1:g,x2:Math.max(d,f),y2:r},color:c}),this._indexLabels.push({chartType:"rangeBar",dataPoint:m[e],dataSeries:n,indexKeyword:1,point:{x:m[e].y[1]>=m[e].y[0]?f:d,y:g+(r-g)/2},direction:m[e].y[1]>=m[e].y[0]?1:-1,bounds:{x1:Math.min(d,
f),y1:g,x2:Math.max(d,f),y2:r},color:c})}}}b.restore();t&&this._eventManager.ghostCtx.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:A.fadeInAnimation,easingFunction:A.easing.easeInQuad,animationBase:0}}};u.prototype.renderRangeArea=function(a){function b(){if(w){var a=null;0<p.lineThickness&&c.stroke();for(var b=g.length-1;0<=b;b--)a=g[b],c.lineTo(a.x,a.y),d.lineTo(a.x,a.y);c.closePath();c.globalAlpha=p.fillOpacity;c.fill();c.globalAlpha=1;d.fill();if(0<p.lineThickness){c.beginPath();
c.moveTo(a.x,a.y);for(b=0;b<g.length;b++)a=g[b],c.lineTo(a.x,a.y);c.stroke()}c.beginPath();c.moveTo(m,q);d.beginPath();d.moveTo(m,q);w={x:m,y:q};g=[];g.push({x:m,y:r})}}var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,e=[],f=this.plotArea;c.save();t&&d.save();c.beginPath();c.rect(f.x1,f.y1,f.width,f.height);c.clip();t&&(d.beginPath(),d.rect(f.x1,f.y1,f.width,f.height),d.clip());for(f=0;f<a.dataSeriesIndexes.length;f++){var g=[],k=a.dataSeriesIndexes[f],
p=this.data[k],h=p.dataPoints,e=p.id;this._eventManager.objectMap[e]={objectType:"dataSeries",dataSeriesIndex:k};e=B(e);d.fillStyle=e;var e=[],l=!0,n=0,m,q,r,s,w=null;if(0<h.length){var v=p._colorSet[n%p._colorSet.length];c.fillStyle=v;c.strokeStyle=v;c.lineWidth=p.lineThickness;c.setLineDash&&c.setLineDash(M(p.lineDashType,p.lineThickness));for(var x=!0;n<h.length;n++)if(s=h[n].x.getTime?h[n].x.getTime():h[n].x,!(s<a.axisX.dataInfo.viewPortMin||s>a.axisX.dataInfo.viewPortMax))if(null!==h[n].y&&h[n].y.length&&
"number"===typeof h[n].y[0]&&"number"===typeof h[n].y[1]){m=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(s-a.axisX.conversionParameters.minimum)+0.5<<0;q=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(h[n].y[0]-a.axisY.conversionParameters.minimum)+0.5<<0;r=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(h[n].y[1]-a.axisY.conversionParameters.minimum)+0.5<<0;l||x?(c.beginPath(),c.moveTo(m,q),
w={x:m,y:q},g=[],g.push({x:m,y:r}),t&&(d.beginPath(),d.moveTo(m,q)),x=l=!1):(c.lineTo(m,q),g.push({x:m,y:r}),t&&d.lineTo(m,q),0==n%250&&b());s=p.dataPointIds[n];this._eventManager.objectMap[s]={id:s,objectType:"dataPoint",dataSeriesIndex:k,dataPointIndex:n,x1:m,y1:q,y2:r};if(0!==h[n].markerSize&&(0<h[n].markerSize||0<p.markerSize)){var u=p.getMarkerProperties(n,m,r,c);e.push(u);var y=B(s);t&&e.push({x:m,y:r,ctx:d,type:u.type,size:u.size,color:y,borderColor:y,borderThickness:u.borderThickness});u=
p.getMarkerProperties(n,m,q,c);e.push(u);y=B(s);t&&e.push({x:m,y:q,ctx:d,type:u.type,size:u.size,color:y,borderColor:y,borderThickness:u.borderThickness})}if(h[n].indexLabel||p.indexLabel||h[n].indexLabelFormatter||p.indexLabelFormatter)this._indexLabels.push({chartType:"rangeArea",dataPoint:h[n],dataSeries:p,indexKeyword:0,point:{x:m,y:q},direction:h[n].y[0]<=h[n].y[1]?-1:1,color:v}),this._indexLabels.push({chartType:"rangeArea",dataPoint:h[n],dataSeries:p,indexKeyword:1,point:{x:m,y:r},direction:h[n].y[0]<=
h[n].y[1]?1:-1,color:v})}else b(),x=!0;b();K.drawMarkers(e)}}c.restore();t&&this._eventManager.ghostCtx.restore();return{source:c,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};u.prototype.renderRangeSplineArea=function(a){function b(){var a=ha(q,2);if(0<a.length){c.beginPath();c.moveTo(a[0].x,a[0].y);t&&(d.beginPath(),d.moveTo(a[0].x,a[0].y));for(var b=0;b<a.length-3;b+=3)c.bezierCurveTo(a[b+1].x,a[b+1].y,a[b+2].x,a[b+2].y,a[b+3].x,a[b+
3].y),t&&d.bezierCurveTo(a[b+1].x,a[b+1].y,a[b+2].x,a[b+2].y,a[b+3].x,a[b+3].y);0<k.lineThickness&&c.stroke();a=ha(r,2);c.lineTo(r[r.length-1].x,r[r.length-1].y);for(b=a.length-1;2<b;b-=3)c.bezierCurveTo(a[b-1].x,a[b-1].y,a[b-2].x,a[b-2].y,a[b-3].x,a[b-3].y),t&&d.bezierCurveTo(a[b-1].x,a[b-1].y,a[b-2].x,a[b-2].y,a[b-3].x,a[b-3].y);c.closePath();c.globalAlpha=k.fillOpacity;c.fill();c.globalAlpha=1;if(0<k.lineThickness){c.beginPath();c.moveTo(r[r.length-1].x,r[r.length-1].y);for(b=a.length-1;2<b;b-=
3)c.bezierCurveTo(a[b-1].x,a[b-1].y,a[b-2].x,a[b-2].y,a[b-3].x,a[b-3].y),t&&d.bezierCurveTo(a[b-1].x,a[b-1].y,a[b-2].x,a[b-2].y,a[b-3].x,a[b-3].y);c.stroke()}c.beginPath();t&&(d.closePath(),d.fill())}}var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,e=[],f=this.plotArea;c.save();t&&d.save();c.beginPath();c.rect(f.x1,f.y1,f.width,f.height);c.clip();t&&(d.beginPath(),d.rect(f.x1,f.y1,f.width,f.height),d.clip());for(f=0;f<a.dataSeriesIndexes.length;f++){var g=
a.dataSeriesIndexes[f],k=this.data[g],p=k.dataPoints,e=k.id;this._eventManager.objectMap[e]={objectType:"dataSeries",dataSeriesIndex:g};e=B(e);d.fillStyle=e;var e=[],h=0,l,n,m,q=[],r=[];if(0<p.length){color=k._colorSet[h%k._colorSet.length];c.fillStyle=color;c.strokeStyle=color;c.lineWidth=k.lineThickness;for(c.setLineDash&&c.setLineDash(M(k.lineDashType,k.lineThickness));h<p.length;h++)if(l=p[h].x.getTime?p[h].x.getTime():p[h].x,!(l<a.axisX.dataInfo.viewPortMin||l>a.axisX.dataInfo.viewPortMax))if(null!==
p[h].y&&p[h].y.length&&"number"===typeof p[h].y[0]&&"number"===typeof p[h].y[1]){l=a.axisX.conversionParameters.reference+a.axisX.conversionParameters.pixelPerUnit*(l-a.axisX.conversionParameters.minimum)+0.5<<0;n=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(p[h].y[0]-a.axisY.conversionParameters.minimum)+0.5<<0;m=a.axisY.conversionParameters.reference+a.axisY.conversionParameters.pixelPerUnit*(p[h].y[1]-a.axisY.conversionParameters.minimum)+0.5<<0;var s=k.dataPointIds[h];
this._eventManager.objectMap[s]={id:s,objectType:"dataPoint",dataSeriesIndex:g,dataPointIndex:h,x1:l,y1:n,y2:m};q[q.length]={x:l,y:n};r[r.length]={x:l,y:m};if(0!==p[h].markerSize&&(0<p[h].markerSize||0<k.markerSize)){var w=k.getMarkerProperties(h,l,n,c);e.push(w);var v=B(s);t&&e.push({x:l,y:n,ctx:d,type:w.type,size:w.size,color:v,borderColor:v,borderThickness:w.borderThickness});w=k.getMarkerProperties(h,l,m,c);e.push(w);v=B(s);t&&e.push({x:l,y:m,ctx:d,type:w.type,size:w.size,color:v,borderColor:v,
borderThickness:w.borderThickness})}if(p[h].indexLabel||k.indexLabel||p[h].indexLabelFormatter||k.indexLabelFormatter)this._indexLabels.push({chartType:"splineArea",dataPoint:p[h],dataSeries:k,indexKeyword:0,point:{x:l,y:n},direction:p[h].y[0]<=p[h].y[1]?-1:1,color:color}),this._indexLabels.push({chartType:"splineArea",dataPoint:p[h],dataSeries:k,indexKeyword:1,point:{x:l,y:m},direction:p[h].y[0]<=p[h].y[1]?1:-1,color:color})}else 0<h&&(b(),q=[],r=[]);b();K.drawMarkers(e)}}c.restore();t&&this._eventManager.ghostCtx.restore();
return{source:c,dest:this.plotArea.ctx,animationCallback:A.xClipAnimation,easingFunction:A.easing.linear,animationBase:0}}};var ra=function(a,b,c,d,e,f,g,k,p){"undefined"===typeof k&&(k=1);if(!t){var h=Number((g%(2*Math.PI)).toFixed(8));Number((f%(2*Math.PI)).toFixed(8))===h&&(g-=1E-4)}a.save();a.globalAlpha=k;"pie"===e?(a.beginPath(),a.moveTo(b.x,b.y),a.arc(b.x,b.y,c,f,g,!1),a.fillStyle=d,a.strokeStyle="white",a.lineWidth=2,a.closePath(),a.fill()):"doughnut"===e&&(a.beginPath(),a.arc(b.x,b.y,c,f,
g,!1),a.arc(b.x,b.y,p*c,g,f,!0),a.closePath(),a.fillStyle=d,a.strokeStyle="white",a.lineWidth=2,a.fill());a.globalAlpha=1;a.restore()};u.prototype.renderPie=function(a){function b(){if(h&&l){var a=0,b=0,c=0,d=0;for(y=0;y<l.length;y++){var e=l[y],f=h.dataPointIds[y],g={id:f,objectType:"dataPoint",dataPointIndex:y,dataSeriesIndex:0};q.push(g);var k={percent:null,total:null},n=null,k=p.getPercentAndTotal(h,e);if(h.indexLabelFormatter||e.indexLabelFormatter)n={chart:p._options,dataSeries:h,dataPoint:e,
total:k.total,percent:k.percent};k=e.indexLabelFormatter?e.indexLabelFormatter(n):e.indexLabel?p.replaceKeywordsWithValue(e.indexLabel,e,h,y):h.indexLabelFormatter?h.indexLabelFormatter(n):h.indexLabel?p.replaceKeywordsWithValue(h.indexLabel,e,h,y):e.label?e.label:"";p._eventManager.objectMap[f]=g;g.center={x:x.x,y:x.y};g.y=e.y;g.radius=z;g.percentInnerRadius=D;g.indexLabelText=k;g.indexLabelPlacement=h.indexLabelPlacement;g.indexLabelLineColor=e.indexLabelLineColor?e.indexLabelLineColor:h.indexLabelLineColor?
h.indexLabelLineColor:e.color?e.color:h._colorSet[y%h._colorSet.length];g.indexLabelLineThickness=e.indexLabelLineThickness?e.indexLabelLineThickness:h.indexLabelLineThickness;g.indexLabelLineDashType=e.indexLabelLineDashType?e.indexLabelLineDashType:h.indexLabelLineDashType;g.indexLabelFontColor=e.indexLabelFontColor?e.indexLabelFontColor:h.indexLabelFontColor;g.indexLabelFontStyle=e.indexLabelFontStyle?e.indexLabelFontStyle:h.indexLabelFontStyle;g.indexLabelFontWeight=e.indexLabelFontWeight?e.indexLabelFontWeight:
h.indexLabelFontWeight;g.indexLabelFontSize=e.indexLabelFontSize?e.indexLabelFontSize:h.indexLabelFontSize;g.indexLabelFontFamily=e.indexLabelFontFamily?e.indexLabelFontFamily:h.indexLabelFontFamily;g.indexLabelBackgroundColor=e.indexLabelBackgroundColor?e.indexLabelBackgroundColor:h.indexLabelBackgroundColor?h.indexLabelBackgroundColor:null;g.indexLabelMaxWidth=e.indexLabelMaxWidth?e.indexLabelMaxWidth:h.indexLabelMaxWidth?h.indexLabelMaxWidth:0.33*m.width;g.indexLabelWrap="undefined"!==typeof e.indexLabelWrap?
e.indexLabelWrap:h.indexLabelWrap;g.startAngle=0===y?h.startAngle?h.startAngle/180*Math.PI:0:q[y-1].endAngle;g.startAngle=(g.startAngle+2*Math.PI)%(2*Math.PI);g.endAngle=g.startAngle+2*Math.PI/u*Math.abs(e.y);e=(g.endAngle+g.startAngle)/2;e=(e+2*Math.PI)%(2*Math.PI);g.midAngle=e;if(g.midAngle>Math.PI/2-t&&g.midAngle<Math.PI/2+t){if(0===a||q[c].midAngle>g.midAngle)c=y;a++}else if(g.midAngle>3*Math.PI/2-t&&g.midAngle<3*Math.PI/2+t){if(0===b||q[d].midAngle>g.midAngle)d=y;b++}g.hemisphere=e>Math.PI/2&&
e<=3*Math.PI/2?"left":"right";g.indexLabelTextBlock=new H(p.plotArea.ctx,{fontSize:g.indexLabelFontSize,fontFamily:g.indexLabelFontFamily,fontColor:g.indexLabelFontColor,fontStyle:g.indexLabelFontStyle,fontWeight:g.indexLabelFontWeight,horizontalAlign:"left",backgroundColor:g.indexLabelBackgroundColor,maxWidth:g.indexLabelMaxWidth,maxHeight:g.indexLabelWrap?5*g.indexLabelFontSize:1.5*g.indexLabelFontSize,text:g.indexLabelText,padding:0,textBaseline:"top"});g.indexLabelTextBlock.measureText()}f=e=
0;k=!1;for(y=0;y<l.length;y++)g=q[(c+y)%l.length],1<a&&(g.midAngle>Math.PI/2-t&&g.midAngle<Math.PI/2+t)&&(e<=a/2&&!k?(g.hemisphere="right",e++):(g.hemisphere="left",k=!0));k=!1;for(y=0;y<l.length;y++)g=q[(d+y)%l.length],1<b&&(g.midAngle>3*Math.PI/2-t&&g.midAngle<3*Math.PI/2+t)&&(f<=b/2&&!k?(g.hemisphere="left",f++):(g.hemisphere="right",k=!0))}}function c(a){var b=p.plotArea.ctx;b.clearRect(m.x1,m.y1,m.width,m.height);b.fillStyle=p.backgroundColor;b.fillRect(m.x1,m.y1,m.width,m.height);for(b=0;b<
l.length;b++){var c=q[b].startAngle,d=q[b].endAngle;if(d>c){var e=0.07*z*Math.cos(q[b].midAngle),f=0.07*z*Math.sin(q[b].midAngle),g=!1;if(l[b].exploded){if(1E-9<Math.abs(q[b].center.x-(x.x+e))||1E-9<Math.abs(q[b].center.y-(x.y+f)))q[b].center.x=x.x+e*a,q[b].center.y=x.y+f*a,g=!0}else if(0<Math.abs(q[b].center.x-x.x)||0<Math.abs(q[b].center.y-x.y))q[b].center.x=x.x+e*(1-a),q[b].center.y=x.y+f*(1-a),g=!0;g&&(e={},e.dataSeries=h,e.dataPoint=h.dataPoints[b],e.index=b,p._toolTip.highlightObjects([e]));
ra(p.plotArea.ctx,q[b].center,q[b].radius,l[b].color?l[b].color:h._colorSet[b%h._colorSet.length],h.type,c,d,h.fillOpacity,q[b].percentInnerRadius)}}a=p.plotArea.ctx;a.fillStyle="black";a.strokeStyle="grey";a.textBaseline="middle";a.lineJoin="round";for(b=b=0;b<l.length;b++)c=q[b],c.indexLabelText&&(c.indexLabelTextBlock.y-=c.indexLabelTextBlock.height/2,d=0,d="left"===c.hemisphere?"inside"!==h.indexLabelPlacement?-(c.indexLabelTextBlock.width+n):-c.indexLabelTextBlock.width/2:"inside"!==h.indexLabelPlacement?
n:-c.indexLabelTextBlock.width/2,c.indexLabelTextBlock.x+=d,c.indexLabelTextBlock.render(!0),c.indexLabelTextBlock.x-=d,c.indexLabelTextBlock.y+=c.indexLabelTextBlock.height/2,"inside"!==c.indexLabelPlacement&&(d=c.center.x+z*Math.cos(c.midAngle),e=c.center.y+z*Math.sin(c.midAngle),a.strokeStyle=c.indexLabelLineColor,a.lineWidth=c.indexLabelLineThickness,a.setLineDash&&a.setLineDash(M(c.indexLabelLineDashType,c.indexLabelLineThickness)),a.beginPath(),a.moveTo(d,e),a.lineTo(c.indexLabelTextBlock.x,
c.indexLabelTextBlock.y),a.lineTo(c.indexLabelTextBlock.x+("left"===c.hemisphere?-n:n),c.indexLabelTextBlock.y),a.stroke()),a.lineJoin="miter")}function d(a,b){var c=0,c=a.indexLabelTextBlock.y-a.indexLabelTextBlock.height/2,d=a.indexLabelTextBlock.y+a.indexLabelTextBlock.height/2,e=b.indexLabelTextBlock.y-b.indexLabelTextBlock.height/2,f=b.indexLabelTextBlock.y+b.indexLabelTextBlock.height/2;return c=b.indexLabelTextBlock.y>a.indexLabelTextBlock.y?e-d:c-f}function e(a){for(var b=null,c=1;c<l.length;c++)if(b=
(a+c+q.length)%q.length,q[b].hemisphere!==q[a].hemisphere){b=null;break}else if(q[b].indexLabelText&&b!==a&&(0>d(q[b],q[a])||("right"===q[a].hemisphere?q[b].indexLabelTextBlock.y>=q[a].indexLabelTextBlock.y:q[b].indexLabelTextBlock.y<=q[a].indexLabelTextBlock.y)))break;else b=null;return b}function f(a,b,c){c=(c||0)+1;if(1E3<c)return 0;b=b||0;var g=0,h=x.y-1*indexLabelRadius,k=x.y+1*indexLabelRadius;if(0<=a&&a<l.length){var m=q[a];if(0>b&&m.indexLabelTextBlock.y<h||0<b&&m.indexLabelTextBlock.y>k)return 0;
var n=0,p=0,p=n=n=0;0>b?m.indexLabelTextBlock.y-m.indexLabelTextBlock.height/2>h&&m.indexLabelTextBlock.y-m.indexLabelTextBlock.height/2+b<h&&(b=-(h-(m.indexLabelTextBlock.y-m.indexLabelTextBlock.height/2+b))):m.indexLabelTextBlock.y+m.indexLabelTextBlock.height/2<h&&m.indexLabelTextBlock.y+m.indexLabelTextBlock.height/2+b>k&&(b=m.indexLabelTextBlock.y+m.indexLabelTextBlock.height/2+b-k);b=m.indexLabelTextBlock.y+b;h=0;h="right"===m.hemisphere?x.x+Math.sqrt(Math.pow(indexLabelRadius,2)-Math.pow(b-
x.y,2)):x.x-Math.sqrt(Math.pow(indexLabelRadius,2)-Math.pow(b-x.y,2));p=x.x+z*Math.cos(m.midAngle);n=x.y+z*Math.sin(m.midAngle);n=Math.sqrt(Math.pow(h-p,2)+Math.pow(b-n,2));p=Math.acos(z/indexLabelRadius);n=Math.acos((indexLabelRadius*indexLabelRadius+z*z-n*n)/(2*z*indexLabelRadius));b=n<p?b-m.indexLabelTextBlock.y:0;h=null;for(k=1;k<l.length;k++)if(h=(a-k+q.length)%q.length,q[h].hemisphere!==q[a].hemisphere){h=null;break}else if(q[h].indexLabelText&&q[h].hemisphere===q[a].hemisphere&&h!==a&&(0>d(q[h],
q[a])||("right"===q[a].hemisphere?q[h].indexLabelTextBlock.y<=q[a].indexLabelTextBlock.y:q[h].indexLabelTextBlock.y>=q[a].indexLabelTextBlock.y)))break;else h=null;p=h;n=e(a);k=h=0;0>b?(k="right"===m.hemisphere?p:n,g=b,null!==k&&(p=-b,b=m.indexLabelTextBlock.y-m.indexLabelTextBlock.height/2-(q[k].indexLabelTextBlock.y+q[k].indexLabelTextBlock.height/2),b-p<r&&(h=-p,k=f(k,h,c+1),+k.toFixed(v)>+h.toFixed(v)&&(g=b>r?-(b-r):-(p-(k-h)))))):0<b&&(k="right"===m.hemisphere?n:p,g=b,null!==k&&(p=b,b=q[k].indexLabelTextBlock.y-
q[k].indexLabelTextBlock.height/2-(m.indexLabelTextBlock.y+m.indexLabelTextBlock.height/2),b-p<r&&(h=p,k=f(k,h,c+1),+k.toFixed(v)<+h.toFixed(v)&&(g=b>r?b-r:p-(h-k)))));g&&(c=m.indexLabelTextBlock.y+g,b=0,b="right"===m.hemisphere?x.x+Math.sqrt(Math.pow(indexLabelRadius,2)-Math.pow(c-x.y,2)):x.x-Math.sqrt(Math.pow(indexLabelRadius,2)-Math.pow(c-x.y,2)),m.midAngle>Math.PI/2-t&&m.midAngle<Math.PI/2+t?(h=(a-1+q.length)%q.length,h=q[h],a=q[(a+1+q.length)%q.length],"left"===m.hemisphere&&"right"===h.hemisphere&&
b>h.indexLabelTextBlock.x?b=h.indexLabelTextBlock.x-15:"right"===m.hemisphere&&("left"===a.hemisphere&&b<a.indexLabelTextBlock.x)&&(b=a.indexLabelTextBlock.x+15)):m.midAngle>3*Math.PI/2-t&&m.midAngle<3*Math.PI/2+t&&(h=(a-1+q.length)%q.length,h=q[h],a=q[(a+1+q.length)%q.length],"right"===m.hemisphere&&"left"===h.hemisphere&&b<h.indexLabelTextBlock.x?b=h.indexLabelTextBlock.x+15:"left"===m.hemisphere&&("right"===a.hemisphere&&b>a.indexLabelTextBlock.x)&&(b=a.indexLabelTextBlock.x-15)),m.indexLabelTextBlock.y=
c,m.indexLabelTextBlock.x=b,m.indexLabelAngle=Math.atan2(m.indexLabelTextBlock.y-x.y,m.indexLabelTextBlock.x-x.x))}return g}function g(){var a=p.plotArea.ctx;a.fillStyle="grey";a.strokeStyle="grey";a.font="16px Arial";a.textBaseline="middle";for(var b=a=0,c=0,g=!0,b=0;10>b&&(1>b||0<c);b++){if(h.radius||!h.radius&&"undefined"!==typeof h.innerRadius&&null!==h.innerRadius&&z-c<=A)g=!1;g&&(z-=c);c=0;if("inside"!==h.indexLabelPlacement){indexLabelRadius=z*s;for(a=0;a<l.length;a++){var k=q[a];k.indexLabelTextBlock.x=
x.x+indexLabelRadius*Math.cos(k.midAngle);k.indexLabelTextBlock.y=x.y+indexLabelRadius*Math.sin(k.midAngle);k.indexLabelAngle=k.midAngle;k.radius=z;k.percentInnerRadius=D}for(var t,w,a=0;a<l.length;a++){var k=q[a],u=e(a);if(null!==u){t=q[a];w=q[u];var y=0,y=d(t,w)-r;if(0>y){for(var B=w=0,C=0;C<l.length;C++)C!==a&&q[C].hemisphere===k.hemisphere&&(q[C].indexLabelTextBlock.y<k.indexLabelTextBlock.y?w++:B++);w=y/(w+B||1)*B;var B=-1*(y-w),E=C=0;"right"===k.hemisphere?(C=f(a,w),B=-1*(y-C),E=f(u,B),+E.toFixed(v)<
+B.toFixed(v)&&+C.toFixed(v)<=+w.toFixed(v)&&f(a,-(B-E))):(C=f(u,w),B=-1*(y-C),E=f(a,B),+E.toFixed(v)<+B.toFixed(v)&&+C.toFixed(v)<=+w.toFixed(v)&&f(u,-(B-E)))}}}}else for(a=0;a<l.length;a++)k=q[a],indexLabelRadius="pie"===h.type?0.7*z:0.8*z,u=x.x+indexLabelRadius*Math.cos(k.midAngle),w=x.y+indexLabelRadius*Math.sin(k.midAngle),k.indexLabelTextBlock.x=u,k.indexLabelTextBlock.y=w;for(a=0;a<l.length;a++)if(k=q[a],u=k.indexLabelTextBlock.measureText(),0!==u.height&&0!==u.width)u=u=0,"right"===k.hemisphere?
(u=m.x2-(k.indexLabelTextBlock.x+k.indexLabelTextBlock.width+n),u*=-1):u=m.x1-(k.indexLabelTextBlock.x-k.indexLabelTextBlock.width-n),0<u&&(!g&&k.indexLabelText&&(w="right"===k.hemisphere?m.x2-k.indexLabelTextBlock.x:k.indexLabelTextBlock.x-m.x1,0.3*k.indexLabelTextBlock.maxWidth>w?k.indexLabelText="":k.indexLabelTextBlock.maxWidth=0.85*w,0.3*k.indexLabelTextBlock.maxWidth<w&&(k.indexLabelTextBlock.x-="right"===k.hemisphere?2:-2)),Math.abs(k.indexLabelTextBlock.y-k.indexLabelTextBlock.height/2-x.y)<
z||Math.abs(k.indexLabelTextBlock.y+k.indexLabelTextBlock.height/2-x.y)<z)&&(u/=Math.abs(Math.cos(k.indexLabelAngle)),9<u&&(u*=0.3),u>c&&(c=u)),u=u=0,0<k.indexLabelAngle&&k.indexLabelAngle<Math.PI?(u=m.y2-(k.indexLabelTextBlock.y+k.indexLabelTextBlock.height/2+5),u*=-1):u=m.y1-(k.indexLabelTextBlock.y-k.indexLabelTextBlock.height/2-5),0<u&&(!g&&k.indexLabelText&&(w=0<k.indexLabelAngle&&k.indexLabelAngle<Math.PI?-1:1,0===f(a,u*w)&&f(a,2*w)),Math.abs(k.indexLabelTextBlock.x-x.x)<z&&(u/=Math.abs(Math.sin(k.indexLabelAngle)),
9<u&&(u*=0.3),u>c&&(c=u)));var F=function(a,b,c){for(var d=[],e=0;d.push(q[b]),b!==c;b=(b+1+l.length)%l.length);d.sort(function(a,b){return a.y-b.y});for(b=0;b<d.length;b++)if(c=d[b],e<0.7*a)e+=c.indexLabelTextBlock.height,c.indexLabelTextBlock.text="",c.indexLabelText="",c.indexLabelTextBlock.measureText();else break};(function(){for(var a=-1,b=-1,c=0,f=!1,g=0;g<l.length;g++)if(f=!1,t=q[g],t.indexLabelText){var h=e(g);if(null!==h){var k=q[h];y=0;y=d(t,k);var m;if(m=0>y){m=t.indexLabelTextBlock.x;
var p=t.indexLabelTextBlock.y-t.indexLabelTextBlock.height/2,r=t.indexLabelTextBlock.y+t.indexLabelTextBlock.height/2,s=k.indexLabelTextBlock.y-k.indexLabelTextBlock.height/2,w=k.indexLabelTextBlock.x+k.indexLabelTextBlock.width,v=k.indexLabelTextBlock.y+k.indexLabelTextBlock.height/2;m=t.indexLabelTextBlock.x+t.indexLabelTextBlock.width<k.indexLabelTextBlock.x-n||m>w+n||p>v+n||r<s-n?!1:!0}m?(0>a&&(a=g),h!==a&&(b=h,c+=-y),0===g%Math.max(l.length/10,3)&&(f=!0)):f=!0;f&&(0<c&&0<=a&&0<=b)&&(F(c,a,b),
b=a=-1,c=0)}}0<c&&F(c,a,b)})()}}function k(){p.plotArea.layoutManager.reset();p._title&&(p._title.dockInsidePlotArea||"center"===p._title.horizontalAlign&&"center"===p._title.verticalAlign)&&p._title.render();if(p.subtitles)for(var a=0;a<p.subtitles.length;a++){var b=p.subtitles[a];(b.dockInsidePlotArea||"center"===b.horizontalAlign&&"center"===b.verticalAlign)&&b.render()}p.legend&&(p.legend.dockInsidePlotArea||"center"===p.legend.horizontalAlign&&"center"===p.legend.verticalAlign)&&p.legend.render()}
var p=this;if(!(0>=a.dataSeriesIndexes.length)){var h=this.data[a.dataSeriesIndexes[0]],l=h.dataPoints,n=10,m=this.plotArea,q=[],r=2,s=1.3,t=20/180*Math.PI,v=6,x={x:(m.x2+m.x1)/2,y:(m.y2+m.y1)/2},u=0;a=!1;for(var y=0;y<l.length;y++)u+=Math.abs(l[y].y),!a&&("undefined"!==typeof l[y].indexLabel&&null!==l[y].indexLabel&&0<l[y].indexLabel.toString().length)&&(a=!0),!a&&("undefined"!==typeof l[y].label&&null!==l[y].label&&0<l[y].label.toString().length)&&(a=!0);if(0!==u){a=a||"undefined"!==typeof h.indexLabel&&
null!==h.indexLabel&&0<h.indexLabel.toString().length;var z="inside"!==h.indexLabelPlacement&&a?0.75*Math.min(m.width,m.height)/2:0.92*Math.min(m.width,m.height)/2;h.radius&&(z=ya(h.radius,z));var A="undefined"!==typeof h.innerRadius&&null!==h.innerRadius?ya(h.innerRadius,z):0.7*z,D=Math.min(A/z,(z-1)/z);this.pieDoughnutClickHandler=function(a){p.isAnimating||(a=a.dataPoint,a.exploded=a.exploded?!1:!0,1<this.dataPoints.length&&p._animator.animate(0,500,function(a){c(a);k()}))};b();g();g();g();g();
this.disableToolTip=!0;this._animator.animate(0,this.animatedRender?this.animationDuration:0,function(a){var b=p.plotArea.ctx;b.clearRect(m.x1,m.y1,m.width,m.height);b.fillStyle=p.backgroundColor;b.fillRect(m.x1,m.y1,m.width,m.height);a=q[0].startAngle+2*Math.PI*a;for(b=0;b<l.length;b++){var c=0===b?q[b].startAngle:d,d=c+(q[b].endAngle-q[b].startAngle),e=!1;d>a&&(d=a,e=!0);var f=l[b].color?l[b].color:h._colorSet[b%h._colorSet.length];d>c&&ra(p.plotArea.ctx,q[b].center,q[b].radius,f,h.type,c,d,h.fillOpacity,
q[b].percentInnerRadius);if(e)break}k()},function(){p.disableToolTip=!1;p._animator.animate(0,p.animatedRender?500:0,function(a){c(a);k()})})}}};u.prototype.animationRequestId=null;u.prototype.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();u.prototype.cancelRequestAnimFrame=window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||
window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout;Y.prototype.registerSpace=function(a,b){"top"===a?this._topOccupied+=b.height:"bottom"===a?this._bottomOccupied+=b.height:"left"===a?this._leftOccupied+=b.width:"right"===a&&(this._rightOccupied+=b.width)};Y.prototype.unRegisterSpace=function(a,b){"top"===a?this._topOccupied-=b.height:"bottom"===a?this._bottomOccupied-=b.height:"left"===a?this._leftOccupied-=b.width:"right"===
a&&(this._rightOccupied-=b.width)};Y.prototype.getFreeSpace=function(){return{x1:this._x1+this._leftOccupied,y1:this._y1+this._topOccupied,x2:this._x2-this._rightOccupied,y2:this._y2-this._bottomOccupied,width:this._x2-this._x1-this._rightOccupied-this._leftOccupied,height:this._y2-this._y1-this._bottomOccupied-this._topOccupied}};Y.prototype.reset=function(){this._rightOccupied=this._leftOccupied=this._bottomOccupied=this._topOccupied=this._padding};O(H,G);H.prototype.render=function(a){a&&this.ctx.save();
var b=this.ctx.font;this.ctx.textBaseline=this.textBaseline;var c=0;this._isDirty&&this.measureText(this.ctx);this.ctx.translate(this.x,this.y+c);"middle"===this.textBaseline&&(c=-this._lineHeight/2);this.ctx.font=this._getFontString();this.ctx.rotate(Math.PI/180*this.angle);var d=0,e=this.padding,f=null;(0<this.borderThickness&&this.borderColor||this.backgroundColor)&&this.ctx.roundRect(0,c,this.width,this.height,this.cornerRadius,this.borderThickness,this.backgroundColor,this.borderColor);this.ctx.fillStyle=
this.fontColor;for(c=0;c<this._wrappedText.lines.length;c++)f=this._wrappedText.lines[c],"right"===this.horizontalAlign?d=this.width-f.width-this.padding:"left"===this.horizontalAlign?d=this.padding:"center"===this.horizontalAlign&&(d=(this.width-2*this.padding)/2-f.width/2+this.padding),this.ctx.fillText(f.text,d,e),e+=f.height;this.ctx.font=b;a&&this.ctx.restore()};H.prototype.setText=function(a){this.text=a;this._isDirty=!0;this._wrappedText=null};H.prototype.measureText=function(){if(null===this.maxWidth)throw"Please set maxWidth and height for TextBlock";
this._wrapText(this.ctx);this._isDirty=!1;return{width:this.width,height:this.height}};H.prototype._getLineWithWidth=function(a,b,c){a=String(a);if(!a)return{text:"",width:0};var d=c=0,e=a.length-1,f=Infinity;for(this.ctx.font=this._getFontString();d<=e;){var f=Math.floor((d+e)/2),g=a.substr(0,f+1);c=this.ctx.measureText(g).width;if(c<b)d=f+1;else if(c>b)e=f-1;else break}c>b&&1<g.length&&(g=g.substr(0,g.length-1),c=this.ctx.measureText(g).width);b=!0;if(g.length===a.length||" "===a[g.length])b=!1;
b&&(a=g.split(" "),1<a.length&&a.pop(),g=a.join(" "),c=this.ctx.measureText(g).width);return{text:g,width:c}};H.prototype._wrapText=function(){var a=new String(Z(String(this.text))),b=[],c=this.ctx.font,d=0,e=0;for(this.ctx.font=this._getFontString();0<a.length;){var f=this.maxHeight-2*this.padding,g=this._getLineWithWidth(a,this.maxWidth-2*this.padding,!1);g.height=this._lineHeight;b.push(g);e=Math.max(e,g.width);d+=g.height;a=Z(a.slice(g.text.length,a.length));f&&d>f&&(g=b.pop(),d-=g.height)}this._wrappedText=
{lines:b,width:e,height:d};this.width=e+2*this.padding;this.height=d+2*this.padding;this.ctx.font=c};H.prototype._getFontString=function(){var a;a=""+(this.fontStyle?this.fontStyle+" ":"");a+=this.fontWeight?this.fontWeight+" ":"";a+=this.fontSize?this.fontSize+"px ":"";var b=this.fontFamily?this.fontFamily+"":"";!t&&b&&(b=b.split(",")[0],"'"!==b[0]&&'"'!==b[0]&&(b="'"+b+"'"));return a+=b};O(aa,G);aa.prototype.render=function(){if(this.text){var a=this.dockInsidePlotArea?this.chart.plotArea:this.chart,
b=a.layoutManager.getFreeSpace(),c=b.x1,d=b.y1,e=0,f=0,g=this.chart._menuButton&&this.chart.exportEnabled&&"top"===this.verticalAlign?22:0,k,p;"top"===this.verticalAlign||"bottom"===this.verticalAlign?(null===this.maxWidth&&(this.maxWidth=b.width-4-g*("center"===this.horizontalAlign?2:1)),f=0.5*b.height-this.margin-2,e=0):"center"===this.verticalAlign&&("left"===this.horizontalAlign||"right"===this.horizontalAlign?(null===this.maxWidth&&(this.maxWidth=b.height-4),f=0.5*b.width-this.margin-2):"center"===
this.horizontalAlign&&(null===this.maxWidth&&(this.maxWidth=b.width-4),f=0.5*b.height-4));this.wrap||(f=Math.min(f,Math.max(1.5*this.fontSize,this.fontSize+2.5*this.padding)));var f=new H(this.ctx,{fontSize:this.fontSize,fontFamily:this.fontFamily,fontColor:this.fontColor,fontStyle:this.fontStyle,fontWeight:this.fontWeight,horizontalAlign:this.horizontalAlign,verticalAlign:this.verticalAlign,borderColor:this.borderColor,borderThickness:this.borderThickness,backgroundColor:this.backgroundColor,maxWidth:this.maxWidth,
maxHeight:f,cornerRadius:this.cornerRadius,text:this.text,padding:this.padding,textBaseline:"top"}),h=f.measureText();"top"===this.verticalAlign||"bottom"===this.verticalAlign?("top"===this.verticalAlign?(d=b.y1+2,p="top"):"bottom"===this.verticalAlign&&(d=b.y2-2-h.height,p="bottom"),"left"===this.horizontalAlign?c=b.x1+2:"center"===this.horizontalAlign?c=b.x1+b.width/2-h.width/2:"right"===this.horizontalAlign&&(c=b.x2-2-h.width-g),k=this.horizontalAlign,this.width=h.width,this.height=h.height):"center"===
this.verticalAlign&&("left"===this.horizontalAlign?(c=b.x1+2,d=b.y2-2-(this.maxWidth/2-h.width/2),e=-90,p="left",this.width=h.height,this.height=h.width):"right"===this.horizontalAlign?(c=b.x2-2,d=b.y1+2+(this.maxWidth/2-h.width/2),e=90,p="right",this.width=h.height,this.height=h.width):"center"===this.horizontalAlign&&(d=a.y1+(a.height/2-h.height/2),c=a.x1+(a.width/2-h.width/2),p="center",this.width=h.width,this.height=h.height),k="center");f.x=c;f.y=d;f.angle=e;f.horizontalAlign=k;f.render(!0);
a.layoutManager.registerSpace(p,{width:this.width+("left"===p||"right"===p?this.margin+2:0),height:this.height+("top"===p||"bottom"===p?this.margin+2:0)});this.bounds={x1:c,y1:d,x2:c+this.width,y2:d+this.height};this.ctx.textBaseline="top"}};O(ia,G);ia.prototype.render=aa.prototype.render;O(ja,G);ja.prototype.render=function(){var a=this.dockInsidePlotArea?this.chart.plotArea:this.chart,b=a.layoutManager.getFreeSpace(),c=null,d=0,e=0,f=0,g=0,k=[],p=[];"top"===this.verticalAlign||"bottom"===this.verticalAlign?
(this.orientation="horizontal",c=this.verticalAlign,f=null!==this.maxWidth?this.maxWidth:0.7*b.width,g=null!==this.maxHeight?this.maxHeight:0.5*b.height):"center"===this.verticalAlign&&(this.orientation="vertical",c=this.horizontalAlign,f=null!==this.maxWidth?this.maxWidth:0.5*b.width,g=null!==this.maxHeight?this.maxHeight:0.7*b.height);for(var h=0;h<this.dataSeries.length;h++){var l=this.dataSeries[h];if("pie"!==l.type&&"doughnut"!==l.type&&"funnel"!==l.type){var n=l.legendMarkerType?l.legendMarkerType:
"line"!==l.type&&"stepLine"!==l.type&&"spline"!==l.type&&"scatter"!==l.type&&"bubble"!==l.type||!l.markerType?S.getDefaultLegendMarker(l.type):l.markerType,m=l.legendText?l.legendText:this.itemTextFormatter?this.itemTextFormatter({chart:this.chart,legend:this._options,dataSeries:l,dataPoint:null}):l.name,q=l.legendMarkerColor?l.legendMarkerColor:l.markerColor?l.markerColor:l._colorSet[0],r=l.markerSize||"line"!==l.type&&"stepLine"!==l.type&&"spline"!==l.type?0.6*this.lineHeight:0,s=l.legendMarkerBorderColor?
l.legendMarkerBorderColor:l.markerBorderColor,t=l.legendMarkerBorderThickness?l.legendMarkerBorderThickness:l.markerBorderThickness?Math.max(1,Math.round(0.2*r)):0,m=this.chart.replaceKeywordsWithValue(m,l.dataPoints[0],l,h),n={markerType:n,markerColor:q,text:m,textBlock:null,chartType:l.type,markerSize:r,lineColor:l._colorSet[0],dataSeriesIndex:l.index,dataPointIndex:null,markerBorderColor:s,markerBorderThickness:t};k.push(n)}else for(var v=0;v<l.dataPoints.length;v++){var u=l.dataPoints[v],n=u.legendMarkerType?
u.legendMarkerType:l.legendMarkerType?l.legendMarkerType:S.getDefaultLegendMarker(l.type),m=u.legendText?u.legendText:l.legendText?l.legendText:this.itemTextFormatter?this.itemTextFormatter({chart:this.chart,legend:this._options,dataSeries:l,dataPoint:u}):u.name?u.name:"DataPoint: "+(v+1),q=u.legendMarkerColor?u.legendMarkerColor:l.legendMarkerColor?l.legendMarkerColor:u.color?u.color:l.color?l.color:l._colorSet[v%l._colorSet.length],r=0.6*this.lineHeight,s=u.legendMarkerBorderColor?u.legendMarkerBorderColor:
l.legendMarkerBorderColor?l.legendMarkerBorderColor:u.markerBorderColor?u.markerBorderColor:l.markerBorderColor,t=u.legendMarkerBorderThickness?u.legendMarkerBorderThickness:l.legendMarkerBorderThickness?l.legendMarkerBorderThickness:u.markerBorderThickness||l.markerBorderThickness?Math.max(1,Math.round(0.2*r)):0,m=this.chart.replaceKeywordsWithValue(m,u,l,v),n={markerType:n,markerColor:q,text:m,textBlock:null,chartType:l.type,markerSize:r,dataSeriesIndex:h,dataPointIndex:v,markerBorderColor:s,markerBorderThickness:t};
(u.showInLegend||l.showInLegend&&!1!==u.showInLegend)&&k.push(n)}}!0===this.reversed&&k.reverse();if(0<k.length){l=null;v=m=u=0;m=null!==this.itemWidth?null!==this.itemMaxWidth?Math.min(this.itemWidth,this.itemMaxWidth,f):Math.min(this.itemWidth,f):null!==this.itemMaxWidth?Math.min(this.itemMaxWidth,f):f;r=0===r?0.6*this.lineHeight:r;m-=r+0.1*this.horizontalSpacing;for(h=0;h<k.length;h++){n=k[h];if("line"===n.chartType||"spline"===n.chartType||"stepLine"===n.chartType)m-=2*0.1*this.lineHeight;if(!(0>=
g||"undefined"===typeof g||0>=m||"undefined"===typeof m)){if("horizontal"===this.orientation){n.textBlock=new H(this.ctx,{x:0,y:0,maxWidth:m,maxHeight:this.itemWrap?g:this.lineHeight,angle:0,text:n.text,horizontalAlign:"left",fontSize:this.fontSize,fontFamily:this.fontFamily,fontWeight:this.fontWeight,fontColor:this.fontColor,fontStyle:this.fontStyle,textBaseline:"top"});n.textBlock.measureText();null!==this.itemWidth&&(n.textBlock.width=this.itemWidth-(r+0.1*this.horizontalSpacing+("line"===n.chartType||
"spline"===n.chartType||"stepLine"===n.chartType?2*0.1*this.lineHeight:0)));if(!l||l.width+Math.round(n.textBlock.width+0.1*this.horizontalSpacing+r+(0===l.width?0:this.horizontalSpacing)+("line"===n.chartType||"spline"===n.chartType||"stepLine"===n.chartType?2*0.1*this.lineHeight:0))>f)l={items:[],width:0},p.push(l),this.height+=v,v=0;v=Math.max(v,n.textBlock.height)}else n.textBlock=new H(this.ctx,{x:0,y:0,maxWidth:m,maxHeight:!0===this.itemWrap?g:1.5*this.fontSize,angle:0,text:n.text,horizontalAlign:"left",
fontSize:this.fontSize,fontFamily:this.fontFamily,fontWeight:this.fontWeight,fontColor:this.fontColor,fontStyle:this.fontStyle,textBaseline:"top"}),n.textBlock.measureText(),null!==this.itemWidth&&(n.textBlock.width=this.itemWidth-(r+0.1*this.horizontalSpacing+("line"===n.chartType||"spline"===n.chartType||"stepLine"===n.chartType?2*0.1*this.lineHeight:0))),this.height<=g?(l={items:[],width:0},p.push(l)):(l=p[u],u=(u+1)%p.length),this.height+=n.textBlock.height;n.textBlock.x=l.width;n.textBlock.y=
0;l.width+=Math.round(n.textBlock.width+0.1*this.horizontalSpacing+r+(0===l.width?0:this.horizontalSpacing)+("line"===n.chartType||"spline"===n.chartType||"stepLine"===n.chartType?2*0.1*this.lineHeight:0));l.items.push(n);this.width=Math.max(l.width,this.width)}}this.height=!1===this.itemWrap?p.length*this.lineHeight:this.height+v;this.height=Math.min(g,this.height);this.width=Math.min(f,this.width)}"top"===this.verticalAlign?(e="left"===this.horizontalAlign?b.x1:"right"===this.horizontalAlign?b.x2-
this.width:b.x1+b.width/2-this.width/2,d=b.y1):"center"===this.verticalAlign?(e="left"===this.horizontalAlign?b.x1:"right"===this.horizontalAlign?b.x2-this.width:b.x1+b.width/2-this.width/2,d=b.y1+b.height/2-this.height/2):"bottom"===this.verticalAlign&&(e="left"===this.horizontalAlign?b.x1:"right"===this.horizontalAlign?b.x2-this.width:b.x1+b.width/2-this.width/2,d=b.y2-this.height);this.items=k;for(h=0;h<this.items.length;h++)n=k[h],n.id=++this.chart._eventManager.lastObjectId,this.chart._eventManager.objectMap[n.id]=
{id:n.id,objectType:"legendItem",legendItemIndex:h,dataSeriesIndex:n.dataSeriesIndex,dataPointIndex:n.dataPointIndex};for(h=b=0;h<p.length;h++){l=p[h];for(k=v=0;k<l.items.length;k++){n=l.items[k];m=n.textBlock.x+e+(0===k?0.2*r:this.horizontalSpacing);q=d+b;u=m;this.chart.data[n.dataSeriesIndex].visible||(this.ctx.globalAlpha=0.5);this.ctx.save();this.ctx.rect(e,d,f,g);this.ctx.clip();if("line"===n.chartType||"stepLine"===n.chartType||"spline"===n.chartType)this.ctx.strokeStyle=n.lineColor,this.ctx.lineWidth=
Math.ceil(this.lineHeight/8),this.ctx.beginPath(),this.ctx.moveTo(m-0.1*this.lineHeight,q+this.lineHeight/2),this.ctx.lineTo(m+0.7*this.lineHeight,q+this.lineHeight/2),this.ctx.stroke(),u-=0.1*this.lineHeight;K.drawMarker(m+r/2,q+this.lineHeight/2,this.ctx,n.markerType,n.markerSize,n.markerColor,n.markerBorderColor,n.markerBorderThickness);n.textBlock.x=m+0.1*this.horizontalSpacing+r;if("line"===n.chartType||"stepLine"===n.chartType||"spline"===n.chartType)n.textBlock.x+=0.1*this.lineHeight;n.textBlock.y=
q;n.textBlock.render(!0);this.ctx.restore();v=0<k?Math.max(v,n.textBlock.height):n.textBlock.height;this.chart.data[n.dataSeriesIndex].visible||(this.ctx.globalAlpha=1);m=B(n.id);this.ghostCtx.fillStyle=m;this.ghostCtx.beginPath();this.ghostCtx.fillRect(u,n.textBlock.y,n.textBlock.x+n.textBlock.width-u,n.textBlock.height);n.x1=this.chart._eventManager.objectMap[n.id].x1=u;n.y1=this.chart._eventManager.objectMap[n.id].y1=n.textBlock.y;n.x2=this.chart._eventManager.objectMap[n.id].x2=n.textBlock.x+
n.textBlock.width;n.y2=this.chart._eventManager.objectMap[n.id].y2=n.textBlock.y+n.textBlock.height}b+=v}a.layoutManager.registerSpace(c,{width:this.width+2+2,height:this.height+5+5});this.bounds={x1:e,y1:d,x2:e+this.width,y2:d+this.height}};O(oa,G);oa.prototype.render=function(){var a=this.chart.layoutManager.getFreeSpace();this.ctx.fillStyle="red";this.ctx.fillRect(a.x1,a.y1,a.x2,a.y2)};O(S,G);S.prototype.getDefaultAxisPlacement=function(){var a=this.type;if("column"===a||"line"===a||"stepLine"===
a||"spline"===a||"area"===a||"stepArea"===a||"splineArea"===a||"stackedColumn"===a||"stackedLine"===a||"bubble"===a||"scatter"===a||"stackedArea"===a||"stackedColumn100"===a||"stackedLine100"===a||"stackedArea100"===a||"candlestick"===a||"ohlc"===a||"rangeColumn"===a||"rangeArea"===a||"rangeSplineArea"===a)return"normal";if("bar"===a||"stackedBar"===a||"stackedBar100"===a||"rangeBar"===a)return"xySwapped";if("pie"===a||"doughnut"===a||"funnel"===a)return"none";window.console.log("Unknown Chart Type: "+
a);return null};S.getDefaultLegendMarker=function(a){if("column"===a||"stackedColumn"===a||"stackedLine"===a||"bar"===a||"stackedBar"===a||"stackedBar100"===a||"bubble"===a||"scatter"===a||"stackedColumn100"===a||"stackedLine100"===a||"stepArea"===a||"candlestick"===a||"ohlc"===a||"rangeColumn"===a||"rangeBar"===a||"rangeArea"===a||"rangeSplineArea"===a)return"square";if("line"===a||"stepLine"===a||"spline"===a||"pie"===a||"doughnut"===a||"funnel"===a)return"circle";if("area"===a||"splineArea"===
a||"stackedArea"===a||"stackedArea100"===a)return"triangle";window.console.log("Unknown Chart Type: "+a);return null};S.prototype.getDataPointAtX=function(a,b){if(!this.dataPoints||0===this.dataPoints.length)return null;var c={dataPoint:null,distance:Infinity,index:NaN},d=null,e=0,f=0,g=1,k=Infinity,p=0,h=0,l=0;"none"!==this.chart.plotInfo.axisPlacement&&(l=this.dataPoints[this.dataPoints.length-1].x-this.dataPoints[0].x,l=0<l?Math.min(Math.max((this.dataPoints.length-1)/l*(a-this.dataPoints[0].x)>>
0,0),this.dataPoints.length):0);for(;;){f=0<g?l+e:l-e;if(0<=f&&f<this.dataPoints.length){var d=this.dataPoints[f],n=Math.abs(d.x-a);n<c.distance&&(c.dataPoint=d,c.distance=n,c.index=f);d=Math.abs(d.x-a);d<=k?k=d:0<g?p++:h++;if(1E3<p&&1E3<h)break}else if(0>l-e&&l+e>=this.dataPoints.length)break;-1===g?(e++,g=1):g=-1}return b||c.dataPoint.x!==a?b&&null!==c.dataPoint?c:null:c};S.prototype.getDataPointAtXY=function(a,b,c){if(!this.dataPoints||0===this.dataPoints.length)return null;c=c||!1;var d=[],e=
0,f=0,g=1,k=!1,p=Infinity,h=0,l=0,n=0;"none"!==this.chart.plotInfo.axisPlacement&&(n=this.chart.axisX.getXValueAt({x:a,y:b}),f=this.dataPoints[this.dataPoints.length-1].x-this.dataPoints[0].x,n=0<f?Math.min(Math.max((this.dataPoints.length-1)/f*(n-this.dataPoints[0].x)>>0,0),this.dataPoints.length):0);for(;;){f=0<g?n+e:n-e;if(0<=f&&f<this.dataPoints.length){var m=this.chart._eventManager.objectMap[this.dataPointIds[f]],q=this.dataPoints[f],r=null;if(m){switch(this.type){case "column":case "stackedColumn":case "stackedColumn100":case "bar":case "stackedBar":case "stackedBar100":case "rangeColumn":case "rangeBar":a>=
m.x1&&(a<=m.x2&&b>=m.y1&&b<=m.y2)&&(d.push({dataPoint:q,dataPointIndex:f,dataSeries:this,distance:Math.min(Math.abs(m.x1-a),Math.abs(m.x2-a),Math.abs(m.y1-b),Math.abs(m.y2-b))}),k=!0);break;case "line":case "stepLine":case "spline":case "area":case "stepArea":case "stackedArea":case "stackedArea100":case "splineArea":case "scatter":var s=N("markerSize",q,this)||4,t=c?20:s,r=Math.sqrt(Math.pow(m.x1-a,2)+Math.pow(m.y1-b,2));r<=t&&d.push({dataPoint:q,dataPointIndex:f,dataSeries:this,distance:r});f=Math.abs(m.x1-
a);f<=p?p=f:0<g?h++:l++;r<=s/2&&(k=!0);break;case "rangeArea":case "rangeSplineArea":s=N("markerSize",q,this)||4;t=c?20:s;r=Math.min(Math.sqrt(Math.pow(m.x1-a,2)+Math.pow(m.y1-b,2)),Math.sqrt(Math.pow(m.x1-a,2)+Math.pow(m.y2-b,2)));r<=t&&d.push({dataPoint:q,dataPointIndex:f,dataSeries:this,distance:r});f=Math.abs(m.x1-a);f<=p?p=f:0<g?h++:l++;r<=s/2&&(k=!0);break;case "bubble":s=m.size;r=Math.sqrt(Math.pow(m.x1-a,2)+Math.pow(m.y1-b,2));r<=s/2&&(d.push({dataPoint:q,dataPointIndex:f,dataSeries:this,
distance:r}),k=!0);break;case "pie":case "doughnut":s=m.center;t="doughnut"===this.type?m.percentInnerRadius*m.radius:0;r=Math.sqrt(Math.pow(s.x-a,2)+Math.pow(s.y-b,2));r<m.radius&&r>t&&(r=Math.atan2(b-s.y,a-s.x),0>r&&(r+=2*Math.PI),r=Number(((180*(r/Math.PI)%360+360)%360).toFixed(12)),s=Number(((180*(m.startAngle/Math.PI)%360+360)%360).toFixed(12)),t=Number(((180*(m.endAngle/Math.PI)%360+360)%360).toFixed(12)),0===t&&1<m.endAngle&&(t=360),s>=t&&0!==q.y&&(t+=360,r<s&&(r+=360)),r>s&&r<t&&(d.push({dataPoint:q,
dataPointIndex:f,dataSeries:this,distance:0}),k=!0));break;case "candlestick":if(a>=m.x1-m.borderThickness/2&&a<=m.x2+m.borderThickness/2&&b>=m.y2-m.borderThickness/2&&b<=m.y3+m.borderThickness/2||Math.abs(m.x2-a+m.x1-a)<m.borderThickness&&b>=m.y1&&b<=m.y4)d.push({dataPoint:q,dataPointIndex:f,dataSeries:this,distance:Math.min(Math.abs(m.x1-a),Math.abs(m.x2-a),Math.abs(m.y2-b),Math.abs(m.y3-b))}),k=!0;break;case "ohlc":if(Math.abs(m.x2-a+m.x1-a)<m.borderThickness&&b>=m.y2&&b<=m.y3||a>=m.x1&&a<=(m.x2+
m.x1)/2&&b>=m.y1-m.borderThickness/2&&b<=m.y1+m.borderThickness/2||a>=(m.x1+m.x2)/2&&a<=m.x2&&b>=m.y4-m.borderThickness/2&&b<=m.y4+m.borderThickness/2)d.push({dataPoint:q,dataPointIndex:f,dataSeries:this,distance:Math.min(Math.abs(m.x1-a),Math.abs(m.x2-a),Math.abs(m.y2-b),Math.abs(m.y3-b))}),k=!0}if(k||1E3<h&&1E3<l)break}}else if(0>n-e&&n+e>=this.dataPoints.length)break;-1===g?(e++,g=1):g=-1}a=null;for(b=0;b<d.length;b++)a?d[b].distance<=a.distance&&(a=d[b]):a=d[b];return a};S.prototype.getMarkerProperties=
function(a,b,c,d){var e=this.dataPoints;return{x:b,y:c,ctx:d,type:e[a].markerType?e[a].markerType:this.markerType,size:e[a].markerSize?e[a].markerSize:this.markerSize,color:e[a].markerColor?e[a].markerColor:this.markerColor?this.markerColor:e[a].color?e[a].color:this.color?this.color:this._colorSet[a%this._colorSet.length],borderColor:e[a].markerBorderColor?e[a].markerBorderColor:this.markerBorderColor?this.markerBorderColor:null,borderThickness:e[a].markerBorderThickness?e[a].markerBorderThickness:
this.markerBorderThickness?this.markerBorderThickness:null}};O(C,G);C.prototype.createLabels=function(){var a,b=0,c,d=0,e=0,b=0;if("bottom"===this._position||"top"===this._position)b=this.lineCoordinates.width/Math.abs(this.viewportMaximum-this.viewportMinimum)*this.interval,d=this.labelAutoFit?"undefined"===typeof this._options.labelMaxWidth?0.9*b>>0:this.labelMaxWidth:"undefined"===typeof this._options.labelMaxWidth?0.7*this.chart.width>>0:this.labelMaxWidth,e="undefined"===typeof this._options.labelWrap||
this.labelWrap?0.5*this.chart.height>>0:1.5*this.labelFontSize;else if("left"===this._position||"right"===this._position)b=this.lineCoordinates.height/Math.abs(this.viewportMaximum-this.viewportMinimum)*this.interval,d=this.labelAutoFit?"undefined"===typeof this._options.labelMaxWidth?0.3*this.chart.width>>0:this.labelMaxWidth:"undefined"===typeof this._options.labelMaxWidth?0.5*this.chart.width>>0:this.labelMaxWidth,e="undefined"===typeof this._options.labelWrap||this.labelWrap?2*b>>0:1.5*this.labelFontSize;
if("axisX"===this.type&&"dateTime"===this.chart.plotInfo.axisXValueType)for(c=sa(new Date(this.viewportMaximum),this.interval,this.intervalType),b=this.intervalStartPosition;b<c;sa(b,this.interval,this.intervalType))a=b.getTime(),a=this.labelFormatter?this.labelFormatter({chart:this.chart,axis:this._options,value:b,label:this.labels[b]?this.labels[b]:null}):"axisX"===this.type&&this.labels[a]?this.labels[a]:qa(b,this.valueFormatString,this.chart._cultureInfo),a=new H(this.ctx,{x:0,y:0,maxWidth:d,
maxHeight:e,angle:this.labelAngle,text:this.prefix+a+this.suffix,horizontalAlign:"left",fontSize:this.labelFontSize,fontFamily:this.labelFontFamily,fontWeight:this.labelFontWeight,fontColor:this.labelFontColor,fontStyle:this.labelFontStyle,textBaseline:"middle"}),this._labels.push({position:b.getTime(),textBlock:a,effectiveHeight:null});else{c=this.viewportMaximum;if(this.labels&&this.labels.length){a=Math.ceil(this.interval);for(var f=Math.ceil(this.intervalStartPosition),g=!1,b=f;b<this.viewportMaximum;b+=
a)if(this.labels[b])g=!0;else{g=!1;break}g&&(this.interval=a,this.intervalStartPosition=f)}for(b=this.intervalStartPosition;b<=c;b=parseFloat((b+this.interval).toFixed(14)))a=this.labelFormatter?this.labelFormatter({chart:this.chart,axis:this._options,value:b,label:this.labels[b]?this.labels[b]:null}):"axisX"===this.type&&this.labels[b]?this.labels[b]:W(b,this.valueFormatString,this.chart._cultureInfo),a=new H(this.ctx,{x:0,y:0,maxWidth:d,maxHeight:e,angle:this.labelAngle,text:this.prefix+a+this.suffix,
horizontalAlign:"left",fontSize:this.labelFontSize,fontFamily:this.labelFontFamily,fontWeight:this.labelFontWeight,fontColor:this.labelFontColor,fontStyle:this.labelFontStyle,textBaseline:"middle",borderThickness:0}),this._labels.push({position:b,textBlock:a,effectiveHeight:null})}for(b=0;b<this.stripLines.length;b++)c=this.stripLines[b],a=new H(this.ctx,{x:0,y:0,backgroundColor:c.labelBackgroundColor,maxWidth:d,maxHeight:e,angle:this.labelAngle,text:c.labelFormatter?c.labelFormatter({chart:this.chart,
axis:this,stripLine:c}):c.label,horizontalAlign:"left",fontSize:c.labelFontSize,fontFamily:c.labelFontFamily,fontWeight:c.labelFontWeight,fontColor:c._options.labelFontColor||c.color,fontStyle:c.labelFontStyle,textBaseline:"middle",borderThickness:0}),this._labels.push({position:c.value,textBlock:a,effectiveHeight:null,stripLine:c})};C.prototype.createLabelsAndCalculateWidth=function(){var a=0;this._labels=[];if("left"===this._position||"right"===this._position)for(this.createLabels(),i=0;i<this._labels.length;i++){var b=
this._labels[i].textBlock.measureText(),c=0,c=0===this.labelAngle?b.width:b.width*Math.cos(Math.PI/180*Math.abs(this.labelAngle))+b.height/2*Math.sin(Math.PI/180*Math.abs(this.labelAngle));a<c&&(a=c);this._labels[i].effectiveWidth=c}return(this.title?da(this.titleFontFamily,this.titleFontSize,this.titleFontWeight)+2:0)+a+this.tickLength+5};C.prototype.createLabelsAndCalculateHeight=function(){var a=0;this._labels=[];var b,c=0;this.createLabels();if("bottom"===this._position||"top"===this._position)for(c=
0;c<this._labels.length;c++){b=this._labels[c].textBlock;b=b.measureText();var d=0,d=0===this.labelAngle?b.height:b.width*Math.sin(Math.PI/180*Math.abs(this.labelAngle))+b.height/2*Math.cos(Math.PI/180*Math.abs(this.labelAngle));a<d&&(a=d);this._labels[c].effectiveHeight=d}return(this.title?da(this.titleFontFamily,this.titleFontSize,this.titleFontWeight)+2:0)+a+this.tickLength+5};C.setLayoutAndRender=function(a,b,c,d,e){var f,g,k,p=a.chart,h=p.ctx;a.calculateAxisParameters();b&&b.calculateAxisParameters();
c&&c.calculateAxisParameters();var l=b?b.margin:0;if("normal"===d){a.lineCoordinates={};var n=Math.ceil(b?b.createLabelsAndCalculateWidth():0);f=Math.round(e.x1+n+l);a.lineCoordinates.x1=f;l=Math.ceil(c?c.createLabelsAndCalculateWidth():0);g=Math.round(e.x2-l>a.chart.width-10?a.chart.width-10:e.x2-l);a.lineCoordinates.x2=g;a.lineCoordinates.width=Math.abs(g-f);var m=Math.ceil(a.createLabelsAndCalculateHeight());d=Math.round(e.y2-m-a.margin);k=Math.round(e.y2-a.margin);a.lineCoordinates.y1=d;a.lineCoordinates.y2=
d;a.boundingRect={x1:f,y1:d,x2:g,y2:k,width:g-f,height:k-d};b&&(f=Math.round(e.x1+b.margin),d=Math.round(10>e.y1?10:e.y1),g=Math.round(e.x1+n+b.margin),k=Math.round(e.y2-m-a.margin),b.lineCoordinates={x1:g,y1:d,x2:g,y2:k,height:Math.abs(k-d)},b.boundingRect={x1:f,y1:d,x2:g,y2:k,width:g-f,height:k-d});c&&(f=Math.round(a.lineCoordinates.x2),d=Math.round(10>e.y1?10:e.y1),g=Math.round(f+l+c.margin),k=Math.round(e.y2-m-a.margin),c.lineCoordinates={x1:f,y1:d,x2:f,y2:k,height:Math.abs(k-d)},c.boundingRect=
{x1:f,y1:d,x2:g,y2:k,width:g-f,height:k-d});a.calculateValueToPixelConversionParameters();b&&b.calculateValueToPixelConversionParameters();c&&c.calculateValueToPixelConversionParameters();h.save();h.rect(5,a.boundingRect.y1,a.chart.width-10,a.boundingRect.height);h.clip();a.renderLabelsTicksAndTitle();h.restore();b&&b.renderLabelsTicksAndTitle();c&&c.renderLabelsTicksAndTitle()}else{n=Math.ceil(a.createLabelsAndCalculateWidth());b&&(b.lineCoordinates={},f=Math.round(e.x1+n+a.margin),g=Math.round(e.x2>
b.chart.width-10?b.chart.width-10:e.x2),b.lineCoordinates.x1=f,b.lineCoordinates.x2=g,b.lineCoordinates.width=Math.abs(g-f));c&&(c.lineCoordinates={},f=Math.round(e.x1+n+a.margin),g=Math.round(e.x2>c.chart.width-10?c.chart.width-10:e.x2),c.lineCoordinates.x1=f,c.lineCoordinates.x2=g,c.lineCoordinates.width=Math.abs(g-f));var m=Math.ceil(b?b.createLabelsAndCalculateHeight():0),q=Math.ceil(c?c.createLabelsAndCalculateHeight():0);b&&(d=Math.round(e.y2-m-b.margin),k=Math.round(e.y2-l>b.chart.height-10?
b.chart.height-10:e.y2-l),b.lineCoordinates.y1=d,b.lineCoordinates.y2=d,b.boundingRect={x1:f,y1:d,x2:g,y2:k,width:g-f,height:m});c&&(d=Math.round(e.y1+c.margin),k=e.y1+c.margin+q,c.lineCoordinates.y1=k,c.lineCoordinates.y2=k,c.boundingRect={x1:f,y1:d,x2:g,y2:k,width:g-f,height:q});f=Math.round(e.x1+a.margin);d=Math.round(c?c.lineCoordinates.y2:10>e.y1?10:e.y1);g=Math.round(e.x1+n+a.margin);k=Math.round(b?b.lineCoordinates.y1:e.y2-l>a.chart.height-10?a.chart.height-10:e.y2-l);a.lineCoordinates={x1:g,
y1:d,x2:g,y2:k,height:Math.abs(k-d)};a.boundingRect={x1:f,y1:d,x2:g,y2:k,width:g-f,height:k-d};a.calculateValueToPixelConversionParameters();b&&b.calculateValueToPixelConversionParameters();c&&c.calculateValueToPixelConversionParameters();b&&b.renderLabelsTicksAndTitle();c&&c.renderLabelsTicksAndTitle();a.renderLabelsTicksAndTitle()}p.preparePlotArea();e=a.chart.plotArea;h.save();h.rect(e.x1,e.y1,Math.abs(e.x2-e.x1),Math.abs(e.y2-e.y1));h.clip();a.renderStripLinesOfThicknessType("value");b&&b.renderStripLinesOfThicknessType("value");
c&&c.renderStripLinesOfThicknessType("value");a.renderInterlacedColors();b&&b.renderInterlacedColors();c&&c.renderInterlacedColors();h.restore();a.renderGrid();b&&b.renderGrid();c&&c.renderGrid();a.renderAxisLine();b&&b.renderAxisLine();c&&c.renderAxisLine();a.renderStripLinesOfThicknessType("pixel");b&&b.renderStripLinesOfThicknessType("pixel");c&&c.renderStripLinesOfThicknessType("pixel")};C.prototype.renderLabelsTicksAndTitle=function(){var a=!1,b=0,c=1,d=0;0!==this.labelAngle&&360!==this.labelAngle&&
(c=1.2);if("undefined"===typeof this._options.interval){if("bottom"===this._position||"top"===this._position){for(e=0;e<this._labels.length;e++)f=this._labels[e],f.position<this.viewportMinimum||f.stripLine||(f=f.textBlock.width*Math.cos(Math.PI/180*this.labelAngle)+f.textBlock.height*Math.sin(Math.PI/180*this.labelAngle),b+=f);b>this.lineCoordinates.width*c&&(a=!0)}if("left"===this._position||"right"===this._position){for(e=0;e<this._labels.length;e++)f=this._labels[e],f.position<this.viewportMinimum||
f.stripLine||(f=f.textBlock.height*Math.cos(Math.PI/180*this.labelAngle)+f.textBlock.width*Math.sin(Math.PI/180*this.labelAngle),b+=f);b>this.lineCoordinates.height*c&&(a=!0)}}if("bottom"===this._position){for(var e=0,f,e=0;e<this._labels.length;e++)if(f=this._labels[e],!(f.position<this.viewportMinimum||f.position>this.viewportMaximum)){b=this.getPixelCoordinatesOnAxis(f.position);if(this.tickThickness&&!this._labels[e].stripLine||this._labels[e].stripLine&&"pixel"===this._labels[e].stripLine._thicknessType)this._labels[e].stripLine?
(c=this._labels[e].stripLine,this.ctx.lineWidth=c.thickness,this.ctx.strokeStyle=c.color):(this.ctx.lineWidth=this.tickThickness,this.ctx.strokeStyle=this.tickColor),c=1===this.ctx.lineWidth%2?(b.x<<0)+0.5:b.x<<0,this.ctx.beginPath(),this.ctx.moveTo(c,b.y<<0),this.ctx.lineTo(c,b.y+this.tickLength<<0),this.ctx.stroke();if(!a||0===d++%2||this._labels[e].stripLine)0===f.textBlock.angle?(b.x-=f.textBlock.width/2,b.y+=this.tickLength+f.textBlock.fontSize/2):(b.x-=0>this.labelAngle?f.textBlock.width*Math.cos(Math.PI/
180*this.labelAngle):0,b.y+=this.tickLength+Math.abs(0>this.labelAngle?f.textBlock.width*Math.sin(Math.PI/180*this.labelAngle)-5:5)),f.textBlock.x=b.x,f.textBlock.y=b.y,f.textBlock.render(!0)}this.title&&(this._titleTextBlock=new H(this.ctx,{x:this.lineCoordinates.x1,y:this.boundingRect.y2-this.titleFontSize-5,maxWidth:this.lineCoordinates.width,maxHeight:1.5*this.titleFontSize,angle:0,text:this.title,horizontalAlign:"center",fontSize:this.titleFontSize,fontFamily:this.titleFontFamily,fontWeight:this.titleFontWeight,
fontColor:this.titleFontColor,fontStyle:this.titleFontStyle,textBaseline:"top"}),this._titleTextBlock.measureText(),this._titleTextBlock.x=this.lineCoordinates.x1+this.lineCoordinates.width/2-this._titleTextBlock.width/2,this._titleTextBlock.y=this.boundingRect.y2-this._titleTextBlock.height-3,this._titleTextBlock.render(!0))}else if("top"===this._position){for(e=0;e<this._labels.length;e++)if(f=this._labels[e],!(f.position<this.viewportMinimum||f.position>this.viewportMaximum)){b=this.getPixelCoordinatesOnAxis(f.position);
if(this.tickThickness&&!this._labels[e].stripLine||this._labels[e].stripLine&&"pixel"===this._labels[e].stripLine._thicknessType)this._labels[e].stripLine?(c=this._labels[e].stripLine,this.ctx.lineWidth=c.thickness,this.ctx.strokeStyle=c.color):(this.ctx.lineWidth=this.tickThickness,this.ctx.strokeStyle=this.tickColor),c=1===this.ctx.lineWidth%2?(b.x<<0)+0.5:b.x<<0,this.ctx.beginPath(),this.ctx.moveTo(c,b.y<<0),this.ctx.lineTo(c,b.y-this.tickLength<<0),this.ctx.stroke();if(!a||0===d++%2||this._labels[e].stripLine)0===
f.textBlock.angle?(b.x-=f.textBlock.width/2,b.y-=this.tickLength+f.textBlock.height/2):(b.x-=0<this.labelAngle?f.textBlock.width*Math.cos(Math.PI/180*this.labelAngle):0,b.y-=this.tickLength+Math.abs(0<this.labelAngle?f.textBlock.width*Math.sin(Math.PI/180*this.labelAngle)+5:5)),f.textBlock.x=b.x,f.textBlock.y=b.y,f.textBlock.render(!0)}this.title&&(this._titleTextBlock=new H(this.ctx,{x:this.lineCoordinates.x1,y:this.boundingRect.y1+1,maxWidth:this.lineCoordinates.width,maxHeight:1.5*this.titleFontSize,
angle:0,text:this.title,horizontalAlign:"center",fontSize:this.titleFontSize,fontFamily:this.titleFontFamily,fontWeight:this.titleFontWeight,fontColor:this.titleFontColor,fontStyle:this.titleFontStyle,textBaseline:"top"}),this._titleTextBlock.measureText(),this._titleTextBlock.x=this.lineCoordinates.x1+this.lineCoordinates.width/2-this._titleTextBlock.width/2,this._titleTextBlock.render(!0))}else if("left"===this._position){for(e=0;e<this._labels.length;e++)if(f=this._labels[e],!(f.position<this.viewportMinimum||
f.position>this.viewportMaximum)){b=this.getPixelCoordinatesOnAxis(f.position);if(this.tickThickness&&!this._labels[e].stripLine||this._labels[e].stripLine&&"pixel"===this._labels[e].stripLine._thicknessType)this._labels[e].stripLine?(c=this._labels[e].stripLine,this.ctx.lineWidth=c.thickness,this.ctx.strokeStyle=c.color):(this.ctx.lineWidth=this.tickThickness,this.ctx.strokeStyle=this.tickColor),c=1===this.ctx.lineWidth%2?(b.y<<0)+0.5:b.y<<0,this.ctx.beginPath(),this.ctx.moveTo(b.x<<0,c),this.ctx.lineTo(b.x-
this.tickLength<<0,c),this.ctx.stroke();if(!a||0===d++%2||this._labels[e].stripLine)f.textBlock.x=b.x-f.textBlock.width*Math.cos(Math.PI/180*this.labelAngle)-this.tickLength-5,f.textBlock.y=0===this.labelAngle?b.y:b.y-f.textBlock.width*Math.sin(Math.PI/180*this.labelAngle),f.textBlock.render(!0)}this.title&&(this._titleTextBlock=new H(this.ctx,{x:this.boundingRect.x1+1,y:this.lineCoordinates.y2,maxWidth:this.lineCoordinates.height,maxHeight:1.5*this.titleFontSize,angle:-90,text:this.title,horizontalAlign:"center",
fontSize:this.titleFontSize,fontFamily:this.titleFontFamily,fontWeight:this.titleFontWeight,fontColor:this.titleFontColor,fontStyle:this.titleFontStyle,textBaseline:"top"}),this._titleTextBlock.measureText(),this._titleTextBlock.y=this.lineCoordinates.height/2+this._titleTextBlock.width/2+this.lineCoordinates.y1,this._titleTextBlock.render(!0))}else if("right"===this._position){for(e=0;e<this._labels.length;e++)if(f=this._labels[e],!(f.position<this.viewportMinimum||f.position>this.viewportMaximum)){b=
this.getPixelCoordinatesOnAxis(f.position);if(this.tickThickness&&!this._labels[e].stripLine||this._labels[e].stripLine&&"pixel"===this._labels[e].stripLine._thicknessType)this._labels[e].stripLine?(c=this._labels[e].stripLine,this.ctx.lineWidth=c.thickness,this.ctx.strokeStyle=c.color):(this.ctx.lineWidth=this.tickThickness,this.ctx.strokeStyle=this.tickColor),c=1===this.ctx.lineWidth%2?(b.y<<0)+0.5:b.y<<0,this.ctx.beginPath(),this.ctx.moveTo(b.x<<0,c),this.ctx.lineTo(b.x+this.tickLength<<0,c),this.ctx.stroke();
if(!a||0===d++%2||this._labels[e].stripLine)f.textBlock.x=b.x+this.tickLength+5,f.textBlock.y=b.y,f.textBlock.render(!0)}this.title&&(this._titleTextBlock=new H(this.ctx,{x:this.boundingRect.x2-1,y:this.lineCoordinates.y2,maxWidth:this.lineCoordinates.height,maxHeight:1.5*this.titleFontSize,angle:90,text:this.title,horizontalAlign:"center",fontSize:this.titleFontSize,fontFamily:this.titleFontFamily,fontWeight:this.titleFontWeight,fontColor:this.titleFontColor,fontStyle:this.titleFontStyle,textBaseline:"top"}),
this._titleTextBlock.measureText(),this._titleTextBlock.y=this.lineCoordinates.height/2-this._titleTextBlock.width/2+this.lineCoordinates.y1,this._titleTextBlock.render(!0))}};C.prototype.renderInterlacedColors=function(){var a=this.chart.plotArea.ctx,b,c,d=this.chart.plotArea,e=0;b=!0;if(("bottom"===this._position||"top"===this._position)&&this.interlacedColor)for(a.fillStyle=this.interlacedColor,e=0;e<this._labels.length;e++)this._labels[e].stripLine||(b?(b=this.getPixelCoordinatesOnAxis(this._labels[e].position),
c=e+1>=this._labels.length-1?this.getPixelCoordinatesOnAxis(this.viewportMaximum):this.getPixelCoordinatesOnAxis(this._labels[e+1].position),a.fillRect(b.x,d.y1,Math.abs(c.x-b.x),Math.abs(d.y1-d.y2)),b=!1):b=!0);else if(("left"===this._position||"right"===this._position)&&this.interlacedColor)for(a.fillStyle=this.interlacedColor,e=0;e<this._labels.length;e++)this._labels[e].stripLine||(b?(c=this.getPixelCoordinatesOnAxis(this._labels[e].position),b=e+1>=this._labels.length-1?this.getPixelCoordinatesOnAxis(this.viewportMaximum):
this.getPixelCoordinatesOnAxis(this._labels[e+1].position),a.fillRect(d.x1,b.y,Math.abs(d.x1-d.x2),Math.abs(b.y-c.y)),b=!1):b=!0);a.beginPath()};C.prototype.renderStripLinesOfThicknessType=function(a){if(this.stripLines&&0<this.stripLines.length&&a)for(var b=0,b=0;b<this.stripLines.length;b++){var c=this.stripLines[b];c._thicknessType===a&&("pixel"===a&&(c.value<this.viewportMinimum||c.value>this.viewportMaximum)||(c.showOnTop?this.chart.addEventListener("dataAnimationIterationEnd",c.render,c):c.render()))}};
C.prototype.renderGrid=function(){if(this.gridThickness&&0<this.gridThickness){var a=this.chart.ctx,b,c=this.chart.plotArea;a.lineWidth=this.gridThickness;a.strokeStyle=this.gridColor;a.setLineDash&&a.setLineDash(M(this.gridDashType,this.gridThickness));if("bottom"===this._position||"top"===this._position)for(d=0;d<this._labels.length&&!this._labels[d].stripLine;d++)this._labels[d].position<this.viewportMinimum||this._labels[d].position>this.viewportMaximum||(a.beginPath(),b=this.getPixelCoordinatesOnAxis(this._labels[d].position),
b=1===a.lineWidth%2?(b.x<<0)+0.5:b.x<<0,a.moveTo(b,c.y1<<0),a.lineTo(b,c.y2<<0),a.stroke());else if("left"===this._position||"right"===this._position)for(var d=0;d<this._labels.length&&!this._labels[d].stripLine;d++)0===d&&"axisY"===this.type&&this.chart.axisX&&this.chart.axisX.lineThickness||(this._labels[d].position<this.viewportMinimum||this._labels[d].position>this.viewportMaximum)||(a.beginPath(),b=this.getPixelCoordinatesOnAxis(this._labels[d].position),b=1===a.lineWidth%2?(b.y<<0)+0.5:b.y<<
0,a.moveTo(c.x1<<0,b),a.lineTo(c.x2<<0,b),a.stroke())}};C.prototype.renderAxisLine=function(){var a=this.chart.ctx;if("bottom"===this._position||"top"===this._position){if(this.lineThickness){a.lineWidth=this.lineThickness;a.strokeStyle=this.lineColor?this.lineColor:"black";a.setLineDash&&a.setLineDash(M(this.lineDashType,this.lineThickness));var b=1===this.lineThickness%2?(this.lineCoordinates.y1<<0)+0.5:this.lineCoordinates.y1<<0;a.beginPath();a.moveTo(this.lineCoordinates.x1,b);a.lineTo(this.lineCoordinates.x2,
b);a.stroke()}}else"left"!==this._position&&"right"!==this._position||!this.lineThickness||(a.lineWidth=this.lineThickness,a.strokeStyle=this.lineColor,a.setLineDash&&a.setLineDash(M(this.lineDashType,this.lineThickness)),b=1===this.lineThickness%2?(this.lineCoordinates.x1<<0)+0.5:this.lineCoordinates.x1<<0,a.beginPath(),a.moveTo(b,this.lineCoordinates.y1),a.lineTo(b,this.lineCoordinates.y2),a.stroke())};C.prototype.getPixelCoordinatesOnAxis=function(a){var b={};if("bottom"===this._position||"top"===
this._position){var c=this.conversionParameters.pixelPerUnit;b.x=this.conversionParameters.reference+c*(a-this.viewportMinimum);b.y=this.lineCoordinates.y1}if("left"===this._position||"right"===this._position)c=-this.conversionParameters.pixelPerUnit,b.y=this.conversionParameters.reference-c*(a-this.viewportMinimum),b.x=this.lineCoordinates.x2;return b};C.prototype.convertPixelToValue=function(a){if(!a)return null;var b=0;return b=this.conversionParameters.minimum+(("left"===this._position||"right"===
this._position?a.y:a.x)-this.conversionParameters.reference)/this.conversionParameters.pixelPerUnit};C.prototype.setViewPortRange=function(a,b){this.sessionVariables.newViewportMinimum=this.viewportMinimum=Math.min(a,b);this.sessionVariables.newViewportMaximum=this.viewportMaximum=Math.max(a,b)};C.prototype.getXValueAt=function(a){if(!a)return null;var b=null;"left"===this._position?b=(this.chart.axisX.viewportMaximum-this.chart.axisX.viewportMinimum)/this.chart.axisX.lineCoordinates.height*(this.chart.axisX.lineCoordinates.y2-
a.y)+this.chart.axisX.viewportMinimum:"bottom"===this._position&&(b=(this.chart.axisX.viewportMaximum-this.chart.axisX.viewportMinimum)/this.chart.axisX.lineCoordinates.width*(a.x-this.chart.axisX.lineCoordinates.x1)+this.chart.axisX.viewportMinimum);return b};C.prototype.calculateValueToPixelConversionParameters=function(a){this.reversed=!1;a={pixelPerUnit:null,minimum:null,reference:null};var b=this.lineCoordinates.width,c=this.lineCoordinates.height;a.minimum=this.viewportMinimum;if("bottom"===
this._position||"top"===this._position)a.pixelPerUnit=(this.reversed?-1:1)*b/Math.abs(this.viewportMaximum-this.viewportMinimum),a.reference=this.reversed?this.lineCoordinates.x2:this.lineCoordinates.x1;if("left"===this._position||"right"===this._position)a.pixelPerUnit=(this.reversed?1:-1)*c/Math.abs(this.viewportMaximum-this.viewportMinimum),a.reference=this.reversed?this.lineCoordinates.y1:this.lineCoordinates.y2;this.conversionParameters=a};C.prototype.calculateAxisParameters=function(){var a=
this.chart.layoutManager.getFreeSpace(),b=!1;"bottom"===this._position||"top"===this._position?(this.maxWidth=a.width,this.maxHeight=a.height):(this.maxWidth=a.height,this.maxHeight=a.width);var a="axisX"===this.type?500>this.maxWidth?8:Math.max(6,Math.floor(this.maxWidth/62)):Math.max(Math.floor(this.maxWidth/40),2),c,d,e,f;f=0;if(null===this.viewportMinimum||isNaN(this.viewportMinimum))this.viewportMinimum=this.minimum;if(null===this.viewportMaximum||isNaN(this.viewportMaximum))this.viewportMaximum=
this.maximum;"axisX"===this.type?(c=null!==this.viewportMinimum?this.viewportMinimum:this.dataInfo.viewPortMin,d=null!==this.viewportMaximum?this.viewportMaximum:this.dataInfo.viewPortMax,0===d-c&&(f="undefined"===typeof this._options.interval?0.4:this._options.interval,d+=f,c-=f),Infinity!==this.dataInfo.minDiff?e=this.dataInfo.minDiff:1<d-c?e=0.5*Math.abs(d-c):(e=1,"dateTime"===this.chart.plotInfo.axisXValueType&&(b=!0))):"axisY"===this.type&&(c=null!==this.viewportMinimum?this.viewportMinimum:
this.dataInfo.viewPortMin,d=null!==this.viewportMaximum?this.viewportMaximum:this.dataInfo.viewPortMax,isFinite(c)||isFinite(d)?isFinite(c)?isFinite(d)||(d=c):c=d:(d="undefined"===typeof this._options.interval?-Infinity:this._options.interval,c=0),0===c&&0===d?(d+=9,c=0):0===d-c?(f=Math.min(Math.abs(0.01*Math.abs(d)),5),d+=f,c-=f):c>d?(f=Math.min(Math.abs(0.01*Math.abs(d-c)),5),0<=d?c=d-f:d=c+f):(f=Math.min(Math.abs(0.01*Math.abs(d-c)),0.05),0!==d&&(d+=f),0!==c&&(c-=f)),e=Infinity!==this.dataInfo.minDiff?
this.dataInfo.minDiff:1<d-c?0.5*Math.abs(d-c):1,this.includeZero&&(null===this.viewportMinimum||isNaN(this.viewportMinimum))&&0<c&&(c=0),this.includeZero&&(null===this.viewportMaximum||isNaN(this.viewportMaximum))&&0>d&&(d=0));f=(isNaN(this.viewportMaximum)||null===this.viewportMaximum?d:this.viewportMaximum)-(isNaN(this.viewportMinimum)||null===this.viewportMinimum?c:this.viewportMinimum);if("axisX"===this.type&&"dateTime"===this.chart.plotInfo.axisXValueType){this.intervalType||(f/1<=a?(this.interval=
1,this.intervalType="millisecond"):f/2<=a?(this.interval=2,this.intervalType="millisecond"):f/5<=a?(this.interval=5,this.intervalType="millisecond"):f/10<=a?(this.interval=10,this.intervalType="millisecond"):f/20<=a?(this.interval=20,this.intervalType="millisecond"):f/50<=a?(this.interval=50,this.intervalType="millisecond"):f/100<=a?(this.interval=100,this.intervalType="millisecond"):f/200<=a?(this.interval=200,this.intervalType="millisecond"):f/250<=a?(this.interval=250,this.intervalType="millisecond"):
f/300<=a?(this.interval=300,this.intervalType="millisecond"):f/400<=a?(this.interval=400,this.intervalType="millisecond"):f/500<=a?(this.interval=500,this.intervalType="millisecond"):f/(1*D.secondDuration)<=a?(this.interval=1,this.intervalType="second"):f/(2*D.secondDuration)<=a?(this.interval=2,this.intervalType="second"):f/(5*D.secondDuration)<=a?(this.interval=5,this.intervalType="second"):f/(10*D.secondDuration)<=a?(this.interval=10,this.intervalType="second"):f/(15*D.secondDuration)<=a?(this.interval=
15,this.intervalType="second"):f/(20*D.secondDuration)<=a?(this.interval=20,this.intervalType="second"):f/(30*D.secondDuration)<=a?(this.interval=30,this.intervalType="second"):f/(1*D.minuteDuration)<=a?(this.interval=1,this.intervalType="minute"):f/(2*D.minuteDuration)<=a?(this.interval=2,this.intervalType="minute"):f/(5*D.minuteDuration)<=a?(this.interval=5,this.intervalType="minute"):f/(10*D.minuteDuration)<=a?(this.interval=10,this.intervalType="minute"):f/(15*D.minuteDuration)<=a?(this.interval=
15,this.intervalType="minute"):f/(20*D.minuteDuration)<=a?(this.interval=20,this.intervalType="minute"):f/(30*D.minuteDuration)<=a?(this.interval=30,this.intervalType="minute"):f/(1*D.hourDuration)<=a?(this.interval=1,this.intervalType="hour"):f/(2*D.hourDuration)<=a?(this.interval=2,this.intervalType="hour"):f/(3*D.hourDuration)<=a?(this.interval=3,this.intervalType="hour"):f/(6*D.hourDuration)<=a?(this.interval=6,this.intervalType="hour"):f/(1*D.dayDuration)<=a?(this.interval=1,this.intervalType=
"day"):f/(2*D.dayDuration)<=a?(this.interval=2,this.intervalType="day"):f/(4*D.dayDuration)<=a?(this.interval=4,this.intervalType="day"):f/(1*D.weekDuration)<=a?(this.interval=1,this.intervalType="week"):f/(2*D.weekDuration)<=a?(this.interval=2,this.intervalType="week"):f/(3*D.weekDuration)<=a?(this.interval=3,this.intervalType="week"):f/(1*D.monthDuration)<=a?(this.interval=1,this.intervalType="month"):f/(2*D.monthDuration)<=a?(this.interval=2,this.intervalType="month"):f/(3*D.monthDuration)<=a?
(this.interval=3,this.intervalType="month"):f/(6*D.monthDuration)<=a?(this.interval=6,this.intervalType="month"):(this.interval=f/(1*D.yearDuration)<=a?1:f/(2*D.yearDuration)<=a?2:f/(4*D.yearDuration)<=a?4:Math.floor(C.getNiceNumber(f/(a-1),!0)/D.yearDuration),this.intervalType="year"));if(null===this.viewportMinimum||isNaN(this.viewportMinimum))this.viewportMinimum=c-e/2;if(null===this.viewportMaximum||isNaN(this.viewportMaximum))this.viewportMaximum=d+e/2;this.valueFormatString||(b?this.valueFormatString=
"MMM DD YYYY HH:mm":"year"===this.intervalType?this.valueFormatString="YYYY":"month"===this.intervalType?this.valueFormatString="MMM YYYY":"week"===this.intervalType?this.valueFormatString="MMM DD YYYY":"day"===this.intervalType?this.valueFormatString="MMM DD YYYY":"hour"===this.intervalType?this.valueFormatString="hh:mm TT":"minute"===this.intervalType?this.valueFormatString="hh:mm TT":"second"===this.intervalType?this.valueFormatString="hh:mm:ss TT":"millisecond"===this.intervalType&&(this.valueFormatString=
"fff'ms'"))}else{this.intervalType="number";f=C.getNiceNumber(f,!1);this.interval=this._options&&this._options.interval?this._options.interval:C.getNiceNumber(f/(a-1),!0);if(null===this.viewportMinimum||isNaN(this.viewportMinimum))this.viewportMinimum="axisX"===this.type?c-e/2:Math.floor(c/this.interval)*this.interval;if(null===this.viewportMaximum||isNaN(this.viewportMaximum))this.viewportMaximum="axisX"===this.type?d+e/2:Math.ceil(d/this.interval)*this.interval;0===this.viewportMaximum&&0===this.viewportMinimum&&
(0===this._options.viewportMinimum?this.viewportMaximum+=10:0===this._options.viewportMaximum&&(this.viewportMinimum-=10),this._options&&"undefined"===typeof this._options.interval&&(this.interval=C.getNiceNumber((this.viewportMaximum-this.viewportMinimum)/(a-1),!0)))}if(null===this.minimum||null===this.maximum)if("axisX"===this.type?(c=null!==this.minimum?this.minimum:this.dataInfo.min,d=null!==this.maximum?this.maximum:this.dataInfo.max,0===d-c&&(f="undefined"===typeof this._options.interval?0.4:
this._options.interval,d+=f,c-=f),e=Infinity!==this.dataInfo.minDiff?this.dataInfo.minDiff:1<d-c?0.5*Math.abs(d-c):1):"axisY"===this.type&&(c=null!==this.minimum?this.minimum:this.dataInfo.min,d=null!==this.maximum?this.maximum:this.dataInfo.max,isFinite(c)||isFinite(d)?0===c&&0===d?(d+=9,c=0):0===d-c?(f=Math.min(Math.abs(0.01*Math.abs(d)),5),d+=f,c-=f):c>d?(f=Math.min(Math.abs(0.01*Math.abs(d-c)),5),0<=d?c=d-f:d=c+f):(f=Math.min(Math.abs(0.01*Math.abs(d-c)),0.05),0!==d&&(d+=f),0!==c&&(c-=f)):(d=
"undefined"===typeof this._options.interval?-Infinity:this._options.interval,c=0),e=Infinity!==this.dataInfo.minDiff?this.dataInfo.minDiff:1<d-c?0.5*Math.abs(d-c):1,this.includeZero&&(null===this.minimum||isNaN(this.minimum))&&0<c&&(c=0),this.includeZero&&(null===this.maximum||isNaN(this.maximum))&&0>d&&(d=0)),"axisX"===this.type&&"dateTime"===this.chart.plotInfo.axisXValueType){if(null===this.minimum||isNaN(this.minimum))this.minimum=c-e/2;if(null===this.maximum||isNaN(this.maximum))this.maximum=
d+e/2}else this.intervalType="number",null===this.minimum&&(this.minimum="axisX"===this.type?c-e/2:Math.floor(c/this.interval)*this.interval,this.minimum=Math.min(this.minimum,null===this.sessionVariables.viewportMinimum||isNaN(this.sessionVariables.viewportMinimum)?Infinity:this.sessionVariables.viewportMinimum)),null===this.maximum&&(this.maximum="axisX"===this.type?d+e/2:Math.ceil(d/this.interval)*this.interval,this.maximum=Math.max(this.maximum,null===this.sessionVariables.viewportMaximum||isNaN(this.sessionVariables.viewportMaximum)?
-Infinity:this.sessionVariables.viewportMaximum)),0===this.maximum&&0===this.minimum&&(0===this._options.minimum?this.maximum+=10:0===this._options.maximum&&(this.minimum-=10));this.viewportMinimum=Math.max(this.viewportMinimum,this.minimum);this.viewportMaximum=Math.min(this.viewportMaximum,this.maximum);this.intervalStartPosition="axisX"===this.type&&"dateTime"===this.chart.plotInfo.axisXValueType?this.getLabelStartPoint(new Date(this.viewportMinimum),this.intervalType,this.interval):Math.floor((this.viewportMinimum+
0.2*this.interval)/this.interval)*this.interval;if(!this.valueFormatString&&(this.valueFormatString="#,##0.##",f=Math.abs(this.viewportMaximum-this.viewportMinimum),1>f)){b=Math.floor(Math.abs(Math.log(f)/Math.LN10))+2;if(isNaN(b)||!isFinite(b))b=2;if(2<b)for(c=0;c<b-2;c++)this.valueFormatString+="#"}};C.getNiceNumber=function(a,b){var c=Math.floor(Math.log(a)/Math.LN10),d=a/Math.pow(10,c);return Number(((b?1.5>d?1:3>d?2:7>d?5:10:1>=d?1:2>=d?2:5>=d?5:10)*Math.pow(10,c)).toFixed(20))};C.prototype.getLabelStartPoint=
function(){var a=D[this.intervalType+"Duration"]*this.interval,a=new Date(Math.floor(this.viewportMinimum/a)*a);if("millisecond"!==this.intervalType)if("second"===this.intervalType)0<a.getMilliseconds()&&(a.setSeconds(a.getSeconds()+1),a.setMilliseconds(0));else if("minute"===this.intervalType){if(0<a.getSeconds()||0<a.getMilliseconds())a.setMinutes(a.getMinutes()+1),a.setSeconds(0),a.setMilliseconds(0)}else if("hour"===this.intervalType){if(0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())a.setHours(a.getHours()+
1),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)}else if("day"===this.intervalType){if(0<a.getHours()||0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())a.setDate(a.getDate()+1),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)}else if("week"===this.intervalType){if(0<a.getDay()||0<a.getHours()||0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())a.setDate(a.getDate()+(7-a.getDay())),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)}else if("month"===
this.intervalType){if(1<a.getDate()||0<a.getHours()||0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())a.setMonth(a.getMonth()+1),a.setDate(1),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)}else"year"===this.intervalType&&(0<a.getMonth()||1<a.getDate()||0<a.getHours()||0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())&&(a.setFullYear(a.getFullYear()+1),a.setMonth(0),a.setDate(1),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0));return a};O(ka,
G);ka.prototype.render=function(){var a=this.parent.getPixelCoordinatesOnAxis(this.value),b=Math.abs("pixel"===this._thicknessType?this.thickness:this.parent.conversionParameters.pixelPerUnit*this.thickness);if(0<b){var c=null===this.opacity?1:this.opacity;this.ctx.strokeStyle=this.color;this.ctx.beginPath();var d=this.ctx.globalAlpha;this.ctx.globalAlpha=c;B(this.id);var e,f,g,k;this.ctx.lineWidth=b;this.ctx.setLineDash&&this.ctx.setLineDash(M(this.lineDashType,b));if("bottom"===this.parent._position||
"top"===this.parent._position)e=f=1===this.ctx.lineWidth%2?(a.x<<0)+0.5:a.x<<0,g=this.chart.plotArea.y1,k=this.chart.plotArea.y2;else if("left"===this.parent._position||"right"===this.parent._position)g=k=1===this.ctx.lineWidth%2?(a.y<<0)+0.5:a.y<<0,e=this.chart.plotArea.x1,f=this.chart.plotArea.x2;this.ctx.moveTo(e,g);this.ctx.lineTo(f,k);this.ctx.stroke();this.ctx.globalAlpha=d}};O(Q,G);Q.prototype._initialize=function(){if(this.enabled){this.container=document.createElement("div");this.container.setAttribute("class",
"canvasjs-chart-tooltip");this.container.style.position="absolute";this.container.style.height="auto";this.container.style.boxShadow="1px 1px 2px 2px rgba(0,0,0,0.1)";this.container.style.zIndex="1000";this.container.style.display="none";var a;a='<div style=" width: auto;height: auto;min-width: 50px;';a+="line-height: auto;";a+="margin: 0px 0px 0px 0px;";a+="padding: 5px;";a+="font-family: Calibri, Arial, Georgia, serif;";a+="font-weight: normal;";a+="font-style: "+(t?"italic;":"normal;");a+="font-size: 14px;";
a+="color: #000000;";a+="text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);";a+="text-align: left;";a+="border: 2px solid gray;";a+=t?"background: rgba(255,255,255,.9);":"background: rgb(255,255,255);";a+="text-indent: 0px;";a+="white-space: nowrap;";a+="border-radius: 5px;";a+="-moz-user-select:none;";a+="-khtml-user-select: none;";a+="-webkit-user-select: none;";a+="-ms-user-select: none;";a+="user-select: none;";t||(a+="filter: alpha(opacity = 90);",a+="filter: progid:DXImageTransform.Microsoft.Shadow(Strength=3, Direction=135, Color='#666666');");
a+='} "> Sample Tooltip</div>';this.container.innerHTML=a;this.contentDiv=this.container.firstChild;this.container.style.borderRadius=this.contentDiv.style.borderRadius;this.chart._canvasJSContainer.appendChild(this.container)}};Q.prototype.mouseMoveHandler=function(a,b){this._lastUpdated&&40>(new Date).getTime()-this._lastUpdated||(this._lastUpdated=(new Date).getTime(),this._updateToolTip(a,b))};Q.prototype._updateToolTip=function(a,b){if(!this.chart.disableToolTip){if("undefined"===typeof a||"undefined"===
typeof b){if(isNaN(this._prevX)||isNaN(this._prevY))return;a=this._prevX;b=this._prevY}else this._prevX=a,this._prevY=b;var c=null,d=null,e=[],f=0;if(this.shared&&this.enabled&&"none"!==this.chart.plotInfo.axisPlacement){f="xySwapped"===this.chart.plotInfo.axisPlacement?(this.chart.axisX.viewportMaximum-this.chart.axisX.viewportMinimum)/this.chart.axisX.lineCoordinates.height*(this.chart.axisX.lineCoordinates.y2-b)+this.chart.axisX.viewportMinimum:(this.chart.axisX.viewportMaximum-this.chart.axisX.viewportMinimum)/
this.chart.axisX.lineCoordinates.width*(a-this.chart.axisX.lineCoordinates.x1)+this.chart.axisX.viewportMinimum;d=[];for(c=0;c<this.chart.data.length;c++){var g=this.chart.data[c].getDataPointAtX(f,!0);g&&0<=g.index&&(g.dataSeries=this.chart.data[c],null!==g.dataPoint.y&&d.push(g))}if(0===d.length)return;d.sort(function(a,b){return a.distance-b.distance});f=d[0];for(c=0;c<d.length;c++)d[c].dataPoint.x.valueOf()===f.dataPoint.x.valueOf()&&e.push(d[c]);d=null}else{if(g=this.chart.getDataPointAtXY(a,
b,!0))this.currentDataPointIndex=g.dataPointIndex,this.currentSeriesIndex=g.dataSeries.index;else if(t)if(g=va(a,b,this.chart._eventManager.ghostCtx),0<g&&"undefined"!==typeof this.chart._eventManager.objectMap[g]){eventObject=this.chart._eventManager.objectMap[g];if("legendItem"===eventObject.objectType)return;this.currentSeriesIndex=eventObject.dataSeriesIndex;this.currentDataPointIndex=0<=eventObject.dataPointIndex?eventObject.dataPointIndex:-1}else this.currentDataPointIndex=-1;else this.currentDataPointIndex=
-1;if(0<=this.currentSeriesIndex){d=this.chart.data[this.currentSeriesIndex];g={};if(0<=this.currentDataPointIndex)c=d.dataPoints[this.currentDataPointIndex],g.dataSeries=d,g.dataPoint=c,g.index=this.currentDataPointIndex,g.distance=Math.abs(c.x-f);else{if(!this.enabled||"line"!==d.type&&"stepLine"!==d.type&&"spline"!==d.type&&"area"!==d.type&&"stepArea"!==d.type&&"splineArea"!==d.type&&"stackedArea"!==d.type&&"stackedArea100"!==d.type&&"rangeArea"!==d.type&&"rangeSplineArea"!==d.type&&"candlestick"!==
d.type&&"ohlc"!==d.type)return;f=d.axisX.conversionParameters.minimum+(a-d.axisX.conversionParameters.reference)/d.axisX.conversionParameters.pixelPerUnit;g=d.getDataPointAtX(f,!0);g.dataSeries=d;this.currentDataPointIndex=g.index;c=g.dataPoint}if(null!==g.dataPoint.y&&"undefined"!==typeof g.dataPoint.y)if(g.dataSeries.axisY)if(0<g.dataPoint.y.length){for(c=f=0;c<g.dataPoint.y.length;c++)g.dataPoint.y[c]<g.dataSeries.axisY.viewportMinimum?f--:g.dataPoint.y[c]>g.dataSeries.axisY.viewportMaximum&&f++;
f<g.dataPoint.y.length&&f>-g.dataPoint.y.length&&e.push(g)}else(0<=g.dataSeries.type.indexOf("100")||g.dataPoint.y>=g.dataSeries.axisY.viewportMinimum&&g.dataPoint.y<=g.dataSeries.axisY.viewportMaximum)&&e.push(g);else e.push(g)}}if(0<e.length&&(this.highlightObjects(e),this.enabled))if(f="",f=this.getToolTipInnerHTML({entries:e}),null!==f){this.contentDiv.innerHTML=f;this.contentDiv.innerHTML=f;f=!1;"none"===this.container.style.display&&(f=!0,this.container.style.display="block");try{this.contentDiv.style.background=
this.backgroundColor?this.backgroundColor:t?"rgba(255,255,255,.9)":"rgb(255,255,255)",this.contentDiv.style.borderRightColor=this.contentDiv.style.borderLeftColor=this.contentDiv.style.borderColor=this.borderColor?this.borderColor:e[0].dataPoint.color?e[0].dataPoint.color:e[0].dataSeries.color?e[0].dataSeries.color:e[0].dataSeries._colorSet[e[0].index%e[0].dataSeries._colorSet.length],this.contentDiv.style.borderWidth=this.borderThickness||0===this.borderThickness?this.borderThickness+"px":"2px",
this.contentDiv.style.borderRadius=this.cornerRadius||0===this.cornerRadius?this.cornerRadius+"px":"5px",this.container.style.borderRadius=this.contentDiv.style.borderRadius,this.contentDiv.style.fontSize=this.fontSize||0===this.fontSize?this.fontSize+"px":"14px",this.contentDiv.style.color=this.fontColor?this.fontColor:"#000000",this.contentDiv.style.fontFamily=this.fontFamily?this.fontFamily:"Calibri, Arial, Georgia, serif;",this.contentDiv.style.fontWeight=this.fontWeight?this.fontWeight:"normal",
this.contentDiv.style.fontStyle=this.fontStyle?this.fontStyle:t?"italic":"normal"}catch(k){}"pie"===e[0].dataSeries.type||"doughnut"===e[0].dataSeries.type||"funnel"===e[0].dataSeries.type||"bar"===e[0].dataSeries.type||"rangeBar"===e[0].dataSeries.type||"stackedBar"===e[0].dataSeries.type||"stackedBar100"===e[0].dataSeries.type?toolTipLeft=a-10-this.container.clientWidth:(toolTipLeft=e[0].dataSeries.axisX.conversionParameters.reference+e[0].dataSeries.axisX.conversionParameters.pixelPerUnit*(e[0].dataPoint.x-
e[0].dataSeries.axisX.conversionParameters.minimum)-this.container.clientWidth<<0,toolTipLeft-=10);0>toolTipLeft&&(toolTipLeft+=this.container.clientWidth+20);toolTipLeft+this.container.clientWidth>this.chart._container.clientWidth&&(toolTipLeft=Math.max(0,this.chart._container.clientWidth-this.container.clientWidth));toolTipLeft+="px";e=1!==e.length||this.shared||"line"!==e[0].dataSeries.type&&"stepLine"!==e[0].dataSeries.type&&"spline"!==e[0].dataSeries.type&&"area"!==e[0].dataSeries.type&&"stepArea"!==
e[0].dataSeries.type&&"splineArea"!==e[0].dataSeries.type&&"stackedArea"!==e[0].dataSeries.type&&"stackedArea100"!==e[0].dataSeries.type?"bar"===e[0].dataSeries.type||"rangeBar"===e[0].dataSeries.type||"stackedBar"===e[0].dataSeries.type||"stackedBar100"===e[0].dataSeries.type?e[0].dataSeries.axisX.conversionParameters.reference+e[0].dataSeries.axisX.conversionParameters.pixelPerUnit*(e[0].dataPoint.x-e[0].dataSeries.axisX.viewportMinimum)+0.5<<0:b:e[0].dataSeries.axisY.conversionParameters.reference+
e[0].dataSeries.axisY.conversionParameters.pixelPerUnit*(e[0].dataPoint.y-e[0].dataSeries.axisY.viewportMinimum)+0.5<<0;e=-e+10;0<e+this.container.clientHeight+5&&(e-=e+this.container.clientHeight+5-0);this.container.style.left=toolTipLeft;this.container.style.bottom=e+"px";!this.animationEnabled||f?this.disableAnimation():this.enableAnimation()}else this.hide(!1)}};Q.prototype.highlightObjects=function(a){var b=this.chart.overlaidCanvasCtx;this.chart.resetOverlayedCanvas();b.clearRect(0,0,this.chart.width,
this.chart.height);b.save();var c=this.chart.plotArea,d=0;b.rect(c.x1,c.y1,c.x2-c.x1,c.y2-c.y1);b.clip();for(c=0;c<a.length;c++){var e=a[c];if((e=this.chart._eventManager.objectMap[e.dataSeries.dataPointIds[e.index]])&&e.objectType&&"dataPoint"===e.objectType){var d=this.chart.data[e.dataSeriesIndex],f=d.dataPoints[e.dataPointIndex],g=e.dataPointIndex;!1===f.highlightEnabled||!0!==d.highlightEnabled&&!0!==f.highlightEnabled||("line"===d.type||"stepLine"===d.type||"spline"===d.type||"scatter"===d.type||
"area"===d.type||"stepArea"===d.type||"splineArea"===d.type||"stackedArea"===d.type||"stackedArea100"===d.type||"rangeArea"===d.type||"rangeSplineArea"===d.type?(f=d.getMarkerProperties(g,e.x1,e.y1,this.chart.overlaidCanvasCtx),f.size=Math.max(1.5*f.size<<0,10),f.borderColor=f.borderColor||"#FFFFFF",f.borderThickness=f.borderThickness||Math.ceil(0.1*f.size),K.drawMarkers([f]),"undefined"!==typeof e.y2&&(f=d.getMarkerProperties(g,e.x1,e.y2,this.chart.overlaidCanvasCtx),f.size=Math.max(1.5*f.size<<
0,10),f.borderColor=f.borderColor||"#FFFFFF",f.borderThickness=f.borderThickness||Math.ceil(0.1*f.size),K.drawMarkers([f]))):"bubble"===d.type?(f=d.getMarkerProperties(g,e.x1,e.y1,this.chart.overlaidCanvasCtx),f.size=e.size,f.color="white",f.borderColor="white",b.globalAlpha=0.3,K.drawMarkers([f]),b.globalAlpha=1):"column"===d.type||"stackedColumn"===d.type||"stackedColumn100"===d.type||"bar"===d.type||"rangeBar"===d.type||"stackedBar"===d.type||"stackedBar100"===d.type||"rangeColumn"===d.type?I(b,
e.x1,e.y1,e.x2,e.y2,"white",0,null,!1,!1,!1,!1,0.3):"pie"===d.type||"doughnut"===d.type?ra(b,e.center,e.radius,"white",d.type,e.startAngle,e.endAngle,0.3,e.percentInnerRadius):"candlestick"===d.type?(b.globalAlpha=1,b.strokeStyle=e.color,b.lineWidth=2*e.borderThickness,d=0===b.lineWidth%2?0:0.5,b.beginPath(),b.moveTo(e.x3-d,e.y2),b.lineTo(e.x3-d,Math.min(e.y1,e.y4)),b.stroke(),b.beginPath(),b.moveTo(e.x3-d,Math.max(e.y1,e.y4)),b.lineTo(e.x3-d,e.y3),b.stroke(),I(b,e.x1,Math.min(e.y1,e.y4),e.x2,Math.max(e.y1,
e.y4),"transparent",2*e.borderThickness,e.color,!1,!1,!1,!1),b.globalAlpha=1):"ohlc"===d.type&&(b.globalAlpha=1,b.strokeStyle=e.color,b.lineWidth=2*e.borderThickness,d=0===b.lineWidth%2?0:0.5,b.beginPath(),b.moveTo(e.x3-d,e.y2),b.lineTo(e.x3-d,e.y3),b.stroke(),b.beginPath(),b.moveTo(e.x3,e.y1),b.lineTo(e.x1,e.y1),b.stroke(),b.beginPath(),b.moveTo(e.x3,e.y4),b.lineTo(e.x2,e.y4),b.stroke(),b.globalAlpha=1))}}b.restore();b.globalAlpha=1;b.beginPath()};Q.prototype.getToolTipInnerHTML=function(a){a=a.entries;
for(var b=null,c=null,d=null,e=0,f="",g=!0,k=0;k<a.length;k++)if(a[k].dataSeries.toolTipContent||a[k].dataPoint.toolTipContent){g=!1;break}if(g&&(this.content&&"function"===typeof this.content||this.contentFormatter))a={chart:this.chart,toolTip:this._options,entries:a},b=this.contentFormatter?this.contentFormatter(a):this.content(a);else if(this.shared&&"none"!==this.chart.plotInfo.axisPlacement){for(var p="",k=0;k<a.length;k++)if(c=a[k].dataSeries,d=a[k].dataPoint,e=a[k].index,f="",0===k&&(g&&!this.content)&&
(p+="undefined"!==typeof this.chart.axisX.labels[d.x]?this.chart.axisX.labels[d.x]:"{x}",p+="</br>",p=this.chart.replaceKeywordsWithValue(p,d,c,e)),null!==d.toolTipContent&&("undefined"!==typeof d.toolTipContent||null!==c._options.toolTipContent)){if("line"===c.type||"stepLine"===c.type||"spline"===c.type||"area"===c.type||"stepArea"===c.type||"splineArea"===c.type||"column"===c.type||"bar"===c.type||"scatter"===c.type||"stackedColumn"===c.type||"stackedColumn100"===c.type||"stackedBar"===c.type||
"stackedBar100"===c.type||"stackedArea"===c.type||"stackedArea100"===c.type)f+=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>{name}:</span>&nbsp;&nbsp;{y}";else if("bubble"===c.type)f+=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+
"\"'>{name}:</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";else if("pie"===c.type||"doughnut"===c.type||"funnel"===c.type)f+=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"&nbsp;&nbsp;{y}";else if("rangeColumn"===c.type||"rangeBar"===c.type||"rangeArea"===c.type||"rangeSplineArea"===c.type)f+=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+
(this.fontColor?"":"'color:{color};'")+"\"'>{name}:</span>&nbsp;&nbsp;{y[0]},&nbsp;{y[1]}";else if("candlestick"===c.type||"ohlc"===c.type)f+=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>{name}:</span><br/>Open: &nbsp;&nbsp;{y[0]}<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}<br/>Low:&nbsp;&nbsp;&nbsp;{y[2]}<br/>Close: &nbsp;&nbsp;{y[3]}";null===b&&(b="");!0===this.reversed?
(b=this.chart.replaceKeywordsWithValue(f,d,c,e)+b,k<a.length-1&&(b="</br>"+b)):(b+=this.chart.replaceKeywordsWithValue(f,d,c,e),k<a.length-1&&(b+="</br>"))}null!==b&&(b=p+b)}else{c=a[0].dataSeries;d=a[0].dataPoint;e=a[0].index;if(null===d.toolTipContent||"undefined"===typeof d.toolTipContent&&null===c._options.toolTipContent)return null;if("line"===c.type||"stepLine"===c.type||"spline"===c.type||"area"===c.type||"stepArea"===c.type||"splineArea"===c.type||"column"===c.type||"bar"===c.type||"scatter"===
c.type||"stackedColumn"===c.type||"stackedColumn100"===c.type||"stackedBar"===c.type||"stackedBar100"===c.type||"stackedArea"===c.type||"stackedArea100"===c.type)f=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>"+(d.label?"{label}":"{x}")+" :</span>&nbsp;&nbsp;{y}";else if("bubble"===c.type)f=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:
this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>"+(d.label?"{label}":"{x}")+":</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";else if("pie"===c.type||"doughnut"===c.type||"funnel"===c.type)f=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:(d.name?"{name}:&nbsp;&nbsp;":d.label?"{label}:&nbsp;&nbsp;":"")+"{y}";else if("rangeColumn"===c.type||"rangeBar"===
c.type||"rangeArea"===c.type||"rangeSplineArea"===c.type)f=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>"+(d.label?"{label}":"{x}")+" :</span>&nbsp;&nbsp;{y[0]}, &nbsp;{y[1]}";else if("candlestick"===c.type||"ohlc"===c.type)f=d.toolTipContent?d.toolTipContent:c.toolTipContent?c.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+
(this.fontColor?"":"'color:{color};'")+"\"'>"+(d.label?"{label}":"{x}")+"</span><br/>Open: &nbsp;&nbsp;{y[0]}<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}<br/>Low: &nbsp;&nbsp;&nbsp;&nbsp;{y[2]}<br/>Close: &nbsp;&nbsp;{y[3]}";null===b&&(b="");b+=this.chart.replaceKeywordsWithValue(f,d,c,e)}return b};Q.prototype.enableAnimation=function(){this.container.style.WebkitTransition||(this.container.style.WebkitTransition="left .2s ease-out, bottom .2s ease-out",this.container.style.MozTransition="left .2s ease-out, bottom .2s ease-out",
this.container.style.MsTransition="left .2s ease-out, bottom .2s ease-out",this.container.style.transition="left .2s ease-out, bottom .2s ease-out")};Q.prototype.disableAnimation=function(){this.container.style.WebkitTransition&&(this.container.style.WebkitTransition="",this.container.style.MozTransition="",this.container.style.MsTransition="",this.container.style.transition="")};Q.prototype.hide=function(a){this.enabled&&(this.container.style.display="none",this.currentSeriesIndex=-1,this._prevY=
this._prevX=NaN,("undefined"===typeof a||a)&&this.chart.resetOverlayedCanvas())};u.prototype.getPercentAndTotal=function(a,b){var c=null,d=null,e=null;if(0<=a.type.indexOf("stacked"))d=0,c=b.x.getTime?b.x.getTime():b.x,c in a.plotUnit.yTotals&&(d=a.plotUnit.yTotals[c],e=isNaN(b.y)?0:0===d?0:100*(b.y/d));else if("pie"===a.type||"doughnut"===a.type){for(i=d=0;i<a.dataPoints.length;i++)isNaN(a.dataPoints[i].y)||(d+=a.dataPoints[i].y);e=isNaN(b.y)?0:100*(b.y/d)}return{percent:e,total:d}};u.prototype.replaceKeywordsWithValue=
function(a,b,c,d,e){var f=this;e="undefined"===typeof e?0:e;if((0<=c.type.indexOf("stacked")||"pie"===c.type||"doughnut"===c.type)&&(0<=a.indexOf("#percent")||0<=a.indexOf("#total"))){var g="#percent",k="#total",p=this.getPercentAndTotal(c,b),k=isNaN(p.total)?k:p.total,g=isNaN(p.percent)?g:p.percent;do{p="";if(c.percentFormatString)p=c.percentFormatString;else{var p="#,##0.",h=Math.max(Math.ceil(Math.log(1/Math.abs(g))/Math.LN10),2);if(isNaN(h)||!isFinite(h))h=2;for(var l=0;l<h;l++)p+="#"}a=a.replace("#percent",
W(g,p,f._cultureInfo));a=a.replace("#total",W(k,c.yValueFormatString?c.yValueFormatString:"#,##0.########"))}while(0<=a.indexOf("#percent")||0<=a.indexOf("#total"))}return a.replace(/\{.*?\}|"[^"]*"|'[^']*'/g,function(a){if('"'===a[0]&&'"'===a[a.length-1]||"'"===a[0]&&"'"===a[a.length-1])return a.slice(1,a.length-1);a=Z(a.slice(1,a.length-1));a=a.replace("#index",e);var g=null;try{var h=a.match(/(.*?)\s*\[\s*(.*?)\s*\]/);h&&0<h.length&&(g=Z(h[2]),a=Z(h[1]))}catch(k){}h=null;if("color"===a)return b.color?
b.color:c.color?c.color:c._colorSet[d%c._colorSet.length];if(b.hasOwnProperty(a))h=b;else if(c.hasOwnProperty(a))h=c;else return"";h=h[a];null!==g&&(h=h[g]);return"x"===a?f.axisX&&"dateTime"===f.plotInfo.axisXValueType?qa(h,b.xValueFormatString?b.xValueFormatString:c.xValueFormatString?c.xValueFormatString:f.axisX&&f.axisX.valueFormatString?f.axisX.valueFormatString:"DD MMM YY",f._cultureInfo):W(h,b.xValueFormatString?b.xValueFormatString:c.xValueFormatString?c.xValueFormatString:"#,##0.########",
f._cultureInfo):"y"===a?W(h,b.yValueFormatString?b.yValueFormatString:c.yValueFormatString?c.yValueFormatString:"#,##0.########",f._cultureInfo):"z"===a?W(h,b.zValueFormatString?b.zValueFormatString:c.zValueFormatString?c.zValueFormatString:"#,##0.########",f._cultureInfo):h})};$.prototype.reset=function(){this.lastObjectId=0;this.objectMap=[];this.rectangularRegionEventSubscriptions=[];this.previousDataPointEventObject=null;this.eventObjects=[];t&&(this.ghostCtx.clearRect(0,0,this.chart.width,this.chart.height),
this.ghostCtx.beginPath())};$.prototype.getNewObjectTrackingId=function(){return++this.lastObjectId};$.prototype.mouseEventHandler=function(a){if("mousemove"===a.type||"click"===a.type){var b=[],c=ma(a),d=null;if((d=this.chart.getObjectAtXY(c.x,c.y,!1))&&"undefined"!==typeof this.objectMap[d])if(d=this.objectMap[d],"dataPoint"===d.objectType){var e=this.chart.data[d.dataSeriesIndex],f=e.dataPoints[d.dataPointIndex],g=d.dataPointIndex;d.eventParameter={x:c.x,y:c.y,dataPoint:f,dataSeries:e._options,
dataPointIndex:g,dataSeriesIndex:e.index,chart:this.chart._publicChartReference};d.eventContext={context:f,userContext:f,mouseover:"mouseover",mousemove:"mousemove",mouseout:"mouseout",click:"click"};b.push(d);d=this.objectMap[e.id];d.eventParameter={x:c.x,y:c.y,dataPoint:f,dataSeries:e._options,dataPointIndex:g,dataSeriesIndex:e.index,chart:this.chart._publicChartReference};d.eventContext={context:e,userContext:e._options,mouseover:"mouseover",mousemove:"mousemove",mouseout:"mouseout",click:"click"};
b.push(this.objectMap[e.id])}else"legendItem"===d.objectType&&(e=this.chart.data[d.dataSeriesIndex],f=null!==d.dataPointIndex?e.dataPoints[d.dataPointIndex]:null,d.eventParameter={x:c.x,y:c.y,dataSeries:e._options,dataPoint:f,dataPointIndex:d.dataPointIndex,dataSeriesIndex:d.dataSeriesIndex,chart:this.chart._publicChartReference},d.eventContext={context:this.chart.legend,userContext:this.chart.legend._options,mouseover:"itemmouseover",mousemove:"itemmousemove",mouseout:"itemmouseout",click:"itemclick"},
b.push(d));e=[];for(c=0;c<this.mouseoveredObjectMaps.length;c++){f=!0;for(d=0;d<b.length;d++)if(b[d].id===this.mouseoveredObjectMaps[c].id){f=!1;break}f?this.fireEvent(this.mouseoveredObjectMaps[c],"mouseout",a):e.push(this.mouseoveredObjectMaps[c])}this.mouseoveredObjectMaps=e;for(c=0;c<b.length;c++){e=!1;for(d=0;d<this.mouseoveredObjectMaps.length;d++)if(b[c].id===this.mouseoveredObjectMaps[d].id){e=!0;break}e||(this.fireEvent(b[c],"mouseover",a),this.mouseoveredObjectMaps.push(b[c]));"click"===
a.type?this.fireEvent(b[c],"click",a):"mousemove"===a.type&&this.fireEvent(b[c],"mousemove",a)}}};$.prototype.fireEvent=function(a,b,c){if(a&&b){var d=a.eventParameter,e=a.eventContext,f=a.eventContext.userContext;f&&(e&&f[e[b]])&&f[e[b]].call(f,d);"mouseout"!==b?f.cursor&&f.cursor!==c.target.style.cursor&&(c.target.style.cursor=f.cursor):(c.target.style.cursor=this.chart._defaultCursor,delete a.eventParameter,delete a.eventContext);"click"===b&&("dataPoint"===a.objectType&&this.chart.pieDoughnutClickHandler)&&
this.chart.pieDoughnutClickHandler.call(this.chart.data[a.dataSeriesIndex],d)}};O(ba,G);pa.prototype.animate=function(a,b,c,d,e){var f=this;this.chart.isAnimating=!0;e=e||A.easing.linear;c&&this.animations.push({startTime:(new Date).getTime()+(a?a:0),duration:b,animationCallback:c,onComplete:d});for(a=[];0<this.animations.length;)if(b=this.animations.shift(),c=(new Date).getTime(),d=0,b.startTime<=c&&(d=e(Math.min(c-b.startTime,b.duration),0,1,b.duration),d=Math.min(d,1),isNaN(d)||!isFinite(d))&&
(d=1),1>d&&a.push(b),b.animationCallback(d),1<=d&&b.onComplete)b.onComplete();this.animations=a;0<this.animations.length?this.animationRequestId=this.chart.requestAnimFrame.call(window,function(){f.animate.call(f)}):this.chart.isAnimating=!1};pa.prototype.cancelAllAnimations=function(){this.animations=[];this.animationRequestId&&this.chart.cancelRequestAnimFrame.call(window,this.animationRequestId);this.animationRequestId=null;this.chart.isAnimating=!1};var A={yScaleAnimation:function(a,b){if(0!==
a){var c=b.dest,d=b.source.canvas,e=b.animationBase;c.drawImage(d,0,0,d.width,d.height,0,e-e*a,c.canvas.width/J,a*c.canvas.height/J)}},xScaleAnimation:function(a,b){if(0!==a){var c=b.dest,d=b.source.canvas,e=b.animationBase;c.drawImage(d,0,0,d.width,d.height,e-e*a,0,a*c.canvas.width/J,c.canvas.height/J)}},xClipAnimation:function(a,b){if(0!==a){var c=b.dest,d=b.source.canvas;c.save();0<a&&c.drawImage(d,0,0,d.width*a,d.height,0,0,d.width*a/J,d.height/J);c.restore()}},fadeInAnimation:function(a,b){if(0!==
a){var c=b.dest,d=b.source.canvas;c.save();c.globalAlpha=a;c.drawImage(d,0,0,d.width,d.height,0,0,c.canvas.width/J,c.canvas.height/J);c.restore()}},easing:{linear:function(a,b,c,d){return c*a/d+b},easeOutQuad:function(a,b,c,d){return-c*(a/=d)*(a-2)+b},easeOutQuart:function(a,b,c,d){return-c*((a=a/d-1)*a*a*a-1)+b},easeInQuad:function(a,b,c,d){return c*(a/=d)*a+b},easeInQuart:function(a,b,c,d){return c*(a/=d)*a*a*a+b}}},K={drawMarker:function(a,b,c,d,e,f,g,k){if(c){var p=1;c.fillStyle=f?f:"#000000";
c.strokeStyle=g?g:"#000000";c.lineWidth=k?k:0;"circle"===d?(c.moveTo(a,b),c.beginPath(),c.arc(a,b,e/2,0,2*Math.PI,!1),f&&c.fill(),k&&(g?c.stroke():(p=c.globalAlpha,c.globalAlpha=0.15,c.strokeStyle="black",c.stroke(),c.globalAlpha=p))):"square"===d?(c.beginPath(),c.rect(a-e/2,b-e/2,e,e),f&&c.fill(),k&&(g?c.stroke():(p=c.globalAlpha,c.globalAlpha=0.15,c.strokeStyle="black",c.stroke(),c.globalAlpha=p))):"triangle"===d?(c.beginPath(),c.moveTo(a-e/2,b+e/2),c.lineTo(a+e/2,b+e/2),c.lineTo(a,b-e/2),c.closePath(),
f&&c.fill(),k&&(g?c.stroke():(p=c.globalAlpha,c.globalAlpha=0.15,c.strokeStyle="black",c.stroke(),c.globalAlpha=p)),c.beginPath()):"cross"===d&&(c.strokeStyle=f,c.lineWidth=e/4,c.beginPath(),c.moveTo(a-e/2,b-e/2),c.lineTo(a+e/2,b+e/2),c.stroke(),c.moveTo(a+e/2,b-e/2),c.lineTo(a-e/2,b+e/2),c.stroke())}},drawMarkers:function(a){for(var b=0;b<a.length;b++){var c=a[b];K.drawMarker(c.x,c.y,c.ctx,c.type,c.size,c.color,c.borderColor,c.borderThickness)}}},za={Chart:function(a,b){var c=new u(a,b,this);this.render=
function(){c.render(this.options)};this.options=c._options},addColorSet:function(a,b){V[a]=b},addCultureInfo:function(a,b){ca[a]=b},formatNumber:function(a,b,c){c=c||"en";if(ca[c])return W(a,b||"#,##0.##",new ba(c));throw"Unknown Culture Name";},formatDate:function(a,b,c){c=c||"en";if(ca[c])return qa(a,b||"DD MMM YYYY",new ba(c));throw"Unknown Culture Name";}};za.Chart.version="v1.8.0 Beta 4";window.CanvasJS=za})();
/*
  excanvas is used to support IE678 which do not implement HTML5 Canvas Element. You can safely remove the following excanvas code if you don't need to support older browsers.

  Copyright 2006 Google Inc. https://code.google.com/p/explorercanvas/
  Licensed under the Apache License, Version 2.0
*/
document.createElement("canvas").getContext||function(){function V(){return this.context_||(this.context_=new C(this))}function W(a,b,c){var g=M.call(arguments,2);return function(){return a.apply(b,g.concat(M.call(arguments)))}}function N(a){return String(a).replace(/&/g,"&amp;").replace(/"/g,"&quot;")}function O(a){a.namespaces.g_vml_||a.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML");a.namespaces.g_o_||a.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML");
a.styleSheets.ex_canvas_||(a=a.createStyleSheet(),a.owningElement.id="ex_canvas_",a.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}")}function X(a){var b=a.srcElement;switch(a.propertyName){case "width":b.getContext().clearRect();b.style.width=b.attributes.width.nodeValue+"px";b.firstChild.style.width=b.clientWidth+"px";break;case "height":b.getContext().clearRect(),b.style.height=b.attributes.height.nodeValue+"px",b.firstChild.style.height=b.clientHeight+
"px"}}function Y(a){a=a.srcElement;a.firstChild&&(a.firstChild.style.width=a.clientWidth+"px",a.firstChild.style.height=a.clientHeight+"px")}function D(){return[[1,0,0],[0,1,0],[0,0,1]]}function t(a,b){for(var c=D(),g=0;3>g;g++)for(var e=0;3>e;e++){for(var f=0,d=0;3>d;d++)f+=a[g][d]*b[d][e];c[g][e]=f}return c}function P(a,b){b.fillStyle=a.fillStyle;b.lineCap=a.lineCap;b.lineJoin=a.lineJoin;b.lineWidth=a.lineWidth;b.miterLimit=a.miterLimit;b.shadowBlur=a.shadowBlur;b.shadowColor=a.shadowColor;b.shadowOffsetX=
a.shadowOffsetX;b.shadowOffsetY=a.shadowOffsetY;b.strokeStyle=a.strokeStyle;b.globalAlpha=a.globalAlpha;b.font=a.font;b.textAlign=a.textAlign;b.textBaseline=a.textBaseline;b.arcScaleX_=a.arcScaleX_;b.arcScaleY_=a.arcScaleY_;b.lineScale_=a.lineScale_}function Q(a){var b=a.indexOf("(",3),c=a.indexOf(")",b+1),b=a.substring(b+1,c).split(",");if(4!=b.length||"a"!=a.charAt(3))b[3]=1;return b}function E(a,b,c){return Math.min(c,Math.max(b,a))}function F(a,b,c){0>c&&c++;1<c&&c--;return 1>6*c?a+6*(b-a)*c:
1>2*c?b:2>3*c?a+6*(b-a)*(2/3-c):a}function G(a){if(a in H)return H[a];var b,c=1;a=String(a);if("#"==a.charAt(0))b=a;else if(/^rgb/.test(a)){c=Q(a);b="#";for(var g,e=0;3>e;e++)g=-1!=c[e].indexOf("%")?Math.floor(255*(parseFloat(c[e])/100)):+c[e],b+=v[E(g,0,255)];c=+c[3]}else if(/^hsl/.test(a)){e=c=Q(a);b=parseFloat(e[0])/360%360;0>b&&b++;g=E(parseFloat(e[1])/100,0,1);e=E(parseFloat(e[2])/100,0,1);if(0==g)g=e=b=e;else{var f=0.5>e?e*(1+g):e+g-e*g,d=2*e-f;g=F(d,f,b+1/3);e=F(d,f,b);b=F(d,f,b-1/3)}b="#"+
v[Math.floor(255*g)]+v[Math.floor(255*e)]+v[Math.floor(255*b)];c=c[3]}else b=Z[a]||a;return H[a]={color:b,alpha:c}}function C(a){this.m_=D();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.fillStyle=this.strokeStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=1*q;this.globalAlpha=1;this.font="10px sans-serif";this.textAlign="left";this.textBaseline="alphabetic";this.canvas=a;var b="width:"+a.clientWidth+"px;height:"+a.clientHeight+"px;overflow:hidden;position:absolute",
c=a.ownerDocument.createElement("div");c.style.cssText=b;a.appendChild(c);b=c.cloneNode(!1);b.style.backgroundColor="red";b.style.filter="alpha(opacity=0)";a.appendChild(b);this.element_=c;this.lineScale_=this.arcScaleY_=this.arcScaleX_=1}function R(a,b,c,g){a.currentPath_.push({type:"bezierCurveTo",cp1x:b.x,cp1y:b.y,cp2x:c.x,cp2y:c.y,x:g.x,y:g.y});a.currentX_=g.x;a.currentY_=g.y}function S(a,b){var c=G(a.strokeStyle),g=c.color,c=c.alpha*a.globalAlpha,e=a.lineScale_*a.lineWidth;1>e&&(c*=e);b.push("<g_vml_:stroke",
' opacity="',c,'"',' joinstyle="',a.lineJoin,'"',' miterlimit="',a.miterLimit,'"',' endcap="',$[a.lineCap]||"square",'"',' weight="',e,'px"',' color="',g,'" />')}function T(a,b,c,g){var e=a.fillStyle,f=a.arcScaleX_,d=a.arcScaleY_,k=g.x-c.x,n=g.y-c.y;if(e instanceof w){var h=0,l=g=0,u=0,m=1;if("gradient"==e.type_){h=e.x1_/f;c=e.y1_/d;var p=s(a,e.x0_/f,e.y0_/d),h=s(a,h,c),h=180*Math.atan2(h.x-p.x,h.y-p.y)/Math.PI;0>h&&(h+=360);1E-6>h&&(h=0)}else p=s(a,e.x0_,e.y0_),g=(p.x-c.x)/k,l=(p.y-c.y)/n,k/=f*q,
n/=d*q,m=x.max(k,n),u=2*e.r0_/m,m=2*e.r1_/m-u;f=e.colors_;f.sort(function(a,b){return a.offset-b.offset});d=f.length;p=f[0].color;c=f[d-1].color;k=f[0].alpha*a.globalAlpha;a=f[d-1].alpha*a.globalAlpha;for(var n=[],r=0;r<d;r++){var t=f[r];n.push(t.offset*m+u+" "+t.color)}b.push('<g_vml_:fill type="',e.type_,'"',' method="none" focus="100%"',' color="',p,'"',' color2="',c,'"',' colors="',n.join(","),'"',' opacity="',a,'"',' g_o_:opacity2="',k,'"',' angle="',h,'"',' focusposition="',g,",",l,'" />')}else e instanceof
I?k&&n&&b.push("<g_vml_:fill",' position="',-c.x/k*f*f,",",-c.y/n*d*d,'"',' type="tile"',' src="',e.src_,'" />'):(e=G(a.fillStyle),b.push('<g_vml_:fill color="',e.color,'" opacity="',e.alpha*a.globalAlpha,'" />'))}function s(a,b,c){a=a.m_;return{x:q*(b*a[0][0]+c*a[1][0]+a[2][0])-r,y:q*(b*a[0][1]+c*a[1][1]+a[2][1])-r}}function z(a,b,c){isFinite(b[0][0])&&(isFinite(b[0][1])&&isFinite(b[1][0])&&isFinite(b[1][1])&&isFinite(b[2][0])&&isFinite(b[2][1]))&&(a.m_=b,c&&(a.lineScale_=aa(ba(b[0][0]*b[1][1]-b[0][1]*
b[1][0]))))}function w(a){this.type_=a;this.r1_=this.y1_=this.x1_=this.r0_=this.y0_=this.x0_=0;this.colors_=[]}function I(a,b){if(!a||1!=a.nodeType||"IMG"!=a.tagName)throw new A("TYPE_MISMATCH_ERR");if("complete"!=a.readyState)throw new A("INVALID_STATE_ERR");switch(b){case "repeat":case null:case "":this.repetition_="repeat";break;case "repeat-x":case "repeat-y":case "no-repeat":this.repetition_=b;break;default:throw new A("SYNTAX_ERR");}this.src_=a.src;this.width_=a.width;this.height_=a.height}
function A(a){this.code=this[a];this.message=a+": DOM Exception "+this.code}var x=Math,k=x.round,J=x.sin,K=x.cos,ba=x.abs,aa=x.sqrt,q=10,r=q/2;navigator.userAgent.match(/MSIE ([\d.]+)?/);var M=Array.prototype.slice;O(document);var U={init:function(a){a=a||document;a.createElement("canvas");a.attachEvent("onreadystatechange",W(this.init_,this,a))},init_:function(a){a=a.getElementsByTagName("canvas");for(var b=0;b<a.length;b++)this.initElement(a[b])},initElement:function(a){if(!a.getContext){a.getContext=
V;O(a.ownerDocument);a.innerHTML="";a.attachEvent("onpropertychange",X);a.attachEvent("onresize",Y);var b=a.attributes;b.width&&b.width.specified?a.style.width=b.width.nodeValue+"px":a.width=a.clientWidth;b.height&&b.height.specified?a.style.height=b.height.nodeValue+"px":a.height=a.clientHeight}return a}};U.init();for(var v=[],d=0;16>d;d++)for(var B=0;16>B;B++)v[16*d+B]=d.toString(16)+B.toString(16);var Z={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",
bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgreen:"#006400",darkgrey:"#A9A9A9",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",
darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",grey:"#808080",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",
ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgreen:"#90EE90",lightgrey:"#D3D3D3",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",mediumaquamarine:"#66CDAA",
mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",oldlace:"#FDF5E6",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",
peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",whitesmoke:"#F5F5F5",yellowgreen:"#9ACD32"},
H={},L={},$={butt:"flat",round:"round"},d=C.prototype;d.clearRect=function(){this.textMeasureEl_&&(this.textMeasureEl_.removeNode(!0),this.textMeasureEl_=null);this.element_.innerHTML=""};d.beginPath=function(){this.currentPath_=[]};d.moveTo=function(a,b){var c=s(this,a,b);this.currentPath_.push({type:"moveTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};d.lineTo=function(a,b){var c=s(this,a,b);this.currentPath_.push({type:"lineTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};d.bezierCurveTo=
function(a,b,c,g,e,f){e=s(this,e,f);a=s(this,a,b);c=s(this,c,g);R(this,a,c,e)};d.quadraticCurveTo=function(a,b,c,g){a=s(this,a,b);c=s(this,c,g);g={x:this.currentX_+2/3*(a.x-this.currentX_),y:this.currentY_+2/3*(a.y-this.currentY_)};R(this,g,{x:g.x+(c.x-this.currentX_)/3,y:g.y+(c.y-this.currentY_)/3},c)};d.arc=function(a,b,c,g,e,f){c*=q;var d=f?"at":"wa",k=a+K(g)*c-r,n=b+J(g)*c-r;g=a+K(e)*c-r;e=b+J(e)*c-r;k!=g||f||(k+=0.125);a=s(this,a,b);k=s(this,k,n);g=s(this,g,e);this.currentPath_.push({type:d,
x:a.x,y:a.y,radius:c,xStart:k.x,yStart:k.y,xEnd:g.x,yEnd:g.y})};d.rect=function(a,b,c,g){this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+c,b+g);this.lineTo(a,b+g);this.closePath()};d.strokeRect=function(a,b,c,g){var e=this.currentPath_;this.beginPath();this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+c,b+g);this.lineTo(a,b+g);this.closePath();this.stroke();this.currentPath_=e};d.fillRect=function(a,b,c,g){var e=this.currentPath_;this.beginPath();this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+
c,b+g);this.lineTo(a,b+g);this.closePath();this.fill();this.currentPath_=e};d.createLinearGradient=function(a,b,c,g){var e=new w("gradient");e.x0_=a;e.y0_=b;e.x1_=c;e.y1_=g;return e};d.createRadialGradient=function(a,b,c,g,e,f){var d=new w("gradientradial");d.x0_=a;d.y0_=b;d.r0_=c;d.x1_=g;d.y1_=e;d.r1_=f;return d};d.drawImage=function(a,b){var c,g,e,d,r,y,n,h;e=a.runtimeStyle.width;d=a.runtimeStyle.height;a.runtimeStyle.width="auto";a.runtimeStyle.height="auto";var l=a.width,u=a.height;a.runtimeStyle.width=
e;a.runtimeStyle.height=d;if(3==arguments.length)c=arguments[1],g=arguments[2],r=y=0,n=e=l,h=d=u;else if(5==arguments.length)c=arguments[1],g=arguments[2],e=arguments[3],d=arguments[4],r=y=0,n=l,h=u;else if(9==arguments.length)r=arguments[1],y=arguments[2],n=arguments[3],h=arguments[4],c=arguments[5],g=arguments[6],e=arguments[7],d=arguments[8];else throw Error("Invalid number of arguments");var m=s(this,c,g),p=[];p.push(" <g_vml_:group",' coordsize="',10*q,",",10*q,'"',' coordorigin="0,0"',' style="width:',
10,"px;height:",10,"px;position:absolute;");if(1!=this.m_[0][0]||this.m_[0][1]||1!=this.m_[1][1]||this.m_[1][0]){var t=[];t.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",k(m.x/q),",","Dy=",k(m.y/q),"");var v=s(this,c+e,g),w=s(this,c,g+d);c=s(this,c+e,g+d);m.x=x.max(m.x,v.x,w.x,c.x);m.y=x.max(m.y,v.y,w.y,c.y);p.push("padding:0 ",k(m.x/q),"px ",k(m.y/q),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",t.join(""),", sizingmethod='clip');")}else p.push("top:",
k(m.y/q),"px;left:",k(m.x/q),"px;");p.push(' ">','<g_vml_:image src="',a.src,'"',' style="width:',q*e,"px;"," height:",q*d,'px"',' cropleft="',r/l,'"',' croptop="',y/u,'"',' cropright="',(l-r-n)/l,'"',' cropbottom="',(u-y-h)/u,'"'," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",p.join(""))};d.stroke=function(a){var b=[];b.push("<g_vml_:shape",' filled="',!!a,'"',' style="position:absolute;width:',10,"px;height:",10,'px;"',' coordorigin="0,0"',' coordsize="',10*q,",",10*q,'"',
' stroked="',!a,'"',' path="');for(var c={x:null,y:null},d={x:null,y:null},e=0;e<this.currentPath_.length;e++){var f=this.currentPath_[e];switch(f.type){case "moveTo":b.push(" m ",k(f.x),",",k(f.y));break;case "lineTo":b.push(" l ",k(f.x),",",k(f.y));break;case "close":b.push(" x ");f=null;break;case "bezierCurveTo":b.push(" c ",k(f.cp1x),",",k(f.cp1y),",",k(f.cp2x),",",k(f.cp2y),",",k(f.x),",",k(f.y));break;case "at":case "wa":b.push(" ",f.type," ",k(f.x-this.arcScaleX_*f.radius),",",k(f.y-this.arcScaleY_*
f.radius)," ",k(f.x+this.arcScaleX_*f.radius),",",k(f.y+this.arcScaleY_*f.radius)," ",k(f.xStart),",",k(f.yStart)," ",k(f.xEnd),",",k(f.yEnd))}if(f){if(null==c.x||f.x<c.x)c.x=f.x;if(null==d.x||f.x>d.x)d.x=f.x;if(null==c.y||f.y<c.y)c.y=f.y;if(null==d.y||f.y>d.y)d.y=f.y}}b.push(' ">');a?T(this,b,c,d):S(this,b);b.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",b.join(""))};d.fill=function(){this.stroke(!0)};d.closePath=function(){this.currentPath_.push({type:"close"})};d.save=function(){var a=
{};P(this,a);this.aStack_.push(a);this.mStack_.push(this.m_);this.m_=t(D(),this.m_)};d.restore=function(){this.aStack_.length&&(P(this.aStack_.pop(),this),this.m_=this.mStack_.pop())};d.translate=function(a,b){z(this,t([[1,0,0],[0,1,0],[a,b,1]],this.m_),!1)};d.rotate=function(a){var b=K(a);a=J(a);z(this,t([[b,a,0],[-a,b,0],[0,0,1]],this.m_),!1)};d.scale=function(a,b){this.arcScaleX_*=a;this.arcScaleY_*=b;z(this,t([[a,0,0],[0,b,0],[0,0,1]],this.m_),!0)};d.transform=function(a,b,c,d,e,f){z(this,t([[a,
b,0],[c,d,0],[e,f,1]],this.m_),!0)};d.setTransform=function(a,b,c,d,e,f){z(this,[[a,b,0],[c,d,0],[e,f,1]],!0)};d.drawText_=function(a,b,c,d,e){var f=this.m_;d=0;var r=1E3,t=0,n=[],h;h=this.font;if(L[h])h=L[h];else{var l=document.createElement("div").style;try{l.font=h}catch(u){}h=L[h]={style:l.fontStyle||"normal",variant:l.fontVariant||"normal",weight:l.fontWeight||"normal",size:l.fontSize||10,family:l.fontFamily||"sans-serif"}}var l=h,m=this.element_;h={};for(var p in l)h[p]=l[p];p=parseFloat(m.currentStyle.fontSize);
m=parseFloat(l.size);"number"==typeof l.size?h.size=l.size:-1!=l.size.indexOf("px")?h.size=m:-1!=l.size.indexOf("em")?h.size=p*m:-1!=l.size.indexOf("%")?h.size=p/100*m:-1!=l.size.indexOf("pt")?h.size=m/0.75:h.size=p;h.size*=0.981;p=h.style+" "+h.variant+" "+h.weight+" "+h.size+"px "+h.family;m=this.element_.currentStyle;l=this.textAlign.toLowerCase();switch(l){case "left":case "center":case "right":break;case "end":l="ltr"==m.direction?"right":"left";break;case "start":l="rtl"==m.direction?"right":
"left";break;default:l="left"}switch(this.textBaseline){case "hanging":case "top":t=h.size/1.75;break;case "middle":break;default:case null:case "alphabetic":case "ideographic":case "bottom":t=-h.size/2.25}switch(l){case "right":d=1E3;r=0.05;break;case "center":d=r=500}b=s(this,b+0,c+t);n.push('<g_vml_:line from="',-d,' 0" to="',r,' 0.05" ',' coordsize="100 100" coordorigin="0 0"',' filled="',!e,'" stroked="',!!e,'" style="position:absolute;width:1px;height:1px;">');e?S(this,n):T(this,n,{x:-d,y:0},
{x:r,y:h.size});e=f[0][0].toFixed(3)+","+f[1][0].toFixed(3)+","+f[0][1].toFixed(3)+","+f[1][1].toFixed(3)+",0,0";b=k(b.x/q)+","+k(b.y/q);n.push('<g_vml_:skew on="t" matrix="',e,'" ',' offset="',b,'" origin="',d,' 0" />','<g_vml_:path textpathok="true" />','<g_vml_:textpath on="true" string="',N(a),'" style="v-text-align:',l,";font:",N(p),'" /></g_vml_:line>');this.element_.insertAdjacentHTML("beforeEnd",n.join(""))};d.fillText=function(a,b,c,d){this.drawText_(a,b,c,d,!1)};d.strokeText=function(a,
b,c,d){this.drawText_(a,b,c,d,!0)};d.measureText=function(a){this.textMeasureEl_||(this.element_.insertAdjacentHTML("beforeEnd",'<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>'),this.textMeasureEl_=this.element_.lastChild);var b=this.element_.ownerDocument;this.textMeasureEl_.innerHTML="";this.textMeasureEl_.style.font=this.font;this.textMeasureEl_.appendChild(b.createTextNode(a));return{width:this.textMeasureEl_.offsetWidth}};d.clip=function(){};
d.arcTo=function(){};d.createPattern=function(a,b){return new I(a,b)};w.prototype.addColorStop=function(a,b){b=G(b);this.colors_.push({offset:a,color:b.color,alpha:b.alpha})};d=A.prototype=Error();d.INDEX_SIZE_ERR=1;d.DOMSTRING_SIZE_ERR=2;d.HIERARCHY_REQUEST_ERR=3;d.WRONG_DOCUMENT_ERR=4;d.INVALID_CHARACTER_ERR=5;d.NO_DATA_ALLOWED_ERR=6;d.NO_MODIFICATION_ALLOWED_ERR=7;d.NOT_FOUND_ERR=8;d.NOT_SUPPORTED_ERR=9;d.INUSE_ATTRIBUTE_ERR=10;d.INVALID_STATE_ERR=11;d.SYNTAX_ERR=12;d.INVALID_MODIFICATION_ERR=
13;d.NAMESPACE_ERR=14;d.INVALID_ACCESS_ERR=15;d.VALIDATION_ERR=16;d.TYPE_MISMATCH_ERR=17;G_vmlCanvasManager=U;CanvasRenderingContext2D=C;CanvasGradient=w;CanvasPattern=I;DOMException=A}();
/*
 CanvasJS jQuery Charting Plugin - http://canvasjs.com/ 
 Copyright 2013 fenopix
*/
(function(b,c,d,e){b.fn.CanvasJSChart=function(a){if(a){var b=this.first();a=new CanvasJS.Chart(this[0],a);b.children(".canvasjs-chart-container").data("canvasjsChartRef",a);a.render();return this}return this.first().children(".canvasjs-chart-container").data("canvasjsChartRef")}})(jQuery,window,document);

/**
 * Created by julian on 16-11-15.
 */
$(document).ready(function(){

    $('.qrcode').each(function() {
        var qrcode = $(this).attr('value')
        console.log(qrcode);
        $(this).qrcode({
            "size": 95,
            "color": "#3a3",
            "text": qrcode
        });
    });


    var viewheight = $(document).height();
    var containerheight = viewheight - 141 - 150;
    $('.container.body').css({"min-height" : containerheight+"px" });

    $('.tr-group .opensaldoform, .opensaldoform.userform').on("click", function(e){
        e.preventDefault();
        $(this).parent().parent().parent().find('.user_transaction_form').slideToggle();
        console.log(this)
    })

});

function appendFrame(username, index){
    var frame = 'iframe[name=frame'+index+']';

    if($(frame).length > 0){

    }else{
        $('body').append("<iframe style=\"display: none\" src=\"/digitalartlab/web/profile/" + username + "/print\" name=\"frame" + index + "\"></iframe>");
    }

}

