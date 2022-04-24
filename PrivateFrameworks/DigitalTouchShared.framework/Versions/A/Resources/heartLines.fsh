//
//  heartLines.fsh
//  ET
//
//  Created by Alexander Rogoyski on 7/2/14.
//  Copyright (c) 2014 Apple. All rights reserved.
//

void main () {
    
    float timeScale = u_shader_time * u_speed;
    
    float sine = sin(u_shader_time);
    float cosine = cos(u_shader_time);
    
    mat2 rotationMatrix = mat2( cosine, -sine, sine, cosine);
    vec2 rotationCoords = rotationMatrix * (v_tex_coord-0.5);
    rotationCoords += 0.5;
    
    vec4 main = texture2D(u_texture, v_tex_coord);
    vec4 ramp =  texture2D(u_tex2, v_tex_coord);
    
    vec4 noiseTex = texture2D(u_tex3, rotationCoords);
    
    sine = -sine;
    rotationMatrix = mat2( cosine, -sine, sine, cosine);
    rotationCoords = rotationMatrix * (v_tex_coord-0.5);
    rotationCoords += 0.5;
    noiseTex = mix(texture2D(u_tex3, rotationCoords), noiseTex, 0.5);
    
    float noiseMap;
    float luma;
    
    noiseMap = ramp.r + mix(0.0, noiseTex.r, 0.4 * u_scale);
    
    luma = (abs(sin(noiseMap * (50.0 * u_scale + 50.0))));
    
    // mask
    luma *=  smoothstep(0.2, 0.9, main.r) * (0.5 + 0.55 * u_scale) * (1.0 - main.r) * 2.0;
    
    //luma = clamp(luma, 0.0, 1.0);
    
    gl_FragColor = vec4(luma) * v_color_mix;
}