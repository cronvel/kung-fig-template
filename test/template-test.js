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

/* jshint unused:false */
/* global describe, it, before, after */

"use strict" ;



var template = require( '..' ) ;
var TemplateSentence = template.Sentence ;
var TemplateAtom = template.Atom ;

var expect = require( 'expect.js' ) ;



function deb( v )
{
	console.log( string.inspect( { style: 'color' , depth: 15 } , v ) ) ;
}

function debfn( v )
{
	console.log( string.inspect( { style: 'color' , depth: 5 , proto: true , funcDetails: true } , v ) ) ;
}



describe( "Template test" , function() {
	
	it( "Sentence tests" , function() {
		expect( TemplateSentence.create( "some raw string" ).getValue( {} ) ).to.be( "some raw string" ) ;
		expect( TemplateSentence.create( "Hello ${name}!" ).getValue( { name: "bob" } ) ).to.be( "Hello bob!" ) ;
		expect( TemplateSentence.create( "Hello ${name//uc1}!" ).getValue( { name: "bob" } ) ).to.be( "Hello Bob!" ) ;
	} ) ;
	
	it( "Atom tests" , function() {
		expect( TemplateAtom.create( { g: 'f' , "g?": [ 'cheval' , 'jument' ] } ).getValue( {} ) ).to.be( "jument" ) ;
		expect( TemplateAtom.create( { g: 'm' , "g?": [ 'cheval' , 'jument' ] } ).getValue( {} ) ).to.be( "cheval" ) ;
		expect( TemplateAtom.parse( '[g:f/g?cheval|jument]' ).getValue( {} ) ).to.be( "jument" ) ;
		expect( TemplateAtom.parse( '[g:m/g?cheval|jument]' ).getValue( {} ) ).to.be( "cheval" ) ;
	} ) ;
	
	it( "Applicable sentence tests" , function() {
		var tpl = TemplateSentence.create( "Hello ${name}!" ) ;
		tpl.__isDynamic__ = false ;
		tpl.__isApplicable__ = true ;
		expect( tpl.getValue( { name: "bob" } ) ).to.be( tpl ) ;
		expect( tpl.toString( { name: "bob" } ) ).to.be( "Hello ${name}!" ) ;
		expect( tpl.apply( { name: "bob" } ) ).to.be( "Hello bob!" ) ;
	} ) ;
	
	it( "Applicable atom tests" , function() {
		var el = TemplateAtom.create( { g: 'f' , "g?": [ 'cheval' , 'jument' ] } ) ;
		el.__isDynamic__ = false ;
		el.__isApplicable__ = true ;
		expect( el.getValue() ).to.be( el ) ;
		//expect( el.toString() ).to.be( "" ) ;
		expect( el.apply() ).to.be( "jument" ) ;
	} ) ;
	
	it.skip( "Applicable atom stringify" , function() {
		var el = TemplateAtom.parse( '[g:f/g?cheval|jument]' ) ;
		el.__isDynamic__ = false ;
		el.__isApplicable__ = true ;
		expect( el.getValue() ).to.be( el ) ;
		expect( el.toString() ).to.be( '[g:f/g?cheval|jument]' ) ;
		expect( el.apply() ).to.be( "jument" ) ;
	} ) ;
} ) ;


