//***************************************************************************//
// vfx-codegen-def: Float3/randomBarycentricCoordinatesInTriangle
static inline simd_float3 randomBarycentricCoordinatesInTriangle##(uint32_t idx) {
    simd_float2 p = vfx_make_float2(vfx_random01(idx), vfx_random01(idx + 1));
    float s = p.x;
    float t = sqrtf(p.y);
    return vfx_make_float3(1.0f - t, (1.0f - s) * t, s * t);
}
//***************************************************************************//
// vfx-codegen-def: Float/perlinNoise
static inline float hash##(simd_float3 _p) {
    simd_float3 p = vfx_make_float3(17.0 * fract(_p.x * 0.3183099 + 0.1), 17.0 * fract(_p.y * 0.3183099 + 0.1), 17.0 * fract(_p.z * 0.3183099 + 0.1));
    return vfx_fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
static inline float mix##(float a,  float b, float t) {
    return simd_muladd((b - a), t, a);
}
static inline float perlinNoise##(simd_float3 x) {
    simd_float3 i = vfx_floor(x);
    simd_float3 f = vfx_fract(x);
    f = f * f * (3.0 - 2.0 * f);
    
    return mix##( mix##(mix##( hash##(i + vfx_make_float3(0,0,0)), hash##(i + vfx_make_float3(1,0,0)), f.x),
                        mix##( hash##(i + vfx_make_float3(0,1,0)), hash##(i + vfx_make_float3(1,1,0)), f.x),
                        f.y),
                  mix##(mix##( hash##(i + vfx_make_float3(0,0,1)), hash##(i + vfx_make_float3(1,0,1)), f.x),
                        mix##( hash##(i + vfx_make_float3(0,1,1)), hash##(i + vfx_make_float3(1,1,1)), f.x),
                        f.y),
                  f.z);
}
//***************************************************************************//
// vfx-codegen-def: Float2/perlinNoise dependencies: Random@Float/perlinNoise
static inline simd_float2 perlinNoise##(simd_float3 x, simd_float3 y) {
    return vfx_make_float2(perlinNoise##(x), perlinNoise##(y));
}
//***************************************************************************//
// vfx-codegen-def: Float3/perlinNoise dependencies: Random@Float/perlinNoise
static inline simd_float3 perlinNoise##(simd_float3 x, simd_float3 y, simd_float3 z) {
    return vfx_make_float3(perlinNoise##(x), perlinNoise##(y), perlinNoise##(z));
}
//***************************************************************************//
// vfx-codegen-def: Float4/perlinNoise dependencies: Random@Float/perlinNoise
static inline simd_float4 perlinNoise##(simd_float3 x, simd_float3 y, simd_float3 z, simd_float3 w) {
    return vfx_make_float4(perlinNoise##(x), perlinNoise##(y), perlinNoise##(z), perlinNoise##(w));
}
