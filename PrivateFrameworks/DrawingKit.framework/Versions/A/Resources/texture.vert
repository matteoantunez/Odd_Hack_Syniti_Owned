#version 100

uniform mat4	uModelViewProjection;

attribute vec4	iPosition;
attribute vec2	iTexCoord;

varying mediump vec2 vTexCoord;

void main( void )
{
    vTexCoord = iTexCoord;
	gl_Position = uModelViewProjection * iPosition;
}
