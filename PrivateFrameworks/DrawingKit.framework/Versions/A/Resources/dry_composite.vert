#version 100

uniform mat4 uModelViewProjection;

attribute vec4  iPosition;
attribute vec2  iTexCoord0;

varying highp vec2 vTexCoord;

void main( void )
{
    vTexCoord = iTexCoord0;
    gl_Position = uModelViewProjection * iPosition;
}
