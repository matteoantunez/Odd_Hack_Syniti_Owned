#version 100

uniform mat4 uModelViewProjection;

uniform float uSize;
uniform float uTime;
uniform float uLifespan;
uniform bool  uSubtractEndPointsOnly;

attribute vec2     iPosition;
attribute float    iSpeed;
attribute float    iBirth;
attribute float    iForce;
attribute float    iEndPoint;

varying mediump float vSize;
varying mediump float vSpecLife;
varying mediump float vBleedLife;
varying mediump float vSubtractive;

void main( void )
{
    vSubtractive = uSubtractEndPointsOnly ? iEndPoint : 1.0;
    vSpecLife = clamp((uTime - iBirth) / uLifespan, 0.0, 1.0);
    vBleedLife = clamp((uTime - iBirth) / 0.65, 0.0, 1.0);
    float life = smoothstep(0.0, 1.0, vBleedLife);
    vSize = uSize * 0.1 + (uSize * 0.36 + uSize * 0.09 * life) * iSpeed + (uSize * 0.45 * life) * (iForce * 0.8 + iSpeed * 0.2);
    gl_Position = uModelViewProjection * vec4(iPosition, 0.0, 1.0);
    gl_PointSize = vSize;
}
