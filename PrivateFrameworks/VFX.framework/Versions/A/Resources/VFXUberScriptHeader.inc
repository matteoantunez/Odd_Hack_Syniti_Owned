// 🤖 This file is assembled from several headers to compile scripts and shaders at runtime

#ifdef __METAL_VERSION__
#include <metal_stdlib>
#include <metal_math>
#include <simd/simd.h>
#else
#include <math.h>
#include <float.h>
#include <simd/simd.h>
#include <stdio.h>
#include <stdlib.h>

#ifdef __cplusplus
using namespace simd;
#endif

#ifdef __OBJC__
#include <Foundation/Foundation.h>
@interface NSView
@end
@interface UIView
@end
#endif // __OBJC__

#if !VFX_CHECK_HEADER
#include <VFX/VFX-Script.h>
#endif

#endif // !__METAL_VERSION__

#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wunused-function"

// MARK: - vfx_base.h


#ifndef __METAL_VERSION__
#else
using namespace metal;
#endif

#ifdef __cplusplus
#define VFX_EXPORT_C extern "C"
#define VFX_EXPORT_C_BEGIN extern "C" {
#define VFX_EXPORT_C_END }
#else
#define VFX_EXPORT_C
#define VFX_EXPORT_C_BEGIN
#define VFX_EXPORT_C_END
#endif

#ifdef DEBUG
#define VFX_ASSERT(a) assert(a)
#else
#define VFX_ASSERT(a)
#endif

#ifndef NS_ASSUME_NONNULL_BEGIN
#define NS_ASSUME_NONNULL_BEGIN _Pragma("clang assume_nonnull begin")
#endif
#ifndef NS_ASSUME_NONNULL_END
#define NS_ASSUME_NONNULL_END   _Pragma("clang assume_nonnull end")
#endif

#ifdef __METAL_VERSION__

#define VFX_EXPORT
#define VFX_OVERLOAD
#define VFX_SIMD
#define VFX_SIMD_UNPURE

struct simd_quatf { simd_float4 vector; };

#else

#define VFX_EXPORT __attribute__((visibility("default")))
#define VFX_OVERLOAD __attribute__((overloadable))

// This is for pure functions. no side-effect allowed
#define VFX_SIMD VFX_OVERLOAD __attribute__((always_inline, __const__, __nodebug__))
#define VFX_SIMD_UNPURE VFX_OVERLOAD __attribute__((always_inline, __nodebug__))

#endif

// Packed types

typedef struct {
    float x;
    float y;
} vfx_packed_float2;

typedef struct {
    float x;
    float y;
    float z;
} vfx_packed_float3;

typedef struct {
    float x;
    float y;
    float z;
    float w;
} vfx_packed_float4;

typedef struct {
    uint16_t x;
    uint16_t y;
} vfx_packed_half2;

typedef struct {
    uint16_t x;
    uint16_t y;
    uint16_t z;
} vfx_packed_half3;

typedef struct {
    uint16_t x;
    uint16_t y;
    uint16_t z;
    uint16_t w;
} vfx_packed_half4;

// Axis Aligned Bounding Box
// !!! need to maintain [center.w = 1.f & half_size.w = 0.f]
typedef struct {
    simd_float4 center_w1;
    simd_float4 half_size_w0;
} vfx_aabb;

// use this instead of simd_float2 when you have no parallelism in operations
typedef struct {
    float lower_bound;
    float upper_bound;
} vfx_float_range;

typedef struct {
    size_t lower_bound;
    size_t upper_bound;
} vfx_int_range;

// use this instead of simd_float2 when you have no parallelism in operations
typedef struct {
    float scale;
    float bias;
} vfx_scale_bias;

// 3D Ray / Segment
typedef struct {
    simd_float4 origin; // w = 1
    simd_float4 direction; // xyz = normalized, w = 0
    simd_float4 invdir_length; // xyz = 1 / dir, w = length, INF for ray, >0 for segment
} vfx_ray;

typedef struct {
    simd_float3 a, b ,c;
} vfx_triangle;

typedef struct {
    simd_float4 vector; // normal(x, y, z) + d
} vfx_plane;

typedef struct {
    uint32_t state[2];
} vfx_xoshiro32_state;
// MARK: - vfx_math.h


#define VFX_DEBUG_INTERSECTION 0
#define VFX_INTERSECTION_ERROR_THRESHOLD 0.01

NS_ASSUME_NONNULL_BEGIN

// base math functions

#ifdef __METAL_VERSION__

#define out thread
#define device_out device

// constants
#define VFX_PI M_PI_F
#define VFX_1_PI M_1_PI_F
#define VFX_PI_2 M_PI_2_F
#define VFX_2PI (2.f * M_PI_F)
#define VFX_EPSILON FLT_EPSILON
#define VFX_INFINITY INFINITY
#define VFX_NAN NAN

// make are just ctors in C++/Metal

static inline simd_float2 VFX_SIMD vfx_make_float2(float x, float y) { return float2(x, y); }

static inline simd_float3 VFX_SIMD vfx_make_float3(float x, float y, float z) { return float3(x, y, z); }
static inline simd_float3 VFX_SIMD vfx_make_float3(simd_float2 xy, float z) { return float3(xy, z); }
static inline simd_float3 VFX_SIMD vfx_make_float3(float x, simd_float2 yz) { return float3(x, yz); }

static inline simd_float4 VFX_SIMD vfx_make_float4(float x, float y, float z, float w) { return float4(x, y, z, w); }
static inline simd_float4 VFX_SIMD vfx_make_float4(simd_float3 xyz, float w) { return float4(xyz, w); }
static inline simd_float4 VFX_SIMD vfx_make_float4(simd_float3 xyz) { float4 r = 0; r.xyz = xyz; return r; }
static inline simd_float4 VFX_SIMD vfx_make_float4_undef(simd_float3 xyz) { float4 r; r.xyz = xyz; return r; }

#define vfx_bool4 bool4

#define vfx_convert_char4   char4
#define vfx_convert_uchar4  uchar4
#define vfx_convert_short4  short4
#define vfx_convert_ushort4 ushort4
#define vfx_convert_int3    int3
#define vfx_convert_int4    int4
#define vfx_convert_uint4   uint4
#define vfx_convert_float4  float4

#define vfx_any(a) any(a)
#define vfx_all(a) all(a)
#define vfx_select(a, b, c) select(a, b, c)

#define vfx_min(a, b) fmin(a, b)
#define vfx_max(a, b) fmax(a, b)

#define vfx_abs(a) fabs(a)
#define vfx_copysign(a, b) copysign((a), (b))
#define vfx_ceil(a) ceil(a)
#define vfx_floor(a) floor(a)
#define vfx_trunc(a) trunc(a)
#define vfx_sign(a) sign(a)
#define vfx_step(a,b) step(a, b)

#define vfx_fract(a) fract(a)
#define vfx_fmod(a, b) fmod(a, b)
#define vfx_recip(a) (1/(a))
#define vfx_sqrt(a) sqrt(a)
#define vfx_rsqrt(a) rsqrt(a)
#define vfx_precise_rsqrt(a) precise::rsqrt(a)
#define vfx_cbrt(a) pow(a, 1.f/3.f)

#define vfx_cos(a) cos(a)
#define vfx_sin(a) sin(a)
#define vfx_tan(a) tan(a)

#define vfx_acos(a) acos(a)
#define vfx_asin(a) asin(a)
#define vfx_atan(a) atan(a)
#define vfx_atan2(a, b) atan2(a, b)

#define vfx_acosh(a) acosh(a)
#define vfx_asinh(a) asinh(a)
#define vfx_atanh(a) atanh(a)

#define vfx_sinpi(a) sinpi(a)
#define vfx_cospi(a) cospi(a)
#define vfx_tanpi(a) tanpi(a)

#define vfx_exp(a) exp(a)
#define vfx_exp2(a) exp2(a)
#define vfx_exp10(a) exp10(a)
#define vfx_log(a) log(a)
#define vfx_pow(a,b) pow(a, b)

#define vfx_length(a) length(a)
#define vfx_length_squared(a) length_squared(a)
#define vfx_distance(a, b) distance(a, b)
#define vfx_distance_squared(a, b) distance_squared(a, b)
#define vfx_normalize(a) normalize(a)
#define vfx_cross(a, b) cross(a, b)
#define vfx_dot(a, b) dot(a, b)
#define vfx_transpose(a) transpose(a)

#define vfx_muladd fma
#define simd_bitselect select

template<typename T> static inline T VFX_SIMD vfx_reduce_min(vec<T, 2> a) { return fmin(a.x, a.y); }
template<typename T> static inline T VFX_SIMD vfx_reduce_min(vec<T, 3> a) { return fmin3(a.x, a.y, a.z); }
template<typename T> static inline T VFX_SIMD vfx_reduce_min(vec<T, 4> a) { return vfx_reduce_min(min(a.xy, a.zw)); }

template<typename T> static inline T VFX_SIMD vfx_reduce_max(vec<T, 2> a) { return fmax(a.x, a.y); }
template<typename T> static inline T VFX_SIMD vfx_reduce_max(vec<T, 3> a) { return fmax3(a.x, a.y, a.z); }
template<typename T> static inline T VFX_SIMD vfx_reduce_max(vec<T, 4> a) { return vfx_reduce_max(max(a.xy, a.zw)); }

template<typename T> static inline T VFX_SIMD vfx_reduce_add(vec<T, 2> a) { return a.x + a.y; }
template<typename T> static inline T VFX_SIMD vfx_reduce_add(vec<T, 3> a) { return a.x + a.y + a.z; }
template<typename T> static inline T VFX_SIMD vfx_reduce_add(vec<T, 4> a) { return a.x + a.y + a.z + a.w; }

#else

#define out
#define device_out

// constants
#define VFX_PI M_PI
#define VFX_1_PI M_1_PI
#define VFX_PI_2 M_PI_2
#define VFX_2PI (2.f * M_PI)
#define VFX_EPSILON FLT_EPSILON
#define VFX_INFINITY INFINITY
#define VFX_NAN NAN

// Macros are not exported correctly in swift so we have to do static inline wrapping functions

static inline simd_float2 VFX_SIMD vfx_make_float2(float x, float y) { return simd_make_float2(x, y); }

static inline simd_float3 VFX_SIMD vfx_make_float3(float x, float y, float z) { return simd_make_float3(x, y, z); }
static inline simd_float3 VFX_SIMD vfx_make_float3(simd_float2 xy, float z) { return simd_make_float3(xy, z); }
static inline simd_float3 VFX_SIMD vfx_make_float3(float x, simd_float2 yz) { return simd_make_float3(x, yz); }

static inline simd_float4 VFX_SIMD vfx_make_float4(float x, float y, float z, float w) { return simd_make_float4(x, y, z, w); }
static inline simd_float4 VFX_SIMD vfx_make_float4(simd_float3 xyz, float w) { return simd_make_float4(xyz, w); }
static inline simd_float4 VFX_SIMD vfx_make_float4(simd_float3 xyz) { return simd_make_float4(xyz); }
static inline simd_float4 VFX_SIMD vfx_make_float4_undef(simd_float3 xyz) { return simd_make_float4_undef(xyz); }

#define vfx_bool4 simd_int4

#define vfx_convert_char4   simd_char
#define vfx_convert_uchar4  simd_uchar
#define vfx_convert_short4  simd_short
#define vfx_convert_ushort4 simd_ushort
#define vfx_convert_int3    simd_int
#define vfx_convert_int4    simd_int
#define vfx_convert_uint4   simd_uint
#define vfx_convert_float4  simd_float

#define vfx_any(a) simd_any(a)
#define vfx_all(a) simd_all(a)

static inline float VFX_SIMD vfx_select(float a, float b, int c) { return (c < 0) ? b : a; }
static inline simd_float2 VFX_SIMD vfx_select(simd_float2 a, simd_float2 b, simd_int2 c) { return simd_select(a, b, c); }
static inline simd_float3 VFX_SIMD vfx_select(simd_float3 a, simd_float3 b, simd_int3 c) { return simd_select(a, b, c); }
static inline simd_float4 VFX_SIMD vfx_select(simd_float4 a, simd_float4 b, simd_int4 c) { return simd_select(a, b, c); }

static inline int32_t     VFX_SIMD vfx_min(int32_t a, int32_t b)         { return a < b ? a : b; }
static inline float       VFX_SIMD vfx_min(float a, float b)             { return a < b ? a : b; }
static inline simd_float2 VFX_SIMD vfx_min(simd_float2 a, simd_float2 b) { return __tg_fmin(a, b); }
static inline simd_float3 VFX_SIMD vfx_min(simd_float3 a, simd_float3 b) { return __tg_fmin(a, b); }
static inline simd_float4 VFX_SIMD vfx_min(simd_float4 a, simd_float4 b) { return __tg_fmin(a, b); }

static inline int32_t     VFX_SIMD vfx_max(int32_t a, int32_t b)         { return a > b ? a : b; }
static inline float       VFX_SIMD vfx_max(float a, float b)             { return a > b ? a : b; }
static inline simd_float2 VFX_SIMD vfx_max(simd_float2 a, simd_float2 b) { return __tg_fmax(a, b); }
static inline simd_float3 VFX_SIMD vfx_max(simd_float3 a, simd_float3 b) { return __tg_fmax(a, b); }
static inline simd_float4 VFX_SIMD vfx_max(simd_float4 a, simd_float4 b) { return __tg_fmax(a, b); }

static inline float       VFX_SIMD vfx_abs(float a)       { return __tg_fabs(a); }
static inline simd_float2 VFX_SIMD vfx_abs(simd_float2 a) { return __tg_fabs(a); }
static inline simd_float3 VFX_SIMD vfx_abs(simd_float3 a) { return __tg_fabs(a); }
static inline simd_float4 VFX_SIMD vfx_abs(simd_float4 a) { return __tg_fabs(a); }

static inline float       VFX_SIMD vfx_copysign(float a, float b)             { return __tg_copysign(a, b); }
static inline simd_float2 VFX_SIMD vfx_copysign(simd_float2 a, simd_float2 b) { return __tg_copysign(a, b); }
static inline simd_float3 VFX_SIMD vfx_copysign(simd_float3 a, simd_float3 b) { return __tg_copysign(a, b); }
static inline simd_float4 VFX_SIMD vfx_copysign(simd_float4 a, simd_float4 b) { return __tg_copysign(a, b); }

static inline float       VFX_SIMD vfx_ceil(float a)       { return __tg_ceil(a); }
static inline simd_float2 VFX_SIMD vfx_ceil(simd_float2 a) { return __tg_ceil(a); }
static inline simd_float3 VFX_SIMD vfx_ceil(simd_float3 a) { return __tg_ceil(a); }
static inline simd_float4 VFX_SIMD vfx_ceil(simd_float4 a) { return __tg_ceil(a); }

static inline float       VFX_SIMD vfx_floor(float a)       { return __tg_floor(a); }
static inline simd_float2 VFX_SIMD vfx_floor(simd_float2 a) { return __tg_floor(a); }
static inline simd_float3 VFX_SIMD vfx_floor(simd_float3 a) { return __tg_floor(a); }
static inline simd_float4 VFX_SIMD vfx_floor(simd_float4 a) { return __tg_floor(a); }

static inline float       VFX_SIMD vfx_trunc(float a)       { return __tg_trunc(a); }
static inline simd_float2 VFX_SIMD vfx_trunc(simd_float2 a) { return __tg_trunc(a); }
static inline simd_float3 VFX_SIMD vfx_trunc(simd_float3 a) { return __tg_trunc(a); }
static inline simd_float4 VFX_SIMD vfx_trunc(simd_float4 a) { return __tg_trunc(a); }

static inline float VFX_SIMD vfx_sign(float a) { return simd_sign(a); }
static inline simd_float2 VFX_SIMD vfx_sign(simd_float2 a) { return simd_sign(a); }
static inline simd_float3 VFX_SIMD vfx_sign(simd_float3 a) { return simd_sign(a); }
static inline simd_float4 VFX_SIMD vfx_sign(simd_float4 a) { return simd_sign(a); }

static inline float VFX_SIMD vfx_step(float a, float b) { return a >= b; }
static inline simd_float2 VFX_SIMD vfx_step(simd_float2 a, simd_float2 b) { return simd_step(a, b); }
static inline simd_float3 VFX_SIMD vfx_step(simd_float3 a, simd_float3 b) { return simd_step(a, b); }
static inline simd_float4 VFX_SIMD vfx_step(simd_float4 a, simd_float4 b) { return simd_step(a, b); }

static inline float       VFX_SIMD vfx_fract(float a)       { return simd_fract(a); }
static inline simd_float2 VFX_SIMD vfx_fract(simd_float2 a) { return simd_fract(a); }
static inline simd_float3 VFX_SIMD vfx_fract(simd_float3 a) { return simd_fract(a); }
static inline simd_float4 VFX_SIMD vfx_fract(simd_float4 a) { return simd_fract(a); }

static inline float       VFX_SIMD vfx_fmod(float a, float b)             { return __tg_fmod(a, b); }
static inline simd_float2 VFX_SIMD vfx_fmod(simd_float2 a, simd_float2 b) { return __tg_fmod(a, b); }
static inline simd_float3 VFX_SIMD vfx_fmod(simd_float3 a, simd_float3 b) { return __tg_fmod(a, b); }
static inline simd_float4 VFX_SIMD vfx_fmod(simd_float4 a, simd_float4 b) { return __tg_fmod(a, b); }

static inline float       VFX_SIMD vfx_recip(float a)       { return simd_recip(a); }
static inline simd_float2 VFX_SIMD vfx_recip(simd_float2 a) { return simd_recip(a); }
static inline simd_float3 VFX_SIMD vfx_recip(simd_float3 a) { return simd_recip(a); }
static inline simd_float4 VFX_SIMD vfx_recip(simd_float4 a) { return simd_recip(a); }

static inline float       VFX_SIMD vfx_sqrt(float a)       { return __tg_sqrt(a); }
static inline simd_float2 VFX_SIMD vfx_sqrt(simd_float2 a) { return __tg_sqrt(a); }
static inline simd_float3 VFX_SIMD vfx_sqrt(simd_float3 a) { return __tg_sqrt(a); }
static inline simd_float4 VFX_SIMD vfx_sqrt(simd_float4 a) { return __tg_sqrt(a); }

static inline float       VFX_SIMD vfx_rsqrt(float a)       { return simd_rsqrt(a); }
static inline simd_float2 VFX_SIMD vfx_rsqrt(simd_float2 a) { return simd_rsqrt(a); }
static inline simd_float3 VFX_SIMD vfx_rsqrt(simd_float3 a) { return simd_rsqrt(a); }
static inline simd_float4 VFX_SIMD vfx_rsqrt(simd_float4 a) { return simd_rsqrt(a); }

static inline float       VFX_SIMD vfx_precise_rsqrt(float a)       { return simd_precise_rsqrt(a); }
static inline simd_float2 VFX_SIMD vfx_precise_rsqrt(simd_float2 a) { return simd_precise_rsqrt(a); }
static inline simd_float3 VFX_SIMD vfx_precise_rsqrt(simd_float3 a) { return simd_precise_rsqrt(a); }
static inline simd_float4 VFX_SIMD vfx_precise_rsqrt(simd_float4 a) { return simd_precise_rsqrt(a); }

static inline float       VFX_SIMD vfx_cbrt(float a)       { return __tg_cbrt(a); }
static inline simd_float2 VFX_SIMD vfx_cbrt(simd_float2 a) { return __tg_cbrt(a); }
static inline simd_float3 VFX_SIMD vfx_cbrt(simd_float3 a) { return __tg_cbrt(a); }
static inline simd_float4 VFX_SIMD vfx_cbrt(simd_float4 a) { return __tg_cbrt(a); }

static inline float       VFX_SIMD vfx_cos(float a)       { return __tg_cos(a); }
static inline simd_float2 VFX_SIMD vfx_cos(simd_float2 a) { return __tg_cos(a); }
static inline simd_float3 VFX_SIMD vfx_cos(simd_float3 a) { return __tg_cos(a); }
static inline simd_float4 VFX_SIMD vfx_cos(simd_float4 a) { return __tg_cos(a); }

static inline float       VFX_SIMD vfx_sin(float a)       { return __tg_sin(a); }
static inline simd_float2 VFX_SIMD vfx_sin(simd_float2 a) { return __tg_sin(a); }
static inline simd_float3 VFX_SIMD vfx_sin(simd_float3 a) { return __tg_sin(a); }
static inline simd_float4 VFX_SIMD vfx_sin(simd_float4 a) { return __tg_sin(a); }

static inline float       VFX_SIMD vfx_tan(float a)       { return __tg_tan(a); }
static inline simd_float2 VFX_SIMD vfx_tan(simd_float2 a) { return __tg_tan(a); }
static inline simd_float3 VFX_SIMD vfx_tan(simd_float3 a) { return __tg_tan(a); }
static inline simd_float4 VFX_SIMD vfx_tan(simd_float4 a) { return __tg_tan(a); }

static inline float       VFX_SIMD vfx_acos(float a)       { return __tg_acos(a); }
static inline simd_float2 VFX_SIMD vfx_acos(simd_float2 a) { return __tg_acos(a); }
static inline simd_float3 VFX_SIMD vfx_acos(simd_float3 a) { return __tg_acos(a); }
static inline simd_float4 VFX_SIMD vfx_acos(simd_float4 a) { return __tg_acos(a); }

static inline float       VFX_SIMD vfx_asin(float a)       { return __tg_asin(a); }
static inline simd_float2 VFX_SIMD vfx_asin(simd_float2 a) { return __tg_asin(a); }
static inline simd_float3 VFX_SIMD vfx_asin(simd_float3 a) { return __tg_asin(a); }
static inline simd_float4 VFX_SIMD vfx_asin(simd_float4 a) { return __tg_asin(a); }

static inline float       VFX_SIMD vfx_atan(float a)       { return __tg_atan(a); }
static inline simd_float2 VFX_SIMD vfx_atan(simd_float2 a) { return __tg_atan(a); }
static inline simd_float3 VFX_SIMD vfx_atan(simd_float3 a) { return __tg_atan(a); }
static inline simd_float4 VFX_SIMD vfx_atan(simd_float4 a) { return __tg_atan(a); }

static inline float       VFX_SIMD vfx_atan2(float a, float b)             { return __tg_atan2(a, b); }
static inline simd_float2 VFX_SIMD vfx_atan2(simd_float2 a, simd_float2 b) { return __tg_atan2(a, b); }
static inline simd_float3 VFX_SIMD vfx_atan2(simd_float3 a, simd_float3 b) { return __tg_atan2(a, b); }
static inline simd_float4 VFX_SIMD vfx_atan2(simd_float4 a, simd_float4 b) { return __tg_atan2(a, b); }

static inline float       VFX_SIMD vfx_acosh(float a)       { return __tg_acosh(a); }
static inline simd_float2 VFX_SIMD vfx_acosh(simd_float2 a) { return __tg_acosh(a); }
static inline simd_float3 VFX_SIMD vfx_acosh(simd_float3 a) { return __tg_acosh(a); }
static inline simd_float4 VFX_SIMD vfx_acosh(simd_float4 a) { return __tg_acosh(a); }

static inline float       VFX_SIMD vfx_asinh(float a)       { return __tg_asinh(a); }
static inline simd_float2 VFX_SIMD vfx_asinh(simd_float2 a) { return __tg_asinh(a); }
static inline simd_float3 VFX_SIMD vfx_asinh(simd_float3 a) { return __tg_asinh(a); }
static inline simd_float4 VFX_SIMD vfx_asinh(simd_float4 a) { return __tg_asinh(a); }

static inline float       VFX_SIMD vfx_atanh(float a)       { return __tg_atanh(a); }
static inline simd_float2 VFX_SIMD vfx_atanh(simd_float2 a) { return __tg_atanh(a); }
static inline simd_float3 VFX_SIMD vfx_atanh(simd_float3 a) { return __tg_atanh(a); }
static inline simd_float4 VFX_SIMD vfx_atanh(simd_float4 a) { return __tg_atanh(a); }

static inline float VFX_SIMD vfx_sinpi(float a) { return __sinpif(a); }
static inline float VFX_SIMD vfx_cospi(float a) { return __cospif(a); }
static inline float VFX_SIMD vfx_tanpi(float a) { return __tanpif(a); }

static inline float       VFX_SIMD vfx_exp(float a)       { return __tg_exp(a); }
static inline simd_float2 VFX_SIMD vfx_exp(simd_float2 a) { return __tg_exp(a); }
static inline simd_float3 VFX_SIMD vfx_exp(simd_float3 a) { return __tg_exp(a); }
static inline simd_float4 VFX_SIMD vfx_exp(simd_float4 a) { return __tg_exp(a); }

static inline float       VFX_SIMD vfx_exp2(float a)       { return __tg_exp2(a); }
static inline simd_float2 VFX_SIMD vfx_exp2(simd_float2 a) { return __tg_exp2(a); }
static inline simd_float3 VFX_SIMD vfx_exp2(simd_float3 a) { return __tg_exp2(a); }
static inline simd_float4 VFX_SIMD vfx_exp2(simd_float4 a) { return __tg_exp2(a); }

static inline float       VFX_SIMD vfx_exp10(float a)       { return __tg_exp10(a); }
static inline simd_float2 VFX_SIMD vfx_exp10(simd_float2 a) { return __tg_exp10(a); }
static inline simd_float3 VFX_SIMD vfx_exp10(simd_float3 a) { return __tg_exp10(a); }
static inline simd_float4 VFX_SIMD vfx_exp10(simd_float4 a) { return __tg_exp10(a); }

static inline float       VFX_SIMD vfx_log(float a)       { return __tg_log(a); }
static inline simd_float2 VFX_SIMD vfx_log(simd_float2 a) { return __tg_log(a); }
static inline simd_float3 VFX_SIMD vfx_log(simd_float3 a) { return __tg_log(a); }
static inline simd_float4 VFX_SIMD vfx_log(simd_float4 a) { return __tg_log(a); }

static inline float       VFX_SIMD vfx_pow(float a, float b)             { return __tg_pow(a, b); }
static inline simd_float2 VFX_SIMD vfx_pow(simd_float2 a, simd_float2 b) { return __tg_pow(a, b); }
static inline simd_float3 VFX_SIMD vfx_pow(simd_float3 a, simd_float3 b) { return __tg_pow(a, b); }
static inline simd_float4 VFX_SIMD vfx_pow(simd_float4 a, simd_float4 b) { return __tg_pow(a, b); }

#define vfx_length(a) simd_length(a)
#define vfx_length_squared(a) simd_length_squared(a)
#define vfx_distance(a, b) simd_distance(a, b)
#define vfx_distance_squared(a, b) simd_distance_squared(a, b)
#define vfx_normalize(a) simd_normalize(a)
#define vfx_cross(a, b) simd_cross(a, b)
#define vfx_dot(a, b) simd_dot(a, b)

static inline simd_float3x3 VFX_SIMD vfx_transpose(simd_float3x3 m) { return simd_transpose(m); }
static inline simd_float4x4 VFX_SIMD vfx_transpose(simd_float4x4 m) { return simd_transpose(m); }

// Not yet available in metal :/
static inline simd_float3x3 VFX_SIMD vfx_inverse(simd_float3x3 m) { return simd_inverse(m); }
static inline simd_float4x4 VFX_SIMD vfx_inverse(simd_float4x4 m) { return simd_inverse(m); }

static inline simd_float4 VFX_SIMD vfx_muladd(simd_float4 a, simd_float4 b, simd_float4 c) { return simd_muladd(a, b, c); }
static inline simd_float3 VFX_SIMD vfx_muladd(simd_float3 a, simd_float3 b, simd_float3 c) { return simd_muladd(a, b, c); }
static inline simd_float2 VFX_SIMD vfx_muladd(simd_float2 a, simd_float2 b, simd_float2 c) { return simd_muladd(a, b, c); }
static inline float VFX_SIMD vfx_muladd(float a, float b, float c) { return simd_muladd(a, b, c); }

static inline float VFX_SIMD vfx_reduce_min(simd_float2 a) { return simd_reduce_min(a); }
static inline float VFX_SIMD vfx_reduce_min(simd_float3 a) { return simd_reduce_min(a); }
static inline float VFX_SIMD vfx_reduce_min(simd_float4 a) { return simd_reduce_min(a); }

static inline float VFX_SIMD vfx_reduce_max(simd_float2 a) { return simd_reduce_max(a); }
static inline float VFX_SIMD vfx_reduce_max(simd_float3 a) { return simd_reduce_max(a); }
static inline float VFX_SIMD vfx_reduce_max(simd_float4 a) { return simd_reduce_max(a); }

static inline float VFX_SIMD vfx_reduce_add(simd_float2 a) { return simd_reduce_add(a); }
static inline float VFX_SIMD vfx_reduce_add(simd_float3 a) { return simd_reduce_add(a); }
static inline float VFX_SIMD vfx_reduce_add(simd_float4 a) { return simd_reduce_add(a); }

#endif

static inline float       VFX_SIMD vfx_pow2(float a)       { return a * a; }
static inline simd_float2 VFX_SIMD vfx_pow2(simd_float2 a) { return a * a; }
static inline simd_float3 VFX_SIMD vfx_pow2(simd_float3 a) { return a * a; }
static inline simd_float4 VFX_SIMD vfx_pow2(simd_float4 a) { return a * a; }

static inline float       VFX_SIMD vfx_pow3(float a)       { return a * a * a; }
static inline simd_float2 VFX_SIMD vfx_pow3(simd_float2 a) { return a * a * a; }
static inline simd_float3 VFX_SIMD vfx_pow3(simd_float3 a) { return a * a * a; }
static inline simd_float4 VFX_SIMD vfx_pow3(simd_float4 a) { return a * a * a; }

static inline float       VFX_SIMD vfx_pow4(float a)       { return a * a * a * a; }
static inline simd_float2 VFX_SIMD vfx_pow4(simd_float2 a) { return a * a * a * a; }
static inline simd_float3 VFX_SIMD vfx_pow4(simd_float3 a) { return a * a * a * a; }
static inline simd_float4 VFX_SIMD vfx_pow4(simd_float4 a) { return a * a * a * a; }

static inline float       VFX_SIMD vfx_pow5(float a)       { return a * a * a * a * a; }
static inline simd_float2 VFX_SIMD vfx_pow5(simd_float2 a) { return a * a * a * a * a; }
static inline simd_float3 VFX_SIMD vfx_pow5(simd_float3 a) { return a * a * a * a * a; }
static inline simd_float4 VFX_SIMD vfx_pow5(simd_float4 a) { return a * a * a * a * a; }

static inline int VFX_SIMD vfx_max_index(simd_float2 a) { return a.x >= a.y ? 0 : 1; }
static inline int VFX_SIMD vfx_max_index(simd_float3 a) { return a.x >= a.y ? (a.x >= a.z ? 0 : 2) : (a.y >= a.z ? 1 : 2); }

static inline int VFX_SIMD vfx_min_index(simd_float2 a) { return a.x <= a.y ? 0 : 1; }
static inline int VFX_SIMD vfx_min_index(simd_float3 a) { return a.x <= a.y ? (a.x <= a.z ? 0 : 2) : (a.y <= a.z ? 1 : 2); }

static inline simd_float2 VFX_SIMD vfx_splat2(float x) { return vfx_make_float2(x, x); }
static inline simd_float3 VFX_SIMD vfx_splat3(float x) { return vfx_make_float3(x, x, x); }
static inline simd_float4 VFX_SIMD vfx_splat4(float x) { return vfx_make_float4(x, x, x, x); }

#ifdef __METAL_VERSION__
static inline simd_float4x4 VFX_SIMD vfx_diagonal(simd_float4 d) { return float4x4(float4(d.x, 0, 0, 0),
                                                                                   float4(0, d.y, 0, 0),
                                                                                   float4(0, 0, d.z, 0),
                                                                                   float4(0, 0, 0, d.w)); }
static inline simd_float3x3 VFX_SIMD vfx_float3x3(simd_float3 c0, simd_float3 c1, simd_float3 c2) { return float3x3(c0, c1, c2); }
static inline simd_float3x3 VFX_SIMD vfx_float3x3(simd_float4x4 m) { return float3x3(m[0].xyz, m[1].xyz, m[2].xyz); }
static inline simd_float4x4 VFX_SIMD vfx_float4x4(simd_float4 c0, simd_float4 c1, simd_float4 c2, simd_float4 c3) { return float4x4(c0, c1, c2, c3); }

static inline simd_float3x2 VFX_SIMD vfx_float3x2_from_rows(simd_float3 c0, simd_float3 c1) { return transpose(float2x3(c0, c1)); }
static inline simd_float3x3 VFX_SIMD vfx_float3x3_from_rows(simd_float3 c0, simd_float3 c1, simd_float3 c2) { return transpose(float3x3(c0, c1, c2)); }
static inline simd_float3x4 VFX_SIMD vfx_float3x4_from_rows(simd_float3 c0, simd_float3 c1, simd_float3 c2, simd_float3 c3) { return transpose(float4x3(c0, c1, c2, c3)); }

static inline simd_float4x2 VFX_SIMD vfx_float4x2_from_rows(simd_float4 c0, simd_float4 c1) { return transpose(float2x4(c0, c1)); }
static inline simd_float4x3 VFX_SIMD vfx_float4x3_from_rows(simd_float4 c0, simd_float4 c1, simd_float4 c2) { return transpose(float3x4(c0, c1, c2)); }
static inline simd_float4x4 VFX_SIMD vfx_float4x4_from_rows(simd_float4 c0, simd_float4 c1, simd_float4 c2, simd_float4 c3) { return transpose(float4x4(c0, c1, c2, c3)); }
#else
static inline simd_float4x4 VFX_SIMD vfx_diagonal(simd_float4 d) { return simd_diagonal_matrix(d); }
static inline simd_float3x3 VFX_SIMD vfx_float3x3(simd_float4x4 m) { return simd_matrix(m.columns[0].xyz, m.columns[1].xyz, m.columns[2].xyz); }
static inline simd_float3x3 VFX_SIMD vfx_float3x3(simd_float3 c0, simd_float3 c1, simd_float3 c2) { return simd_matrix(c0, c1, c2); }
static inline simd_float4x4 VFX_SIMD vfx_float4x4(simd_float4 c0, simd_float4 c1, simd_float4 c2, simd_float4 c3) { return simd_matrix(c0, c1, c2, c3); }

static inline simd_float3x2 VFX_SIMD vfx_float3x2_from_rows(simd_float3 c0, simd_float3 c1) { return simd_matrix_from_rows(c0, c1); }
static inline simd_float3x3 VFX_SIMD vfx_float3x3_from_rows(simd_float3 c0, simd_float3 c1, simd_float3 c2) { return simd_matrix_from_rows(c0, c1, c2); }
static inline simd_float3x4 VFX_SIMD vfx_float3x4_from_rows(simd_float3 c0, simd_float3 c1, simd_float3 c2, simd_float3 c3) { return simd_matrix_from_rows(c0, c1, c2, c3); }

static inline simd_float4x2 VFX_SIMD vfx_float4x2_from_rows(simd_float4 c0, simd_float4 c1) { return simd_matrix_from_rows(c0, c1); }
static inline simd_float4x3 VFX_SIMD vfx_float4x3_from_rows(simd_float4 c0, simd_float4 c1, simd_float4 c2) { return simd_matrix_from_rows(c0, c1, c2); }
static inline simd_float4x4 VFX_SIMD vfx_float4x4_from_rows(simd_float4 c0, simd_float4 c1, simd_float4 c2, simd_float4 c3) { return simd_matrix_from_rows(c0, c1, c2, c3); }
#endif

static inline simd_float2 VFX_SIMD vfx_float2_zero(void) { return (simd_float2){ 0, 0 }; }
static inline simd_float2 VFX_SIMD vfx_float2_half_one(void) { return (simd_float2){ 0.5, 0.5 }; }
static inline simd_float2 VFX_SIMD vfx_float2_one(void) { return (simd_float2){ 1, 1 }; }
static inline simd_float2 VFX_SIMD vfx_float2_two(void) { return (simd_float2){ 2, 2 }; }

static inline simd_float3 VFX_SIMD vfx_float3_zero(void) { return (simd_float3){ 0, 0, 0 }; }
static inline simd_float3 VFX_SIMD vfx_float3_half_one(void) { return (simd_float3){ 0.5, 0.5, 0.5 }; }
static inline simd_float3 VFX_SIMD vfx_float3_one(void) { return (simd_float3){ 1, 1, 1 }; }
static inline simd_float3 VFX_SIMD vfx_float3_two(void) { return (simd_float3){ 2, 2, 2 }; }
static inline simd_float3 VFX_SIMD vfx_float3_unit_x(void) { return (simd_float3){ 1, 0, 0 }; }
static inline simd_float3 VFX_SIMD vfx_float3_unit_y(void) { return (simd_float3){ 0, 1, 0 }; }
static inline simd_float3 VFX_SIMD vfx_float3_unit_z(void) { return (simd_float3){ 0, 0, 1 }; }

static inline simd_float4 VFX_SIMD vfx_float4_zero(void) { return (simd_float4){ 0, 0, 0, 0 }; }
static inline simd_float4 VFX_SIMD vfx_float4_half_one(void) { return (simd_float4){ 0.5, 0.5, 0.5, 0.5 }; }
static inline simd_float4 VFX_SIMD vfx_float4_one(void) { return (simd_float4){ 1, 1, 1, 1 }; }
static inline simd_float4 VFX_SIMD vfx_float4_two(void) { return (simd_float4){ 2, 2, 2, 2 }; }
static inline simd_float4 VFX_SIMD vfx_float4_unit_x(void) { return (simd_float4){ 1, 0, 0, 0 }; }
static inline simd_float4 VFX_SIMD vfx_float4_unit_y(void) { return (simd_float4){ 0, 1, 0, 0 }; }
static inline simd_float4 VFX_SIMD vfx_float4_unit_z(void) { return (simd_float4){ 0, 0, 1, 0 }; }
static inline simd_float4 VFX_SIMD vfx_float4_unit_w(void) { return (simd_float4){ 0, 0, 0, 1 }; }

static inline vfx_packed_half4 VFX_SIMD vfx_packed_half4_one(void) { return (vfx_packed_half4){ 0x3c00, 0x3c00, 0x3c00, 0x3c00 }; }

static inline simd_float4x4 VFX_SIMD vfx_float4x4(simd_float3x3 m) { return vfx_float4x4(vfx_make_float4(m.columns[0].xyz), vfx_make_float4(m.columns[1].xyz), vfx_make_float4(m.columns[2].xyz), vfx_float4_unit_w()); }

static inline bool VFX_SIMD vfx_is_nan(float a) { return isnan(a); }
static inline bool VFX_SIMD vfx_contains_nan(simd_float2 a) { return vfx_any(a == vfx_splat2(NAN)); }
static inline bool VFX_SIMD vfx_contains_nan(simd_float3 a) { return vfx_any(a == vfx_splat3(NAN)); }
static inline bool VFX_SIMD vfx_contains_nan(simd_float4 a) { return vfx_any(a == vfx_splat4(NAN)); }

// this is faster but breaks when feed with NaN
// return !simd_any((coord < 0.f) | (coord > 1.f));
static inline bool VFX_SIMD vfx_is_in_01(simd_float2 p) { return vfx_all(vfx_abs(p - 0.5f) <= 0.5f); }
static inline bool VFX_SIMD vfx_is_in_01(simd_float3 p) { return vfx_all(vfx_abs(p - 0.5f) <= 0.5f); }
static inline bool VFX_SIMD vfx_is_in_01(simd_float4 p) { return vfx_all(vfx_abs(p - 0.5f) <= 0.5f); }

static inline bool VFX_SIMD vfx_is_outside_01(simd_float2 p) { return vfx_any((p < 0.f) | (p > 1.f)); }
static inline bool VFX_SIMD vfx_is_outside_01(simd_float3 p) { return vfx_any((p < 0.f) | (p > 1.f)); }
static inline bool VFX_SIMD vfx_is_outside_01(simd_float4 p) { return vfx_any((p < 0.f) | (p > 1.f)); }

// a * b + c
static inline simd_float4 VFX_SIMD vfx_muladd(simd_float4 a, float b, simd_float4 c) { return vfx_muladd(a, (simd_float4)(b), c); }
static inline simd_float3 VFX_SIMD vfx_muladd(simd_float3 a, float b, simd_float3 c) { return vfx_muladd(a, (simd_float3)(b), c); }
static inline simd_float2 VFX_SIMD vfx_muladd(simd_float2 a, float b, simd_float2 c) { return vfx_muladd(a, (simd_float2)(b), c); }

static inline float VFX_SIMD vfx_get_x(simd_float2 a) { return a.x; }
static inline simd_float2 VFX_SIMD vfx_set_x(simd_float2 a, float x) { a.x = x; return a; }
static inline float VFX_SIMD vfx_get_y(simd_float2 a) { return a.y; }
static inline simd_float2 VFX_SIMD vfx_set_y(simd_float2 a, float y) { a.y = y; return a; }

static inline float VFX_SIMD vfx_get_x(simd_float3 a) { return a.x; }
static inline simd_float3 VFX_SIMD vfx_set_x(simd_float3 a, float x) { a.x = x; return a; }
static inline float VFX_SIMD vfx_get_y(simd_float3 a) { return a.y; }
static inline simd_float3 VFX_SIMD vfx_set_y(simd_float3 a, float y) { a.y = y; return a; }
static inline float VFX_SIMD vfx_get_z(simd_float3 a) { return a.z; }
static inline simd_float3 VFX_SIMD vfx_set_z(simd_float3 a, float z) { a.z = z; return a; }

static inline float VFX_SIMD vfx_get_x(simd_float4 a) { return a.x; }
static inline simd_float4 VFX_SIMD vfx_set_x(simd_float4 a, float x) { a.x = x; return a; }
static inline float VFX_SIMD vfx_get_y(simd_float4 a) { return a.y; }
static inline simd_float4 VFX_SIMD vfx_set_y(simd_float4 a, float y) { a.y = y; return a; }
static inline float VFX_SIMD vfx_get_z(simd_float4 a) { return a.z; }
static inline simd_float4 VFX_SIMD vfx_set_z(simd_float4 a, float z) { a.z = z; return a; }
static inline float VFX_SIMD vfx_get_w(simd_float4 a) { return a.w; }

static inline simd_float2 VFX_SIMD vfx_get_xy(simd_float3 a) { return a.xy; }
static inline simd_float2 VFX_SIMD vfx_get_xy(simd_float4 a) { return a.xy; }

static inline simd_float3 VFX_SIMD vfx_get_xyz(simd_float4 a) { return a.xyz; }
static inline simd_float4 VFX_SIMD vfx_set_xyz(simd_float4 a, simd_float3 xyz) { a.xyz = xyz; return a; }

static inline simd_float3 VFX_SIMD vfx_uv_to_plane_xz(simd_float2 uv) { return (simd_float3){ uv.x, 0.5f, uv.y } * 2.f - 1.f; }

static inline simd_float2 VFX_SIMD vfx_remap_n11_to_01(simd_float2 v) { return v * 0.5f + 0.5f; }
static inline simd_float3 VFX_SIMD vfx_remap_n11_to_01(simd_float3 v) { return v * 0.5f + 0.5f; }
static inline simd_float3 VFX_SIMD vfx_remap_01_to_n11(simd_float3 v) { return v * 2.f - 1.f; }

static inline bool VFX_SIMD vfx_is_almost_zero(float a) { return vfx_abs(a) <= FLT_EPSILON; }
static inline bool VFX_SIMD vfx_is_almost_zero(simd_float2 a) { return vfx_all(vfx_abs(a) <= vfx_splat2(FLT_EPSILON)); }
static inline bool VFX_SIMD vfx_is_almost_zero(simd_float3 a) { return vfx_all(vfx_abs(a) <= vfx_splat3(FLT_EPSILON)); }
static inline bool VFX_SIMD vfx_is_almost_zero(simd_float4 a) { return vfx_all(vfx_abs(a) <= vfx_splat4(FLT_EPSILON)); }

static inline bool VFX_SIMD vfx_equal(float a, float b) { return a == b; }
static inline bool VFX_SIMD vfx_equal(simd_float2 a, simd_float2 b) { return vfx_all(a == b); }
static inline bool VFX_SIMD vfx_equal(simd_float3 a, simd_float3 b) { return vfx_all(a == b); }
static inline bool VFX_SIMD vfx_equal(simd_float4 a, simd_float4 b) { return vfx_all(a == b); }

static inline bool VFX_SIMD vfx_is_almost_equal(float a, float b) { return vfx_abs(a - b) <= FLT_EPSILON; }
static inline bool VFX_SIMD vfx_is_almost_equal(simd_float2 a, simd_float2 b) { return vfx_all(vfx_abs(a - b) <= vfx_splat2(FLT_EPSILON)); }
static inline bool VFX_SIMD vfx_is_almost_equal(simd_float3 a, simd_float3 b) { return vfx_all(vfx_abs(a - b) <= vfx_splat3(FLT_EPSILON)); }
static inline bool VFX_SIMD vfx_is_almost_equal(simd_float4 a, simd_float4 b) { return vfx_all(vfx_abs(a - b) <= vfx_splat4(FLT_EPSILON)); }

static inline bool VFX_SIMD vfx_is_almost_equal(float a, float b, float eps) { return vfx_abs(a - b) <= eps; }
static inline bool VFX_SIMD vfx_is_almost_equal(simd_float2 a, simd_float2 b, float eps) { return vfx_all(vfx_abs(a - b) <= vfx_splat2(eps)); }
static inline bool VFX_SIMD vfx_is_almost_equal(simd_float3 a, simd_float3 b, float eps) { return vfx_all(vfx_abs(a - b) <= vfx_splat3(eps)); }
static inline bool VFX_SIMD vfx_is_almost_equal(simd_float4 a, simd_float4 b, float eps) { return vfx_all(vfx_abs(a - b) <= vfx_splat4(eps)); }

//static inline float VFX_SIMD vfx_max(int32_t a, int32_t b) { return a > b ? a : b; }
//static inline float VFX_SIMD vfx_min(int32_t a, int32_t b) { return a < b ? a : b; }

// retuns only -1 or 1. 0 is considered as 1
static inline float VFX_SIMD vfx_sign_fast(float a) { return a > 0 ? 1.f : -1.f; }
static inline simd_float2 VFX_SIMD vfx_sign_fast(simd_float2 a) { return vfx_select(-vfx_float2_one(), vfx_float2_one(), a >= 0.f); }
static inline simd_float3 VFX_SIMD vfx_sign_fast(simd_float3 a) { return vfx_select(-vfx_float3_one(), vfx_float3_one(), a >= 0.f); }
static inline simd_float4 VFX_SIMD vfx_sign_fast(simd_float4 a) { return vfx_select(-vfx_float4_one(), vfx_float4_one(), a >= 0.f); }


//static inline simd_float2 VFX_SIMD vfx_sincos(float a) {
//#ifdef __METAL_VERSION__
//    float2 sc; sc.x = sincos(a, sc.y); return sc;
//#else
//    struct __float2 sc = __sincosf_stret(a); return (simd_float2){ sc.__sinval, sc.__cosval };
//#endif
//}

static inline VFX_SIMD float vfx_sinc(float x) { if (x == 0.f) return 1.f; return vfx_sin(x) / x; }

static inline float VFX_SIMD vfx_mix(float a, float b, float t) { return vfx_muladd(b - a, t, a); }
static inline simd_float2 VFX_SIMD vfx_mix(simd_float2 a, simd_float2 b, float t) { return vfx_muladd(b - a, t, a); }
static inline simd_float3 VFX_SIMD vfx_mix(simd_float3 a, simd_float3 b, float t) { return vfx_muladd(b - a, t, a); }
static inline simd_float4 VFX_SIMD vfx_mix(simd_float4 a, simd_float4 b, float t) { return vfx_muladd(b - a, t, a); }
static inline simd_float2 VFX_SIMD vfx_mix(simd_float2 a, simd_float2 b, simd_float2 t) { return vfx_muladd(b - a, t, a); }
static inline simd_float3 VFX_SIMD vfx_mix(simd_float3 a, simd_float3 b, simd_float3 t) { return vfx_muladd(b - a, t, a); }
static inline simd_float4 VFX_SIMD vfx_mix(simd_float4 a, simd_float4 b, simd_float4 t) { return vfx_muladd(b - a, t, a); }

// TODO coherent order with mix/smoothstep => start, end, x
static inline float VFX_SIMD vfx_clamp(float v, float mn, float mx)                         { return vfx_min(vfx_max(v, mn), mx); }
static inline simd_float2 VFX_SIMD vfx_clamp(simd_float2 v, simd_float2 mn, simd_float2 mx) { return vfx_min(vfx_max(v, mn), mx); }
static inline simd_float3 VFX_SIMD vfx_clamp(simd_float3 v, simd_float3 mn, simd_float3 mx) { return vfx_min(vfx_max(v, mn), mx); }
static inline simd_float4 VFX_SIMD vfx_clamp(simd_float4 v, simd_float4 mn, simd_float4 mx) { return vfx_min(vfx_max(v, mn), mx); }

static inline float VFX_SIMD vfx_saturate(float v) { return vfx_clamp(v, 0, 1); }
static inline simd_float2 VFX_SIMD vfx_saturate(simd_float2 v) { return vfx_clamp(v, 0, 1); }
static inline simd_float3 VFX_SIMD vfx_saturate(simd_float3 v) { return vfx_clamp(v, 0, 1); }
static inline simd_float4 VFX_SIMD vfx_saturate(simd_float4 v) { return vfx_clamp(v, 0, 1); }

// TODO coherent order with mix/smoothstep => start, end, x
static inline float VFX_SIMD vfx_remap_01(float v, float start, float end) { return vfx_saturate( (v - start) / (end - start)); }
static inline simd_float2 VFX_SIMD vfx_remap_01(simd_float2 v, simd_float2 start, simd_float2 end) { return vfx_saturate( (v - start) / (end - start)); }
static inline simd_float3 VFX_SIMD vfx_remap_01(simd_float3 v, simd_float3 start, simd_float3 end) { return vfx_saturate( (v - start) / (end - start)); }
static inline simd_float4 VFX_SIMD vfx_remap_01(simd_float4 v, simd_float4 start, simd_float4 end) { return vfx_saturate( (v - start) / (end - start)); }

static inline float VFX_SIMD vfx_smoothstep(float a, float b, float x) { float xn = vfx_remap_01(x, a, b); return xn * xn * (3 - 2 * xn); }
static inline simd_float2 VFX_SIMD vfx_smoothstep(simd_float2 a, simd_float2 b, simd_float2 x) { simd_float2 xn = vfx_remap_01(x, a, b); return xn * xn * (3 - 2 * xn); }
static inline simd_float3 VFX_SIMD vfx_smoothstep(simd_float3 a, simd_float3 b, simd_float3 x) { simd_float3 xn = vfx_remap_01(x, a, b); return xn * xn * (3 - 2 * xn); }
static inline simd_float4 VFX_SIMD vfx_smoothstep(simd_float4 a, simd_float4 b, simd_float4 x) { simd_float4 xn = vfx_remap_01(x, a, b); return xn * xn * (3 - 2 * xn); }

static inline bool VFX_SIMD vfx_approxequal(float a, float b, float eps)             { return vfx_abs(a - b) < eps; }
static inline bool VFX_SIMD vfx_approxequal(simd_float2 a, simd_float2 b, float eps) { return vfx_all(vfx_abs(a - b) < eps); }
static inline bool VFX_SIMD vfx_approxequal(simd_float3 a, simd_float3 b, float eps) { return vfx_all(vfx_abs(a - b) < eps); }
static inline bool VFX_SIMD vfx_approxequal(simd_float4 a, simd_float4 b, float eps) { return vfx_all(vfx_abs(a - b) < eps); }

static inline float VFX_SIMD vfx_reduce_mul(simd_float2 a) { return a.x * a.y; }
static inline float VFX_SIMD vfx_reduce_mul(simd_float3 a) { return a.x * a.y * a.z; }
static inline float VFX_SIMD vfx_reduce_mul(simd_float4 a) { return a.x * a.y * a.z * a.w; }

static inline int VFX_SIMD vfx_min_index(simd_float4 v, simd_int4 ind) {
    simd_float4 min_lh = vfx_min(v, v.zwxy);
    simd_int4 min_ind_lh = simd_bitselect(ind, ind.zwxy, v > v.zwxy);
    return (min_lh.x < min_lh.y) ? min_ind_lh.x : min_ind_lh.y;
}

static inline simd_float2 VFX_SIMD vfx_robust_normalize(simd_float2 v) {
    simd_float2 length2 = vfx_length_squared(v);
    return vfx_select(v, v * vfx_rsqrt(length2), length2 != vfx_float4_zero().xy);
}

static inline simd_float4 VFX_SIMD vfx_robust_normalize(simd_float4 v) {
    simd_float4 length2 = vfx_length_squared(v);
    return vfx_select(v, v * vfx_rsqrt(length2), length2 != vfx_float4_zero());
}

static inline simd_float3 VFX_SIMD vfx_robust_normalize(simd_float3 v) {
    simd_float3 length2 = vfx_length_squared(v);
    return vfx_select(v, v * vfx_rsqrt(length2), length2 != vfx_float4_zero().xyz);
}

static inline void VFX_SIMD_UNPURE vfx_orthonormal_basis(simd_float3 n, out simd_float3 *t1, out simd_float3 *t2) {
    // from http://marc-b-reynolds.github.io/quaternions/2016/07/06/Orthonormal.html
    float sz = vfx_copysign(1.0f, n.z);
    float a  = n.y / (vfx_abs(n.z) + 1.f);
    float b  = n.y * a;
    float c  = -n.x * a;
    *t1 = (simd_float3){ n.z + sz * b,  sz * c,   -n.x       };
    *t2 = (simd_float3){ c,           1.f - b,    -sz * n.y };
}

static inline float VFX_SIMD vfx_angle(simd_float3 a, simd_float3 b) {
    float l2 = vfx_length(a) * vfx_length(b);
    return (l2 > 0.0) ? vfx_acos(vfx_dot(a, b) / l2) : 0.0;
}

//easing functions
static inline float       VFX_SIMD vfx_quadraticEaseIn(float a)       { return vfx_pow2(a); }
static inline float       VFX_SIMD vfx_quadraticEaseOut(float a)       { return -a * (a-2); }
static inline float       VFX_SIMD vfx_quadraticEaseInOut(float a)       { return a < 0.5 ? (2 * (a * a)) : (-1 + (4 - 2 * a) * a); }

static inline float       VFX_SIMD vfx_cubicEaseIn(float a)       { return vfx_pow3(a); }
static inline float       VFX_SIMD vfx_cubicEaseOut(float a)       { return 1 - vfx_pow3(1 - a); }
static inline float       VFX_SIMD vfx_cubicEaseInOut(float a)       { return a < 0.5 ? (4 * a * a * a) : ((a - 1) * (2 * a - 2) * (2 * a - 2) + 1); }

static inline float       VFX_SIMD vfx_quarticEaseIn(float a)       { return vfx_pow4(a); }
static inline float       VFX_SIMD vfx_quarticEaseOut(float a)       { return 1 - vfx_pow4(1-a); }
static inline float       VFX_SIMD vfx_quarticEaseInOut(float a)       { return a < 0.5 ? (8 * a * a * a * a) : (1 - vfx_pow4(-2 * a + 2) * 0.5); }

static inline float       VFX_SIMD vfx_quinticEaseIn(float a)       { return vfx_pow5(a); }
static inline float       VFX_SIMD vfx_quinticEaseOut(float a)       { return 1 - vfx_pow5(1 - a); }
static inline float       VFX_SIMD vfx_quinticEaseInOut(float a)       { return a < 0.5 ? (16 * a * a * a * a * a) : (1 - vfx_pow5(-2 * a + 2) * 0.5); }

#pragma mark - Batching

// batch dots

static inline simd_float2 VFX_SIMD vfx_dot_x2(simd_float3 v0, simd_float3 w0, simd_float3 v1, simd_float3 w1) {
    simd_float3x2 dot_mat = vfx_float3x2_from_rows(v0 * w0, v1 * w1);
    return dot_mat.columns[0] + dot_mat.columns[1] + dot_mat.columns[2];
}

static inline simd_float2 VFX_SIMD vfx_dot_x2(simd_float4 v0, simd_float4 w0, simd_float4 v1, simd_float4 w1) {
    simd_float4x2 dot_mat = vfx_float4x2_from_rows(v0 * w0, v1 * w1);
    return dot_mat.columns[0] + dot_mat.columns[1] + dot_mat.columns[2] + dot_mat.columns[3];
}

static inline simd_float2 VFX_SIMD vfx_dot3_x2(simd_float4 v0, simd_float4 w0, simd_float4 v1, simd_float4 w1) {
    simd_float4x2 dot_mat = vfx_float4x2_from_rows(v0 * w0, v1 * w1);
    return dot_mat.columns[0] + dot_mat.columns[1] + dot_mat.columns[2];
}

static inline simd_float3 VFX_SIMD vfx_dot_x3(simd_float3 v0, simd_float3 w0, simd_float3 v1, simd_float3 w1, simd_float3 v2, simd_float3 w2) {
    simd_float3x3 mat = vfx_float3x3_from_rows(v0 * w0, v1 * w1, v2 * w2);
    return mat.columns[0] + mat.columns[1] + mat.columns[2];
}

static inline simd_float3 VFX_SIMD vfx_dot_x3(simd_float4 v0, simd_float4 w0, simd_float4 v1, simd_float4 w1, simd_float4 v2, simd_float4 w2) {
    simd_float4x3 mat = vfx_float4x3_from_rows(v0 * w0, v1 * w1, v2 * w2);
    return mat.columns[0] + mat.columns[1] + mat.columns[2] + mat.columns[3];
}

static inline simd_float4 VFX_SIMD vfx_dot_x4(simd_float3 v0, simd_float3 w0, simd_float3 v1, simd_float3 w1, simd_float3 v2, simd_float3 w2, simd_float3 v3, simd_float3 w3) {
    simd_float3x4 dot_mat = vfx_float3x4_from_rows(v0 * w0, v1 * w1, v2 * w2, v3 * w3);
    return dot_mat.columns[0] + dot_mat.columns[1] + dot_mat.columns[2];
}

static inline simd_float4 VFX_SIMD vfx_dot_x4(simd_float4 v0, simd_float4 w0, simd_float4 v1, simd_float4 w1, simd_float4 v2, simd_float4 w2, simd_float4 v3, simd_float4 w3) {
    simd_float4x4 dot_mat = vfx_float4x4_from_rows(v0 * w0, v1 * w1, v2 * w2, v3 * w3);
    return dot_mat.columns[0] + dot_mat.columns[1] + dot_mat.columns[2] + dot_mat.columns[3];
}

static inline simd_float3 VFX_SIMD vfx_linear_combination(simd_float3 v0, float w0, simd_float3 v1, float w1) {
    return v0 * w0 + v1 * w1;
}


#pragma mark - Quaternion

static inline VFX_SIMD simd_quatf vfx_quat(simd_float4 v) { return (simd_quatf){ .vector = v }; }
static inline VFX_SIMD simd_quatf vfx_quat(float x, float y, float z, float w) { return vfx_quat(vfx_make_float4(x, y, z, w)); }
static inline VFX_SIMD simd_quatf vfx_quat(simd_float3 xyz, float w) { return vfx_quat(vfx_make_float4(xyz, w)); }
static inline VFX_SIMD simd_quatf vfx_quat(float angle, simd_float3 axis) { return vfx_quat(vfx_make_float4(sin(angle/2) * axis, cos(angle/2))); }

static inline simd_quatf VFX_SIMD vfx_quat_identity(void) { return vfx_quat(vfx_float4_unit_w()); }
static inline bool VFX_SIMD vfx_quat_is_identity(simd_quatf q) { return vfx_approxequal(q.vector, vfx_quat_identity().vector, 0.000001f); }

static inline simd_quatf VFX_SIMD vfx_quat_negate(simd_quatf q) { return vfx_quat( -q.vector ); }
static inline simd_quatf VFX_SIMD vfx_quat_conjugate(simd_quatf q) { return vfx_quat( q.vector * (simd_float4){-1,-1,-1, 1} ); }
static inline simd_quatf VFX_SIMD vfx_quat_inverse(simd_quatf q) { return vfx_quat(vfx_quat_conjugate(q).vector * vfx_recip(vfx_length_squared(q.vector))); }

#ifdef __METAL_VERSION__ // custom versions
static inline VFX_SIMD simd_quatf vfx_quat(simd_float3x3 mat) {
     float trace = mat[0][0] + mat[1][1] + mat[2][2];
     if (trace >= 0.0) {
       float r = 2 * vfx_sqrt(1 + trace);
       float rinv = vfx_recip(r);
       return vfx_quat(rinv*(mat[1][2] - mat[2][1]),
                              rinv*(mat[2][0] - mat[0][2]),
                              rinv*(mat[0][1] - mat[1][0]),
                              r/4);
     } else if (mat[0][0] >= mat[1][1] && mat[0][0] >= mat[2][2]) {
       float r = 2 * vfx_sqrt(1 - mat[1][1] - mat[2][2] + mat[0][0]);
       float rinv = vfx_recip(r);
       return vfx_quat(r/4,
                              rinv*(mat[0][1] + mat[1][0]),
                              rinv*(mat[0][2] + mat[2][0]),
                              rinv*(mat[1][2] - mat[2][1]));
     } else if (mat[1][1] >= mat[2][2]) {
       float r = 2 * vfx_sqrt(1 - mat[0][0] - mat[2][2] + mat[1][1]);
       float rinv = vfx_recip(r);
       return vfx_quat(rinv*(mat[0][1] + mat[1][0]),
                              r/4,
                              rinv*(mat[1][2] + mat[2][1]),
                              rinv*(mat[2][0] - mat[0][2]));
     } else {
       float r = 2 * vfx_sqrt(1 - mat[0][0] - mat[1][1] + mat[2][2]);
       float rinv = vfx_recip(r);
       return vfx_quat(rinv*(mat[0][2] + mat[2][0]),
                              rinv*(mat[1][2] + mat[2][1]),
                              r/4,
                              rinv*(mat[0][1] - mat[1][0]));
     }
}

static inline simd_quatf VFX_SIMD vfx_quat(simd_float4x4 mat) { return vfx_quat(vfx_float3x3(mat)); }
static inline simd_quatf VFX_SIMD vfx_quat_mul(simd_quatf p, simd_quatf q) {
    simd_float4 q1 = p.vector; simd_float4 q2 = q.vector;
    return vfx_quat(q2.xyz * q1.w + q1.xyz * q2.w + cross(q1.xyz, q2.xyz),
                    q1.w * q2.w - dot(q1.xyz, q2.xyz));
 }
static inline simd_quatf VFX_SIMD vfx_quat_mul(float r, simd_quatf q) { return vfx_quat(r * q.vector); }
static inline simd_quatf VFX_SIMD vfx_quat_mul(simd_quatf q, float r) { return vfx_quat(r * q.vector); }

// rotation is p' = q * p * conjugate(q);
// simplification : https://blog.molecular-matters.com/2013/05/24/a-faster-quaternion-vector-multiplication/
static inline VFX_SIMD simd_float3 vfx_quat_rotate_vector(simd_quatf q, simd_float3 v) {
    return vfx_quat_mul(q, vfx_quat_mul(vfx_quat(v, 0), vfx_quat_conjugate(q))).vector.xyz;
}

// TODO should be a matrix ctor !
static inline float3x3 vfx_quat_to_matrix3x3(simd_quatf q) {
    float4 quaternion = q.vector;
    float3 q2 = quaternion.xyz * quaternion.xyz * 2.f;
    float3 wq = quaternion.w * quaternion.xyz;

    float xy = quaternion.x * quaternion.y;
    float yz = quaternion.y * quaternion.z;
    float xz = quaternion.x * quaternion.z;

    float3x3 m;
    m[0][0] = 1.0f - q2.y - q2.z;
    m[0][1] = 2.0f * (xy + wq.z);
    m[0][2] = 2.0f * (xz - wq.y);

    m[1][0] = 2.0f * (xy - wq.z);
    m[1][1] = 1.0f - q2.x - q2.z;
    m[1][2] = 2.0f * (yz + wq.x);

    m[2][0] = 2.0f * (xz + wq.y);
    m[2][1] = 2.0f * (yz - wq.x);
    m[2][2] = 1.0f - q2.x - q2.y;
    return m;
}

static inline float4x4 vfx_quat_to_matrix4x4(simd_quatf q) {
    return vfx_float4x4(vfx_quat_to_matrix3x3(q));
}


#else // native SIMD version
static inline VFX_SIMD simd_quatf vfx_quat(simd_float3x3 matrix) { return simd_quaternion(matrix); }
static inline VFX_SIMD simd_quatf vfx_quat(simd_float4x4 matrix) { return simd_quaternion(matrix); }
static inline simd_quatf VFX_SIMD vfx_quat_mul(simd_quatf p, simd_quatf q) { return simd_mul(p, q); }
static inline simd_quatf VFX_SIMD vfx_quat_mul(float r, simd_quatf q) { return simd_mul(r, q); }
static inline simd_quatf VFX_SIMD vfx_quat_mul(simd_quatf q, float r) { return simd_mul(q, r); }
static inline simd_float3 VFX_SIMD vfx_quat_rotate_vector(simd_quatf q, simd_float3 v) { return simd_act(q, v); }
static inline simd_float3x3 VFX_SIMD vfx_quat_to_matrix3x3(simd_quatf q) { return simd_matrix3x3(q); }
static inline simd_float4x4 VFX_SIMD vfx_quat_to_matrix4x4(simd_quatf q) { return simd_matrix4x4(q); }
#endif

static inline float VFX_SIMD vfx_quat_length(simd_quatf q) { return vfx_length(q.vector); }

static inline simd_quatf VFX_SIMD vfx_quat_normalize(simd_quatf q) { return vfx_quat(vfx_robust_normalize(q.vector)); }
static inline simd_quatf VFX_SIMD vfx_quat_invert(simd_quatf q) { return vfx_quat_normalize(vfx_quat_conjugate(q)); }

// Matrix

// Robust extraction of a rotation (3x3) matrix from a (scaled) 4x4.
// Supports for one zero axis. With more, the matrix won't be orthogonal
// but there will be no NaN
static inline simd_float3x3 VFX_SIMD vfx_extract_orthogonal(simd_float3x3 m) {
    simd_float3x3 dot_mat = vfx_float3x3_from_rows(m.columns[0] * m.columns[0],
                                                  m.columns[1] * m.columns[1],
                                                  m.columns[2] * m.columns[2]);
    simd_float3 len_sqr = dot_mat.columns[0] + dot_mat.columns[1] + dot_mat.columns[2];
#ifdef __METAL_VERSION__
    simd_bool3 len_is_zero = len_sqr <= FLT_MIN;
#else
    simd_int3 len_is_zero = len_sqr <= FLT_MIN;
#endif
    simd_float3 inv_len = vfx_select(vfx_precise_rsqrt(len_sqr), len_sqr, len_is_zero) ;
    simd_float3 vx = m.columns[0] * inv_len.x;
    simd_float3 vy = m.columns[1] * inv_len.y;
    simd_float3 vz = m.columns[2] * inv_len.z;
    return vfx_float3x3(
        len_is_zero.x ? vfx_cross(vy, vz) : vx,
        len_is_zero.y ? vfx_cross(vz, vx) : vy,
        len_is_zero.z ? vfx_cross(vx, vy) : vz
    );
}
static inline simd_float3x3 VFX_SIMD vfx_extract_orthogonal(simd_float4x4 m) {
    return vfx_extract_orthogonal(vfx_float3x3(m.columns[0].xyz, m.columns[1].xyz, m.columns[2].xyz) );
}

static inline simd_quatf VFX_SIMD vfx_quat_from_matrix3x3(simd_float3x3 m) { return vfx_quat(vfx_extract_orthogonal(m)); }
static inline simd_quatf VFX_SIMD vfx_quat_from_matrix4x4(simd_float4x4 m) { return vfx_quat(vfx_extract_orthogonal(m)); }

static inline simd_quatf VFX_SIMD vfx_quat_from_normal(simd_float3 n) {
    n = vfx_robust_normalize(n);
    simd_float3 t,b;
    vfx_orthonormal_basis(n, &t, &b);
    return vfx_quat(vfx_float3x3(t, b, n));
}

static inline simd_float3 VFX_SIMD vfx_quat_to_normal(simd_quatf q) { return vfx_quat_to_matrix3x3(q).columns[2]; }

// this function will produce random sign for 180deg rotation
// use only when you know taht you deal with small rotation matrices
static inline simd_quatf VFX_SIMD vfx_quat_from_matrix4x4_describing_small_rotation(simd_float4x4 m)
{
    // based on Branchless Matrix to Quaternion Conversion
    // from http://www.thetenthplanet.de/archives/1994
    // warning : we store real in w, not in x
    simd_float4 sign = { 1.f, -1.f, -1.f, 1.f };
    simd_float4 mx = sign.xxxx + m.columns[0][0] * sign + m.columns[1][1] * sign.yxzw + m.columns[2][2] * sign.yzxw;
    simd_float4 q = 0.5f * vfx_sqrt(vfx_max(vfx_float4_zero(), mx));
    q.xyz = vfx_copysign(q.xyz, vfx_make_float3(m.columns[1][2] - m.columns[2][1], m.columns[2][0] - m.columns[0][2], m.columns[0][1] - m.columns[1][0]));
    return (simd_quatf){{q}};
}

// LookAt

static inline simd_quatf VFX_SIMD vfx_quat_look_at(simd_float3 forward, simd_float3 up) {
    forward = vfx_robust_normalize(forward);

    // deal with forward and up colinear -> use forward.yzx (rotation) as up then
    simd_float3 v = vfx_cross(up, forward);
    simd_float3 length2 = vfx_length_squared(v);
    simd_float3 right = vfx_select(forward.yzx, v * vfx_rsqrt(length2), length2 != vfx_float4_zero().xyz);

    up = vfx_normalize(vfx_cross(forward, right));

    float m00 = right.x;
    float m01 = right.y;
    float m02 = right.z;
    float m10 = up.x;
    float m11 = up.y;
    float m12 = up.z;
    float m20 = forward.x;
    float m21 = forward.y;
    float m22 = forward.z;

    float num8 = (m00 + m11) + m22;
    simd_quatf q;
    if (num8 > 0.0)
    {
        float num = vfx_sqrt(num8 + 1.0);
        q.vector.w = num * 0.5;
        num = 0.5 / num;
        q.vector.x = (m12 - m21) * num;
        q.vector.y = (m20 - m02) * num;
        q.vector.z = (m01 - m10) * num;
        return q;
    }

    if ((m00 >= m11) && (m00 >= m22))
    {
        float num7 = vfx_sqrt(((1.0 + m00) - m11) - m22);
        float num4 = 0.5 / num7;
        q.vector.x = 0.5 * num7;
        q.vector.y = (m01 + m10) * num4;
        q.vector.z = (m02 + m20) * num4;
        q.vector.w = (m12 - m21) * num4;
        return q;
    }

    if (m11 > m22)
    {
        float num6 = vfx_sqrt(((1.0 + m11) - m00) - m22);
        float num3 = 0.5 / num6;
        q.vector.x = (m10 + m01) * num3;
        q.vector.y = 0.5 * num6;
        q.vector.z = (m21 + m12) * num3;
        q.vector.w = (m20 - m02) * num3;
        return q;
    }

    float num5 = vfx_sqrt(((1.0 + m22) - m00) - m11);
    float num2 = 0.5 / num5;
    q.vector.x = (m20 + m02) * num2;
    q.vector.y = (m21 + m12) * num2;
    q.vector.z = 0.5 * num5;
    q.vector.w = (m01 - m10) * num2;
    return q;
}

// From-To

static inline simd_quatf VFX_SIMD vfx_quat_rotation_between(simd_quatf a, simd_quatf b) { return vfx_quat_mul(b, vfx_quat_invert(a)); }
#ifndef __METAL_VERSION__ // TMP COMMENT
static inline simd_quatf VFX_SIMD vfx_quat_rotation_between(simd_float3 a, simd_float3 b) { return simd_quaternion(a, b); }
#endif
static inline simd_quatf VFX_SIMD vfx_quat_rotation_between_fast(simd_float3 a, simd_float3 b) {
    simd_quatf q;
    q.vector.xyz = vfx_cross(a, b);
    q.vector.w = vfx_sqrt(vfx_length_squared(a) * vfx_length_squared(b)) + vfx_dot(a, b);
    return vfx_quat_normalize(q);
}

// Axis-Angle

static inline simd_quatf VFX_SIMD vfx_quat_from_axisangle(simd_float3 axis, float angle) { return vfx_quat_normalize(vfx_quat(angle, axis)); }
static inline float VFX_SIMD vfx_quat_angle(simd_quatf q) { return 2 * vfx_atan2(vfx_length(q.vector.xyz), q.vector.w); }
static inline simd_float3 VFX_SIMD vfx_quat_axis(simd_quatf q) { return vfx_normalize(q.vector.xyz); }

static inline simd_quatf VFX_SIMD vfx_quat_from_axisangle(simd_float4 axis_angle) { return vfx_quat_from_axisangle(axis_angle.xyz, axis_angle.w); }
static inline simd_float4 VFX_SIMD vfx_quat_to_axisangle(simd_quatf q) { return vfx_make_float4(vfx_quat_axis(q), vfx_quat_angle(q)); }

// Euler

static inline simd_quatf VFX_SIMD vfx_quat_from_euler(simd_float3 angles) {
    simd_float3 angles_2 = angles / 2;
    simd_float3 cs = vfx_cos(angles_2);
    simd_float3 sn = vfx_sin(angles_2);
    float cpcy = cs.y * cs.z;
    float spsy = sn.y * sn.z;
    simd_quatf q;
    q.vector.w = cs.x * cpcy + sn.x * spsy;
    q.vector.x = sn.x * cpcy - cs.x * spsy;
    q.vector.y = cs.x * sn.y * cs.z + sn.x * cs.y * sn.z;
    q.vector.z = cs.x * cs.y * sn.z - sn.x * sn.y * cs.z;
    return q;
}

static inline simd_float3 VFX_SIMD vfx_quat_to_euler(simd_quatf q) {
    simd_float4 sq = q.vector * q.vector;
    float unit = vfx_reduce_add(sq); //should be 1 if the quaternion is normalized
    if (unit == 0.f) return vfx_float4_zero().xyz;
    float test = (q.vector.x * q.vector.z - q.vector.y*q.vector.w) / unit;
    if (test >  0.499) return vfx_make_float3(  2.f * vfx_atan2(q.vector.x, q.vector.w),  VFX_PI_2, 0.f ); // singularity at north pole
    if (test < -0.499) return vfx_make_float3( -2.f * vfx_atan2(q.vector.x, q.vector.w), -VFX_PI_2, 0.f ); // singularity at south pole
    return vfx_make_float3(vfx_atan2(2.f * (q.vector.y * q.vector.z + q.vector.x * q.vector.w), (-sq.x - sq.y + sq.z + sq.w)),
                           vfx_asin(-2.f * test),
                           vfx_atan2(2.f * (q.vector.x * q.vector.y + q.vector.z * q.vector.w), ( sq.x - sq.y - sq.z + sq.w)));
}

// Math

static inline VFX_SIMD simd_quatf vfx_quat_log(simd_quatf q) {
    float real = vfx_log(vfx_length_squared(q.vector))/2;
    if (vfx_equal(q.vector.xyz, vfx_float3_zero())) return vfx_quat(vfx_float3_zero(), real);
    simd_float3 imag = vfx_acos(q.vector.w / vfx_length(q.vector)) * vfx_normalize(q.vector.xyz);
    return vfx_quat(imag, real);
}

static inline simd_quatf VFX_SIMD vfx_quat_ln(simd_quatf q) {
    float r = vfx_length(q.vector.xyz);
    float t = r > 10E-5 ? vfx_atan2(r, q.vector.w) / r : 0.0f;
    return vfx_quat(vfx_make_float4(q.vector.xyz * t, 0.5f * vfx_log(vfx_dot(q.vector.xyz, q.vector.xyz))));
}

static inline simd_quatf VFX_SIMD vfx_quat_exp(simd_quatf q) {
    float r = vfx_length(q.vector.xyz);
    float et = vfx_exp(q.vector.w);
    float s = r >= 10E-5 ? et * vfx_sin(r) / r : 0.0f;
    return vfx_quat(q.vector.xyz * s, et * vfx_cos(r));
}

static inline simd_quatf VFX_SIMD vfx_quat_pow(simd_quatf q, float p) {
    return vfx_quat_ln(vfx_quat(p * vfx_quat_exp(q).vector));
}

// Interpolations

// helpers

static inline VFX_SIMD float _vfx_quat_angle(simd_quatf p, simd_quatf q) {
  return 2 * vfx_atan2(vfx_length(p.vector - q.vector), vfx_length(p.vector + q.vector));
}

static inline VFX_SIMD simd_quatf _vfx_quat_slerp_internal(simd_quatf q0, simd_quatf q1, float t) {
  float s = 1 - t;
  float a = _vfx_quat_angle(q0, q1);
  float r = vfx_recip(vfx_sinc(a));
  return vfx_quat_normalize(vfx_quat(vfx_sinc(s*a)*r*s*q0.vector + vfx_sinc(t*a)*r*t*q1.vector));
}

// Spherical linear interpolation along the shortest arc between quaternions `q0` and `q1`
static inline simd_quatf VFX_SIMD vfx_quat_slerp(simd_quatf from, simd_quatf to, float t) {
    if (vfx_dot(from.vector, to.vector) >= 0)
        return _vfx_quat_slerp_internal(from, to, t);
    return _vfx_quat_slerp_internal(from, vfx_quat_negate(to), t);
}

// Spherical linear interpolation along the longest arc between quaternions `q0` and `q1`
static inline simd_quatf VFX_SIMD vfx_quat_slerp_longest(simd_quatf from, simd_quatf to, float t) {
    if (vfx_dot(from.vector, to.vector) >= 0)
      return _vfx_quat_slerp_internal(from, vfx_quat_negate(to), t);
    return _vfx_quat_slerp_internal(from, to, t);
}

static inline VFX_SIMD simd_quatf _vfx_quat_squad(simd_quatf q0, simd_quatf qa, simd_quatf qb, simd_quatf q1, float t) {
  simd_quatf r0 = _vfx_quat_slerp_internal(q0, q1, t);
  simd_quatf r1 = _vfx_quat_slerp_internal(qa, qb, t);
  return _vfx_quat_slerp_internal(r0, r1, 2*t*(1 - t));
}

static inline VFX_SIMD simd_quatf _vfx_quat_squad_intermediate(simd_quatf q0, simd_quatf q1, simd_quatf q2) {
  simd_quatf p0 = vfx_quat_log(vfx_quat_mul(q0, vfx_quat_inverse(q1)));
  simd_quatf p2 = vfx_quat_log(vfx_quat_mul(q2, vfx_quat_inverse(q1)));
    return vfx_quat_normalize(vfx_quat_mul(q1, vfx_quat_exp(vfx_quat_mul(-0.25, vfx_quat(p0.vector + p2.vector)))));
}

// aka Shoemake's Quaternion curves or spline
// Interpolate between quaternions along a spherical cubic spline
// The function interpolates between q1 and q2. q0 is the left
//  endpoint of the previous interval, and q3 is the right endpoint of the next
//  interval. Use this function to smoothly interpolate between a sequence of
//  rotations
static inline simd_quatf VFX_SIMD vfx_quat_squad(simd_quatf q0, simd_quatf q1, simd_quatf q2, simd_quatf q3, float t) {
    simd_quatf qa = _vfx_quat_squad_intermediate(q0, q1, q2);
    simd_quatf qb = _vfx_quat_squad_intermediate(q1, q2, q3);
    return _vfx_quat_squad(q1, qa, qb, q2, t);
}

// Spherical cubic Bezier interpolation between quaternions
// The function treats q0 ... q3 as control points and uses slerp
//  in place of lerp in the De Castlejeau algorithm. The endpoints of
//  interpolation are thus q0 and q3, and the curve will not generally pass
//  through q1 or q2. Note that the convex hull property of "standard" Bezier
//  curve does not hold on the sphere
static inline simd_quatf VFX_SIMD vfx_quat_bezier(simd_quatf q0, simd_quatf q1, simd_quatf q2, simd_quatf q3, float t) {
    simd_quatf q01 = _vfx_quat_slerp_internal(q0, q1, t);
    simd_quatf q12 = _vfx_quat_slerp_internal(q1, q2, t);
    simd_quatf q23 = _vfx_quat_slerp_internal(q2, q3, t);
    simd_quatf q012 = _vfx_quat_slerp_internal(q01, q12, t);
    simd_quatf q123 = _vfx_quat_slerp_internal(q12, q23, t);
    return _vfx_quat_slerp_internal(q012, q123, t);
}

#pragma mark - Matrix3x3

// Create a 2D transform with (a)ngle, (t)ranslation and (s)cale
static inline simd_float3x3 VFX_SIMD vfx_make_transform(float a, simd_float2 t, simd_float2 s) {
    float cs = vfx_cos(a); float sn = vfx_sin(a);
    return vfx_float3x3(
         s.x * vfx_make_float3( cs, -sn, 0 ),
         s.y * vfx_make_float3( sn,  cs, 0 ),
               vfx_make_float3(  t,   1 )
    );
}

static inline simd_float2 VFX_SIMD vfx_transform(simd_float3x3 m, simd_float2 p) {
    simd_float2 result = m.columns[2].xy;
    result += p.x * m.columns[0].xy;
    result += p.y * m.columns[1].xy;
    return result;
}

static inline simd_float3x3 VFX_SIMD vfx_translate(simd_float3x3 m, simd_float2 t) { m.columns[2].xy += t.xy; return m; }
static inline simd_float3x3 VFX_SIMD vfx_scale(simd_float3x3 m, simd_float2 s)     { m.columns[0] *= s.x; m.columns[1] *= s.y; return m; }
static inline simd_float3x3 VFX_SIMD vfx_scale(simd_float3x3 m, simd_float3 s)     { m.columns[0] *= s.x; m.columns[1] *= s.y; m.columns[2] *= s.z; return m; }

static inline simd_float2 VFX_SIMD vfx_get_translation_2D(simd_float3x3 m)      { return m.columns[2].xy; }
static inline simd_float2 VFX_SIMD vfx_get_scale_2D(simd_float3x3 m) { return vfx_make_float2(vfx_length(m.columns[0].xy), vfx_length(m.columns[1].xy)); }

static inline simd_float3 VFX_SIMD vfx_get_scale(simd_float3x3 m) { return vfx_make_float3(vfx_length(m.columns[0].xyz), vfx_length(m.columns[1].xyz), vfx_length(m.columns[2].xyz)); }

#pragma mark - Matrix4x4

// Avoid zero scale. WARNING: this prevents negative scale
static inline simd_float3 VFX_SIMD vfx_robust_scale(simd_float3 s)      { return vfx_max(vfx_abs(s), vfx_splat3(FLT_EPSILON)); }

static inline simd_float4x4 VFX_SIMD vfx_translate(simd_float4x4 m, simd_float4 t_w1)   { m.columns[3].xyz += t_w1.xyz; return m; }
static inline simd_float4x4 VFX_SIMD vfx_scale(simd_float4x4 m, simd_float3 s)          { m.columns[0] *= s.x; m.columns[1] *= s.y; m.columns[2] *= s.z; return m; }

static inline simd_float3 VFX_SIMD vfx_get_translation(simd_float4x4 m)      { return m.columns[3].xyz; }
static inline simd_float3 VFX_SIMD vfx_get_scale(simd_float4x4 m) { return vfx_make_float3(vfx_length(m.columns[0].xyz), vfx_length(m.columns[1].xyz), vfx_length(m.columns[2].xyz)); }
static inline simd_float3x3 VFX_SIMD vfx_get_rotation(simd_float4x4 m)      { return vfx_float3x3(vfx_robust_normalize(m.columns[0].xyz), vfx_robust_normalize(m.columns[1].xyz), vfx_robust_normalize(m.columns[2].xyz)); }

static inline simd_float4x4 VFX_SIMD vfx_make_transform(simd_quatf r, simd_float4 t_w1, simd_float3 scale) {
    scale = vfx_robust_scale(scale);
    simd_float3 q2 = r.vector.xyz * r.vector.xyz;
    simd_float3 wq = r.vector.w * r.vector.xyz;
    float xy = r.vector.x * r.vector.y;
    float yz = r.vector.y * r.vector.z;
    float xz = r.vector.x * r.vector.z;
    simd_float3 s = scale + scale; // faster than 2 * scale
    return (simd_float4x4){
        s.x * vfx_make_float4(0.5f - q2.y - q2.z, xy + wq.z, xz - wq.y, 0),
        s.y * vfx_make_float4(xy - wq.z, 0.5f - q2.x - q2.z, yz + wq.x, 0),
        s.z * vfx_make_float4(xz + wq.y, yz - wq.x, 0.5f - q2.x - q2.y, 0),
        t_w1
    };
}
static inline simd_float4x4 VFX_SIMD vfx_make_transform(simd_quatf r, simd_float4 t_w1) { return vfx_make_transform(r, t_w1, vfx_splat3(1.f)); }
static inline simd_float4x4 VFX_SIMD vfx_make_transform(simd_quatf r, simd_float3 scale) { return vfx_make_transform(r, vfx_make_float4(0.f, 0.f, 0.f, 1.f), scale); }
static inline simd_float4x4 VFX_SIMD vfx_make_transform(simd_float4 t_w1, simd_float3 s) { s = vfx_robust_scale(s); return vfx_float4x4(
    vfx_make_float4( s.x, 0.f, 0.f, 0.f ),
    vfx_make_float4( 0.f, s.y, 0.f, 0.f ),
    vfx_make_float4( 0.f, 0.f, s.z, 0.f ),
    t_w1);
}
static inline simd_float4x4 VFX_SIMD vfx_make_translation(simd_float4 t_w1) { return (simd_float4x4){
    vfx_make_float4( 1.f, 0.f, 0.f, 0.f ),
    vfx_make_float4( 0.f, 1.f, 0.f, 0.f ),
    vfx_make_float4( 0.f, 0.f, 1.f, 0.f ),
    t_w1};
}
static inline simd_float4x4 VFX_SIMD vfx_make_scale(simd_float3 scale) { return vfx_diagonal(vfx_make_float4(vfx_robust_scale(scale), 1.f)); }
static inline simd_float4x4 VFX_SIMD vfx_make_rotation(simd_quatf r) { return vfx_make_transform(r, vfx_make_float4(0.f, 0.f, 0.f, 1.f)); }

static inline simd_float3x3 VFX_SIMD vfx_inverse_fast(simd_float3x3 m) {
    simd_float3 a = m.columns[0];
    simd_float3 b = m.columns[1];
    simd_float3 c = m.columns[2];
    simd_float3 r0 = vfx_cross(b, c);
    simd_float3 r1 = vfx_cross(c, a);
    simd_float3 r2 = vfx_cross(a, b);
    float inv_det = 1.f / vfx_dot(r2, c);
    return vfx_float3x3_from_rows(r0 * inv_det, r1 * inv_det, r2 * inv_det);
}

// This is only valid with a transform matrix (i.e. rows.3 = 0,0,0,1)
static inline simd_float4x4 VFX_SIMD vfx_inverse_fast(simd_float4x4 m) {
    simd_float3 a = m.columns[0].xyz;
    simd_float3 b = m.columns[1].xyz;
    simd_float3 c = m.columns[2].xyz;
    simd_float3 d = m.columns[3].xyz;
    float x = m.columns[0].w;
    float y = m.columns[1].w;
    float z = m.columns[2].w;
    float w = m.columns[3].w;
    simd_float3 s = vfx_cross(a, b);
    simd_float3 t = vfx_cross(c, d);
    simd_float3 u = a * y - b * x;
    simd_float3 v = c * w - d * z;
    float inv_det = 1.f / (vfx_dot(s, v) + vfx_dot(t, u));
    s *= inv_det;
    t *= inv_det;
    u *= inv_det;
    v *= inv_det;
    simd_float3 r0 = vfx_cross(b, v) + t * y;
    simd_float3 r1 = vfx_cross(v, a) - t * x;
    simd_float3 r2 = vfx_cross(d, u) + s * w;
    simd_float3 r3 = vfx_cross(u, c) - s * z;
    return vfx_float4x4_from_rows(vfx_make_float4( r0.x, r0.y, r0.z, -vfx_dot(b, t)),
                                  vfx_make_float4( r1.x, r1.y, r1.z,  vfx_dot(a, t)),
                                  vfx_make_float4( r2.x, r2.y, r2.z, -vfx_dot(d, s)),
                                  vfx_make_float4( r3.x, r3.y, r3.z,  vfx_dot(c, s)));
}


static inline simd_float4x4 VFX_SIMD vfx_inverse_transpose(simd_float4x4 m) {
    simd_float3 scale_squared = vfx_dot_x3(m.columns[0].xyz, m.columns[0].xyz,
                                           m.columns[1].xyz, m.columns[1].xyz,
                                           m.columns[2].xyz, m.columns[2].xyz);
    // this avoid NaN but still flatten the features (e.g. a plane has no more valid normal when scaled with 0)
    simd_float3 inv_scale_squared = vfx_select(1 / scale_squared, scale_squared, scale_squared == 0);
    return vfx_scale(m, inv_scale_squared);
}

static inline simd_float3 VFX_SIMD vfx_transform_direction(simd_float4x4 m, simd_float3 d) {
    simd_float3 result = d.x * m.columns[0].xyz;
    result += d.y * m.columns[1].xyz;
    result += d.z * m.columns[2].xyz;
    return result;
}
static inline simd_float3 VFX_SIMD vfx_transform_normal(simd_float4x4 m, simd_float3 d) {
    return vfx_transform_direction(vfx_inverse_transpose(m), d);
}
static inline simd_float3 VFX_SIMD vfx_transform_position(simd_float4x4 m, simd_float3 p) {
    simd_float3 result = m.columns[3].xyz;
    result += p.x * m.columns[0].xyz;
    result += p.y * m.columns[1].xyz;
    result += p.z * m.columns[2].xyz;
    return result;
}
static inline simd_float3 VFX_SIMD vfx_project_position(simd_float4x4 m, simd_float3 p) {
    simd_float4 result = m.columns[3];
    result += p.x * m.columns[0];
    result += p.y * m.columns[1];
    result += p.z * m.columns[2];
    if (result.w != 0) {
        result /= result.w;
    } else {
        result /= 1e-8;
    }
    return result.xyz;
}


static inline simd_float4x4 VFX_SIMD vfx_make_rotation_around(simd_quatf r, simd_float3 center) {
    simd_float3 tr = vfx_quat_rotate_vector(r, -center);
    return vfx_make_transform(r, vfx_make_float4(tr + center, 1));
}

static inline simd_float3x3 vfx_make_rotation(simd_float3 axis, float angle) {
    axis = vfx_robust_normalize(axis);
    float cs = vfx_cos(angle); float sn = vfx_sin(angle);
    simd_float3 a2 = axis * axis;
    simd_float3 d = (1.f - a2) * cs + a2;
    float ic = 1 - cs;
    float xy = axis.x * axis.y * ic;
    float xz = axis.x * axis.z * ic;
    float yz = axis.y * axis.z * ic;
    simd_float3 as = axis * sn;
    return vfx_float3x3(vfx_make_float3(d.x,  xy - as.z,   xz + as.y),
                        vfx_make_float3(xy + as.z, d.y,    yz - as.x),
                        vfx_make_float3(xz - as.y, yz + as.x,   d.z));
}

static inline simd_float3x3 VFX_SIMD vfx_make_rotation_x(float angle) {
    float cs = vfx_cos(angle); float sn = vfx_sin(angle);
    return vfx_float3x3(vfx_make_float3(1,  0,   0),
                        vfx_make_float3(0, cs, -sn),
                        vfx_make_float3(0, sn,  cs));
}

static inline simd_float3x3 VFX_SIMD vfx_make_rotation_y(float angle) {
    float cs = vfx_cos(angle); float sn = vfx_sin(angle);
    return vfx_float3x3(vfx_make_float3( cs, 0, sn),
                        vfx_make_float3(  0, 1,  0),
                        vfx_make_float3(-sn, 0, cs));
}

static inline simd_float3x3 VFX_SIMD vfx_make_rotation_z(float angle) {
    float cs = vfx_cos(angle); float sn = vfx_sin(angle);
    return vfx_float3x3(vfx_make_float3(cs, -sn, 0),
                        vfx_make_float3(sn,  cs, 0),
                        vfx_make_float3(0,   0,  1));
}

#pragma mark - Masks

#ifndef __METAL_VERSION__
// Creates a 4-bit mask from the most significant bits of the four 32 bits integer values
static inline VFX_SIMD int vfx_reduce_mask(simd_int4 inMask)
{
#if defined(__SSE__)
  return _mm_movemask_ps(inMask);
#else
  return simd_reduce_add((inMask < 0) & (simd_int4){ 0x1, 0x2, 0x4, 0x8 });
#endif
}
#endif

// Should move to vfx_random.h

static inline uint64_t VFX_SIMD vfx_hash_combine64(uint64_t hash, uint64_t v) {
    return hash ^ (v + 0x9e3779b97f4a7c15 + (hash << 6) + (hash >> 2));
}

#if SIZE_MAX == UINT64_MAX
static inline uint64_t VFX_SIMD vfx_hash_combine(uint64_t hash, uint32_t v) {
    return vfx_hash_combine64(hash, (uint64_t)v);
}
#else
static inline uint64_t VFX_SIMD vfx_hash_combine(uint64_t hash, uint64_t v) {
    return vfx_hash_combine64(hash, v);
}
#endif

// Defined for translation to swift Int
static inline uint64_t VFX_SIMD vfx_hash_combine(uint64_t hash, size_t v) {
    return vfx_hash_combine64(hash, (uint64_t)v);
}

static inline uint64_t VFX_SIMD vfx_hash_combine(uint64_t hash, int32_t v) {
    return vfx_hash_combine64(hash, (uint64_t)v);
}
static inline uint64_t VFX_SIMD vfx_hash_combine(uint64_t hash, int64_t v) {
    return vfx_hash_combine64(hash, (uint64_t)v);
}
static inline uint64_t VFX_SIMD vfx_hash_combine(uint64_t hash, int8_t v) {
    return vfx_hash_combine64(hash, (uint64_t)v);
}
static inline uint64_t VFX_SIMD vfx_hash_combine(uint64_t hash, uint8_t v) {
    return vfx_hash_combine64(hash, (uint64_t)v);
}

#pragma mark - Intersect
// TODO vfx_interssect.h

static inline simd_float4 VFX_SIMD vfx_aabb_get_min_w1(vfx_aabb box) { return box.center_w1 - box.half_size_w0; }
static inline simd_float4 VFX_SIMD vfx_aabb_get_max_w1(vfx_aabb box) { return box.center_w1 + box.half_size_w0; }

static inline simd_float3 VFX_SIMD vfx_aabb_get_min(vfx_aabb box) { return vfx_aabb_get_min_w1(box).xyz; }
static inline simd_float3 VFX_SIMD vfx_aabb_get_max(vfx_aabb box) { return vfx_aabb_get_max_w1(box).xyz; }

static inline vfx_aabb VFX_SIMD vfx_aabb_make_from_center_half_size(simd_float4 center_w1, simd_float4 half_size_w0) {
    return (vfx_aabb){ .center_w1 = center_w1, .half_size_w0 = half_size_w0 };
}

static inline vfx_aabb VFX_SIMD vfx_aabb_make(simd_float4 min_w1, simd_float4 max_w1) {
    return (vfx_aabb){
        .center_w1 = (max_w1 + min_w1) * 0.5f, // w = (1 + 1) * 0.5 = 1
        .half_size_w0 = (max_w1 - min_w1) * 0.5f // w = (1 - 1) * 0.5 = 0
    };
}
static inline vfx_aabb VFX_SIMD vfx_aabb_make(simd_float3 min, simd_float3 max) {
    return vfx_aabb_make(vfx_make_float4(min, 1),  vfx_make_float4(max, 1));
}

static inline vfx_aabb VFX_SIMD vfx_transform_aabb(simd_float4x4 m, vfx_aabb b) {
    b.center_w1.xyz = vfx_transform_position(m, b.center_w1.xyz); // center.w is guaranteed to be 1
    simd_float4 h = vfx_abs(m.columns[0] * b.half_size_w0.xxxw)
                  + vfx_abs(m.columns[1] * b.half_size_w0.yyyw)
                  + vfx_abs(m.columns[2] * b.half_size_w0.zzzw); // transform axis (w always contain 0)
    return (vfx_aabb){ b.center_w1, h };
}

static inline vfx_aabb VFX_SIMD vfx_aabb_merge(vfx_aabb a, vfx_aabb b) {
    simd_float4 min = vfx_min(vfx_aabb_get_min_w1(a), vfx_aabb_get_min_w1(b));
    simd_float4 max = vfx_max(vfx_aabb_get_max_w1(a), vfx_aabb_get_max_w1(b));
    return vfx_aabb_make(min, max);
}

static inline vfx_aabb VFX_SIMD vfx_aabb_merge(vfx_aabb a, simd_float4 pos_w1) {
    simd_float4 min = vfx_min(vfx_aabb_get_min_w1(a), pos_w1);
    simd_float4 max = vfx_max(vfx_aabb_get_max_w1(a), pos_w1);
    return vfx_aabb_make(min, max);
}

static inline vfx_aabb VFX_SIMD vfx_aabb_merge(vfx_aabb box, simd_float3 p) {
    return vfx_aabb_merge(box, vfx_make_float4(p, 1));
}

static inline vfx_aabb VFX_SIMD vfx_aabb_expand(vfx_aabb box, simd_float3 offset) {
    return vfx_aabb_make_from_center_half_size(box.center_w1, box.half_size_w0 + vfx_make_float4(offset, 0));
}

static inline bool VFX_SIMD vfx_aabb_contains(vfx_aabb box, simd_float4 p_w1) {
    return vfx_all((vfx_abs(p_w1 - box.center_w1) < box.half_size_w0));
}

static inline bool VFX_SIMD vfx_aabb_contains(vfx_aabb box, simd_float3 p) {
    return vfx_all((vfx_abs(p - box.center_w1.xyz) < box.half_size_w0.xyz));
}

static inline simd_float4 VFX_SIMD vfx_aabb_closest(vfx_aabb box, simd_float4 p_w1) {
    return vfx_min(vfx_aabb_get_max_w1(box), vfx_max(vfx_aabb_get_min_w1(box), p_w1));
}

static inline simd_float3 VFX_SIMD vfx_aabb_closest(vfx_aabb box, simd_float3 p) {
    return vfx_aabb_closest(box, vfx_make_float4(p, 1)).xyz;
}

static inline vfx_aabb VFX_SIMD vfx_aabb_union(vfx_aabb box1, vfx_aabb box2) {
    simd_float4 min_w1 = vfx_min(box1.center_w1 - box1.half_size_w0, box2.center_w1 - box2.half_size_w0);
    simd_float4 max_w1 = vfx_max(box1.center_w1 + box1.half_size_w0, box2.center_w1 + box2.half_size_w0);
    return vfx_aabb_make(min_w1, max_w1);
}

static inline vfx_aabb VFX_SIMD vfx_aabb_intersection(vfx_aabb box1, vfx_aabb box2) {
    simd_float4 min_w1 = vfx_max(box1.center_w1 - box1.half_size_w0, box2.center_w1 - box2.half_size_w0);
    simd_float4 max_w1 = vfx_min(box1.center_w1 + box1.half_size_w0, box2.center_w1 + box2.half_size_w0);
    return vfx_aabb_make(min_w1, max_w1);
}

static inline bool VFX_SIMD vfx_aabb_is_in_positive_half_space(vfx_aabb box, simd_float4 plane) {
    float s = vfx_dot(plane, box.center_w1);
    float r = vfx_dot(box.half_size_w0, vfx_abs(plane));
    return s > r;
}

static inline bool VFX_SIMD vfx_aabb_overlaps_positive_half_space(vfx_aabb box, simd_float4 plane) {
    float s = vfx_dot(plane, box.center_w1);
    float r = vfx_dot(box.half_size_w0, vfx_abs(plane));
    return s > -r;
}

static inline bool VFX_SIMD vfx_aabb_intersects(vfx_aabb box1, vfx_aabb box2) {
    vfx_bool4 overlaps = vfx_abs(box1.center_w1 - box2.center_w1) <= (box1.half_size_w0 + box2.half_size_w0);
    return vfx_all(overlaps.xyz); // only consider xyz since w is irrelevant (and bugs can make him different than 0/1)
}

static inline float VFX_SIMD vfx_aabb_distance_squared(vfx_aabb b, simd_float3 p) {
    return vfx_length_squared(vfx_max(vfx_abs(p - b.center_w1.xyz) - b.half_size_w0.xyz, vfx_float3_zero()));
}

static inline float VFX_SIMD vfx_aabb_distance(vfx_aabb b, simd_float3 p) {
    return vfx_sqrt(vfx_aabb_distance_squared(b, p));
}

static inline void VFX_SIMD_UNPURE vfx_aabb_compute_corners(vfx_aabb box, out simd_float3 *pts) {
    simd_float4 min = vfx_aabb_get_min_w1(box);
    simd_float4 d   = box.half_size_w0 * 2.f;
    
    pts[0] = min.xyz;
    pts[1] = pts[0] + d.xww;
    pts[2] = pts[0] + d.wyw;
    pts[3] = pts[2] + d.xww;
    
    pts[4] = pts[0] + d.wwz;
    pts[5] = pts[1] + d.wwz;
    pts[6] = pts[2] + d.wwz;
    pts[7] = pts[3] + d.wwz;
}

static inline void VFX_SIMD_UNPURE vfx_aabb_compute_corners(vfx_aabb box, out simd_float4 *pts) {
    simd_float4 min = vfx_aabb_get_min_w1(box);
    simd_float4 d   = box.half_size_w0 * 2.f;
    
    pts[0] = min;
    pts[1] = pts[0] + d.xwww;
    pts[2] = pts[0] + d.wyww;
    pts[3] = pts[2] + d.xwww;
    
    pts[4] = pts[0] + d.wwzw;
    pts[5] = pts[1] + d.wwzw;
    pts[6] = pts[2] + d.wwzw;
    pts[7] = pts[3] + d.wwzw;
}

#pragma mark -
// Plane as float4, normal(x, y, z) + d

static inline simd_float4 VFX_SIMD vfx_make_plane(simd_float3 n, simd_float3 p) {
    return vfx_make_float4(n, -vfx_dot(p, n));
}

// this creation is robust: if the triangle is degenerate (2 or 3 vertices at the sampe position)
// this will produce a null plane (0, 0, 0, 0) which will fail every ray test
static inline simd_float4 VFX_SIMD vfx_make_plane(simd_float3 p0, simd_float3 p1, simd_float3 p2) {
    return vfx_make_plane(vfx_robust_normalize(vfx_cross(p1 - p0, p2 - p0)), p0);
}

static inline float VFX_SIMD vfx_plane_distance(simd_float4 plane, simd_float3 p) { return vfx_dot(plane, vfx_make_float4(p, 1)); }

static inline float VFX_SIMD vfx_plane_distance(simd_float4 plane, simd_float4 p_w1) { return vfx_dot(plane, p_w1); }

#pragma mark -
// ray

static inline vfx_ray VFX_SIMD vfx_make_ray(simd_float3 ro, simd_float3 rd) { return (vfx_ray){ vfx_make_float4(ro, 0), vfx_make_float4(rd, 1), vfx_make_float4(1 / rd, vfx_length(rd)) };
}

static inline simd_float3 VFX_SIMD vfx_ray_interpolate(vfx_ray ray, float t) { return (ray.origin + ray.direction * t).xyz; }

// ray - plane intersection
// would return < 0 if behind, after or parallel to the segment
static inline float VFX_SIMD vfx_ray_plane(simd_float3 ro, simd_float3 rd, simd_float4 plane) {
    float f1 = vfx_dot(rd, plane.xyz);
    if (f1 == 0) return -1.f;  // plane and ray are parallel
    float f2 = vfx_dot(ro, plane.xyz) + plane.w;
    return -f2 / f1;
}

static inline float VFX_SIMD vfx_ray_plane(simd_float4 ro_w1, simd_float4 rd_w0, simd_float4 plane) {
    float f1 = vfx_dot(rd_w0, plane);
    if (f1 == 0) return -1.f;  // plane and ray are parallel
    float f2 = vfx_dot(ro_w1, plane);
    return -f2 / f1;
}

static inline float VFX_SIMD vfx_ray_plane_backface_culling(simd_float3 ro, simd_float3 rd, simd_float4 plane) {
    float f1 = vfx_dot(rd, plane.xyz);
    if (f1 >= 0) return -1;  // plane and ray are parallel or in the same direction
    float f2 = vfx_dot(ro, plane.xyz) + plane.w;
    return -f2 / f1;
}

static inline float VFX_SIMD vfx_ray_plane(simd_float3 ro, simd_float3 rd, float max_dist, simd_float4 plane) {
    float t = vfx_ray_plane(ro, rd, plane);
    if (t > max_dist) return -1.f;
    return t;
}

static inline float VFX_SIMD vfx_ray_plane(simd_float4 ro_w1, simd_float4 rd_w0, float max_dist, simd_float4 plane) {
    float t = vfx_ray_plane(ro_w1, rd_w0, plane);
    if (t > max_dist) return -1.f;
    return t;
}

static inline float VFX_SIMD vfx_ray_plane_backface_culling(simd_float3 ro, simd_float3 rd, float max_dist, simd_float4 plane) {
    float t = vfx_ray_plane_backface_culling(ro, rd, plane);
    if (t > max_dist) return -1.f;
    return t;
}

static inline float VFX_SIMD vfx_segment_plane(simd_float3 ro, simd_float3 rd, simd_float4 plane) {
    return vfx_ray_plane(ro, rd, 1.f, plane);
}

static inline float VFX_SIMD vfx_segment_plane(simd_float4 ro_w1, simd_float4 rd_w0, simd_float4 plane) {
    return vfx_ray_plane(ro_w1, rd_w0, 1.f, plane);
}

static inline float VFX_SIMD vfx_segment_plane_backface_culling(simd_float3 ro, simd_float3 rd, simd_float4 plane) {
    return vfx_ray_plane_backface_culling(ro, rd, 1.f, plane);
}

// when we don't care about cross component order, this is faster
static inline simd_float3 VFX_SIMD vfx_cross_yzx(simd_float3 a, simd_float3 b) { return (b * a.yzx - a * b.yzx); }

// 62 inst
// 54 inst with no test on area (triangle need to be valid)
static inline simd_float3 VFX_SIMD vfx_triangle_barycentric_coordinates(simd_float3 a, simd_float3 b, simd_float3 c, simd_float3 p) {
    simd_float3 v0 = a - p;
    simd_float3 v1 = b - p;
    simd_float3 v2 = c - p;

    // The cross product of two vectors has a magnitude
    // equal to twice the area of the triangle formed by
    // the two vectors.
    simd_float3 n = vfx_cross_yzx(b - a, c - a);

    // keep this dot separated (dot_x4 is 1 instruction slower)
    float area = vfx_dot(n, n);
    // if we want to deal with degenerate triangle, we have to add this test
    if (vfx_abs(area) < FLT_MIN)
        return -1.f;

    simd_float3 c0 = vfx_cross_yzx(v1, v2);
    simd_float3 c1 = vfx_cross_yzx(v2, v0);
    simd_float3 c2 = vfx_cross_yzx(v0, v1);

    simd_float3 dp = vfx_dot_x3(c0, n, c1, n, c2, n);
    return dp / area;
}

static inline bool VFX_SIMD vfx_triangle_contains_point(simd_float3 a, simd_float3 b, simd_float3 c, simd_float3 pt) {
    simd_float3 bary = vfx_triangle_barycentric_coordinates(a, b, c, pt);
    return vfx_is_in_01(bary); // Need to check than 0 <= coord <= 1
}

static inline float VFX_SIMD vfx_ray_triangle_intersect(simd_float3 ro, simd_float3 rd, simd_float3 a, simd_float3 b, simd_float3 c) {
    float t = vfx_ray_plane(ro, rd, vfx_make_plane(a, b, c));
    if (t < 0.f) return -1.f;
    if (!vfx_triangle_contains_point(a, b, c, ro + rd * t)) return -1.f;
    return t;
}

static inline float VFX_SIMD vfx_ray_triangle_intersect(simd_float3 ro, simd_float3 rd, float max_dist, simd_float3 a, simd_float3 b, simd_float3 c) {
    float t = vfx_ray_plane(ro, rd, max_dist, vfx_make_plane(a, b, c));
    if (t < 0.f) return -1.f;
    if (!vfx_triangle_contains_point(a, b, c, ro + rd * t)) return -1.f;
    return t;
}

// rd does need to be normalized, but will be dependent of rd length. So can't really compare....
static inline float VFX_SIMD vfx_segment_triangle_intersect(simd_float3 ro, simd_float3 rd, simd_float3 a, simd_float3 b, simd_float3 c) {
    return vfx_ray_triangle_intersect(ro, rd, 1.f, a, b, c);
}

static inline bool VFX_SIMD_UNPURE vfx_ray_triangle_intersect(simd_float3 ro, simd_float3 rd, simd_float3 a, simd_float3 b, simd_float3 c, out simd_float3* o_pt, out simd_float3* o_bary) {
    float t = vfx_ray_plane(ro, rd, vfx_make_plane(a, b, c));
    if (t < 0.f) return false;
    
    simd_float3 pt = ro + rd * t;
    simd_float3 bary = vfx_triangle_barycentric_coordinates(a, b, c, pt);
    if (!vfx_is_in_01(bary)) return false;

    *o_pt = pt;
    *o_bary = bary;
    return true;
}

// test a box centered on zero
static inline simd_float2 VFX_SIMD_UNPURE vfx_ray_box(simd_float3 ro, simd_float3 rd, simd_float3 rad, out simd_float3* oNrm)
{
    simd_float3 m = 1.0 / rd;
    simd_float3 n = m * ro;
    simd_float3 k = vfx_abs(m) * rad;
    simd_float3 t1 = -n - k;
    simd_float3 t2 = -n + k;

    float tN = vfx_reduce_max(t1);
    float tF = vfx_reduce_min(t2);
    
    if( tN>tF || tF<0.0) return (simd_float2)(-1.0); // no intersection

    // the two steps are a 'clever' way to find the maximum component and set it to 1 (others are set to 0)
    // the last select is a hack to deal with NaN taht can be part of t1 (and thus providing multiple 1 in the previous steps)
    *oNrm = -vfx_sign_fast(rd) * vfx_step(t1.yzx, t1.xyz) * vfx_step(t1.zxy, t1.xyz) * vfx_select(vfx_float3_zero(), vfx_float3_one(), t1 == t1);
    return (simd_float2){ tN, tF };
}

static inline bool VFX_SIMD vfx_ray_box(vfx_ray ray, vfx_aabb box)
{
    simd_float4 bboxmin = vfx_aabb_get_min_w1(box);
    simd_float4 bboxmax = vfx_aabb_get_max_w1(box);
    
    // faster but not cross platform : need simd_recip to work!!!!
    // warning : this will always introduce a NaN in .w, + others if ray origin is on the box edge
    // we should maybe add an epsilon (signed)
    simd_float3 t1 = ((bboxmin - ray.origin) * ray.invdir_length).xyz;
    simd_float3 t2 = ((bboxmax - ray.origin) * ray.invdir_length).xyz;
    
    simd_float3 tmin1 = vfx_min(t1, t2);
    simd_float3 tmax1 = vfx_max(t1, t2);
    
    float tmin = vfx_reduce_max(tmin1.xyz);
    float tmax = vfx_reduce_min(tmax1.xyz);
    
    tmin = vfx_max(tmin, 0.f); // needed? should be rayMin
    //tmin = (tmin >= *rayMin) ? tmin : *rayMin;
    
    // with start and stop distance along ray
    //    return tmax >= std::max(ray.m_min, tmin) && tmin < ray.m_max;
    if (tmax >= tmin && tmin < ray.invdir_length.w) {
        return true;
    }
    return false;
}

// returns -1 if no hit
static inline simd_float2 VFX_SIMD vfx_ray_box_intersect(vfx_ray ray, vfx_aabb box)
{
    simd_float4 bboxmin = vfx_aabb_get_min_w1(box);
    simd_float4 bboxmax = vfx_aabb_get_max_w1(box);
    
    // faster but not cross platform : need simd_recip to work!!!!
    // warning : this will always introduce a NaN in .w, + others if ray origin is on the box edge
    // we should maybe add an epsilon (signed)
    simd_float3 t1 = ((bboxmin - ray.origin) * ray.invdir_length).xyz;
    simd_float3 t2 = ((bboxmax - ray.origin) * ray.invdir_length).xyz;
    
    simd_float3 tmin1 = vfx_min(t1, t2);
    simd_float3 tmax1 = vfx_max(t1, t2);
    
    float tmin = vfx_reduce_max(tmin1.xyz);
    float tmax = vfx_reduce_min(tmax1.xyz);
    
    // tmin = (tmin >= *rayMin) ? tmin : *rayMin;
    
    // with start and stop distance along ray
    //    return tmax >= std::max(ray.m_min, tmin) && tmin < ray.m_max;
    if (tmax >= tmin && tmin < ray.invdir_length.w) {
        return (simd_float2){ tmin, tmax };
    }
    return (simd_float2){ -1, -1 };
}

#pragma mark rounded box

// normal of a rounded box
static inline simd_float3 VFX_SIMD vfx_rounded_box_normal(simd_float3 pos, simd_float3 siz) {
    return vfx_sign(pos) * vfx_normalize(vfx_max(vfx_abs(pos) - siz, 0.0));
}

static inline float VFX_SIMD_UNPURE vfx_rounded_box_ray(simd_float3 ro, simd_float3 rd, simd_float3 size, float rad, out simd_float3* normal) {
    // bounding box
    simd_float3 m = 1.0 / rd;
    simd_float3 n = m * ro;
    simd_float3 k = vfx_abs(m) * size;
    simd_float3 t1 = -n - k;
    simd_float3 t2 = -n + k;

    float tN = vfx_reduce_max(t1);
    float tF = vfx_reduce_min(t2);
    if (tN > tF || tF < 0.0) return -1.f; // no intersection

    float t = tN;
    
    // Parametrize?
    const float minDistance = 0.f;
    const float maxDistance = 1.f;
//    float t = (tN >= minDistance && tN <= maxDistance) ? tN
//    :         (tF >= minDistance && tF <= maxDistance) ? tF : -1;

    // convert to first octant
    simd_float3 pos = ro+t*rd;
    simd_float3 s = vfx_sign(pos);
    ro  *= s;
    rd  *= s;
    pos *= s;
    rad = vfx_min(rad, vfx_reduce_min(size));
    size -= rad;
        
    // faces
    pos -= size;
    pos = vfx_max( pos.xyz, pos.yzx );
    if (vfx_reduce_min(pos) < 0.0) {
        if (t >= minDistance && t <= maxDistance) {
            *normal = vfx_rounded_box_normal(ro * s + rd * t, size);
            return t;
        }
    }
    
    // some precomputation
    simd_float3 oc = ro - size;
    simd_float3 dd = rd*rd;
    simd_float3 oo = oc*oc;
    simd_float3 od = oc*rd;
    float ra2 = rad*rad;

    t = 1e10;

    // corner
    {
        float b = od.x + od.y + od.z;
        float c = oo.x + oo.y + oo.z - ra2;
        float h = b*b - c;
        if (h > 0.0) t = -b-sqrt(h);
    }
    // edge X
    {
        float a = dd.y + dd.z;
        float b = od.y + od.z;
        float c = oo.y + oo.z - ra2;
        float h = b*b - a*c;
        if (h>0.0) {
            h = (-b-sqrt(h))/a;
            if (h >= minDistance && h<t && vfx_abs(ro.x+rd.x*h)<size.x ) t = h;
        }
    }
    // edge Y
    {
        float a = dd.z + dd.x;
        float b = od.z + od.x;
        float c = oo.z + oo.x - ra2;
        float h = b*b - a*c;
        if (h>0.0) {
            h = (-b-sqrt(h))/a;
            if (h >= minDistance && h<t && vfx_abs(ro.y+rd.y*h)<size.y) t = h;
        }
    }
    // edge Z
    {
        float a = dd.x + dd.y;
        float b = od.x + od.y;
        float c = oo.x + oo.y - ra2;
        float h = b*b - a*c;
        if (h>0.0) {
            h = (-b-sqrt(h))/a;
            if (h>=minDistance && h<t && vfx_abs(ro.z+rd.z*h)<size.z) t = h;
        }
    }
    
    if (t >= minDistance && t <= maxDistance) {
        *normal = vfx_rounded_box_normal(ro*s + rd * t, size);
        return t;
    } else {
        return -1.f;
    };
}

static inline void VFX_SIMD_UNPURE vfx_collide(device_out simd_float3* position, device_out simd_float3* velocity, simd_float3 collisionPosition, simd_float3 collisionNormal, float elasticity, float friction, simd_float3 collider_velocity, float dt, float t)
{
    // OPTIM version withoput the collider velocity (for static colliders)
    simd_float3 v = *velocity + collider_velocity;
    float projVelocity = vfx_dot(collisionNormal, v);
    
    simd_float3 normalVelocity = projVelocity * collisionNormal;
    simd_float3 tangentVelocity = v - normalVelocity;
    
    if (projVelocity < 0) {
        velocity->xyz = -elasticity * normalVelocity;
        velocity->xyz += friction * tangentVelocity;
        
        // for precision issues, always put pack the position on top of the collisionPosition
        // with a collision margin
        float collisionMargin = 0.0001f;
        position->xyz = collisionPosition + collisionNormal * collisionMargin;
        
        // we need to apply the collision impact right away
        // otherwise sliding won't work well (integrate is already done)
        position->xyz += velocity->xyz * (dt * (1 - t));
    }
}

// hash / random

// https://www.pcg-random.org/
static inline uint32_t VFX_SIMD vfx_hash_pcg(uint32_t v) {
    uint32_t state = v * 747796405u + 2891336453u;
    uint32_t word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
    return (word >> 22u) ^ word;
}

static inline uint32_t vfx_rotl(uint32_t x, int k) {
    return (x << k) | (x >> (32 - k));
}

// xoshiro32*

static inline uint32_t vfx_xoshiro32_next(out vfx_xoshiro32_state* state) {
    const uint32_t s0 = state->state[0];
    uint32_t s1 = state->state[1];
    const uint32_t result = s0 * 0x9E3779BB;
    
    s1 ^= s0;
    state->state[0] = vfx_rotl(s0, 26) ^ s1 ^ (s1 << 9); // a, b
    state->state[1] = vfx_rotl(s1, 13); // c
    return result;
}


static inline float vfx_random01(uint32_t index) {
    // this should start at the seed and be incremented at each generation
    // this will not take into account the number of intermediary rand() we ask
    // index could be initialized to gen_count + index * 100 and passed as &
    // to random01 which will increment it
    uint32_t u = 0x7Fu << 23 | vfx_hash_pcg(index) >> 9;
    // convert int32 to float in [0..1]
    // only generates all dyadic rationals of the form k / 2^-23 equally
#ifdef __METAL_VERSION__
    return as_type<float>(u) - 1.f;
#else
    return *((float *)(&u)) - 1.f;
#endif
}

static inline simd_float2 vfx_random01_float2(uint32_t index) {
    return vfx_make_float2(vfx_random01(index), vfx_random01(index + 1));
}
static inline simd_float3 vfx_random01_float3(uint32_t index) {
    return vfx_make_float3(vfx_random01(index), vfx_random01(index + 1), vfx_random01(index + 2));
}
static inline simd_float4 vfx_random01_float4(uint32_t index) {
    return vfx_make_float4(vfx_random01(index), vfx_random01(index + 1), vfx_random01(index + 2), vfx_random01(index + 3));
}

// shape generators

#pragma mark Sphere

static inline simd_float3 VFX_SIMD vfx_point_on_sphere(simd_float2 uv, float min_angle, float max_angle) {
    float y = 1.f - uv.y * 2.f;
    float r = sqrt(1.f - y * y);
    float Θ = vfx_mix(min_angle, max_angle, uv.x);
    return vfx_make_float3(r * cos(Θ), y, r * sin(Θ));
}

static inline simd_float3 VFX_SIMD vfx_point_on_sphere(simd_float2 uv) {
    return vfx_point_on_sphere(uv, 0, VFX_2PI);
}

static inline simd_float3 VFX_SIMD vfx_point_on_sphere_grid(simd_float2 uv, float min_angle, float max_angle) {
    float Θ = uv.x * (max_angle - min_angle) + min_angle;
    float phi = (1 - uv.y) * VFX_PI;
    float s = fmax(sin(phi), 0.0000001); // avoid the singularity where all the points are the same at the pole
    return vfx_make_float3(s * cos(Θ), cos(phi), s * sin(Θ));
}

static inline simd_float3 VFX_SIMD vfx_point_in_sphere(simd_float3 uv, float min_angle, float max_angle) {
    return vfx_point_on_sphere(uv.xy, min_angle, max_angle) * vfx_cbrt(uv.z);
}

static inline bool VFX_SIMD vfx_range_contains(float lower_bound, float upper_bound, float v) {
    return (v >= lower_bound) && (v < upper_bound);
}

static inline bool VFX_SIMD vfx_is_point_in_unit_sphere(simd_float3 pos, float min_angle, float max_angle) {
    if (vfx_length_squared(pos) > 1) return false;
    float angle = vfx_atan2(pos.z, pos.x) + VFX_PI;
    return vfx_range_contains(min_angle, max_angle, angle);
}

#pragma mark Box

// X: [0..1], Y: [0..1], Z: [0..6]
static inline simd_float3 VFX_SIMD vfx_point_on_box(simd_float3 uv) {
    switch ((int)uv.z) {
    case 0: // +X
        return vfx_muladd(vfx_make_float3(1, uv.x, uv.y), 2, -1);
    case 1: // -X
        return vfx_muladd(vfx_make_float3(0, uv.x, uv.y), 2, -1);
    case 2: // +Y
        return vfx_muladd(vfx_make_float3(uv.x, 1, uv.y), 2, -1);
    case 3: // -Y
        return vfx_muladd(vfx_make_float3(uv.x, 0, uv.y), 2, -1);
    case 4: // +X
        return vfx_muladd(vfx_make_float3(uv.x, uv.y, 1), 2, -1);
    default: // -Z
        return vfx_muladd(vfx_make_float3(uv.x, uv.y, 0), 2, -1);
    }
}

static inline simd_float3 VFX_SIMD vfx_point_on_box(simd_float2 uv) {
    uv.x *= 6;
    float face = vfx_trunc(uv.x);
    uv.x -= face;
    simd_float3 uv3 = vfx_make_float3(uv.x, uv.y, face);
    return vfx_point_on_box(uv3);
}

static inline simd_float3 VFX_SIMD vfx_point_in_box(simd_float3 uv) {
    return uv * 2 - 1;
}

// given a point inside a unit box [-1..1] will return a point on the surface of the box
// -> triplanar projection
static inline simd_float3 VFX_SIMD vfx_box_project(simd_float3 pt) {
    switch (vfx_max_index(vfx_abs(pt))) {
        case 0: pt.x = vfx_sign(pt.x); break;
        case 1: pt.y = vfx_sign(pt.y); break;
        case 2: pt.z = vfx_sign(pt.z); break;
    }
    return pt;
}

#pragma mark Plane

static inline simd_float3 VFX_SIMD vfx_point_on_plane(simd_float2 uv) {
    return vfx_uv_to_plane_xz(uv);
}

#pragma mark Cylinder

static inline simd_float3 VFX_SIMD vfx_point_on_cylinder(simd_float2 uv, float min_angle, float max_angle) {
    float Θ = vfx_mix(min_angle, max_angle, uv.x);
    float y = 1 - 2 * uv.y;
    return vfx_make_float3(cos(Θ), y, sin(Θ));
}

static inline simd_float3 VFX_SIMD vfx_point_on_cylinder(simd_float2 uv) {
    return vfx_point_on_cylinder(uv, 0, VFX_2PI);
}

static inline simd_float3 VFX_SIMD vfx_point_in_cylinder(simd_float3 uv, float min_angle, float max_angle) {
    float Θ = vfx_mix(min_angle, max_angle, uv.x);
    float y = 1 - 2 * uv.y;
    float r = uv.z;
    return vfx_make_float3(r * cos(Θ), y, r * sin(Θ));
}

static inline simd_float3 VFX_SIMD vfx_point_in_cylinder(simd_float3 uv) {
    return vfx_point_in_cylinder(uv, 0, VFX_2PI);
}

#pragma mark Torus

static inline simd_float3 VFX_SIMD vfx_point_on_torus(simd_float2 uv, float radius, float min_angle, float max_angle, out simd_float3 *nrm) {
    float Θ = vfx_mix(min_angle, max_angle, uv.x);
    float cosΘ = vfx_cos(Θ); float sinΘ = vfx_sin(Θ);
    float Φ = uv.y * VFX_2PI;
    float cosΦ = vfx_cos(Φ); float sinΦ = vfx_sin(Φ);
    simd_float3 pos = vfx_make_float3((1 + radius * cosΘ) * cosΦ, (1 + radius * cosΘ) * sinΦ, radius * sinΘ);
    simd_float3 axis = vfx_make_float3(cosΦ, sinΦ, 0);
    *nrm = vfx_robust_normalize(pos - axis);
    return pos;
}

static inline simd_float3 VFX_SIMD vfx_point_in_torus(simd_float3 uv, float radius, float min_angle, float max_angle, out simd_float3 *nrm) {
    float Θ = vfx_mix(min_angle, max_angle, uv.x);
    float cosΘ = vfx_cos(Θ); float sinΘ = vfx_sin(Θ);
    float Φ = uv.y * VFX_2PI;
    float cosΦ = vfx_cos(Φ); float sinΦ = vfx_sin(Φ);
    float r = radius * uv.z;
    simd_float3 pos = vfx_make_float3((1 + r * cosΘ) * cosΦ, (1 + r * cosΘ) * sinΦ, r * sinΘ);
    simd_float3 axis = vfx_make_float3(cosΦ, sinΦ, 0);
    *nrm = vfx_robust_normalize(pos - axis);
    return pos;
}

#pragma mark Cone

static inline simd_float3 VFX_SIMD vfx_point_on_cone(simd_float2 uv, bool uniform, float min_angle, float max_angle, out simd_float3 *nrm) {
    float Θ = vfx_mix(min_angle, max_angle, uv.x);
    float cosΘ = vfx_cos(Θ); float sinΘ = vfx_sin(Θ);
    float r = uniform ? uv.y : sqrt(uv.y);
    float h = 1 - 2 * r;
    *nrm = vfx_robust_normalize(vfx_make_float3(cosΘ, 0.5, sinΘ));
    return vfx_make_float3(r * cosΘ, h, r * sinΘ);
}

static inline simd_float3 VFX_SIMD vfx_point_in_cone(simd_float3 uv, bool uniform, float min_angle, float max_angle, out simd_float3 *nrm) {
    float Θ = vfx_mix(min_angle, max_angle, uv.x);
    float cosΘ = vfx_cos(Θ); float sinΘ = vfx_sin(Θ);
    float h = uniform ? uv.y : sqrt(uv.y);
    float r = h * uv.z;
    *nrm = vfx_robust_normalize(vfx_make_float3(cosΘ, 0.5, sinΘ));
    return vfx_make_float3(r * cosΘ, h, r * sinΘ);
}

// grid distribution

// precondition: grid_dim > 1
static inline simd_float2 VFX_SIMD vfx_grid_2D(uint32_t index, simd_float2 grid_dim) {
    simd_float2 inv_dim = 1 / grid_dim;
    simd_float2 scale = grid_dim / (grid_dim - 1);
    float s = index;
    float t = s * inv_dim.x;
    float x = vfx_fract(t);
    float y = vfx_fract((t - x) * inv_dim.y);
    return vfx_make_float2(x, y) * scale;
}

// precondition: grid_dim > 1
static inline simd_float2 VFX_SIMD vfx_grid_2D_edges(uint32_t index, simd_float2 grid_dim) {
    simd_float2 dim = vfx_max(1, grid_dim - 1);
    float endEdge0 = dim.x;
    float endEdge1 = endEdge0 + dim.y;
    float endEdge2 = endEdge1 + endEdge0;
    simd_float2 inv_dim = 1 / dim;
    float i = index;
    if (index < endEdge0) {
        float x = vfx_fract(i * inv_dim.x);
        return vfx_make_float2(x, 0);
    } else if (i < endEdge1) {
        float y = vfx_fract((i - endEdge0) * inv_dim.y);
        return vfx_make_float2(1, y);
    } else if (i < endEdge2) {
        float x = vfx_fract((i - endEdge1) * inv_dim.x);
        return vfx_make_float2(1 - x, 1);
    } else  { // in edge 3
        float y = vfx_fract((i - endEdge2) * inv_dim.y);
        return vfx_make_float2(0, 1 - y);
    }
}

static inline simd_float3 VFX_SIMD vfx_grid_3D(uint32_t index, simd_float3 grid_dim) {
    simd_float3 inv_dim = 1 / grid_dim;
    simd_float3 scale = grid_dim / vfx_max(1.f, grid_dim - 1.f);
    float tx = index * inv_dim.x;
    float x  = vfx_fract(tx);
    float ty = (tx - x) * inv_dim.y;
    float y  = vfx_fract(ty);
    float tz = (ty - y) * inv_dim.z;
    float z  = vfx_fract(tz);
    return vfx_make_float3(x, y, z) * scale;
}

// TODO output uv too ?
static inline simd_float3 VFX_SIMD vfx_grid_3D_surface(uint32_t index, simd_float3 grid_dim) {
    simd_float3 dim = vfx_max(grid_dim, vfx_splat3(2));
    simd_int3 idim = vfx_convert_int3(dim);
    // like the volume, but without the interior
    uint32_t zFaceCount = idim.x * idim.y;
    uint32_t interiorCount = 2 * (idim.x - 1) + 2 * (idim.y - 1);
    uint32_t totalCount = 2 * zFaceCount + (idim.z - 2) * interiorCount;
    uint32_t startLastZFaceCount = totalCount - zFaceCount;

    uint32_t i = index % totalCount;
    if (i < zFaceCount) { // -Z
        simd_float2 uv = vfx_grid_2D(i, dim.xy);
        // TODO output uv too ?
        return vfx_make_float3(uv, 0);
    } else if (i < startLastZFaceCount) { // interiors
        int slice = (i - zFaceCount) / interiorCount;
        int indexInSlice = (i - zFaceCount) - slice * interiorCount;
        simd_float2 uv = vfx_grid_2D_edges(indexInSlice, dim.xy);
        float z = (float)(slice + 1) / (float)(dim.z - 1);
        return vfx_make_float3(uv, z);
    } else { // +Z
        simd_float2 uv = vfx_grid_2D(i - startLastZFaceCount, dim.xy);
        return vfx_make_float3(uv, 1);
    }
}

// spread distribution
// uv contains 2 random numbers in [0..1]
// nrm is the normal around which the spreading occurs

static inline vfx_int_range VFX_SIMD vfx_make_int_range(size_t lo, size_t hi) { return (vfx_int_range){ lo, hi }; }
static inline vfx_float_range VFX_SIMD vfx_make_float_range(float lo, float hi) { return (vfx_float_range){ lo, hi }; }

static inline bool vfx_range_is_empty(vfx_float_range range) {
    return range.lower_bound == range.upper_bound;
}

// t must be [0..1]
static inline float vfx_range_interpolate(vfx_float_range range, float t) {
    return range.lower_bound + (range.upper_bound - range.lower_bound) * t;
}

static inline simd_float3 VFX_SIMD vfx_spreading_fast(simd_float2 uv, simd_float3 nrm, vfx_float_range cos_angles) {
    float cosTheta = 1 - vfx_mix(cos_angles.lower_bound, cos_angles.upper_bound, uv.x);
    float sinTheta = sqrt(1 - cosTheta * cosTheta);
    float phi = uv.y * VFX_2PI;
    simd_float3 u, v;
    vfx_orthonormal_basis(nrm, &u, &v);
    simd_float3 res = nrm * cosTheta;
    res =  vfx_muladd(u, cos(phi) * sinTheta, res);
    return vfx_muladd(v, sin(phi) * sinTheta, res);
}

static inline vfx_float_range VFX_SIMD vfx_spreading_prepare(float min_angle, float max_angle) {
    float a = (1 - cos(vfx_clamp(max_angle, 0, VFX_PI)));
    float b = (1 - cos(vfx_clamp(min_angle, 0, VFX_PI)));
    return (vfx_float_range){ a, b };
}

static inline simd_float3 VFX_SIMD vfx_spreading(simd_float2 uv, simd_float3 nrm, float min_angle, float max_angle) {
    return vfx_spreading_fast(uv, nrm, vfx_spreading_prepare(min_angle, max_angle));
}

// scale bias

static inline vfx_scale_bias VFX_SIMD vfx_make_scale_bias(float start, float end) { return (vfx_scale_bias){ 1.f / (end - start), -start / (end - start) }; }
static inline vfx_scale_bias VFX_SIMD vfx_make_scale_bias(vfx_float_range range) { return vfx_make_scale_bias(range.lower_bound, range.upper_bound); }
static inline float VFX_SIMD vfx_apply(float x, vfx_scale_bias scale_bias) { return vfx_muladd(x, scale_bias.scale, scale_bias.bias); }
static inline float VFX_SIMD vfx_apply_saturate(float x, vfx_scale_bias scale_bias) { return vfx_saturate(vfx_muladd(x, scale_bias.scale, scale_bias.bias)); }



#undef simd_bitselect

static inline vfx_packed_float2 VFX_SIMD vfx_pack(simd_float2 a) { return (vfx_packed_float2){ a.x, a.y }; }
static inline vfx_packed_float3 VFX_SIMD vfx_pack(simd_float3 a) { return (vfx_packed_float3){ a.x, a.y, a.z }; }
static inline vfx_packed_float4 VFX_SIMD vfx_pack(simd_float4 a) { return (vfx_packed_float4){ a.x, a.y, a.z, a.w }; }

static inline simd_float2 VFX_SIMD vfx_unpack(vfx_packed_float2 a) { return vfx_make_float2(a.x, a.y ); }
static inline simd_float3 VFX_SIMD vfx_unpack(vfx_packed_float3 a) { return vfx_make_float3(a.x, a.y, a.z ); }
static inline simd_float4 VFX_SIMD vfx_unpack(vfx_packed_float4 a) { return vfx_make_float4(a.x, a.y, a.z, a.w ); }

#ifndef __METAL_VERSION__

// These are dummy functions only there to cope with bad Swift debug code

static inline simd_float4 VFX_SIMD vfx_add(simd_float4 a, simd_float4 b) { return a + b; }
static inline simd_float3 VFX_SIMD vfx_add(simd_float3 a, simd_float3 b) { return a + b; }
static inline simd_float2 VFX_SIMD vfx_add(simd_float2 a, simd_float2 b) { return a + b; }
static inline simd_float4 VFX_SIMD vfx_add(simd_float4 a, float b)       { return a + b; }
static inline simd_float3 VFX_SIMD vfx_add(simd_float3 a, float b)       { return a + b; }
static inline simd_float2 VFX_SIMD vfx_add(simd_float2 a, float b)       { return a + b; }
static inline simd_float4 VFX_SIMD vfx_add(float a, simd_float4 b)       { return a + b; }
static inline simd_float3 VFX_SIMD vfx_add(float a, simd_float3 b)       { return a + b; }
static inline simd_float2 VFX_SIMD vfx_add(float a, simd_float2 b)       { return a + b; }

static inline simd_float4 VFX_SIMD vfx_sub(simd_float4 a, simd_float4 b) { return a - b; }
static inline simd_float3 VFX_SIMD vfx_sub(simd_float3 a, simd_float3 b) { return a - b; }
static inline simd_float2 VFX_SIMD vfx_sub(simd_float2 a, simd_float2 b) { return a - b; }
static inline simd_float4 VFX_SIMD vfx_sub(simd_float4 a, float b)       { return a - b; }
static inline simd_float3 VFX_SIMD vfx_sub(simd_float3 a, float b)       { return a - b; }
static inline simd_float2 VFX_SIMD vfx_sub(simd_float2 a, float b)       { return a - b; }
static inline simd_float4 VFX_SIMD vfx_sub(float a, simd_float4 b)       { return a - b; }
static inline simd_float3 VFX_SIMD vfx_sub(float a, simd_float3 b)       { return a - b; }
static inline simd_float2 VFX_SIMD vfx_sub(float a, simd_float2 b)       { return a - b; }

static inline simd_float4 VFX_SIMD vfx_mul(simd_float4 a, simd_float4 b) { return a * b; }
static inline simd_float3 VFX_SIMD vfx_mul(simd_float3 a, simd_float3 b) { return a * b; }
static inline simd_float2 VFX_SIMD vfx_mul(simd_float2 a, simd_float2 b) { return a * b; }
static inline simd_float4 VFX_SIMD vfx_mul(simd_float4 a, float b)       { return a * b; }
static inline simd_float3 VFX_SIMD vfx_mul(simd_float3 a, float b)       { return a * b; }
static inline simd_float2 VFX_SIMD vfx_mul(simd_float2 a, float b)       { return a * b; }
static inline simd_float4 VFX_SIMD vfx_mul(float a, simd_float4 b)       { return a * b; }
static inline simd_float3 VFX_SIMD vfx_mul(float a, simd_float3 b)       { return a * b; }
static inline simd_float2 VFX_SIMD vfx_mul(float a, simd_float2 b)       { return a * b; }

static inline simd_float4 VFX_SIMD vfx_div(simd_float4 a, simd_float4 b) { return a / b; }
static inline simd_float3 VFX_SIMD vfx_div(simd_float3 a, simd_float3 b) { return a / b; }
static inline simd_float2 VFX_SIMD vfx_div(simd_float2 a, simd_float2 b) { return a / b; }
static inline simd_float4 VFX_SIMD vfx_div(simd_float4 a, float b)       { return a / b; }
static inline simd_float3 VFX_SIMD vfx_div(simd_float3 a, float b)       { return a / b; }
static inline simd_float2 VFX_SIMD vfx_div(simd_float2 a, float b)       { return a / b; }
static inline simd_float4 VFX_SIMD vfx_div(float a, simd_float4 b)       { return a / b; }
static inline simd_float3 VFX_SIMD vfx_div(float a, simd_float3 b)       { return a / b; }
static inline simd_float2 VFX_SIMD vfx_div(float a, simd_float2 b)       { return a / b; }

#endif

#undef out
#undef device_out

NS_ASSUME_NONNULL_END
// MARK: - vfx_convert.h


NS_ASSUME_NONNULL_BEGIN

#ifndef __METAL_VERSION__

// Unaligned Load API
// not needed for now in Metal

static inline simd_float2 VFX_SIMD vfx_unaligned_load_float2(const void *ptr) {
    const float *f = (const float *)ptr;
    return (simd_float2){ f[0], f[1] };
}
static inline simd_float3 VFX_SIMD vfx_unaligned_load_float3(const void *ptr) {
    const float *f = (const float *)ptr;
    return (simd_float3){ f[0], f[1], f[2] };
}
static inline simd_float4 VFX_SIMD vfx_unaligned_load_float4(const void *ptr) {
    const float *f = (const float *)ptr;
    return (simd_float4){ f[0], f[1], f[2], f[3] };
}

#endif

// Pack/Unpack API

// Half

#ifndef __METAL_VERSION__

// halfx are natively supported in metal, so no need for conversions

static inline uint16_t __to_half(float x)
{
    union {uint32_t i; float f;} u;
    u.f = x; uint32_t xi = u.i;
    uint16_t sign = (xi >> 16) & 0x8000;
    int exp = ((xi >> 23) & 0xff) - 127 + 15;
    if (exp > 0 && exp < 31)                        /* regular number */
        return sign | (exp << 10) | ((xi >> 13) & 0x3ff);
    else if (exp <= 0)                                /* zero, denorm, small exp */
        return sign;
    else if (exp == 128 + 15)                        /* infinity, nan */
        return sign | 0x7c00 | ((xi & 0x7fffff) != 0);
    else                                                 /* large exp */
        return sign | 0x7bff;
}

static inline float __from_half(uint16_t xs)
{
    uint32_t x = xs;
    uint32_t exp = (x >> 10) & 0x1f;
    if (exp > 0 && exp < 31)
        exp = ((exp - 15 + 127) << 23);
    else if (!(exp < 31))
        exp = 0x7f800000;
    union {uint32_t i; float f;} u;
    u.i = (((x & 0x8000) << 16)           /* sign */
           | exp                          /* exponent */
           | ((x & 0x3ff) << 13)          /* replicated mantissa */
           | ((x & 0x3ff) << 3)
           | ((x & 0x3ff) >> 7));
    return u.f;
}

static inline simd_short4 vfx_pack_float_to_half(simd_float4 x) {
    return (simd_short4){(short)__to_half(x.x), (short)__to_half(x.y),
        (short)__to_half(x.z), (short)__to_half(x.w) };
}

// only the 2 low bytes of each int are used
static inline simd_float4 VFX_SIMD vfx_unpack_half4_to_float(simd_int4 v) {
    const simd_int4 mask_s = vfx_convert_int4((simd_ushort4)(0x8000));
    const simd_int4 mask_m = vfx_convert_int4((simd_ushort4)(0x03FF));
    const simd_int4 mask_e = vfx_convert_int4((simd_ushort4)(0x7C00));
    const simd_int4 bias_e = (simd_int4)(0x0001C000);
    simd_int4 s = v & mask_s;
    simd_int4 m = v & mask_m;
    simd_int4 e = (v & mask_e) + bias_e;
    simd_int4 r = ((s << 16) | (m << 13) | (e << 13));
    return (simd_float4)r;
}

static inline simd_float4 VFX_SIMD vfx_unpack_half4_to_float(simd_ushort4 n) {
    return vfx_unpack_half4_to_float(vfx_convert_int4(n));
}

static inline simd_float4 VFX_SIMD vfx_unpack_half4_to_float(const uint16_t *ptr) {
    return vfx_unpack_half4_to_float((simd_int4){ ptr[0], ptr[1], ptr[2], ptr[3] });
}

static inline float VFX_SIMD vfx_unpack_half_to_float(const uint16_t *ptr) {
    return __from_half(*ptr);
}

static inline void vfx_pack_float_to_half1(simd_float4 x, uint16_t *ptr) {
    ptr[0] = __to_half(x.x);
}

static inline void vfx_pack_float_to_half2(simd_float4 x, uint16_t *ptr) {
    ptr[0] = __to_half(x.x); ptr[1] = __to_half(x.y);
}

static inline void vfx_pack_float_to_half3(simd_float4 x, uint16_t *ptr) {
    ptr[0] = __to_half(x.x); ptr[1] = __to_half(x.y);
    ptr[2] = __to_half(x.z);
}

static inline void vfx_pack_float_to_half4(simd_float4 x, uint16_t *ptr) {
    ptr[0] = __to_half(x.x); ptr[1] = __to_half(x.y);
    ptr[2] = __to_half(x.z); ptr[3] = __to_half(x.w);
}

static inline vfx_packed_half2 VFX_SIMD vfx_pack_float2_to_half2(simd_float2 x) {
    return (vfx_packed_half2){ .x = __to_half(x.x), .y = __to_half(x.y) };
}

static inline vfx_packed_half3 VFX_SIMD vfx_pack_float3_to_half3(simd_float3 x) {
    return (vfx_packed_half3){ .x = __to_half(x.x), .y = __to_half(x.y), .z = __to_half(x.z) };
}

static inline vfx_packed_half4 VFX_SIMD vfx_pack_float4_to_half4(simd_float4 x) {
    return (vfx_packed_half4){ .x = __to_half(x.x), .y = __to_half(x.y), .z = __to_half(x.z), .w = __to_half(x.w) };
}

static inline simd_float4 VFX_SIMD vfx_unpack_half4_to_float4(vfx_packed_half4 p) {
    return vfx_unpack_half4_to_float((simd_int4){ p.x, p.y, p.z, p.w });
}

#endif

// 8unorm

static inline float vfx_unpack_unorm8_to_float(uint8_t c) {
    float scale =  1 / 255.f;
    return c * scale;
}

// 8888 Format

static inline simd_float4 vfx_unpack_unorm4x8_to_float(uint32_t n) {
    const simd_float4 scale = { 1 / 255.f, 1 / 255.f, 1 / 255.f, 1 / 255.f };
    const simd_uint4 shift = { 0, 8, 16, 24 };
    const simd_uint4 mask = ( 0xff );

    simd_uint4 vn = ( n );
    simd_uint4 vi = (vn >> shift) & mask;

    simd_float4 f = vfx_convert_float4(vi);
    return f * scale;
}

static inline uint32_t vfx_pack_float_to_unorm4x8(simd_float4 x) {
    const simd_float4 scale = { 255.f, 255.f, 255.f, 255.f };
    const simd_float4 bias = { 0.5f, 0.5f, 0.5f, 0.5f };

    simd_uint4 s = vfx_convert_uint4(vfx_convert_uchar4(x * scale + bias));
    return (s.x | (s.y << 8) | (s.z << 16) | (s.w << 24));
}

static inline uint32_t vfx_pack_byte4_to_uint32(uint8_t x, uint8_t y, uint8_t z, uint8_t w) {
    return (x | (y << 8) | (z << 16) | (w << 24));
}

static inline uint32_t vfx_pack_uchar4_to_uint32(simd_uchar4 s) {
    return (s.x | (s.y << 8) | (s.z << 16) | (s.w << 24));
}

typedef union {
    uint32_t    full;
    int8_t      pack[4];
} __pack_char4n;

static inline simd_float4 vfx_unpack_snorm4x8_to_float(uint32_t n) {
    const simd_float4 scale = ( 1 / 127.f );
    __pack_char4n p = { .full = n };
    simd_int4 vi = { p.pack[0], p.pack[1], p.pack[2], p.pack[3] };
    simd_float4 f = vfx_convert_float4(vi);
    return vfx_clamp(f * scale, -1, 1);
}

static inline uint32_t vfx_pack_float_to_snorm4x8(simd_float4 x) {
    const simd_float4 scale = ( 127.5f );
    const simd_float4 zero = (  0.f );
    const simd_float4 bias = ( -1.f );

    simd_uint4 s = vfx_convert_uint4(vfx_convert_uchar4(x * scale + vfx_select(zero, bias, x >= zero)));
    return (s.x | s.y << 8 | s.z << 16 | s.w << 24);
}

// UShortN

#ifndef __METAL_VERSION__

static inline float vfx_unpack_ushortn_to_float(const uint16_t *ptr) {
    const float scale = 1 / 65535.f;
    return ptr[0] * scale;
}
static inline simd_float2 vfx_unpack_ushort2n_to_float(const uint16_t *ptr) {
    const simd_float2 scale = ( 1 / 65535.f );
    simd_float2 f = { (float)ptr[0], (float)ptr[1] };
    return f * scale;
}
static inline simd_float4 vfx_unpack_ushort3n_to_float(const uint16_t *ptr) {
    const simd_float4 scale = ( 1 / 65535.f );
    simd_float4 f = { (float)ptr[0], (float)ptr[1], (float)ptr[2], 0.f };
    return f * scale;
}
static inline simd_float4 vfx_unpack_ushort4n_to_float(const uint16_t *ptr) {
    const simd_float4 scale = ( 1 / 65535.f );
    simd_float4 f = { (float)ptr[0], (float)ptr[1], (float)ptr[2], (float)ptr[3] };
    return f * scale;
}

static inline uint32_t vfx_pack_float2_to_ushort2n(simd_float2 x) {
    const simd_float2 scale = ( 65535.f );
    const simd_float2 bias = ( 0.5f );
    simd_ushort2 s = vfx_convert_ushort4(x * scale + bias);
    return (s.x | (s.y << 16));
}
static inline void vfx_pack_float_to_ushortn(float x, uint16_t *ptr) {
    const simd_float2 scale = ( 65535.f );
    const simd_float2 bias = ( 0.5f );
    simd_ushort2 s = vfx_convert_ushort4(x * scale + bias);
    ptr[0] = s.x;
}
static inline void vfx_pack_float_to_ushort2n(simd_float2 x, uint16_t *ptr) {
    const simd_float2 scale = ( 65535.f );
    const simd_float2 bias = ( 0.5f );
    simd_ushort2 s = vfx_convert_ushort4(x * scale + bias);
    ptr[0] = s.x; ptr[1] = s.y;
}
static inline void vfx_pack_float_to_ushort3n(simd_float3 x, uint16_t *ptr) {
    const simd_float3 scale = ( 65535.f );
    const simd_float3 bias = ( 0.5f );
    simd_ushort3 s = vfx_convert_ushort4(x * scale + bias);
    ptr[0] = s.x; ptr[1] = s.y;  ptr[2] = s.z;
}
static inline void vfx_pack_float_to_ushort4n(simd_float4 x, uint16_t *ptr) {
    const simd_float4 scale = ( 65535.f );
    const simd_float4 bias = ( 0.5f );
    simd_ushort4 s = vfx_convert_ushort4(x * scale + bias);
    ptr[0] = s.x; ptr[1] = s.y;  ptr[2] = s.z; ptr[3] = s.w;
}

// ShortN

static inline void vfx_pack_float_to_shortn(float v, void *ptr) {
    const float scale = 32767.f;
    const int16_t iv = (int16_t)(v * scale);
    *(int16_t *)ptr = iv;
}
static inline float vfx_unpack_shortn_to_float(const void *ptr) {
    const float scale = 1 / 32767.f;
    return *(int16_t *)ptr * scale;
}

// Short2N

static inline void vfx_pack_float_to_short2n(simd_float2 v, void *ptr) {
    const simd_float2 scale = ( 32767.f );
    const simd_short2 iv = vfx_convert_short4(v * scale);
    int16_t *s16 = (int16_t *)ptr;
    s16[0] = iv.x; s16[1] = iv.y;
}

static inline simd_float2 vfx_unpack_short2n_to_float(const void *ptr) {
    int16_t *s16 = (int16_t *)ptr;
    simd_short2 i16 = { s16[0], s16[1] };
    const simd_float2 scale = ( 1 / 32767.f );
    return simd_float(i16) * scale;
}

// Short3N

static inline void vfx_pack_float_to_short3n(simd_float3 v, void *ptr) {
    const simd_float3 scale = ( 32767.f );
    const simd_short3 iv = simd_short(v * scale);
    int16_t *s16 = (int16_t *)ptr;
    s16[0] = iv.x; s16[1] = iv.y; s16[2] = iv.z;
}

static inline simd_float4 vfx_unpack_short3n_to_float(const void *ptr) {
    int16_t *s16 = (int16_t *)ptr;
    simd_short4 i16 = { s16[0], s16[1], s16[2], 0 };
    const simd_float4 scale = ( 1 / 32767.f );
    return simd_float(i16) * scale;
}

// Short4N

static inline void vfx_pack_float_to_short4n(simd_float4 v, void *ptr) {
    const simd_float4 scale = ( 32767.f );
    const simd_short4 iv = simd_short(v * scale);
    int16_t *s16 = (int16_t *)ptr;
    s16[0] = iv.x; s16[1] = iv.y; s16[2] = iv.z; s16[3] = iv.w;
}

static inline simd_float4 vfx_unpack_short4n_to_float(const void *ptr) {
    int16_t *s16 = (int16_t *)ptr;
    simd_short4 i16 = { s16[0], s16[1], s16[2], s16[3] };
    const simd_float4 scale = ( 1 / 32767.f );
    return simd_float(i16) * scale;
}

#endif

// 10A2 Format

static inline simd_float4 vfx_unpack_unorm10a2_to_float(uint32_t n) {
    const simd_float4 scale = { 1 / 1023.f, 1 / 1023.f, 1 / 1023.f, 1 / 3.f };
    const simd_uint4 shift = { 0, 10, 20, 30 };
    const simd_uint4 mask = { 0x3ffu, 0x3ffu, 0x3ffu, 0x3u };

    simd_uint4 vn = ( n );
    simd_uint4 vi = (vn >> shift) & mask;

    simd_float4 f = vfx_convert_float4(vi);
    return f * scale;
}

static inline uint32_t vfx_pack_float_to_unorm10a2(simd_float4 x) {
    const simd_float4 scale = { 1023.f, 1023.f, 1023.f, 3.f };
    const simd_float4 bias = { 0.5f, 0.5f, 0.5f, 0.5f };

    simd_ushort4 s = vfx_convert_ushort4(vfx_saturate(x) * scale + bias);
    return (s.x | (s.y << 10) | (s.z << 20) | (s.w << 30));

// slower. why ?
//    simd_uint4 s = simd_uint(x * scale + bias);
//    const simd_uint4 shift = { 1, 1024, 1048576, 1073741824 };
//    return simd_reduce_add(s * shift);
}

static inline simd_float4 vfx_unpack_snorm10a2_to_float(uint32_t n) {
    const simd_float4 scale = { 1 / 511.f, 1 / 511.f, 1 / 511.f, 1 / 3.f };
    const simd_uint4 l_shift = { 22, 12, 2, 0 };
    const simd_uint4 r_shift = { 22, 22, 22, 30 };

    simd_uint4 vn = ( n );
    simd_uint4 vi = (vn << l_shift) >> r_shift;

    simd_float4 f = vfx_convert_float4(vi);
    return f * scale;
}

static inline uint32_t vfx_pack_float_to_snorm10a2(simd_float4 v) {
    const simd_float4 scale = { 511.f, 511.f, 511.f, 3.f };
    const simd_int4 mask = { 0x3ff, 0x3ff, 0x3ff, 0x3 };
    const simd_int4 iv = vfx_convert_int4(vfx_clamp(v, -1, 1) * scale) & mask;
    return (iv.x<<0)|(iv.y<<10)|(iv.z<<20)|(iv.w<<30);
}

// Color helpers

// linear / srgb conversion

static inline float VFX_SIMD vfx_srgb_to_grayscale(simd_float4 v) {
    return 0.3 * v.x + 0.59 * v.y + 0.11 * v.z;
}

static inline simd_float4 VFX_SIMD vfx_srgb_to_linear(simd_float4 v) {
    v.x = (v.x <= 0.04045f) ? (v.x / 12.92f) : (vfx_pow((v.x + 0.055f) / 1.055f, 2.4f));
    v.y = (v.y <= 0.04045f) ? (v.y / 12.92f) : (vfx_pow((v.y + 0.055f) / 1.055f, 2.4f));
    v.z = (v.z <= 0.04045f) ? (v.z / 12.92f) : (vfx_pow((v.z + 0.055f) / 1.055f, 2.4f));
    return v;
}

static inline simd_float3 VFX_SIMD vfx_srgb_to_linear(simd_float3 v) {
    return vfx_srgb_to_linear(vfx_make_float4_undef(v)).xyz;
}

static inline simd_float4 VFX_SIMD vfx_linear_to_srgb(simd_float4 v) {
    v = vfx_saturate(v);
    v.x = (v.x < 0.0031308f) ? (12.92f * v.x) : (1.055f * vfx_pow(v.x, 1.f/2.4f) - 0.055f);
    v.y = (v.y < 0.0031308f) ? (12.92f * v.y) : (1.055f * vfx_pow(v.y, 1.f/2.4f) - 0.055f);
    v.z = (v.z < 0.0031308f) ? (12.92f * v.z) : (1.055f * vfx_pow(v.z, 1.f/2.4f) - 0.055f);
    return v;
}

static inline simd_float3 VFX_SIMD vfx_linear_to_srgb(simd_float3 v) {
    return vfx_linear_to_srgb(vfx_make_float4_undef(v)).xyz;
}

// hsb

static inline simd_float4 VFX_SIMD vfx_rgb_to_hsb(simd_float4 rgba) {
    float min = vfx_reduce_min(rgba.rgb);
    float max = vfx_reduce_max(rgba.rgb);
    float delta = max - min;
    float hue = 0;
    if (delta != 0) {
        if (rgba.r == max) {
            hue = (rgba.g - rgba.b) / delta;
        } else if (rgba.g == max) {
            hue = 2 + (rgba.b - rgba.r) / delta;
        } else { // color.b == max
            hue = 4 + (rgba.r - rgba.g) / delta;
        }
        hue = (hue < 0) ? (hue * 0.1666666666f + 1.f) : hue * 0.1666666666f;
    }
    float brightness = max;
    float saturation = max != 0 ? (max - min) / max : 0;
    return (simd_float4){ hue, saturation, brightness, rgba.a };
}

static inline simd_float3 VFX_SIMD vfx_rgb_to_hsb(simd_float3 rgb) {
    return vfx_rgb_to_hsb(vfx_make_float4_undef(rgb)).xyz;
}

static inline simd_float4 VFX_SIMD vfx_hsb_to_rgb(simd_float4 hsba) {
    simd_float3 hsb = vfx_saturate(hsba.rgb);
    float hue = ((hsb.x == 1.f) ? 0.f : hsb.x) * 6.f;
    float saturation = hsb.y;
    float brightness = hsb.z;
    
    if (saturation == 0) {
        return vfx_make_float4(hsb.zzz, hsba.a);
    }
    
    int i = (int)hue;
    float f = hue - i;
    simd_float4 bpqt = {
        brightness,
        brightness * (1 - saturation),
        brightness * (1 - saturation * f),
        brightness * (1 - saturation * (1 - f))
    };
    switch (i) {
        case 0: return vfx_make_float4(bpqt.xwy, hsba.a); break;
        case 1: return vfx_make_float4(bpqt.zxy, hsba.a); break;
        case 2: return vfx_make_float4(bpqt.yxw, hsba.a); break;
        case 3: return vfx_make_float4(bpqt.yzx, hsba.a); break;
        case 4: return vfx_make_float4(bpqt.wyx, hsba.a); break;
        default:return vfx_make_float4(bpqt.xyz, hsba.a); break;
    }
}

static inline simd_float3 VFX_SIMD vfx_hsb_to_rgb(simd_float3 rgb) {
    return vfx_hsb_to_rgb(vfx_make_float4_undef(rgb)).xyz;
}

// packed color mix

static inline uint32_t VFX_SIMD vfx_packed_color_div(uint32_t a, float t)
{
#ifdef __METAL_VERSION__
    simd_uchar4 uca = as_type<simd_uchar4>(a);
#else
    simd_uchar4 uca = *(simd_uchar4 *)&a;
#endif
    simd_float4 va = vfx_convert_float4(uca);
    simd_uchar4 r = vfx_convert_uchar4(va / t);
#ifdef __METAL_VERSION__
    return as_type<uint32_t>(r);
#else
    return *(uint32_t *)&r;
#endif
}

static inline uint32_t VFX_SIMD vfx_packed_color_mix(uint32_t a, uint32_t b, float t)
{
#ifdef __METAL_VERSION__
    simd_uchar4 uca = as_type<simd_uchar4>(a);
    simd_uchar4 ucb = as_type<simd_uchar4>(b);
#else
    simd_uchar4 uca = *(simd_uchar4 *)&a;
    simd_uchar4 ucb = *(simd_uchar4 *)&b;
#endif
    simd_float4 va = vfx_convert_float4(uca);
    simd_float4 vb = vfx_convert_float4(ucb);
    simd_uchar4 r = vfx_convert_uchar4(va + (vb - va) * t);
    
#ifdef __METAL_VERSION__
    return as_type<uint32_t>(r);
#else
    return *(uint32_t *)&r;
#endif
}

// sRGB Formats

// 8888_sRGB Format

#ifndef __METAL_VERSION__

static inline void vfx_pack_float_to_rgba8888_sRGB(simd_float4 x, uint8_t *ptr) {
    x = vfx_linear_to_srgb(x);
    const simd_float4 scale = ( 127.5f );
    const simd_float4 zero = (  0.f );
    const simd_float4 bias = ( -1.f );

    simd_uint4 s = vfx_convert_uint4(vfx_convert_uchar4(x * scale + simd_select(zero, bias, x >= zero)));
    *(uint32_t *)ptr = (s.x | s.y << 8 | s.z << 16 | s.w << 24);
}

#endif // !__METAL_VERSION__



NS_ASSUME_NONNULL_END
// MARK: - ShaderTypes.h

//
//  Types and enum constants shared between Metal shaders and Swift/cpp/ObjC source
//



// This should go in vfx_base.h but can't because of module issues?
#ifdef __METAL_VERSION__
#define vfx_binding_index int32_t
#else
// Swift import needs to be converted to Int for convenience of use
#define vfx_binding_index size_t
#endif

#define VFX_ENUM(type) enum __attribute__((enum_extensibility(closed))) : type
#define VFX_BINDING_ENUM VFX_ENUM(vfx_binding_index)

typedef VFX_BINDING_ENUM
{
    // Need to match ParticleBufferIndex  [vertex/fragment]_frame_uniforms
    // To avoid a ParticleDrawCall stepping over the buffer attachment
    BufferIndexViewDependantConstants = 0,
    BufferIndexMaterialUniforms       = 1,
    
    BufferIndexInstanceTransforms     = 4,
    BufferIndexInstanceColors         = 5
} BufferIndex;

//enum VertexSemantic: Int {
//    case position
//    case normal
//    case uv0
//    case uv1
//    case color
//    case tangent
//    case undefined
//}
//
typedef VFX_BINDING_ENUM
{
    VertexAttributePosition     = 0,
    VertexAttributeNormal       = 1,
    VertexAttributeUV0    = 2,
    VertexAttributeUV1    = 3,
    VertexAttributeColor        = 4,
    VertexAttributeTangent      = 5
} VertexAttribute;

typedef VFX_BINDING_ENUM
{
    PBRTextureIndexAlbedo     = 0,
    PBRTextureIndexRoughness  = 1,
    PBRTextureIndexMetalness  = 2,
    PBRTextureIndexRadiance   = 3,
    PBRTextureIndexIrradiance = 4,
    PBRTextureIndexBrdfLUT    = 5,
    PBRTextureIndexNormal     = 6,
    PBRTextureIndexOcclusion  = 7,
    PBRTextureIndexEmissive   = 8,
    PBRTextureIndexDepth      = 9,
    PBRTextureIndexShadowMap  = 10,
    PBRTextureIndexVoxelTex   = 11
} PBRTextureIndex;

typedef struct
{
    float           aperture;
    float           focalLength;
    float           focusDistance;
    float           exposure;
} CameraSettings;

typedef struct
{
    simd_float3     boxMin;
    simd_float3     boxMax;
    float           cutSlice;
    bool            fullOccluderOnly;
    bool            precomputedGI;
} VoxelDebug;

typedef struct {
    float     dt;
    float     time;
    bool      isFirstFrame;
    uint32_t  simulationIndex;
} FrameConstants;

typedef struct {
    matrix_float4x4 viewMatrix; // view_from_world
    matrix_float4x4 inverseViewMatrix; // world_from_view
    matrix_float4x4 projectionMatrix;
    matrix_float4x4 viewProjectionMatrix;
    matrix_float4x4 modelViewMatrix; // view_from_model 
    matrix_float4x4 inverseViewProjectionMatrix;
    // crWorld_from_world -> translation -camPos
    // view = camera_from_world
    // viewProj = clip_from_camera * camera_from_world
    // crProj = clip_from_cameraCenterZero * cameraCenterZero_from_world
    // cameraCenterZero_from_world = inverse(world_from_cameraCenterZero) = inverse(camera.transformNoTranslation)
    // crInverseViewProjectionMatrix = projection * inverse(camera.transformNoTranslation)
    matrix_float4x4 crInverseViewProjectionMatrix;
    
    // TODO remove: this is the same thing than inverseViewMatrix
    matrix_float4x4 cameraMatrix;
    simd_float3     cameraPos;

    // DoF parameters
    CameraSettings  cameraSettings;

    // contains xy: -drawableSize*2 zw: 1
    simd_float4     ndcFromScreen; // madd -> pt * xy + zw
    simd_float4     drawableSize; // .zw = inverse
    simd_float2     nearFar;

    // TODO: remove
    float     dt;
    float     time;
} ViewDependantConstants;

typedef struct {
    simd_float4 rect;
    simd_float4 fillColor;
    simd_float4 strokeColor;
    float       strokeWidth;
    float       cornerRadius;
    float       shadowSigma;
    // TODO store shadow color as UINT8
    simd_float4 shadowColor;
    simd_float2 shadowOffset;
} RectInstanceData;

typedef struct {
    simd_float2 start;
    simd_float2 end;
    simd_float4 color;
} LineInstanceData;

typedef struct {
    simd_float3 pos_radius;
    simd_float4 color;
} SPH2DInstanceData;

typedef struct {
    simd_float4 pos_radius;
    simd_float4 color;
} SPH3DInstanceData;

typedef struct {
    simd_float4 pos_radius;
    simd_float4 color;
} SPHAbsorbInstanceData;

typedef struct {
    simd_float4 pos_radius;
} SPHInstanceData;

typedef struct {
    simd_float4x4 transform; // Scale contains the box halfSize
} BoxInstanceData;

#define MAX_NEIGHBORS 8

typedef struct {
    simd_float4 pos_radius;
    simd_float4 color;
    // TODO separate in a different data track
    // We could then maybe store the first index of a neighbor per vertex
    // (the count would be deduced of the instance+1)
    uint32_t neighbors[MAX_NEIGHBORS];
} ParticleSphereInstanceWithNeighborsData;

typedef struct {
    simd_float4 rect; // integrate offset
    simd_float4 shadowColor;
    float       sigma;
    float       cornerRadius;
    // 2 more floats ?
} ShadowInstanceData;

typedef struct
{
    simd_float4 intensity;
    simd_float4 uvScaleBias;
} PBR4;

typedef struct
{
    simd_float4 uvScaleBias;
    float       intensity;
} PBR1;

// TODO if we want to merge packed and non packed
// or just add flexibility to packed,
// we could have a rmo matrix3x3 combining intensity
// and the right column/row to bi ck the value
// rmo = rmo_matrix * rmo.sample().rgb

// NOTE: this structure has a replicate in ~/re/Source/RE/RenderGraphLogic/VFX
// any changes here needs to be replicated in this file ^^
typedef struct
{
    PBR4 albedo;
    PBR4 emissive; // this should be PBR3
    // OPTIM alignment make this structure unnecessarily large
    // we should pack differently of maybe move scaleBias as a global
    // operator for N+RMO ?
    PBR1 normal;
    PBR1 metalness;
    PBR1 roughness;
    PBR1 occlusion;
} PBRUniforms;


typedef struct
{
    int resolution;
    float edgeAtt;
    simd_float4 worldPosSize;
    simd_float4 scaleBiasNrm; // [0..1]
    simd_float4 scaleBiasTex; // [0..resolution]

    float worldCellSize;
    float invWorldCellSize;

    simd_float2 opacityScaleBias;
    simd_float2 colorScaleBias;

    int frameCount;
} VoxelDataUniforms;

typedef struct {
    int   diffuseStep;
    float diffuseQuality;
    int   specularStep;
    float specularQuality;
    float ao_falloff;
} VoxelConeTracingUniforms;

typedef struct {
    int   nbIte;
    float quality;
    float ambientFactor;
    simd_float3 extinction;
    float g0;
    float g1;
    float gw;
} ScatteringDataUniforms;

typedef struct {
    simd_float4 pos_radius;
    simd_float2 invRes;
    simd_float3 extinction;
} VolumetricScatteringUniforms;

typedef struct
{
    float dofFocusPoint;
    float dofFocusScale;
    float vignettingIntensity;
    float vignettingAnamorphic;
    float vignettingSoftness;
    float vignettingRadius;
    float exposure;
    simd_float3 whiteBalance;
    simd_float3 lift;
    simd_float3 gamma;
    simd_float3 gain;
    float contrast;
    float saturation;
    float lensBlurKernelRadius;
    simd_float4 clearColor;
    
    float screenRatio;
    
} CompositeUniforms;

typedef struct
{
    float intensity;
    simd_float3 colorFilter;
    float contrast;
    float saturation;
} BloomColorGradingUniforms;

typedef struct
{
    float radius;
    simd_float3x2 coefs;
    int kernelRadius;
} LensBlurUniforms;

typedef struct
{
    float threshold;
    int     jfaOffset;
} SDFGeneratorUniforms;

typedef struct
{
    int sortMode;
    simd_float3 camDir;
    bool reverseOrder;
}GenerateKeysUniforms;

typedef struct
{
    //uint nbItems; //keep for direct version ? (unit test)
    uint32_t arraySize;
}SortUniforms;

#ifdef __METAL_VERSION__
typedef struct
{
    float3 position [[attribute(VertexAttributePosition)]];
    float3 normal   [[attribute(VertexAttributeNormal)]];
    float2 uv0      [[attribute(VertexAttributeUV0)]];
    float2 uv1      [[attribute(VertexAttributeUV1)]];
    float4 color    [[attribute(VertexAttributeColor)]];
    float4 tangent  [[attribute(VertexAttributeTangent)]];
} Vertex;
#endif

// can we have only one material uniforms ? seems unlikely...
// is this the generic base material??? what's in there
typedef struct
{
    // this are only valid if local_transform = true (EmitterDescription.isLocal = true)
    simd_float4x4 world_from_emitter;

    // Renderer has scale/orientation/position, to affect the individual particle
    simd_float4x4 particle_transform;

    float cutoff;
    float softDistance;

    float stretchFactor; // quad
    float curvature; // quad

    simd_float3 upAxis;
    
    float thickness; // line & quad
    bool multiplyThicknessByAlpha; //quad

    simd_float4 uvScaleBias; // quad

    float scale;     // aoSphere/aoBox
    float intensity; // aoSphere/aoBox

    float noiseScale; // volumetric

    float ribbonStride; // != 1 when ribbonCount is not nil => interleaving
    int32_t textureArraySliceCount; // Given to avoid binding texture to the vertex shader
} particle_material_uniforms;

typedef VFX_ENUM(int32_t)
{
    // particle_constants_has_position,
    // particle_constants_has_linear_velocity,

    particle_constants_has_velocity = 500,  // Not stating at 0: rdar://76640645 (VFX custom material compilation issue from added constant SupportsCubeArray and EnableSamplerArray)
    
    particle_constants_has_age,             // 1
    
    particle_constants_has_lifetime,        // 2
    particle_constants_uniform_lifetime,    // 3

    particle_constants_has_color,           // 4
    particle_constants_has_transient_color, // 5

    particle_constants_has_orientation,     // 6
    particle_constants_has_angular_velocity,// 7
    
    // TODO merge with orientation / angular_velocity
    particle_constants_has_angle,           // 8
    particle_constants_has_angle_velocity,  // 9

    particle_constants_has_pivot,           // 10
    particle_constants_has_target,          // 11
    particle_constants_has_mass,            // 12
    particle_constants_has_texture_frame,   // 13

    particle_constants_has_linear_factor,   // 14

    particle_constants_has_angular_factor,  // 15

    particle_constants_has_ribbon_length,   // 16

    particle_constants_has_size1D,
    particle_constants_has_size2D,
    particle_constants_has_size3D,
    particle_constants_has_uniform_size,
    particle_constants_has_transient_size,

    particle_constants_is_local,
    
    //
    // Update attribute specific
    
    particle_constants_size_over_life_mode, // 0: planar / 1: planar / 2: free

    particle_constants_drag_use_size,
    
    particle_constants_attach_use_over_life,
    
    particle_constants_noise_use_transform,
    
    particle_constants_plane_collider_infinite,

    particle_constants_enable_gravity,

    particle_constants_box_collider_inside,

    particle_constants_force_field_kind,

    //
    // Init attribute specific

    particle_constants_emitter_shape_type, // 0: point, 1: sphere, 2: box, 3: cylinder, 4: plane, 5: torus, 6: cone
    particle_constants_emitter_shape_distribution, // 0: random, 1: grid, 2: uniform
    particle_constants_emitter_shape_orientation, // -1 no orientation otherwise same as direction
    particle_constants_emitter_shape_direction, // 0: world, 1: local, 2: shape, 3: motion, 4: random
    particle_constants_emitter_shape_has_texture_2D,

    particle_constants_emitter_pointcache_inherit_position,
    particle_constants_emitter_pointcache_inherit_color,
    particle_constants_emitter_pointcache_inherit_velocity,
    particle_constants_emitter_pointcache_inherit_orientation,
    particle_constants_emitter_pointcache_inherit_size,

    particle_constants_emitter_pointcache_has_velocity,

    particle_constants_set_color_mode,
    
    particle_constants_render_blending_mode,
    particle_constants_render_enable_texture_2d,
    particle_constants_render_enable_texture_3d,
    particle_constants_render_enable_texture_2d_array,
    particle_constants_render_enable_texture_cube,
    particle_constants_render_enable_texture_prelighted,
    particle_constants_render_texture_is_not_alphapremultiplied,
    particle_constants_render_texture_channel,
    particle_constants_render_local_transform,
    particle_constants_render_has_particle_transform,
    particle_constants_render_has_pbr_lighting,
    particle_constants_render_has_pbr_lighting_specular,
    particle_constants_render_animation_mode,
    particle_constants_render_inter_frame_interpolation,
    particle_constants_render_enable_scattering,
    particle_constants_render_orientation_mode,
    particle_constants_render_shape_mode,
    particle_constants_render_enable_velocity_stretch,
    particle_constants_render_enable_cutoff,
    particle_constants_render_enable_sorting,
    particle_constants_render_enable_thick_lines,
    particle_constants_render_enable_soft_particles,
    particle_constants_render_need_opaque_zbuffer,
    particle_constants_render_need_normal_buffer,
    particle_constants_render_voxelDataChannelCount,
    particle_constants_render_voxelizeOpacity,
    particle_constants_render_voxelizeColor,
    particle_constants_render_re_uniforms,
	particle_constants_render_gamma_blending

} particle_constants;

typedef VFX_BINDING_ENUM
{
    // buffers
    vertex_frame_uniforms      = 0,
    vertex_material_uniforms   = 3,
    
    data_positions             = 4,
    data_colors                = 5,
    data_velocities            = 6,
    data_sizes                 = 7,
    data_orientations          = 8,
    data_sort_order            = 9,
    data_ages                  = 10,
    data_frames                = 11,
    data_angles                = 12,
    data_pivots                = 13,
    data_targets               = 14,
    data_masses                = 15,
    data_ribbon_lengths        = 25,
    data_angular_velocities    = 26,
    data_angle_velocities      = 27,
    data_linear_factors        = 28,
    data_angular_factors       = 29,

    data_userData1s            = 16,
    data_userData2s            = 17,
    data_userData3s            = 18,
    data_userData4s            = 19,

    data_neighborCounts        = 30,

    data_lifetimes             = 20,

    particle_count             = 21,
    
    // because we use particle_vertex_arg in voxelization, we need to reserve an index for the special proj
    vertex_voxel_matrix        = 22,
    vertex_voxel_uniforms      = 23,
    vertex_voxel_data          = 24,

    // textures
    vertex_irradiance_tex      = 1,
    vertex_voxel_tex           = 2,


    
    // Fragment

    // samplers
    fragment_sampler           = 0,

    // textures
    fragment_texture           = 0,
    fragment_linearZ           = 1,
    fragment_gi_tex            = 2,
    fragment_opaque_zbuffer    = 9,
    fragment_normal_buffer     = 10,

    
    fragment_texture_prebaked_lighting_posXYZ    = 11,
    fragment_texture_prebaked_lighting_negXYZ    = 12,

    // buffers
    fragment_frame_uniforms    = 0,
    fragment_material_uniforms = 1,
    fragment_voxel_uniforms    = 2,

    fragment_voxel_data        = 3,
    fragment_lights_uniforms    = 4,
    fragment_ibl_uniforms = 5
} ParticleBufferIndex;

// case replace = 0
// case add = 1
// case multiply = 2
// case blend = 3
typedef struct {
    float factor;
    int8_t operation;
} composition_t;

// Init GPU

typedef struct {
    vfx_float_range range;
} particle_set_life_uniforms;

typedef struct {
    vfx_float_range range;
    vfx_float_range spreading_range;
    composition_t composition;
} particle_set_velocity_uniforms;

typedef struct {
    vfx_float_range range;
} particle_set_mass_uniforms;

typedef struct {
    vfx_float_range range;
} particle_set_angle_uniforms;

typedef struct {
    vfx_float_range range;
} particle_set_angle_velocity_uniforms;

typedef struct {
    vfx_float_range range;
} particle_set_texture_frame_uniforms;

typedef struct {
    vfx_float_range xRange;
    vfx_float_range yRange;
    vfx_float_range zRange;
    int property;
} particle_set_float3_generic_uniforms;

typedef struct {
    vfx_float_range xRange;
    vfx_float_range yRange;
    vfx_float_range zRange;
} particle_set_orientation_uniforms;

typedef struct {
    vfx_float_range xRange;
    vfx_float_range yRange;
    vfx_float_range zRange;
} particle_set_angular_velocity_uniforms;

typedef struct {
    vfx_float_range xRange;
    vfx_float_range yRange;
    vfx_float_range zRange;
} particle_set_pivot_uniforms;

typedef struct {
    vfx_float_range xRange;
    vfx_float_range yRange;
    vfx_float_range zRange;
    int         mode; // 0: 1d, 1: 2d, 2: 3d
} particle_set_size_uniforms;

// mode
// 0: constant
// 1: random
// 2: randomUniform
// 3: time (use scale)
typedef struct {
    simd_float4 value; // used for constant only
    composition_t composition;
    float intensity;
    float factor; // can be randomUniform or timeScale
    bool affects_alpha;
} particle_set_color_uniforms;

typedef struct {
    simd_float3 grid;
    simd_float3 direction_axis; // used for world and local
    simd_float4 orientation_quat; // used for world and local
    vfx_float_range angular_limits;
    vfx_float_range velocity_range;
    vfx_float_range spreading_range;
    simd_float3 tangent_axis;
    vfx_float_range tangent_force_range;

    simd_float3 texture_scale;
    simd_float3 texture_bias;

    simd_float4x4 curr_transform;
    simd_float4x4 last_transform;
    simd_float4   curr_rotation;
    simd_float4x4 emitter_from_shape;

    simd_float4 mask_channel;
    float mask_threshold;

    float inner_radius; // only used for torus for now
    int uniform_count;

    int start_index;
    bool emit_on_surface;
    bool inherit_color_from_texture;
    bool has_last_frame_transform;
} emitter_shape_uniforms;

typedef struct {
    simd_float4x4 world_from_local; // OPTIM should not be provided when is_local = true
    simd_float4   world_rotation; // OPTIM: Should we use a 3x3 matrix for rotation?
    vfx_float_range velocity_range;
    uint32_t cache_count;
    float motion_transfert;
    // all formats map to MTLVertexFormat enum
    uint8_t position_format;
    uint8_t color_format;
    uint8_t normal_format;
    uint8_t velocity_format;
    uint8_t size_format;
} emitter_pointcache_uniforms;

// Update GPU

// All uniforms that are shared for the whole frame / update
typedef struct {
    float dt;
    float time;
} update_uniforms;

// Attribute uniforms

typedef struct {
    composition_t composition;
    bool affects_alpha;
} particle_color_over_life_uniforms;

typedef struct {
    composition_t composition;
} particle_size_over_life_uniforms;

typedef struct {
    float velocity;
} particle_textureframe_evolution_uniforms;

typedef struct {
    float factor;
    float scale;
    simd_float3 bias;
    simd_float4x4 transform;
} particle_noise_uniforms;

typedef struct {
    float dt;
    float elasticity;
    float friction;
    simd_float4 plane;
    simd_float3 center;
    simd_float3 velocity;
    simd_float3 u;
    simd_float3 v;
    simd_float2 half_extents;
} particle_plane_collider_uniforms;

typedef struct {
    float dt;
    float elasticity;
    float friction;
    float radius;
    simd_float3 center;
    simd_float3 velocity;
} particle_sphere_collider_uniforms;

typedef struct {
    float dt;
    float elasticity;
    float friction;
    simd_float3 center;
    simd_float3 velocity;
    simd_float3 half_extents;
    bool inside;
} particle_aabb_collider_uniforms;

typedef struct {
    float dt;
    float elasticity;
    float friction;
    simd_float3 world_box_velocity;
    simd_float4x4 local_from_world;
    simd_float4x4 world_from_local;
    simd_float3 box_size;
    float corner_radius;
    bool inside;
} particle_obb_collider_uniforms;

typedef struct {
    simd_float3 force_ori;
    simd_float3 force_dir;
    float dt;
    float strength;
    float damp_dt;
    float emitter_amount;
    float noise_amount;
    int8_t  falloff_direction; // 0 positiive, 1 negative, 2 both
    int8_t  falloff_shape; // 0 none, 1 sphere 2 tube 3 cone
    float  falloff_power;
    vfx_float_range  falloff_range;
    vfx_float_range  falloff_radius_range;
    vfx_scale_bias  falloff_cosangle_scale_bias;
} particle_force_field_uniforms;

typedef struct {
    simd_float4x4 new_ws_from_old_ws;
    float factor;
} particle_attach_uniforms;

typedef struct {
    simd_float4x4 view;
    simd_float4x4 inverse_view;
    simd_float3   origin_near;
    simd_float3   origin_far;
    vfx_scale_bias z_scale_bias;
    vfx_scale_bias z3_scale_bias;
    float z3_near;
    float z3_far_minus_near;
} particle_wrap_around_camera_perspective_uniforms;

typedef struct {
    simd_float4x4 view_proj;
    simd_float4x4 inverse_view_proj;
} particle_wrap_around_camera_orthographic_uniforms;

typedef struct {
    float linearDamping;
    // TODO angular damping
} particle_drag_uniforms;

typedef struct {
    simd_float3 world_force;
} particle_force_uniforms;

typedef struct {
    simd_float3 gravity;
    float step;
} particle_integrate_uniforms;

typedef struct {
    int32_t total_count;
    int32_t dead_count;
    int32_t dword_stride; // (stride / 4)
} particle_recycle_uniforms;

typedef struct {
    int32_t newly_added_count;
    int32_t allocated_count;
} particle_update_active_count_uniforms;


// compute_stdlib uniforms

typedef VFX_BINDING_ENUM
{
    GenericComputeBufferIndexCount = 0,
    GenericComputeBufferIndexUniforms = 1,
    GenericComputeBufferIndexDst = 2,
    GenericComputeBufferIndexSrc = 3,
    GenericComputeBufferIndexIndices = 4
} GenericComputeBufferIndex;

typedef struct {
    int32_t dword_stride;
} copy_data_uniforms;

typedef struct {
    uint32_t count;
    int32_t dword_stride;
} copy_data_generic_uniforms;

typedef VFX_ENUM(int32_t)
{
    composite_constants_has_opaque = 20000,
    composite_constants_has_transparent,
    composite_constants_has_global_illumination,
    composite_constants_global_illumination_mip,
    composite_constants_has_volumetric_scattering,
    composite_constants_volumetric_scattering_mip,
    composite_constants_has_deferred_rendering
} composite_constants;

typedef VFX_ENUM(int32_t)
{
    post_process_constants_toneMappingOperator = 20100,
    post_process_constants_hasDof,
    post_process_constants_hasLensBlur,
    post_process_constants_hasVignetting,
    post_process_constants_hasColorGrading,
    post_process_constants_hasBloom,
    post_process_constants_postOpaqueRendereredInTransparent,
    // needed if writing in a bgra8Unorm
    post_process_constants_outputsSRGB,
    post_process_constants_hasClearColor,
    post_process_constants_gamma_blending
} post_process_constants;

typedef VFX_ENUM(int32_t)
{
    voxel_cone_tracing_constants_enableAO = 20200,
    voxel_cone_tracing_constants_enableGI,
    voxel_cone_tracing_constants_enableDeferredRendering,
    voxel_cone_tracing_constants_AOPremultiply
} voxel_cone_tracing_constants;

typedef VFX_ENUM(int32_t)
{
    bloom_constants_useHighQuality = 20300,
    bloom_constants_read_srgb
} bloom_constants;

typedef VFX_ENUM(int32_t)
{
    skybox_constants_write_srgb = 20400,
    skybox_constants_needs_dithering
} skybox_constants;

typedef VFX_ENUM(int32_t)
{
    lens_blur_constants_nb_components = 20500,
    lens_blur_constants_read_srgb
} lens_blur_constants;

typedef VFX_ENUM(int32_t)
{
    deferred_constants_has_cone_traced_shadow = 20600,
    deferred_constants_has_analytical_lights,
    deferred_constants_gamma_blending,
    deferred_constants_has_not_any_lighting
} deferred_constants;

// Used to keep semantic with corresponding value between swift and shader
// size_t for swift Int compat
typedef VFX_ENUM(size_t)
{
    blend_mode_constants_opaque = 0,
    blend_mode_constants_alpha = 1,
    blend_mode_constants_additive = 2,
    blend_mode_constants_mask = 3
} blend_mode_constants;

typedef VFX_ENUM(int32_t)
{
    vertex_buffer_binding_view_uniforms         = 0,
    
    // Should be replaced by particle data if we want to support more
    // -> need to move to ArgumentBuffer then
    vertex_buffer_binding_instance_transforms   = 4,
    vertex_buffer_binding_instance_colors       = 5,
    
    vertex_buffer_binding_user_first_index      = 10,
    vertex_buffer_binding_user_count            = 4
    
    // mesh attachemnts begin at 16, so can't be past that...

} vertex_buffer_binding;

typedef VFX_ENUM(int32_t)
{
    vertex_texture_binding_user_first_index      = 10,
    vertex_texture_binding_user_count            = 4

} vertex_texture_binding;

typedef VFX_ENUM(int32_t)
{
    fragment_buffer_binding_view_uniforms         = 0,
    
    fragment_buffer_binding_user_first_index      = 10,
    fragment_buffer_binding_user_count            = 4

} fragment_buffer_binding;

typedef VFX_ENUM(int32_t)
{
    fragment_texture_binding_user_first_index      = 10,
    fragment_texture_binding_user_count            = 4

} fragment_texture_binding;

#define vfx_view_uniforms buffer(vertex_buffer_binding_view_uniforms)

#define vfx_instance_transforms buffer(vertex_buffer_binding_instance_transforms)
#define vfx_instance_colors buffer(vertex_buffer_binding_instance_colors)

#define vfx_user_vertex_buffer0 buffer(vertex_buffer_binding_user_first_index + 0)
#define vfx_user_vertex_buffer1 buffer(vertex_buffer_binding_user_first_index + 1)
#define vfx_user_vertex_buffer2 buffer(vertex_buffer_binding_user_first_index + 2)
#define vfx_user_vertex_buffer3 buffer(vertex_buffer_binding_user_first_index + 3)

#define vfx_user_vertex_texture0 texture(vertex_texture_binding_user_first_index + 0)
#define vfx_user_vertex_texture1 texture(vertex_texture_binding_user_first_index + 1)
#define vfx_user_vertex_texture2 texture(vertex_texture_binding_user_first_index + 2)
#define vfx_user_vertex_texture3 texture(vertex_texture_binding_user_first_index + 3)

#define vfx_user_fragment_buffer0 buffer(fragment_buffer_binding_user_first_index + 0)
#define vfx_user_fragment_buffer1 buffer(fragment_buffer_binding_user_first_index + 1)
#define vfx_user_fragment_buffer2 buffer(fragment_buffer_binding_user_first_index + 2)
#define vfx_user_fragment_buffer3 buffer(fragment_buffer_binding_user_first_index + 3)

#define vfx_user_fragment_texture0 texture(fragment_texture_binding_user_first_index + 0)
#define vfx_user_fragment_texture1 texture(fragment_texture_binding_user_first_index + 1)
#define vfx_user_fragment_texture2 texture(fragment_texture_binding_user_first_index + 2)
#define vfx_user_fragment_texture3 texture(fragment_texture_binding_user_first_index + 3)

// MARK: - ParticleCompute.h


#ifdef __METAL_VERSION__


// consider these always there...
// constant bool has_position          [[ function_constant(particle_constants_has_position) ]];
// constant bool has_linear_velocity   [[ function_constant(particle_constants_has_linear_velocity) ]];

constant bool has_velocity              [[ function_constant(particle_constants_has_velocity) ]];

constant bool has_age                   [[ function_constant(particle_constants_has_age) ]];

constant bool has_lifetime              [[ function_constant(particle_constants_has_lifetime) ]];
constant bool uniform_lifetime          [[ function_constant(particle_constants_uniform_lifetime) ]];

constant bool has_color                 [[ function_constant(particle_constants_has_color) ]];
constant bool has_transient_color       [[ function_constant(particle_constants_has_transient_color) ]];

constant bool has_orientation           [[ function_constant(particle_constants_has_orientation) ]];
constant bool has_angular_velocity      [[ function_constant(particle_constants_has_angular_velocity) ]];

constant bool has_angle                 [[ function_constant(particle_constants_has_angle) ]];
constant bool has_angle_velocity        [[ function_constant(particle_constants_has_angle_velocity) ]];

constant bool has_texture_frame         [[ function_constant(particle_constants_has_texture_frame) ]];

constant bool has_size1D                [[ function_constant(particle_constants_has_size1D) ]];
constant bool has_size2D                [[ function_constant(particle_constants_has_size2D) ]];
constant bool has_size3D                [[ function_constant(particle_constants_has_size3D) ]];

constant bool has_uniform_size          [[ function_constant(particle_constants_has_uniform_size) ]];
constant bool has_transient_size        [[ function_constant(particle_constants_has_transient_size) ]];

constant bool has_linear_factor         [[ function_constant(particle_constants_has_linear_factor) ]];

constant bool has_angular_factor        [[ function_constant(particle_constants_has_angular_factor) ]];

constant bool has_ribbon_length         [[ function_constant(particle_constants_has_ribbon_length) ]];

constant bool has_pivot                 [[ function_constant(particle_constants_has_pivot) ]];

constant bool has_target                [[ function_constant(particle_constants_has_target) ]];

constant bool has_mass                  [[ function_constant(particle_constants_has_mass) ]];

constant bool is_local                  [[ function_constant(particle_constants_is_local) ]];

using namespace metal;

// ⚠️ any change here might break already compiled script metallibs as this is used by particle_script_argument_buffer
struct particle_counters {
    // Storage must match ConstantBufferOffsets
    // TODO we may don't need atomic here !!!
    atomic_int  active_count;    // 0
    atomic_int  dead_count;     // 4
    atomic_int  live_count;     // 8
    uint  added_count;          // 12
    // used for randoms. could also contain the seed?
    uint  generated_count;      // 16

    bool is_outside(uint index) device {
        uint particleCount = atomic_load_explicit(&active_count, memory_order_relaxed);
        return index >= particleCount;
    }

    bool newly_created_is_outside(thread uint* index) device {
        if (*index >= added_count) return true;
        // offset the index to be in the added area
        uint particleCount = atomic_load_explicit(&active_count, memory_order_relaxed);
        // Optim store!
        uint added_start = particleCount - added_count;
        *index += added_start;
        return false;
    }
};

struct particle_argument_buffer {
    device int*         partition           [[ id(0) ]];

    // We could also avec one counts buffer and use offsets in it ?
    device particle_counters* counters      [[ id(1) ]];

    device simd_float3* positions           [[ id(data_positions) ]];
    device simd_float4* colors              [[ id(data_colors) ]];

    // OPTIM : the non varying versions should be constant ????
    device simd_float3* velocities          [[ id(data_velocities) ]];

    // sizes can be 1D, 2D or 3D depending on the function constant
    device float* sizes                     [[ id(data_sizes) ]];

    device simd_float4* orientations        [[ id(data_orientations) ]];
    device uint32_t* order                  [[ id(data_sort_order) ]];
    device float* ages                      [[ id(data_ages) ]];
    device float* frames                    [[ id(data_frames) ]];
    device float* angles                    [[ id(data_angles) ]];
    device uint32_t* pivots                 [[ id(data_pivots) ]];
    device simd_float3* targets             [[ id(data_targets) ]];
    device float* masses                    [[ id(data_masses) ]];
    
    device simd_float4* user_data1          [[ id(data_userData1s) ]];
    device simd_float4* user_data2          [[ id(data_userData2s) ]];
    device simd_float4* user_data3          [[ id(data_userData3s) ]];
    device simd_float4* user_data4          [[ id(data_userData4s) ]];
    
    device float* lifetimes                 [[ id(data_lifetimes) ]];
    device float* ribbon_lengths            [[ id(data_ribbon_lengths) ]];
    device simd_float4* angular_velocities  [[ id(data_angular_velocities) ]];
    device float* angle_velocities          [[ id(data_angle_velocities) ]];
    device simd_float3* linear_factors      [[ id(data_linear_factors) ]];
    device simd_float3* angular_factors     [[ id(data_angular_factors) ]];

    device float* neighborCounts            [[ id(data_neighborCounts) ]];

    float3 sample_size3D(uint pid) constant {
        uint idx = has_uniform_size ? 0 : pid;
        if (has_size3D) return ((device simd_float3 *)sizes)[idx];
        if (has_size2D) return float3(((device simd_float2 *)sizes)[idx], 1.f);
        if (has_size1D) return float3(sizes[idx]);
        return float3(1.f); // default size
    }
    float2 sample_size2D(uint pid) constant { return sample_size3D(pid).xy; }
    float sample_size(uint pid) constant { return sample_size3D(pid).x; }

    void set_size3D(uint pid, float3 size) constant {
        if (has_uniform_size) return;
        if (has_size3D) ((device simd_float3 *)sizes)[pid] = size;
        if (has_size2D) ((device simd_float2 *)sizes)[pid] = size.xy;
        if (has_size1D) sizes[pid] = size.x;
    }
    void set_size2D(uint pid, float2 size) constant { set_size3D(pid, float3(size, 1.f)); }
    void set_size1D(uint pid, float size)  constant { set_size3D(pid, float3(size)); }

    float sample_normalized_age(uint pid) constant {
        return has_age ? ages[pid] : 1.f;
    }

    float sample_inverse_mass(uint pid) constant {
        // mass actually store 1/mass
        return has_mass ? masses[pid] : 1.f;
    }

    float3 sample_linear_factor(uint pid) constant {
        return has_linear_factor ? linear_factors[pid] : float3(1.f);
    }

    float3 sample_angular_factor(uint pid) constant {
        return has_angular_factor ? angular_factors[pid] : float3(1.f);
    }

    float sample_angle_velocity(uint pid) constant {
        return has_angle_velocity ? angle_velocities[pid] : 1.f;
    }

    int particle_count() constant {
        return atomic_load_explicit(&counters->active_count, memory_order_relaxed);
    }

    bool is_outside(uint index) constant {
        return counters->is_outside(index);
    }

    int added_count() constant {
        return counters->added_count;
    }

    int generated_count() constant {
        return counters->generated_count;
    }

    uint index_from_added(uint index) constant {
        uint particleCount = atomic_load_explicit(&counters->active_count, memory_order_relaxed);
        // Optim store!
        uint added_start = particleCount - counters->added_count;
        return index + added_start;
    }

    bool newly_created_is_outside(thread uint* index) constant {
        return counters->newly_created_is_outside(index);
    }

    float random01(uint index) constant {
        // this should start at the seed and be incremented at each generation
        // this will not take into account the number of intermediary rand() we ask
        // index could be initialized to gen_count + index * 100 and passed as &
        // to random01 which will increment it
        uint32_t u = vfx_hash_pcg(index + counters->generated_count);
        // convert int32 to float in [0..1]
        // only generates all dyadic rationals of the form k / 2^-23 equally
        return as_type<float>(0x7Fu << 23 | u >> 9) - 1.;
    }

    float random_float_in_range(uint index, vfx_float_range range) constant {
        if (vfx_range_is_empty(range)) {
            return range.lower_bound;
        } else {
            return vfx_range_interpolate(range, random01(index));
        }
    }

    simd_float2 random_float2_in_range(uint index, vfx_float_range xRange, vfx_float_range yRange) constant {
        return (simd_float2){
            random_float_in_range(index * 2 + 0, xRange),
            random_float_in_range(index * 2 + 1, yRange)
        };
    }

    simd_float3 random_float3_in_range(uint index, vfx_float_range xRange, vfx_float_range yRange, vfx_float_range zRange) constant {
        return (simd_float3){
            random_float_in_range(index * 3 + 0, xRange),
            random_float_in_range(index * 3 + 1, yRange),
            random_float_in_range(index * 3 + 2, zRange)
        };
    }

    float2 random_float2_01(uint index) constant { return vfx_make_float2(random01(index), random01(index + 1)); }
    float3 random_float3_01(uint index) constant { return vfx_make_float3(random01(index), random01(index + 1), random01(index + 2)); }

};

/// Particle buffer for scripts. Be careful when changing this struct as we embed metallibs in .vfx that are
/// then used with newer version of the framework.
struct particle_script_argument_buffer {
    device int*         partition           [[ id(0) ]];

    // We could also avec one counts buffer and use offsets in it ?
    device particle_counters* counters      [[ id(1) ]];

    device simd_float3* positions           [[ id(data_positions) ]];
    device simd_float4* colors              [[ id(data_colors) ]];

    // OPTIM : the non varying versions should be constant ????
    device simd_float3* velocities          [[ id(data_velocities) ]];

    // sizes can be 1D, 2D or 3D depending on the function constant
    device float* sizes                     [[ id(data_sizes) ]];

    device simd_float4* orientations        [[ id(data_orientations) ]];
    device uint32_t* order                  [[ id(data_sort_order) ]];
    device float* ages                      [[ id(data_ages) ]];
    device float* frames                    [[ id(data_frames) ]];
    device float* angles                    [[ id(data_angles) ]];
    device uint32_t* pivots                 [[ id(data_pivots) ]];
    device simd_float3* targets             [[ id(data_targets) ]];
    device float* masses                    [[ id(data_masses) ]];

    device simd_float4* user_data1          [[ id(data_userData1s) ]];
    device simd_float4* user_data2          [[ id(data_userData2s) ]];
    device simd_float4* user_data3          [[ id(data_userData3s) ]];
    device simd_float4* user_data4          [[ id(data_userData4s) ]];

    device float* lifetimes                 [[ id(data_lifetimes) ]];
    device float* ribbon_lengths            [[ id(data_ribbon_lengths) ]];
    device simd_float4* angular_velocities  [[ id(data_angular_velocities) ]];
    device float* angle_velocities          [[ id(data_angle_velocities) ]];
    device simd_float3* linear_factors      [[ id(data_linear_factors) ]];
    device simd_float3* angular_factors     [[ id(data_angular_factors) ]];

    device float* neighborCounts            [[ id(data_neighborCounts) ]];

    device float3* sizes3() constant { return (device float3*)sizes; }
    device float2* sizes2() constant { return (device float2*)sizes; }
    device float*  sizes1() constant { return (device float*)sizes; }

    float sample_normalized_age(uint pid) constant {
        return has_age ? ages[pid] : 1.f;
    }

    float sample_inverse_mass(uint pid) constant {
        // mass actually store 1/mass
        return has_mass ? masses[pid] : 1.f;
    }

    float3 sample_linear_factor(uint pid) constant {
        return has_linear_factor ? linear_factors[pid] : float3(1.f);
    }

    float3 sample_angular_factor(uint pid) constant {
        return has_angular_factor ? angular_factors[pid] : float3(1.f);
    }

    float sample_angle_velocity(uint pid) constant {
        return has_angle_velocity ? angles[pid] : 1.f;
    }

    bool is_outside(uint index) constant {
        return counters->is_outside(index);
    }

    bool newly_created_is_outside(thread uint* index) constant {
        return counters->newly_created_is_outside(index);
    }
};

// Used in scripting and generated code
struct sampler1d {
    const texture1d<float> texture;
    const sampler sampler;
};

struct sampler2d {
    const texture2d<float> texture;
    const sampler sampler;
};

struct sampler3d {
    const texture3d<float> texture;
    const sampler sampler;
};

#endif
#pragma GCC diagnostic pop
