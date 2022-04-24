attribute vec4 inVertex;
attribute float inPointSize;

uniform mat4 ModelViewProjection;
uniform lowp vec4 vertexColor;
varying lowp vec4 color;

void main()
{
    gl_Position = ModelViewProjection * inVertex;
    gl_PointSize = inPointSize;
    color = vertexColor;
}