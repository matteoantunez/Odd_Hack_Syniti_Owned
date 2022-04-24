//#extension GL_EXT_gpu_shader4 : require

uniform vec3 pos0;
uniform vec3 pos1;
uniform vec3 pos2;
uniform vec3 pos4;
uniform vec3 pos5;
uniform vec3 pos8;
uniform vec3 pos9;
uniform vec3 pos10;

if (_geometry.position.z == 0.0) {
    _geometry.position.xyz = pos0;
}

else if (_geometry.position.z == 1.0) {
    _geometry.position.xyz = pos1;
}

else if (_geometry.position.z == 2.0) {
    _geometry.position.xyz = pos2;
}

else if (_geometry.position.z == 4.0) {
    _geometry.position.xyz = pos4;
}

else if (_geometry.position.z == 5.0) {
    _geometry.position.xyz = pos5;
}

else if (_geometry.position.z == 8.0) {
    _geometry.position.xyz = pos8;
}

else if (_geometry.position.z == 9.0) {
    _geometry.position.xyz = pos9;
}

else if (_geometry.position.z == 10.0) {
    _geometry.position.xyz = pos10;
}

else {
    _geometry.position.z = 0.0; // due to hack
}
