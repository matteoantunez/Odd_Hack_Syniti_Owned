//
//  line.fsh
//  ET
//
//  Created by Alexander Rogoyski on 5/15/14.
//  Copyright (c) 2014 Apple. All rights reserved.
//

void main ()
{
    mediump float vpath  = v_path_distance;
    mediump float vlen   = u_path_length;
    mediump float time   = uCurTime - vpath / vlen + 1.0;
    mediump float alpha  = 1.0 - clamp(time - 1.99, 0.0, 0.1) * 100.0;
    mediump float y      = v_tex_coord.y;
    mediump vec3  color  = uColor;

    alpha *= clamp(time + 2.0, 0.0, 0.01) * 100.0;
    alpha *= (1.0 - abs(y - 0.5)*2.0) * 1.0;

    gl_FragColor = vec4(color*alpha, alpha);
}

