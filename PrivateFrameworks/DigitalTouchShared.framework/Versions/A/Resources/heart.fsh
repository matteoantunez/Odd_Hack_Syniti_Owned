//
//  heart.fsh
//  ET
//
//  Created by Alexander Rogoyski on 7/2/14.
//  Copyright (c) 2014 Apple. All rights reserved.
//

void main () {
    vec4 c = texture2D(u_texture, v_tex_coord);
    
    float channelMap;
    float frameCount = 20.0;
    vec2 frameScale = vec2(0.2, 0.25); // 1/5, 1/4 (5 by 4 size of atlas)
    float loopSpeed = 2.0; // must remain constant
    float atlasTime = mod((u_scale - 1.0) * 0.65 + u_shader_time, loopSpeed)/loopSpeed;
    
    float currFrameIndex = mod(floor(frameCount * atlasTime), frameCount) + frameCount;
    float prevFrameIndex = mod(floor(currFrameIndex - 1.0), frameCount) + frameCount;

    vec2 inverseFrameScale = 1.0 / frameScale;
    
    mat2 offsets = mat2(mod(currFrameIndex, inverseFrameScale.x), inverseFrameScale.y - 1.0 - mod(floor((currFrameIndex) * frameScale.x) , inverseFrameScale.y),
                        mod(prevFrameIndex, inverseFrameScale.x), inverseFrameScale.y - 1.0 - mod(floor((prevFrameIndex) * frameScale.x) , inverseFrameScale.y));
    
    vec4 currFrame = texture2D(u_tex2, frameScale * (v_tex_coord + offsets[0]));
    vec4 prevFrame = texture2D(u_tex2, frameScale * (v_tex_coord + offsets[1]));
    
    float frameTime = fract(atlasTime * frameCount);
    float channelTime = frameTime * 3.0;
    channelMap = mix (mix (mix(prevFrame.b,  currFrame.r, clamp(channelTime, 0.0, 1.0)), currFrame.g, clamp(channelTime - 1.0, 0.0, 1.0)), currFrame.b, clamp(channelTime - 2.0, 0.0, 1.0));
    
    float luma = channelMap * (u_scale * 0.2 + 0.9);
    vec3 color = v_color_mix.xyz * vec3(luma);

    gl_FragColor = vec4(color, channelMap*v_color_mix.a);
}
