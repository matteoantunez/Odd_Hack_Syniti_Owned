#extension GL_OES_standard_derivatives : enable

uniform sampler2D backDiffuse;

if (float(gl_FrontFacing) == 0.0) {
    _surface.diffuse = texture2D(backDiffuse, _surface.backDiffuseTexcoord);
}

_surface.normal = -normalize(cross(dFdy(_surface.position), dFdx(_surface.position)));
