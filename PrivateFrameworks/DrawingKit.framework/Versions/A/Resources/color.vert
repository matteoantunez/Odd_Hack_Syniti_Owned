#version 100

uniform mat4	uModelViewProjection;

attribute vec4	iPosition;
attribute vec2	iTexCoord;

void main( void )
{
	gl_Position = uModelViewProjection * iPosition;
}