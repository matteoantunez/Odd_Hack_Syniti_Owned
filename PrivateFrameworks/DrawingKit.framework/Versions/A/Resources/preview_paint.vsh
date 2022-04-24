#version 100

uniform mat4 ModelViewProjection;

attribute vec4     iColor;
attribute vec2     iPosition;
attribute vec2     iRand;
attribute vec2     iVelocity;
attribute float    iBirth;
attribute float    iSize;
attribute float    iForce;

varying mediump float vSize;
varying mediump vec4  vColor;


void main( void )
{
    vColor = iColor;
    float vratio = 1.0 - smoothstep(0.0, 5.0, length(iVelocity));
    vratio *= vratio;
    vSize = 1.0 + (iSize * 0.1 + 2.0 * iForce) * vratio;
    
    gl_Position = ModelViewProjection * vec4(iPosition + iRand * 0.1, 0.0, 1.0);
    gl_PointSize = vSize;
}
