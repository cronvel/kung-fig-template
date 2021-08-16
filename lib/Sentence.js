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



const common = require( 'kung-fig-common' ) ;
//const Dynamic = require( 'kung-fig-dynamic' ) ;
const Babel = require( 'babel-tower' ) ;
const Sentence = Babel.Sentence ;



function TemplateSentence( template , locale = null ) {
	if ( typeof template !== 'string' ) { template = '' ; }
	Sentence.call( this , template , Babel.default , locale ) ;
}



TemplateSentence.prototype = Object.create( Sentence.prototype ) ;
TemplateSentence.prototype.constructor = TemplateSentence ;

module.exports = TemplateSentence ;

TemplateSentence.prototype.__prototypeUID__ = 'kung-fig/TemplateSentence' ;
TemplateSentence.prototype.__prototypeVersion__ = require( '../package.json' ).version ;
TemplateSentence.prototype.__isDynamic__ = true ;
TemplateSentence.prototype.__isApplicable__ = false ;

TemplateSentence.serializerFnId = 'TemplateSentence' ;



TemplateSentence.serializer = object => ( {
	args: [ object.key ] ,
	overideKeys: [ '__isDynamic__' , '__isApplicable__' ]
} ) ;



TemplateSentence.prototype.toString = function( ... args ) {
	if ( ! this.__isDynamic__ ) { return this.key ; }
	return this.toStringKFG( ... args ) ;
} ;



TemplateSentence.prototype.getRecursiveFinalValue =	// <-- DEPRECATED
TemplateSentence.prototype.getDeepFinalValue =
TemplateSentence.prototype.getFinalValue =
TemplateSentence.prototype.get =
TemplateSentence.prototype.getValue = function( ctx ) {
	return this.__isDynamic__ ? this.toStringKFG( ctx ) : this ;
} ;



TemplateSentence.prototype.apply = function( ctx ) {
	return this.__isApplicable__ ? this.toStringKFG( ctx ) : this ;
} ;



// For instance, there is no difference
TemplateSentence.parse = template => new TemplateSentence( template ) ;



TemplateSentence.parseFromKfg = ( str , runtime , applicable ) => {
	var v = new TemplateSentence( common.parsers.parseQuotedString( str , runtime ) , runtime.locale ) ;

	if ( applicable ) {
		v.__isDynamic__ = false ;
		v.__isApplicable__ = true ;
	}

	return v ;
} ;

