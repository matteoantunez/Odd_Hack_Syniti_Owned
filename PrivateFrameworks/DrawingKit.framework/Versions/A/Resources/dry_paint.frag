#version 100

precision mediump float;
varying mediump vec2 vTexCoord;

uniform sampler2D texture_src;
uniform sampler2D texture_dest;
uniform mediump float uTargetMultiple;
uniform mediump float uXCoordOffset;

void main(void)
{
    vec4 SRC = texture2D(texture_src, vTexCoord); // previous dest (dry buffer)
    vec4 DEST = texture2D(texture_dest, vTexCoord + vec2(uXCoordOffset, 0.0)); // current dest (wet buffer transfer)
    
    float alpha = max(DEST.a, SRC.a);
    float diff = min(DEST.g + SRC.b, 1.0) - SRC.b;
    diff *= uTargetMultiple;
    float previousDrySegment = DEST.b;
    
    gl_FragColor = vec4(DEST.r, diff + (1.0 - diff) * SRC.g, previousDrySegment, alpha);
}
