#version 100
#define KERNEL_SIZE 9

precision mediump float;

varying highp vec2 vTexCoord;

uniform sampler2D texture_dest;
uniform sampler2D texture_paper;
uniform vec2 uViewport;
uniform mediump vec4 uColor;
uniform mediump float uTargetMultiple;
uniform bool uIncludeWetPass;

mediump vec2 offset[KERNEL_SIZE];

float linearstep(float lo, float hi, float x)
{
    return (clamp(x, lo, hi) - lo) / (hi - lo);
}

void main(void)
{
    float paper = texture2D(texture_paper, uViewport / 512.0 * vTexCoord).r;
    // CLAMP_TO_BORDER
    vec4 paint;
    if (vTexCoord.s < 0.0 || vTexCoord.s > 1.0)
    {
        paint = vec4(0.0);
    }
    else
    {
        paint = texture2D(texture_dest, vTexCoord);
    }
    
    float specular = 0.0;
    if (uIncludeWetPass)
    {
        vec2 dim = vec2(1.0/uViewport.x, 1.0/uViewport.y);
        
        offset[0] = vec2( -1.0, -1.0);
        offset[1] = vec2(0.0, -1.0);
        offset[2] = vec2(  1.0, -1.0);
        offset[3] = vec2( -1.0, 0.0);
        offset[4] = vec2(0.0, 0.0);
        offset[5] = vec2(  1.0, 0.0);
        offset[6] = vec2( -1.0, 1.0);
        offset[7] = vec2(0.0, 1.0);
        offset[8] = vec2(  1.0, 1.0);
        mediump vec3 normal = vec3(0.0);
        
        // normals from kernel
        for( int i=0; i<KERNEL_SIZE; i++ ){
            float kernSRC = texture2D( texture_dest, vTexCoord + offset[i] * dim * 4.0 ).r; // create a bump map with smooth edge falloff
            float kernBump = 1.0 - smoothstep(0.93, 1.0, texture2D(texture_paper, uViewport / 512.0 * vTexCoord + offset[i] * dim).r);
            normal.xy += offset[i] * (1.0 - (kernSRC + kernBump));
        }
        normal.xy /= 9.0; //average
        normal.xy = 1.0 - (1.0 - normal.xy) * (1.0 - normal.xy);
        normal.z = -sqrt(1.0 - length(normal.xy));
        
        // Position in eye space
        vec3 P = vec3(vTexCoord, 0.0);
        // Normalized vector toward the light source
        vec3 L = normalize(vec3(-1.0, -1.0, -0.1) - P);
        // Compute the specular term
        vec3 V = normalize(-P);      // Normalized vector toward the viewpoint
        vec3 H = normalize(L + V);   // Normalized vector that is halfway between V and L
        specular = pow(max(dot(normal, H),0.0), 2.0);
        specular *= paint.r;
    }
    
    float M = paint.g - paint.r;
    float A = paint.a * paper;
    
    float mixColor = uColor.r > 0.5 ? 1.0 : 0.0;
    
    vec4 T = mix(uColor, vec4(mixColor, mixColor, mixColor, 0.0), linearstep(uTargetMultiple, 1.0, M));
    
    gl_FragColor = vec4(T.rgb + specular * 0.75, A);
}
