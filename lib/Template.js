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



var Babel = require( 'babel-tower' ) ;
var commonParsers = require( 'kung-fig-common-parsers' ) ;
//var Dynamic = require( 'kung-fig-dynamic' ) ;



function Template( template ) { return Template.create( template ) ; }
Template.prototype = Object.create( Babel.Sentence.prototype ) ;
Template.prototype.constructor = Template ;

module.exports = Template ;

Template.Element = require( './TemplateElement.js' ) ;

Template.prototype.__prototypeUID__ = 'kung-fig/Template' ;
Template.prototype.__prototypeVersion__ = require( '../package.json' ).version ;
Template.prototype.__isDynamic__ = true ;
Template.prototype.__isApplicable__ = false ;



Template.prototype.toString = function toString( ... args ) {
	if ( ! this.__isDynamic__ ) { return this.template ; }
	return this.toStringKFG( ... args ) ;
} ;



Template.prototype.getRecursiveFinalValue =
Template.prototype.getFinalValue =
Template.prototype.get =
Template.prototype.getValue = function getValue( ctx ) {
	return this.__isDynamic__ ? this.toStringKFG( ctx ) : this ;
} ;



Template.prototype.apply = function apply( ctx ) {
	return this.__isApplicable__ ? this.toStringKFG( ctx ) : this ;
} ;



Template.create = function create( template ) {
	var self = Object.create( Template.prototype ) ;

	if ( typeof template !== 'string' ) { template = '' ; }

	Babel.Sentence.create( template , Babel.default , self ) ;

	return self ;
} ;



// For instance, there is no difference
Template.parse = Template.create ;



Template.parseFromKfg = function parseFromKfg( str , runtime , applicable ) {
	var v = Template.create( commonParsers.parseQuotedString( str , runtime ) ) ;

	if ( applicable ) {
		v.__isDynamic__ = false ;
		v.__isApplicable__ = true ;
	}

	return v ;
} ;

