/*
	Kung Fig Template

	Copyright (c) 2015 - 2018 Cédric Ronvel

	The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

"use strict" ;



//var common = require( 'kung-fig-common' ) ;
//var Dynamic = require( 'kung-fig-dynamic' ) ;
var Babel = require( 'babel-tower' ) ;
var Atom = Babel.Atom ;



function TemplateAtom( atom ) {
	if ( typeof atom === 'string' ) {
		Atom.call( this ) ;
		this.parse( atom ) ;
	}
	else {
		Atom.call( this , atom ) ;
	}
}



TemplateAtom.prototype = Object.create( Atom.prototype ) ;
TemplateAtom.prototype.constructor = TemplateAtom ;

module.exports = TemplateAtom ;

TemplateAtom.prototype.__prototypeUID__ = 'kung-fig/TemplateAtom' ;
TemplateAtom.prototype.__prototypeVersion__ = require( '../package.json' ).version ;

TemplateAtom.serializerFnId = 'TemplateAtom' ;



// For backward-compatibility, should be deprecated
TemplateAtom.create = function create( atom ) {
	return new TemplateAtom( atom ) ;
} ;



TemplateAtom.serializer = function serializer( object ) {
	return { overide: object } ;
} ;

