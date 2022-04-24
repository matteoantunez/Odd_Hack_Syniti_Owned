//***************************************************************************//
// vfx-codegen-def: Float3/randomBarycentricCoordinatesInTriangle
extension simd_float3 {
    fileprivate static func randomBarycentricCoordinatesInTriangle##(_ idx: UInt32) -> simd_float3 {
        let p = vfx_make_float2(vfx_random01(idx), vfx_random01(idx + 1))
        let s = p.x
        let t = sqrt(p.y)
        return simd_float3(1 - t, (1 - s) * t, s * t)
    }
}
//***************************************************************************//
// vfx-codegen-def: Float/perlinNoise
func perlinNoise##(_ x: simd_float3) -> Float {
    func hash(_ _p: simd_float3) -> Float {
        let p = 17.0 * fract(_p * 0.3183099 + 0.1)
        return vfx_fract(p.x * p.y * p.z * (p.x + p.y + p.z))
    }
    func mix(_ a: Float, _ b: Float, t: Float) -> Float { simd_muladd((b - a), t, a) }
    
    let i: simd_float3 = vfx_floor(x)
    var f: simd_float3 = vfx_fract(x)
    f = f * f * (3.0 - 2.0 * f)
    
    return mix( mix(mix( hash(i + simd_float3(0,0,0)), hash(i + simd_float3(1,0,0)), t: f.x),
                    mix( hash(i + simd_float3(0,1,0)), hash(i + simd_float3(1,1,0)), t: f.x),
                    t: f.y),
                mix(mix( hash(i + simd_float3(0,0,1)), hash(i + simd_float3(1,0,1)), t: f.x),
                    mix( hash(i + simd_float3(0,1,1)), hash(i + simd_float3(1,1,1)), t: f.x),
                    t: f.y),
                t: f.z)
}
//***************************************************************************//
// vfx-codegen-def: Float2/perlinNoise dependencies: Random@Float/perlinNoise
func perlinNoise##(_ x: simd_float3, _ y: simd_float3) -> simd_float2 {
    return simd_float2(perlinNoise##(x), perlinNoise##(y))
}
//***************************************************************************//
// vfx-codegen-def: Float3/perlinNoise dependencies: Random@Float/perlinNoise
func perlinNoise##(_ x: simd_float3, _ y: simd_float3, _ z: simd_float3) -> simd_float3 {
    return simd_float3(perlinNoise##(x), perlinNoise##(y), perlinNoise##(z))
}
//***************************************************************************//
// vfx-codegen-def: Float4/perlinNoise dependencies: Random@Float/perlinNoise
func perlinNoise##(_ x: simd_float3, _ y: simd_float3, _ z: simd_float3, _ w: simd_float3) -> simd_float4 {
    return simd_float4(perlinNoise##(x), perlinNoise##(y), perlinNoise##(z), perlinNoise##(w))
}
