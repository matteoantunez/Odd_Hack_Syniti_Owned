#version 100

precision mediump float;

varying mediump float vSize;
varying mediump vec4 vColor;

float linearstep(float lo, float hi, float x)
{
    return (clamp(x, lo, hi) - lo) / (hi - lo);
}

void main(void)
{
    float one_uv_pixel = 1.0 / (vSize * 2.0); // 1 divided by diameter
    vec2 pTexCoord = (gl_PointCoord - 0.5) * 2.0;
    float dist_squared = dot(pTexCoord, pTexCoord);
    float r = 1.0 - linearstep(1.0 - one_uv_pixel * 4.0, 1.0, dist_squared);
    gl_FragColor = vec4(r, 1.0, 1.0, 1.0);
}
