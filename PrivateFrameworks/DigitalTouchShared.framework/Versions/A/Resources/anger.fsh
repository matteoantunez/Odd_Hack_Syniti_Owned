//
//  anger.fsh
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
    float atlasTime = u_shader_time;
    
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

	// Apply luminance to chrominance mapping
	vec4 redColor = vec4(0.862, 0.106, 0.067, 1.0);			// Red color sampled from video render
	vec4 yellowColor = vec4(0.867, 0.733, 0.286, 1.0);		// Yellow color sampled from video render
	float redAmount = smoothstep(0.0, 0.5, channelMap);		// Red ramp over first 50%
	float yellowAmount = smoothstep(0.3, 0.7, channelMap);	// Yellow ramp from 30% to 70%
	float whiteAmount = smoothstep(0.6, 1.0, channelMap);	// White ramp from 60% to 100%
	vec4 totalColor = clamp(redColor*redAmount + yellowColor*yellowAmount + whiteAmount, 0.0, 1.0);

	gl_FragColor = totalColor*0.95*v_color_mix.a;
}
