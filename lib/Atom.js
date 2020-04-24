/*
	Kung Fig Template

	Copyright (c) 2015 - 2020 Cédric Ronvel

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



//const common = require( 'kung-fig-common' ) ;
//const Dynamic = require( 'kung-fig-dynamic' ) ;
const Babel = require( 'babel-tower' ) ;
const Atom = Babel.Atom ;



function TemplateAtom( atom , locale ) {
	if ( typeof atom === 'string' ) {
		Atom.call( this , undefined , locale ) ;
		this.parse( atom ) ;
	}
	else if ( atom && typeof atom === 'object' ) {
		// Give precedence to the object locale
		Atom.call( this , atom , atom.l !== undefined ? atom.l : locale ) ;
	}
	else {
		Atom.call( this , atom , locale ) ;
	}
}



TemplateAtom.prototype = Object.create( Atom.prototype ) ;
TemplateAtom.prototype.constructor = TemplateAtom ;

module.exports = TemplateAtom ;

TemplateAtom.prototype.__prototypeUID__ = 'kung-fig/TemplateAtom' ;
TemplateAtom.prototype.__prototypeVersion__ = require( '../package.json' ).version ;

TemplateAtom.serializerFnId = 'TemplateAtom' ;



TemplateAtom.serializer = object => ( { overide: object } ) ;

