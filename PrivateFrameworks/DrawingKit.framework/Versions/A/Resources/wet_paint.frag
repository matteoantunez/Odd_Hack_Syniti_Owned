#version 100

precision mediump float;

uniform bool  uSubtractEndPointsOnly;

varying mediump float vSize;
varying mediump float vSpecLife;
varying mediump float vBleedLife;
varying mediump float vSubtractive;

float linearstep(float lo, float hi, float x)
{
    return (clamp(x, lo, hi) - lo) / (hi - lo);
}

void main(void)
{
    float one_uv_pixel = 1.0 / vSize; // 1 divided by diameter
    vec2 pTexCoord = (gl_PointCoord - 0.5) * 2.0;
    float dist_squared = dot(pTexCoord, pTexCoord);
    float r = 1.0 - linearstep(max(0.0, 1.0 - one_uv_pixel * 5.0), 1.0, dist_squared);// antialiasing
    // NOTE: values are hardcoded to each lifespan (bleed and specularity.)
    // first value accounts for fast redraw cases while case two covers live drawing with new specular
    // lifespan being too long causing over-accumulation, therefore sharing r over the length of time
    // over ink bleed to provide adequate 'dry' coverage. This value is subject to 8bit clamping so it
    // has been adjusted linearly.
    float t = linearstep(0.0, 0.65, vSpecLife);
    float g = uSubtractEndPointsOnly ? r : r * ((0.024 / 0.65) - step(0.65/2.0, vSpecLife));
    gl_FragColor = vec4(r * (1.0 - vSpecLife), g, g * vSubtractive, r);
}
