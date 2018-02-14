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



var commonParsers = require( 'kung-fig-common-parsers' ) ;
//var Dynamic = require( 'kung-fig-dynamic' ) ;
var Babel = require( 'babel-tower' ) ;
var Element = Babel.Element ;



function TemplateElement( element ) { return TemplateElement.create( element ) ; }
TemplateElement.prototype = Object.create( Element.prototype ) ;
TemplateElement.prototype.constructor = TemplateElement ;

module.exports = TemplateElement ;

TemplateElement.prototype.__prototypeUID__ = 'kung-fig/TemplateElement' ;
TemplateElement.prototype.__prototypeVersion__ = require( '../package.json' ).version ;
TemplateElement.prototype.__isDynamic__ = true ;
TemplateElement.prototype.__isApplicable__ = false ;



TemplateElement.prototype.toString = function toString( ... args ) {
	if ( ! this.__isDynamic__ ) { return '<TemplateElement-TODO:Stringify>' ; }
	return this.toStringKFG( ... args ) ;
} ;



TemplateElement.prototype.getRecursiveFinalValue =
TemplateElement.prototype.getFinalValue =
TemplateElement.prototype.get =
TemplateElement.prototype.getValue = function getValue( ctx ) {
	return this.__isDynamic__ ? this.toStringKFG( ctx ) : this ;
} ;



TemplateElement.prototype.apply = function apply( ctx ) {
	return this.__isApplicable__ ? this.toStringKFG( ctx ) : this ;
} ;



TemplateElement.create = function create( element ) {
	//element.babel = Babel.default ;
	return Element.create( element , TemplateElement.prototype ) ;
} ;



TemplateElement.parse = function parse( str ) {
	return Element.parse( str , { babel: Babel.default , proto: TemplateElement.prototype } ) ;
} ;



TemplateElement.parseFromKfg = function parseFromKfg( str , runtime , applicable ) {
	var v = TemplateElement.parse( commonParsers.parseQuotedString( str , runtime ) ) ;

	if ( applicable ) {
		v.__isDynamic__ = false ;
		v.__isApplicable__ = true ;
	}

	return v ;
} ;

