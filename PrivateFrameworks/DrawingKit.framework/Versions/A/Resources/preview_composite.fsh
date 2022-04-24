#version 100

precision mediump float;

varying mediump vec2 vTexCoord;

uniform sampler2D texture_dest;
uniform vec4 uColor;

void main(void)
{
    float DEST = texture2D(texture_dest, vTexCoord).r;
    gl_FragColor = uColor * (DEST);
}
