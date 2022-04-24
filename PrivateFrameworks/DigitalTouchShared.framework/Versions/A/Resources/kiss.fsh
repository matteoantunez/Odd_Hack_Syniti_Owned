//
//  kiss.fsh
//  ET
//
//  Created by Nick on 4/8/16.
//  Copyright (c) 2016 Apple. All rights reserved.
//

void main ()
{
    float channelMap;
    float frameCount = 20.0;
    vec2 frameScale = vec2(0.2, 0.25); // 1/5, 1/4 (5 by 4 size of atlas)
    float atlasTime = u_shader_time*0.8;
    
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

    gl_FragColor = v_color_mix*clamp(3.0*channelMap, 0.0, 1.0);
}
