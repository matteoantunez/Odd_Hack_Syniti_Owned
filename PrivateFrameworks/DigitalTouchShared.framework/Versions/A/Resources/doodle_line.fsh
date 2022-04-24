//
//  line.fsh
//  ET
//
//  Created by Alexander Rogoyski on 5/15/14.
//  Copyright (c) 2014 Apple. All rights reserved.
//

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main ()
{
    //point along horizontal path distance
    mediump float vpath            = v_path_distance;
    //length of path in horizontal distance
    mediump float vlen             = u_path_length;
    //normalized point along distance
    mediump float vRatio           = vpath/vlen;
    //updated to reflect time to fade out. normalized externally
    mediump float dimRatio         = uDimTime;
    //updated to reflect time to undraw. normalized externally
    mediump float deathRatio       = uDeathTime;
    //updated to reflect time to draw. normalized externally
    mediump float birthRatio       = uBirthTime;
    //updated to reflect time to set a constant color across the stroke. normalized externally
    mediump float coolRatio        = uCoolTime;
    //time ratio applied against point in stroke distance
    mediump float deathTime        = 1.0 + deathRatio - vRatio;
    //time ratio applied against point in stroke distance
    mediump float birthTime        = 1.0 + birthRatio - vRatio;
    
    //pixel based value representing length of tapering
    mediump float taperLen         = 50.0;
    //inversely applied taper amount applied as ratio to the length of the stroke
    mediump float invtapAmt        = clamp(1.0 - taperLen/vlen * 0.5, 0.2, 1.0);
    
    //amount of taper to apply in this coordinate space
    mediump float taper            = 1.0 - (clamp(abs(vRatio - 0.5)*2.0, invtapAmt, 1.0) - invtapAmt) * (1.0/(1.0 - invtapAmt));
    //initial alpha value. applied against undraw time ratio.
    mediump float death            = 1.0 - clamp(deathTime - 1.0, 0.0, 0.1) * 10.1
                                   + clamp(birthTime, -0.01, 0.0) * 101.0;
    //how much coolratio should be applied in this coordinate space
    mediump float ramp             = clamp((1.0 - vRatio) + coolRatio * 2.0, 0.0, 1.0);
    
    mediump float y                = v_tex_coord.y;
    //input color
    mediump vec3  color            = uColor;
    
    //brightness saturation value adjusted by ramp and dim ratios
    color.yz = clamp(color.yz + (0.5 + -0.5*ramp) + (vec2(0.3,-1.0) * dimRatio), 0.0, 1.0);
    //hue value adjust by ramp and dim ratios
    color.x = mod(color.x + 0.125 + (-0.125 * ramp) + (0.03 * dimRatio) + 1.0, 1.0);
    color = hsv2rgb(color);
    
    // white blast
    color.xyz = color.xyz + (1.0 - ramp);
    
    //sharpness value chops off the top of the alpha curve from the center of the y texcoord
    mediump float sharpness = 1.75;
    //alpha falloff from center of stroke and subtracted by dim and taper ratios. Sharpness applied to all. (pow against inverse taper increases roundedness. lower pow results in more linear taper)
    mediump float tpr = 1.0 - taper;
    tpr *= tpr;
    tpr *= tpr;
    
    mediump float curve = abs(y - 0.5) * 2.0;
    curve *= curve;
    curve = 1.0 - curve;
    curve = clamp((curve - dimRatio - tpr) * sharpness, 0.0, 1.0);

    death *= curve;
    
    gl_FragColor = vec4(color * death, death);
}

