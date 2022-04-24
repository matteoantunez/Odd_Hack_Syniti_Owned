#version 100

precision mediump float;

varying mediump vec2 vTexCoord;

uniform sampler2D texture_src;

void main(void)
{
    gl_FragColor = texture2D(texture_src, vTexCoord);
}
